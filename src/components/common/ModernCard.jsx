import { motion } from 'framer-motion';

export function ModernCard({
  children,
  className = '',
  hover = true
}) {
  return (
    <motion.div
      className={`
        bg-[#111111]/60 backdrop-blur-xl rounded-[24px] p-8
        border border-white/10 text-white relative overflow-hidden
        shadow-[0_0_30px_rgba(2,13,10,0.35)]
        ${className}
      `}
      whileHover={hover ? {
        y: -4,
        boxShadow: "0 0 30px rgba(212,160,23,0.35)",
        borderColor: "rgba(212,160,23,0.5)"
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
