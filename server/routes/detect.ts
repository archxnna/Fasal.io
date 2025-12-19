import { RequestHandler } from "express";

export interface DetectResponse {
  result: string;
  confidence?: number;
  disease?: string;
}

interface FileUpload {
  mimetype: string;
  size: number;
}

export const handleDetect: RequestHandler = async (req, res) => {
  try {
    const reqWithFiles = req as any;
    // Check if file was uploaded
    if (!reqWithFiles.files || !reqWithFiles.files.image) {
      res.status(400).json({ error: "No image file provided" });
      return;
    }

    const imageFile = reqWithFiles.files.image;

    // Validate file type
    const validMimeTypes = ["image/jpeg", "image/png", "image/webp"];
    if (Array.isArray(imageFile)) {
      res.status(400).json({ error: "Multiple files not supported" });
      return;
    }

    if (!validMimeTypes.includes(imageFile.mimetype)) {
      res.status(400).json({ error: "Invalid image format" });
      return;
    }

    // Validate file size (10MB max)
    if (imageFile.size > 10 * 1024 * 1024) {
      res.status(400).json({ error: "File size exceeds 10MB limit" });
      return;
    }

    // Mock AI analysis - In a real implementation, this would call a ML model
    const diseases = [
      "Early Blight",
      "Late Blight",
      "Powdery Mildew",
      "Leaf Spot",
      "Rust",
      "Fusarium Wilt",
    ];
    
    const randomDisease = diseases[Math.floor(Math.random() * diseases.length)];
    const confidence = Math.floor(Math.random() * 40) + 60; // 60-100%

    const result: DetectResponse = {
      result: `Disease Detected: ${randomDisease} (${confidence}% confidence). Recommended action: Apply fungicide treatment and increase air circulation. Monitor the affected area closely over the next 7 days.`,
      confidence,
      disease: randomDisease,
    };

    res.json(result);
  } catch (error) {
    console.error("Error in detect handler:", error);
    res.status(500).json({ error: "Failed to analyze image" });
  }
};
