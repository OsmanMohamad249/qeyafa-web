import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Zap, Shield } from 'lucide-react';

const IndividualTailoring = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: Sparkles,
      title: '95% Accuracy',
      description: 'Precise body measurements from 2D photos',
    },
    {
      icon: Zap,
      title: 'Fast Processing',
      description: 'Get results in seconds with our AI engine',
    },
    {
      icon: Shield,
      title: 'On-Device Security',
      description: 'Your data stays private and secure',
    },
  ];

  return (
    <div className="min-h-screen bg-qeyafa-black bg-grid-pattern selection:bg-qeyafa-gold/30">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-qeyafa-primary/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-qeyafa-gold/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute inset-0 radial-glow-overlay opacity-40"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 py-20 flex flex-col items-center text-center">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8 animate-float"
          >
            <Sparkles className="w-4 h-4 text-qeyafa-gold" fill="currentColor" />
            <span className="text-xs font-medium tracking-widest uppercase text-qeyafa-gold">
              AI-Powered Technology
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold font-display mb-8 leading-tight text-white"
          >
            {t('hero.title')}
          </motion.h1>

          {/* Subtitle */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl sm:text-2xl md:text-3xl text-gradient-gold font-semibold mb-6"
          >
            {t('hero.subtitle')}
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg md:text-xl text-white/60 max-w-2xl mb-12 leading-relaxed font-light mx-auto"
          >
            {t('hero.description')}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col md:flex-row gap-6 w-full md:w-auto justify-center"
          >
            <Link to="/book" className="btn-luxury group">
              <span>{t('hero.cta')}</span>
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/about" className="btn-outline border-white/20 hover:bg-white/5">
              {t('hero.learnMore')}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card-luxury group"
            >
              <div className="w-12 h-12 rounded-lg bg-qeyafa-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <feature.icon className="w-6 h-6 text-qeyafa-gold" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default IndividualTailoring;

