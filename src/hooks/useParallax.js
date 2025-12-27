import { useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export function useParallax({ speed = 0.5, direction = 'up' } = {}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const factor = direction === 'up' ? -1 : 1;
  const y = useTransform(scrollYProgress, [0, 1], [0, 200 * speed * factor]);

  return { ref, y };
}

