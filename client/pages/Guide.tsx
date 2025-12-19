import { motion } from 'framer-motion';
import { Dock } from '@/components/Dock';

const comicSteps = [
  {
    id: 1,
    img: '/1.png',
    title: 'Step 1: Oh no, Something’s Wrong!',
    description: 'Farmer is worried: "What happened to my crops?!" Don’t worry Fasal.io is here to help you figure out what is happening!',
  },
  {
    id: 2,
    img: '/2.png',
    title: 'Step 2: Listen to Your Crops',
    description: 'Your crops may be feeling sad and sick, but you can help them! Simply open the Fasal.io app, and let technology be your field-side doctor.',
  },
  {
    id: 3,
    img: '/3.png',
    title: 'Step 3: Snap, Scan, Cure!',
    description: 'Just snap a photo. The AI scans for disease, recommends a cure, and your crops can get healthy again—with a smile!',
  },
  {
    id: 4,
    img: '/4.png',
    title: 'Step 4: Welcome to the Future!',
    description: 'Now farmers everywhere can use Fasal.io to detect and treat crop diseases instantly! Try it yourself and watch your field flourish.',
  },
];

export default function Guide() {
  return (
    <div className="min-h-screen bg-black">
      <Dock />
      {/* Comic Guide Hero */}
      <div className="relative min-h-[40vh] flex items-center justify-center pt-24 px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center max-w-3xl"
        >
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-green-400 to-green-500 mb-6">
            How To Use Fasal.io
          </h1>
          <p className="text-xl text-green-100/80">
            Your Guide to cure crop disease easily!
          </p>
        </motion.div>
      </div>

      {/* Comic Steps */}
      <div className="py-16 px-4 sm:px-6 bg-gradient-to-b from-[#1b4d2d] to-black">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14">
          {comicSteps.map((step, idx) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="rounded-3xl overflow-hidden shadow-2xl bg-neutral-900 hover:shadow-green-600/20 transition-all border-2 border-green-800/40"
            >
              <div
                className="relative w-full aspect-[4/3] sm:aspect-square bg-black flex items-center justify-center"
              >
                <img
                  src={step.img}
                  alt={step.title}
                  className="w-full h-full object-contain p-2"
                />
                {/* overlay gradient for style */}
                <div className="absolute inset-0 bg-gradient-to-t from-green-950/40 via-transparent to-transparent pointer-events-none" />
              </div>
              <div className="p-6">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-green-400 mb-2">
                  {step.title}
                </h2>
                <p className="text-green-100/85 text-lg leading-relaxed mb-2">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="py-20 px-4 sm:px-6 bg-gradient-to-b from-black to-[#0a2d1f] text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Protect Your Crops Today!</h2>
          <p className="text-green-100/70 text-lg mb-8">
            Start using Fasal.ioand become the hero of your field.
          </p>
          <a
            href="/detect"
            className="inline-block px-10 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl font-semibold text-lg hover:shadow-2xl hover:shadow-green-500/50 hover:scale-105 transition-all duration-300"
          >
            Scan Now
          </a>
        </motion.div>
      </div>
    </div>
  );
}