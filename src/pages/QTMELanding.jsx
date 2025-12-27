import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Code, Globe, TrendingUp, Cpu, Users, Zap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GlassCard } from '@/components/common/GlassCard';
import { ScrollReveal } from '@/components/common/ScrollReveal';

const QTMELanding = () => {
  const { t } = useTranslation();

  const roles = [
    {
      key: 'cto',
      icon: Cpu,
      color: 'text-blue-400'
    },
    {
      key: 'coo',
      icon: Globe,
      color: 'text-qeyafa-gold'
    },
    {
      key: 'cmo',
      icon: TrendingUp,
      color: 'text-green-400'
    }
  ];

  const culture = [
    {
      key: 'innovation',
      icon: Code,
      color: 'text-purple-400'
    },
    {
      key: 'ownership',
      icon: Users,
      color: 'text-qeyafa-gold'
    },
    {
      key: 'impact',
      icon: Zap,
      color: 'text-blue-400'
    }
  ];

  return (
    <div className="min-h-screen bg-qeyafa-black bg-grid-pattern selection:bg-qeyafa-gold/30">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
           <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-qeyafa-primary/20 rounded-full blur-3xl animate-pulse"></div>
           <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-qeyafa-gold/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8">
              <span className="text-xs font-medium tracking-widest uppercase text-qeyafa-gold">
                QTME Ecosystem
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-display">
              {t('qtme.hero.title')}
            </h1>
            <p className="text-xl text-white/60 max-w-3xl mx-auto leading-relaxed mb-10">
              {t('qtme.hero.subtitle')}
            </p>
            <Link to="/apply" className="btn-luxury group inline-flex items-center">
              <span>{t('qtme.hero.cta')}</span>
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Strategic Hiring */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">
                {t('qtme.roles.title')}
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {roles.map((item, index) => (
              <ScrollReveal key={item.key} delay={index * 0.1}>
                <GlassCard className="h-full text-center hover:border-qeyafa-gold/50 transition-colors duration-300 p-8">
                  <div className={`w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 mx-auto ${item.color}`}>
                    <item.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {t(`qtme.roles.${item.key}.title`)}
                  </h3>
                  <p className="text-white/70 leading-relaxed">
                    {t(`qtme.roles.${item.key}.desc`)}
                  </p>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Culture & DNA */}
      <section className="py-20 px-4 pb-32 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">
                {t('qtme.culture.title')}
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {culture.map((item, index) => (
              <ScrollReveal key={item.key} delay={index * 0.1}>
                <div className="flex flex-col items-center text-center">
                  <div className={`w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-4 ${item.color}`}>
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {t(`qtme.culture.${item.key}.title`)}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {t(`qtme.culture.${item.key}.desc`)}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default QTMELanding;

