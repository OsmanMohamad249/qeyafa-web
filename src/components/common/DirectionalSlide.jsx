import { motion } from 'framer-motion';
import { useDirectionalAnimation } from '@/hooks/useDirectionalAnimation';

export function DirectionalSlide({
  children,
  delay = 0,
  className = ''
}) {
  const { getDirectionalVariants } = useDirectionalAnimation();
  const variants = getDirectionalVariants(60);

  return (
    <motion.div
      className={className}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      {children}
    </motion.div>
  );
}

