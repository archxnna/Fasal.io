import { motion } from 'framer-motion';

export default function AuthButtons() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="flex items-center gap-2"
    >
      {/* Authentication removed - placeholder for future implementation */}
    </motion.div>
  );
}
