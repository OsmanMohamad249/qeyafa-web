import { motion } from 'framer-motion';

export function ModernCard({
  children,
  className = '',
  hover = true
}) {
  return (
    <motion.div
      className={`
        bg-white rounded-[24px] p-8
        shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)]
        border border-gray-100
        ${className}
      `}
      whileHover={hover ? {
        y: -5,
        boxShadow: "0 20px 40px -10px rgba(0,0,0,0.12)"
      } : undefined}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

