import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Zap, Shield } from 'lucide-react';
import { SEO } from '@/components/seo/SEO';

const IndividualTailoring = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const features = [
    { key: 'accuracy', icon: Sparkles },
    { key: 'fast', icon: Zap },
    { key: 'secure', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-qeyafa-black bg-grid-pattern selection:bg-qeyafa-gold/30">
      <SEO
        titleKey="seo.individual.title"
        descriptionKey="seo.individual.description"
        path="/services/individual"
      />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-24 pb-16">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-qeyafa-primary/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-qeyafa-gold/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 flex flex-col items-center text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8"
          >
            <Sparkles className="w-4 h-4 text-qeyafa-gold" fill="currentColor" />
            <span className="text-xs font-medium tracking-widest uppercase text-qeyafa-gold">
              {t('individual_landing.hero.badge')}
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-white"
          >
            {t('individual_landing.hero.title')}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-gradient-gold font-semibold mb-6"
          >
            {t('individual_landing.hero.subtitle')}
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-base md:text-lg text-white/60 max-w-2xl mb-10 leading-relaxed mx-auto"
          >
            {t('individual_landing.hero.description')}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/book"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-qeyafa-gold text-qeyafa-black font-bold hover:bg-white transition-colors group min-w-[200px]"
            >
              <span>{t('individual_landing.hero.cta')}</span>
              <ArrowRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180' : ''}`} />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl border border-white/20 text-white hover:bg-white/5 transition-colors min-w-[200px]"
            >
              {t('individual_landing.hero.learnMore')}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 pb-32">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card-luxury group text-center"
            >
              <div className="w-14 h-14 rounded-xl bg-qeyafa-primary/20 flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-500">
                <feature.icon className="w-7 h-7 text-qeyafa-gold" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">
                {t(`individual_landing.features.${feature.key}.title`)}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">
                {t(`individual_landing.features.${feature.key}.desc`)}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default IndividualTailoring;
