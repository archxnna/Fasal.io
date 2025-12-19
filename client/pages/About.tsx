import { motion } from 'framer-motion';
import { Dock } from '@/components/Dock';
import { Leaf, Target, Users, Zap } from 'lucide-react';

export default function About() {
  const sections = [
    {
      id: 1,
      title: 'Our Mission',
      description:
        'Fasal.io is dedicated to empowering farmers worldwide with AI-powered crop disease detection technology. We believe that early detection and intervention can significantly improve crop yields and food security globally.',
      icon: Target,
      image: 'https://media.istockphoto.com/id/2156174738/photo/corn-grains-in-the-hands-of-a-successful-farmer-in-a-background-green-corn-field.jpg?s=612x612&w=0&k=20&c=oLO2laZtKZmDqnaHmv180xq7rPnH6svwmRyRcWK0odk=',
    },
    {
      id: 2,
      title: 'Why Crop Disease Detection Matters',
      description:
        'Crop diseases are responsible for 20-40% of global crop losses annually. Early detection can prevent devastating losses. Fasal.io uses advanced computer vision and machine learning to identify diseases before they spread, saving farmers time, money, and crops.',
      icon: Leaf,
      image: 'https://research.csiro.au/robotics/wp-content/uploads/sites/592/2019/02/image2hyperspectral.jpg',
    },
    {
      id: 3,
      title: 'How Fasal.io Helps Farmers',
      description:
        'Simply take a photo of your crop, upload it to Fasal.io, and receive instant AI-powered analysis. Get detailed insights about disease identification, severity assessment, and recommended treatments. All within seconds, right from your smartphone.',
      icon: Zap,
      image: 'https://ensia.com/wp-content/uploads/2018/01/Feature_DeepLearning_main2.jpg',
    },
    {
      id: 4,
      title: 'Our Community',
      description:
        'Fasal.io is built by and for farmers. We work closely with agricultural experts, researchers, and farming communities to ensure our technology addresses real-world challenges and delivers practical solutions.',
      icon: Users,
      image: '\community.jpg',
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      <Dock />

      {/* Hero section */}
      <div className="relative min-h-[60vh] flex items-center justify-center pt-24 px-4 sm:px-6">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a2d1f] via-[#1b4d2d] to-black" />
          <motion.div
            animate={{ y: [0, -30, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-0 left-1/4 w-96 h-96 bg-green-600/30 rounded-full blur-3xl opacity-30"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center max-w-3xl"
        >
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-green-400 to-green-500 mb-6">
            About Fasal.io
          </h1>
          <p className="text-xl text-green-100/80">
            Revolutionizing Agriculture with AI-Powered Crop Disease Detection
          </p>
        </motion.div>
      </div>

      {/* Sections */}
      <div className="py-20 px-4 sm:px-6 bg-gradient-to-b from-[#1b4d2d] to-black">
        <div className="max-w-5xl mx-auto space-y-20">
          {sections.map((section, index) => {
            const Icon = section.icon;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${isEven ? '' : 'lg:grid-cols-2'}`}
              >
                {/* Content */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className={isEven ? '' : 'lg:order-2'}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Icon className="w-8 h-8 text-green-400" />
                    <h2 className="text-3xl sm:text-4xl font-bold text-white">{section.title}</h2>
                  </div>
                  <p className="text-green-100/80 text-lg leading-relaxed mb-6">{section.description}</p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600/20 border border-green-500/50">
                    <span className="text-green-300 font-semibold">✓</span>
                    <span className="text-green-100/90">Verified & Trusted</span>
                  </div>
                </motion.div>

                {/* Image */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className={isEven ? 'lg:order-2' : ''}
                >
                  <div className="relative rounded-3xl overflow-hidden h-96 shadow-2xl">
                    <img src={section.image} alt={section.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-green-900/40 to-transparent" />
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-4 sm:px-6 bg-gradient-to-b from-black to-[#0a2d1f] text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Protect Your Crops?</h2>
          <p className="text-green-100/70 text-lg mb-8">
            Start using Fasal.io today and detect crop diseases before they spread.
          </p>
          <a
            href="/detect"
            className="inline-block px-10 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl font-semibold text-lg hover:shadow-2xl hover:shadow-green-500/50 hover:scale-105 transition-all duration-300"
          >
            Get Started
          </a>
        </motion.div>
      </div>
    </div>
  );
}