
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.5, delay: 2.5 }}
      className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden"
    >
      {/* Deep green spotlight gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-900 to-[#1b4d2d]">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-green-600 rounded-full blur-3xl opacity-20" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-green-700 rounded-full blur-3xl opacity-15" />
        </div>
      </div>

      {/* Centered content */}
      <div className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-8 flex justify-center"
        >
          <img
            src="public\fasal.io.png"
            alt="scanning logo"
            className="w-12 h-12 object-contain"
          />
        </motion.div>


        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-8 text-green-400 text-lg font-light tracking-widest"
        >
          scanning...
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-6 flex justify-center gap-2"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ delay: i * 0.2, duration: 1.5, repeat: Infinity }}
              className="w-2 h-2 bg-green-400 rounded-full"
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
