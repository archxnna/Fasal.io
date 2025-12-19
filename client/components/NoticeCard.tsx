import { motion } from 'framer-motion';
import { AlertCircle, Sun, Eye, Camera, Droplets, Focus } from 'lucide-react';

const guidelines = [
  {
    id: 1,
    icon: Sun,
    text: 'Take photo in direct sunlight or well-lit environment.',
  },
  {
    id: 2,
    icon: Eye,
    text: 'Ensure the leaf or crop area is fully visible.',
  },
  {
    id: 3,
    icon: Camera,
    text: 'Avoid blurry or shaky photos.',
  },
  {
    id: 4,
    icon: Focus,
    text: 'Capture close-up details of the affected area.',
  },
  {
    id: 5,
    icon: Droplets,
    text: 'Remove water droplets or shadows before capturing.',
  },
];

export default function NoticeCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-12"
    >
      <div className="relative rounded-3xl overflow-hidden border border-green-700/50 bg-gradient-to-br from-green-900/30 to-green-800/20 p-8 sm:p-10 shadow-2xl backdrop-blur-sm">
        {/* Background gradient */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-green-600/10 rounded-full blur-3xl" />
        </div>

        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex-shrink-0"
          >
            <AlertCircle className="w-8 h-8 text-green-400" />
          </motion.div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white">Guidelines for Best Results</h3>
        </div>

        {/* Guidelines grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {guidelines.map((guideline, index) => {
            const Icon = guideline.icon;
            return (
              <motion.div
                key={guideline.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08, duration: 0.4 }}
                className="relative group"
              >
                <div className="p-4 rounded-2xl bg-gradient-to-br from-green-700/20 to-green-800/10 border border-green-600/30 hover:border-green-500/50 transition-all hover:bg-green-700/30 h-full">
                  <div className="flex flex-col items-center text-center gap-3">
                    <div className="p-3 rounded-lg bg-green-600/30 group-hover:bg-green-600/50 transition-colors">
                      <Icon className="w-6 h-6 text-green-300" />
                    </div>
                    <p className="text-sm text-green-100 font-medium leading-snug">{guideline.text}</p>
                  </div>
                </div>

                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500/0 to-green-600/0 group-hover:from-green-500/10 group-hover:to-green-600/10 transition-all duration-300 -z-10" />
              </motion.div>
            );
          })}
        </div>

        {/* Bottom info */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center text-green-200/70 text-sm sm:text-base"
        >
          Higher quality images lead to more accurate disease detection and recommendations. Follow these guidelines to get the best results from CropSavvy.
        </motion.p>
      </div>
    </motion.div>
  );
}
