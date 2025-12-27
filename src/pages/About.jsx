import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Scan, Recycle, Users, Zap } from 'lucide-react';
import { GlassCard } from '@/components/common/GlassCard';
import { ScrollReveal } from '@/components/common/ScrollReveal';

const About = () => {
  const { t } = useTranslation();

  const values = [
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
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-display">
              {t('about.hero.title')}
            </h1>
            <p className="text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
              {t('about.hero.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="relative p-8 md:p-12 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-qeyafa-primary/10 to-transparent pointer-events-none"></div>
              <div className="relative z-10 text-center">
                <h2 className="text-3xl font-bold text-white mb-6">
                  {t('about.intro.title')}
                </h2>
                <p className="text-lg text-white/80 leading-relaxed">
                  {t('about.intro.desc')}
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <ScrollReveal>
              <GlassCard className="h-full flex flex-col justify-center text-center p-8 md:p-12 border-qeyafa-gold/20">
                <h3 className="text-2xl font-bold text-qeyafa-gold mb-4">
                  {t('about.vision.title')}
                </h3>
                <p className="text-white/70 leading-relaxed">
                  {t('about.vision.desc')}
                </p>
              </GlassCard>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <GlassCard className="h-full flex flex-col justify-center text-center p-8 md:p-12 border-qeyafa-primary/30">
                <h3 className="text-2xl font-bold text-white mb-4">
                  {t('about.mission.title')}
                </h3>
                <p className="text-white/70 leading-relaxed">
                  {t('about.mission.desc')}
                </p>
              </GlassCard>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 pb-32">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">
                {t('about.values.title')}
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((item, index) => (
              <ScrollReveal key={item.key} delay={index * 0.1}>
                <GlassCard className="h-full text-center hover:border-qeyafa-gold/50 transition-colors duration-300">
                  <div className={`w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 mx-auto ${item.color}`}>
                    <item.icon className="w-8 h-8" />
                  </div>
                  <p className="text-white/80 font-medium leading-relaxed">
                    {t(`about.values.${item.key}`)}
                  </p>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

