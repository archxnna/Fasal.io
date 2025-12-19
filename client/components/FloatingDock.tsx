import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

interface DockItem {
  id: string;
  label: string;
  href: string;
}

const dockItems: DockItem[] = [
  {
    id: 'home',
    label: 'Home',
    href: '/',
  },
  {
    id: 'about',
    label: 'About',
    href: '/about',
  },
  {
    id: 'detect',
    label: 'Detect',
    href: '/detect',
  },
];

export default function FloatingDock() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const location = useLocation();

  const isActive = (href: string) => {
    return location.pathname === href;
  };

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="fixed top-6 sm:top-10 left-1/2 transform -translate-x-1/2 z-50 w-[90%] sm:w-auto max-w-md sm:max-w-none"
    >
      <div className="flex items-center justify-center gap-1 sm:gap-3 px-3 sm:px-8 py-3 sm:py-4 rounded-2xl bg-black border-2 border-green-800/30 shadow-2xl">
        {dockItems.map((item, index) => (
          <Link key={item.id} to={item.href} className="flex-1 sm:flex-none">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 + index * 0.1, duration: 0.4 }}
              className="relative"
              onHoverStart={() => setHoveredId(item.id)}
              onHoverEnd={() => setHoveredId(null)}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl text-sm sm:text-base font-semibold transition-all duration-300 ${
                  isActive(item.href)
                    ? 'bg-green-700/20 text-green-400 border-2 border-green-500 shadow-lg shadow-green-500/30'
                    : 'bg-transparent text-green-100 border-2 border-transparent hover:border-green-500 hover:text-green-300 hover:shadow-lg hover:shadow-green-500/20'
                }`}
              >
                <span className="relative z-10">{item.label}</span>
                
                {/* Shining border effect on hover */}
                {hoveredId === item.id && !isActive(item.href) && (
                  <motion.div
                    layoutId="shine"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-green-400/20 to-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>
            </motion.div>
          </Link>
        ))}
      </div>

      {/* Glow effect */}
      <motion.div
        animate={{
          opacity: hoveredId ? 0.8 : 0.4,
        }}
        className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-green-600/30 via-green-500/40 to-green-600/30 blur-xl"
      />
    </motion.div>
  );
}
