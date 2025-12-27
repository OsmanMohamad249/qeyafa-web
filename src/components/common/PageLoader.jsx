import { motion } from 'framer-motion';

export function PageLoader() {
  return (
    <div className="fixed inset-0 bg-qeyafa-black flex items-center justify-center z-50">
      <motion.div
        className="flex space-x-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-4 h-4 bg-qeyafa-gold rounded-full"
            animate={{
              y: [0, -20, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.15,
              ease: 'easeInOut'
            }}
          />
        ))}
      </motion.div>

      <motion.p
        className="absolute bottom-1/3 text-qeyafa-gold font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Loading...
      </motion.p>
    </div>
  );
}

