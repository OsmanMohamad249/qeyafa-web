import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useDirectionalAnimation } from '@/hooks/useDirectionalAnimation';

export function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  className = ''
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { isRTL } = useDirectionalAnimation();

  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { y: 60, x: 0 };
      case 'down': return { y: -60, x: 0 };
      case 'left': return { y: 0, x: isRTL ? -60 : 60 };
      case 'right': return { y: 0, x: isRTL ? 60 : -60 };
      default: return { y: 60, x: 0 };
    }
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{
        opacity: 0,
        ...getInitialPosition()
      }}
      animate={isInView ? {
        opacity: 1,
        y: 0,
        x: 0
      } : undefined}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      {children}
    </motion.div>
  );
}

