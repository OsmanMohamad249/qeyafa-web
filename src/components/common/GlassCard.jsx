import { motion } from 'framer-motion';

export function GlassCard({
  children,
  variant = 'light',
  hover = true,
  className = ''
}) {
  const variants = {
    light: 'bg-white/10 border-white/20',
    dark: 'bg-qeyafa-primary/10 border-qeyafa-primary/20',
    gold: 'bg-white/5 border-qeyafa-gold/50 shadow-[0_0_30px_rgba(212,160,23,0.4)]'
  };

  return (
    <motion.div
      className={`
        backdrop-blur-xl rounded-2xl p-6 border
        ${variants[variant]}
        ${className}
      `}
      whileHover={hover ? {
        scale: 1.02,
        boxShadow: '0 0 30px rgba(212, 160, 23, 0.3)',
        borderColor: 'rgba(212, 160, 23, 0.6)'
      } : undefined}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

