import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Upload, Brain, TrendingUp } from 'lucide-react';

interface Feature {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
}

const features: Feature[] = [
  {
    id: 1,
    title: 'Real-time Crop Analysis',
    description:
      'Instantly analyze crop health with advanced AI algorithms that identify diseases, nutrient deficiencies, and growth patterns in real-time.',
    icon: <Brain className="w-12 h-12" />,
    image: 'https://backend.aionlinecourse.com/uploads/ai_projects/image/2024/08/crop-disease-detection.webp',
  },
  {
    id: 2,
    title: 'Upload from Any Device',
    description:
      'Capture images from your smartphone, tablet, or computer. Simply take a photo of your crop and upload it instantly.',
    icon: <Upload className="w-12 h-12" />,
    image: 'https://blog.agribazaar.com/wp-content/uploads/2024/08/digital-plants.jpg',
  },
  {
    id: 3,
    title: 'Instant AI Prediction',
    description:
      'Get accurate disease predictions and treatment recommendations within seconds. No waiting, no delays.',
    icon: <Zap className="w-12 h-12" />,
    image: 'https://d17ocfn2f5o4rl.cloudfront.net/wp-content/uploads/2023/07/BP-AI-in-Agriculture-The-Future-of-Farming_body-im-3.jpg',
  },
  {
    id: 4,
    title: 'Early Detection Saves Crops',
    description:
      'Detect crop diseases before they spread. Early intervention can save your harvest and increase yield significantly.',
    icon: <TrendingUp className="w-12 h-12" />,
    image: 'https://media.istockphoto.com/id/641940492/photo/rural-women-cutting-silage-for-domestic-cattle.jpg?s=612x612&w=0&k=20&c=MSTEAtpcbIxfiN-BsEMVAGqvMC7IgoaLrZzRsN4Fjyg=',
  },
];

export default function StickyFeatures() {
  const [activeFeature, setActiveFeature] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative py-20 px-4 sm:px-6 bg-gradient-to-b from-black via-[#0a2d1f] to-[#1b4d2d]"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-green-500 mb-4">
            Why Choose Fasal.io?
          </h2>
          <p className="text-green-100/80 text-lg max-w-2xl mx-auto">
            Advanced AI technology designed specifically for farmers to protect and maximize crop yields.
          </p>
        </motion.div>

        {/* Sticky scroll features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Features list */}
          <div className="space-y-4">
            {features.map((feature, index) => (
              <motion.button
                key={feature.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                onClick={() => setActiveFeature(index)}
                className={`w-full text-left p-6 rounded-2xl transition-all duration-300 ${
                  activeFeature === index
                    ? 'bg-gradient-to-r from-green-600/40 to-green-700/40 border border-green-500/60 shadow-lg shadow-green-500/20'
                    : 'bg-green-900/10 border border-green-700/20 hover:bg-green-900/20'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="text-green-400 mt-1">{feature.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                    <p
                      className={`transition-all ${
                        activeFeature === index ? 'text-green-100 opacity-100' : 'text-green-100/60 opacity-75'
                      }`}
                    >
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Image showcase */}
          <div className="relative h-96 sm:h-[500px] rounded-3xl overflow-hidden">
            <motion.div
              key={`feature-${activeFeature}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <img
                src={features[activeFeature].image}
                alt={features[activeFeature].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-green-900/40 to-transparent" />
            </motion.div>

            {/* Feature title overlay */}
            <motion.div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
              <h3 className="text-2xl font-bold text-white">{features[activeFeature].title}</h3>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}