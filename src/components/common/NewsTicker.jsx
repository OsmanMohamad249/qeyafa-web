import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell } from 'lucide-react';

const NewsTicker = ({ news }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % news.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [news.length]);

  return (
    <div className="mt-12 w-full max-w-2xl mx-auto">
      <div className="relative flex items-center gap-4 bg-white/5 border border-white/10 rounded-full px-6 py-3 backdrop-blur-sm overflow-hidden">
        <div className="flex items-center gap-2 text-qeyafa-gold shrink-0 border-r border-white/10 pr-4">
          <Bell className="w-4 h-4" />
          <span className="text-xs font-bold tracking-wider uppercase">Latest</span>
        </div>

        <div className="relative h-6 flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex items-center"
            >
              <span className="text-sm text-white/80 truncate">
                {news[currentIndex]}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default NewsTicker;

