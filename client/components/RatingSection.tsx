import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface RatingSectionProps {
  isLoggedIn?: boolean;
  onLoginRequired?: () => void;
}

export default function RatingSection({ isLoggedIn = false, onLoginRequired }: RatingSectionProps) {
  const [rating, setRating] = useState<number | null>(null);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);

  const handleStarClick = (value: number) => {
    if (!isLoggedIn && onLoginRequired) {
      onLoginRequired();
      return;
    }
    setRating(value);
  };

  const handleStarHover = (value: number) => {
    if (!isLoggedIn) return;
    setHoveredRating(value);
  };

  return (
    <div className="py-16 px-4 sm:px-6 bg-gradient-to-b from-[#1b4d2d] to-black relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-green-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-green-700/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-white mb-4">How helpful was CropSavvy?</h2>
          <p className="text-green-100/70 mb-8">Let us know your experience and help us improve</p>

          {/* Rating stars */}
          <div className="flex justify-center gap-4 mb-8">
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.button
                key={star}
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleStarClick(star)}
                onMouseEnter={() => handleStarHover(star)}
                onMouseLeave={() => setHoveredRating(null)}
                className="relative group cursor-pointer"
              >
                <motion.div
                  animate={{
                    scale: hoveredRating && hoveredRating >= star ? 1.3 : rating && rating >= star ? 1.15 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <Star
                    className={`w-12 h-12 sm:w-14 sm:h-14 transition-all ${
                      (hoveredRating ? hoveredRating : rating) && star <= (hoveredRating ? hoveredRating : rating)
                        ? 'fill-yellow-400 text-yellow-400 drop-shadow-lg drop-shadow-yellow-500/50'
                        : 'text-green-700/50 hover:text-green-500/70'
                    }`}
                  />
                </motion.div>

                {/* Glow effect on filled stars */}
                {(hoveredRating ? hoveredRating : rating) && star <= (hoveredRating ? hoveredRating : rating) && (
                  <motion.div
                    layoutId="star-glow"
                    className="absolute inset-0 rounded-full bg-yellow-400/20 blur-lg -z-10"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Status message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="h-12 flex items-center justify-center"
          >
            {!isLoggedIn ? (
              <div className="text-green-300 text-sm sm:text-base">
                👤 Please{' '}
                <button
                  onClick={onLoginRequired}
                  className="underline hover:text-green-200 font-semibold transition-colors"
                >
                  log in
                </button>{' '}
                to rate
              </div>
            ) : rating ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-green-400 font-semibold text-sm sm:text-base"
              >
                ✓ Thank you for rating {rating} star{rating !== 1 ? 's' : ''}!
              </motion.div>
            ) : (
              <div className="text-green-100/50 text-sm">Click on stars to rate</div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
