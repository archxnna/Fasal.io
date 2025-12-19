import { motion } from 'framer-motion';
import { useState } from 'react';
import { Dock } from '@/components/Dock';
import NoticeCard from '@/components/NoticeCard';
import UploadBox from '@/components/UploadBox';
import { Microscope } from 'lucide-react';

export default function Detect() {
  const [selectedImage, setSelectedImage] = useState<{ file: File; preview: string } | null>(null);
  
  const handleLoginRequired = () => {
    console.log('Login required - user should click login button in dock');
  };

  const handleImageSelected = (file: File, preview: string) => {
    setSelectedImage({ file, preview });
  };

  return (
    <div className="min-h-screen bg-black">
      <Dock />

      {/* Hero section */}
      <div className="relative min-h-[50vh] flex items-center justify-center pt-24 px-4 sm:px-6">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a2d1f] via-[#1b4d2d] to-black" />
          <motion.div
            animate={{ y: [0, -30, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-0 right-1/4 w-96 h-96 bg-green-600/30 rounded-full blur-3xl opacity-30"
          />
          <motion.div
            animate={{ y: [0, 30, 0] }}
            transition={{ duration: 10, repeat: Infinity, delay: 1 }}
            className="absolute bottom-0 left-1/4 w-80 h-80 bg-green-700/20 rounded-full blur-3xl opacity-20"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center max-w-3xl"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Microscope className="w-10 h-10 text-green-400" />
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-green-400 to-green-500">
              Crop Disease Detection
            </h1>
          </div>
          <p className="text-xl text-green-100/80">
            Upload a photo of your crop and get instant AI-powered disease analysis
          </p>
        </motion.div>
      </div>

      {/* Main content */}
      <div className="py-20 px-4 sm:px-6 bg-gradient-to-b from-[#1b4d2d] to-black">
        <div className="max-w-4xl mx-auto">
          {/* Login notice removed - authentication disabled */}

          {/* Guidelines */}
          <NoticeCard />

          {/* Upload section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Upload Your Crop Image</h2>
            <UploadBox
              isLoggedIn={true}
              onLoginRequired={handleLoginRequired}
              onImageSelected={handleImageSelected}
            />
          </motion.div>

          {/* Info section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8"
          >
            {[
              {
                number: '1',
                title: 'Upload',
                description: 'Take or upload a clear photo of your crop or affected area',
              },
              {
                number: '2',
                title: 'Analyze',
                description: 'Our AI analyzes the image for disease patterns and anomalies',
              },
              {
                number: '3',
                title: 'Get Results',
                description: 'Receive instant recommendations for treatment and prevention',
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -5 }}
                className="p-6 rounded-2xl bg-gradient-to-br from-green-900/30 to-green-800/20 border border-green-700/50 text-center"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white font-bold text-lg">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-green-100/70">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-20"
          >
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>

            <div className="space-y-4">
              {[
                {
                  q: 'What image formats are supported?',
                  a: 'CropSavvysupports JPG, JPEG, PNG, and WEBP formats with a maximum file size of 10MB.',
                },
                {
                  q: 'How accurate is the disease detection?',
                  a: 'Our AI model achieves 95%+ accuracy in identifying common crop diseases when images are clear and well-lit.',
                },
                {
                  q: 'How long does analysis take?',
                  a: 'Most images are analyzed within 5-10 seconds, depending on image quality and current system load.',
                },
                {
                  q: 'Can I use CropSavvy for multiple crops?',
                  a: 'Yes! CropSavvyworks with a wide variety of crops including wheat, corn, rice, potatoes, tomatoes, and many more.',
                },
              ].map((faq, index) => (
                <motion.details
                  key={index}
                  className="group p-4 rounded-2xl bg-green-900/20 border border-green-700/50 cursor-pointer hover:bg-green-900/30 transition-all"
                >
                  <motion.summary className="flex items-center justify-between font-semibold text-green-100 hover:text-green-300 transition-colors">
                    <span>{faq.q}</span>
                    <span className="text-green-400 group-open:rotate-180 transition-transform">▼</span>
                  </motion.summary>
                  <p className="mt-4 text-green-100/70">{faq.a}</p>
                </motion.details>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
