import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import logo from '@/assets/logo.png';

const SplashScreen = ({ onComplete }) => {
  const { t } = useTranslation();

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-qeyafa-black flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.8, delay: 3, ease: "easeInOut" }}
      onAnimationComplete={onComplete}
    >
      <div className="relative flex flex-col items-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative"
        >
          {/* Glow effect behind logo */}
          <div className="absolute inset-0 bg-qeyafa-gold/20 blur-3xl rounded-full" />
          <img
            src={logo}
            alt="Qeyafa"
            className="relative w-48 h-48 md:w-64 md:h-64 object-contain mix-blend-screen"
          />
        </motion.div>

        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 200, opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="h-0.5 bg-gradient-to-r from-transparent via-qeyafa-gold to-transparent mt-8 mb-4"
        />

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="text-3xl font-bold text-white tracking-[0.5em] uppercase font-display"
        >
          {t('splash.title')}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="text-qeyafa-gold/60 text-sm tracking-widest mt-2"
        >
          {t('splash.subtitle')}
        </motion.p>
      </div>
    </motion.div>
  );
};

export default SplashScreen;
