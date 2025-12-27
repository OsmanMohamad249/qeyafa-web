import { motion } from 'framer-motion';

export function GoldGlow({
  children,
  intensity = 'medium',
  className = ''
}) {
  const glowIntensity = {
    subtle: '0 0 15px rgba(212, 160, 23, 0.2)',
    medium: '0 0 25px rgba(212, 160, 23, 0.4)',
    strong: '0 0 40px rgba(212, 160, 23, 0.6)'
  };

  return (
    <motion.div
      className={`relative ${className}`}
      whileHover={{
        boxShadow: glowIntensity[intensity]
      }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

