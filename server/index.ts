import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleDetect } from "./routes/detect";

// Simple file upload middleware
function fileUploadMiddleware(req: any, res: any, next: any) {
  if (req.method === 'POST' && req.headers['content-type']?.includes('multipart/form-data')) {
    let buffer = Buffer.alloc(0);
    const chunks: Buffer[] = [];

    req.on('data', (chunk: Buffer) => {
      chunks.push(chunk);
    });

    req.on('end', () => {
      buffer = Buffer.concat(chunks);

      // Parse multipart data manually
      const boundary = req.headers['content-type'].split('boundary=')[1];
      const parts = buffer.toString().split('--' + boundary);

      req.files = {};

      for (const part of parts) {
        if (part.includes('Content-Disposition: form-data')) {
          const lines = part.split('\r\n');

          for (let i = 0; i < lines.length; i++) {
            const line = lines[i];

            if (line.includes('name="image"') && line.includes('filename=')) {
              // Extract filename and mime type
              const filenameMatch = line.match(/filename="([^"]*)"/);
              const filename = filenameMatch ? filenameMatch[1] : 'image';

              // Find the actual file content
              let fileStart = i + 2;
              while (fileStart < lines.length && lines[fileStart] !== '') {
                fileStart++;
              }
              fileStart++;

              // Find where file content ends
              let fileEnd = fileStart;
              while (fileEnd < lines.length && !lines[fileEnd].startsWith('--' + boundary)) {
                fileEnd++;
              }

              // Get MIME type from headers
              let mimeType = 'image/jpeg';
              for (let j = i; j < fileStart; j++) {
                if (lines[j].toLowerCase().includes('content-type')) {
                  const mimeMatch = lines[j].match(/Content-Type:\s*([^\s;]+)/i);
                  if (mimeMatch) {
                    mimeType = mimeMatch[1];
                  }
                }
              }

              const fileContent = Buffer.from(lines.slice(fileStart, fileEnd).join('\r\n'), 'utf8');

              req.files.image = {
                name: filename,
                data: fileContent,
                size: fileContent.length,
                encoding: '7bit',
                mimetype: mimeType,
                mv: function(path: string) {
                  // No-op for now
                }
              };
            }
          }
        }
      }

      next();
    });
  } else {
    next();
  }
}

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(fileUploadMiddleware);

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Crop detection route
  app.post("/api/detect", handleDetect);

  return app;
}
