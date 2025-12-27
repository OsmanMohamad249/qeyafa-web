import { motion } from 'framer-motion';
import { useMagnetic } from '@/hooks/useMagnetic';

export function MagneticButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = ''
}) {
  const { ref, position } = useMagnetic({
    strength: 0.35,
    radius: 120
  });

  const variantStyles = {
    primary: `
      bg-qeyafa-gold text-qeyafa-primary font-semibold
      hover:shadow-[0_0_30px_rgba(212,160,23,0.5)]
    `,
    secondary: `
      bg-qeyafa-primary text-white font-semibold
      hover:shadow-[0_0_30px_rgba(15,77,63,0.5)]
    `,
    outline: `
      bg-transparent border-2 border-qeyafa-gold text-qeyafa-gold font-semibold
      hover:bg-qeyafa-gold/10
    `
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-6 py-3 text-base rounded-xl',
    lg: 'px-8 py-4 text-lg rounded-xl'
  };

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center relative overflow-hidden
        transition-all duration-300
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      animate={{
        x: position.x,
        y: position.y
      }}
      whileHover={{
        scale: 1.05
      }}
      whileTap={{
        scale: 0.98
      }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 25
      }}
    >
      {/* Gold glow effect on hover */}
      <motion.span
        className="absolute inset-0 rounded-xl bg-qeyafa-gold/20 blur-xl pointer-events-none"
        initial={{ opacity: 0, scale: 0.8 }}
        whileHover={{ opacity: 1, scale: 1.2 }}
        transition={{ duration: 0.3 }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
