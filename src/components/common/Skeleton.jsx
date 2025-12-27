import { motion } from 'framer-motion';

export function Skeleton({
  width = '100%',
  height = 20,
  rounded = 'md',
  className = ''
}) {
  const roundedClasses = {
    sm: 'rounded',
    md: 'rounded-lg',
    lg: 'rounded-xl',
    full: 'rounded-full'
  };

  return (
    <motion.div
      className={`
        bg-gradient-to-r from-qeyafa-primary/20 via-qeyafa-gold/10 to-qeyafa-primary/20
        ${roundedClasses[rounded]}
        ${className}
      `}
      style={{ width, height }}
      animate={{
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'linear'
      }}
    />
  );
}

