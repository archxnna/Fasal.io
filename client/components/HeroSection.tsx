
import { motion } from 'framer-motion';
import TypewriterEffect from './TypewriterEffect';
import { Dock } from './Dock';

export default function HeroSection() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background with gradient and depth */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a2d1f] via-[#1b4d2d] to-black" />
        <motion.div
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-0 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-green-600/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          className="absolute bottom-0 right-1/4 w-52 sm:w-80 h-52 sm:h-80 bg-green-700/20 rounded-full blur-3xl"
        />
        <div className="absolute top-20 right-2 sm:right-10 opacity-20">
          <svg className="w-40 sm:w-96 h-40 sm:h-96" viewBox="0 0 200 200" fill="none">
            <path
              d="M100 20 Q130 80 100 180 Q70 80 100 20"
              stroke="currentColor"
              strokeWidth="2"
              className="text-green-400"
            />
            <ellipse cx="100" cy="100" rx="30" ry="50" fill="currentColor" className="text-green-500/10" />
          </svg>
        </div>
      </div>

      {/* Navbar Dock */}
      <header className="w-full sticky top-0 left-0 z-20">

        <div>
          <Dock />
        </div>
      </header>

      {/* Responsive Content */}
      <main className="flex-grow flex flex-col items-center justify-center w-full px-3 sm:px-6 max-w-4xl relative z-10 text-center mt-2">
        {/* Main title with typewriter effect */}
        <div className="mb-6">
          <h1 className="text-3xl xs:text-5xl sm:text-6xl lg:text-7xl font-black mb-4 leading-tight">
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-green-400 to-green-500">
              Fasal.io
            </span>
          </h1>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-8"
        >
          <p className="text-lg xs:text-xl sm:text-2xl lg:text-3xl text-green-100 font-light leading-relaxed max-w-md sm:max-w-2xl mx-auto font-serif">
            <TypewriterEffect
              words={[
                { text: 'Faslon ka future' },
                { text: ', data ke saath' },
              ]}
            />
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <a
            href="/detect"
            className="inline-block px-6 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl font-semibold text-base sm:text-lg shadow-2xl hover:shadow-green-500/50 hover:scale-105 transition-all duration-300"
          >
            Start Detection
          </a>
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="mt-10 sm:mt-16 flex justify-center gap-4 sm:gap-8"
        >
          {[0, 1, 2].map((i) => (
            <div key={i} className="w-10 sm:w-16 h-10 sm:h-16 rounded-2xl bg-gradient-to-br from-green-600/20 to-green-700/20 border border-green-500/30 flex items-center justify-center backdrop-blur-sm">
              <span className="text-green-400 text-xl sm:text-2xl">✓</span>
            </div>
          ))}
        </motion.div>
      </main>

      {/* Scroll indicator */}
      <motion.div
        animate={{
          y: [0, 8, 0],
        }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-5 sm:w-6 h-8 sm:h-10 border-2 border-green-500 rounded-full flex items-start justify-center p-1 sm:p-2">
          <motion.div className="w-0.5 sm:w-1 h-2 sm:h-3 bg-green-500 rounded-full" />
        </div>
      </motion.div>
    </div>
  );
}
