import { useTranslation } from 'react-i18next';

export function useDirectionalAnimation() {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  // Flip X-axis animations for RTL
  const getDirectionalVariants = (distance = 50) => ({
    initial: {
      opacity: 0,
      x: isRTL ? distance : -distance  // Flip direction
    },
    animate: {
      opacity: 1,
      x: 0
    },
    exit: {
      opacity: 0,
      x: isRTL ? -distance : distance  // Flip direction
    }
  });

  const getSlideDirection = () => ({
    enter: isRTL ? 'right' : 'left',
    exit: isRTL ? 'left' : 'right'
  });

  return {
    isRTL,
    getDirectionalVariants,
    getSlideDirection
  };
}

