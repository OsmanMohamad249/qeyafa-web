import { useTranslation } from 'react-i18next';
import { motion, useSpring, useTransform, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Sparkles, Zap,
  Scan, Recycle, Users,
  Smartphone, Briefcase, Scissors, Factory
} from 'lucide-react';
import { GlassCard } from '@/components/common/GlassCard';

const Counter = ({ value, suffix = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const spring = useSpring(0, { duration: 2000 });
  const display = useTransform(spring, (current) => Math.round(current).toLocaleString() + suffix);

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, value, spring]);

  return <motion.span ref={ref}>{display}</motion.span>;
};

const HubLanding = () => {
  const { t } = useTranslation();

  const impactStats = [
    { label: t('home.impact.clients'), value: 10000, suffix: '+' },
    { label: t('home.impact.scans'), value: 50000, suffix: '+' },
    { label: t('home.impact.partners'), value: 20, suffix: '+' },
    { label: t('home.impact.fabric'), value: 15000, suffix: 'm' },
  ];

  const ecosystem = [
    {
      key: 'customer',
      icon: Smartphone,
      color: 'text-blue-400',
      bg: 'bg-blue-400/10',
      link: '/hub/customer'
    },
    {
      key: 'business',
      icon: Briefcase,
      color: 'text-purple-400',
      bg: 'bg-purple-400/10',
      link: '/services/b2b'
    },
    {
      key: 'tailor',
      icon: Scissors,
      color: 'text-qeyafa-gold',
      bg: 'bg-qeyafa-gold/10',
      link: '/hub/partners'
    },
    {
      key: 'supplier',
      icon: Factory,
      color: 'text-green-400',
      bg: 'bg-green-400/10',
      link: '/hub/suppliers'
    }
  ];

  const pillars = [
    {
      key: 'precision',
      icon: Scan,
      color: 'text-blue-400'
    },
    {
      key: 'sustainability',
      icon: Recycle,
      color: 'text-green-400'
    },
    {
      key: 'empowerment',
      icon: Users,
      color: 'text-qeyafa-gold'
    },
    {
      key: 'efficiency',
      icon: Zap,
      color: 'text-purple-400'
    }
  ];

  return (
    <div className="min-h-screen bg-qeyafa-black bg-grid-pattern selection:bg-qeyafa-gold/30">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
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
              The Digital Fashion Ecosystem
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold font-display mb-8 leading-tight text-white max-w-5xl"
          >
            {t('home.hero.title')}
          </motion.h1>

          {/* Subtitle */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl sm:text-2xl md:text-3xl text-white/60 font-light mb-12 max-w-3xl"
          >
            {t('home.hero.subtitle')}
          </motion.h2>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col md:flex-row gap-6 w-full md:w-auto justify-center mb-20"
          >
            <Link to="/book" className="btn-luxury group">
              <span>{t('home.hero.cta')}</span>
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/about" className="btn-outline border-white/20 hover:bg-white/5">
              {t('home.hero.learnMore')}
            </Link>
          </motion.div>

          {/* Visual Placeholder (Video/GIF) */}
          <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.8, delay: 0.5 }}
             className="w-full max-w-4xl aspect-video rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden relative group"
          >
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="text-center">
                 <Scan className="w-16 h-16 text-white/20 mx-auto mb-4" />
                 <p className="text-white/40 font-mono text-sm">AI SCANNING PROCESS VISUALIZATION</p>
               </div>
            </div>
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-qeyafa-black via-transparent to-transparent opacity-60"></div>
          </motion.div>
        </div>
      </section>

      {/* Live Impact Counters */}
      <section className="py-12 border-y border-white/5 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {impactStats.map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="text-3xl md:text-5xl font-bold text-white font-display">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-qeyafa-gold uppercase tracking-wider font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ecosystem Showcase */}
      <section className="py-24 container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-display">
            {t('home.ecosystem.title')}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ecosystem.map((item, index) => (
            <Link key={item.key} to={item.link}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="h-full p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group"
              >
                <div className={`w-14 h-14 rounded-xl ${item.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className={`w-7 h-7 ${item.color}`} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {t(`home.ecosystem.${item.key}.title`)}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {t(`home.ecosystem.${item.key}.desc`)}
                </p>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* Strategic Pillars */}
      <section className="py-24 bg-qeyafa-black relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-50"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-display">
              {t('about.values.title')}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pillars.map((item, index) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="h-full text-center hover:border-qeyafa-gold/50 transition-colors duration-300 p-8">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 mx-auto">
                    <item.icon className={`w-8 h-8 ${item.color}`} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 capitalize">
                    {item.key}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {t(`about.values.${item.key}`)}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HubLanding;

