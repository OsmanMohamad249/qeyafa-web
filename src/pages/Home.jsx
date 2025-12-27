import { useTranslation } from 'react-i18next';
import { useScroll } from 'framer-motion';
import { useRef } from 'react';
import {
  Sparkles, Smartphone,
  ScanLine, Layers, ChevronRight, Star
} from 'lucide-react';
import { MagneticButton } from '@/components/common/MagneticButton';
import { GlassCard } from '@/components/common/GlassCard';
import { ScrollReveal } from '@/components/common/ScrollReveal';
import NewsTicker from '@/components/common/NewsTicker';
import { Link } from 'react-router-dom';

const Home = () => {
  const { t, i18n } = useTranslation();
  const containerRef = useRef(null);
  useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const isRTL = i18n.language === 'ar';

  return (
    <div ref={containerRef} className="min-h-screen bg-qeyafa-black overflow-hidden selection:bg-qeyafa-gold/30">

      {/* --- HERO SECTION: World-Class Impact --- */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-48 overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-qeyafa-primary/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-qeyafa-gold/10 rounded-full blur-[100px] animate-float delay-1000" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 hover:border-qeyafa-gold/50 transition-colors cursor-default">
              <Star className="w-4 h-4 text-qeyafa-gold fill-qeyafa-gold" />
              <span className="text-sm font-bold text-qeyafa-gold tracking-widest uppercase">
                {t('hero.badge')}
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-6">
              {t('hero.title')} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2E5C55] via-[#4A7A6F] to-[#D4A017]">
                {t('hero.title_highlight')}
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-lg md:text-xl text-[#8899A6] max-w-3xl mx-auto mb-10 leading-relaxed font-light">
              {t('hero.description')}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/book">
                <button className="px-8 py-4 rounded-lg bg-[#1a4d43] text-white hover:bg-[#143d35] transition-all flex items-center gap-2 font-medium min-w-[200px] justify-center">
                  {t('hero.cta')} <ChevronRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                </button>
              </Link>
              <Link to="/how-it-works">
                <button className="px-8 py-4 rounded-lg border border-white/20 text-white hover:bg-white/5 transition-all flex items-center gap-2 group min-w-[200px] justify-center font-medium">
                  <span>{t('hero.how_it_works')}</span>
                </button>
              </Link>
            </div>

            {/* News Ticker */}
            <NewsTicker news={t('hero.news', { returnObjects: true })} />
          </ScrollReveal>
        </div>
      </section>

      {/* --- TRUST SIGNALS: Corporate Authority --- */}
      <section className="py-10 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-white/30 text-sm uppercase tracking-widest mb-8 font-medium">
            {t('trust.title')}
          </p>
          <div className="flex flex-wrap justify-center gap-12 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Placeholders for logos - Replace with SVGs */}
            {['monshaat', 'vision2030', 'saudi_made', 'fikra'].map((brandKey) => (
              <span key={brandKey} className="text-xl font-bold text-white/60 hover:text-white transition-colors cursor-default">
                {t(`trust.${brandKey}`)}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* --- STATS: The "Number One" Proof --- */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { label: t('stats.accuracy'), value: "99%", icon: ScanLine },
              { label: t('stats.clients'), value: "10k+", icon: UsersIcon },
              { label: t('stats.processing'), value: "< 2m", icon: ClockIcon },
            ].map((stat, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <GlassCard className="text-center py-12 hover:border-qeyafa-gold/30 transition-colors group">
                  <div className="w-16 h-16 mx-auto bg-qeyafa-gold/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-qeyafa-gold/20 transition-colors">
                    <stat.icon className="w-8 h-8 text-qeyafa-gold" />
                  </div>
                  <h3 className="text-5xl font-bold text-white mb-2 font-display">{stat.value}</h3>
                  <p className="text-white/50">{stat.label}</p>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* --- VALUE PROPOSITION: The "Gasable" Ecosystem Vibe --- */}
      <section className="py-32 bg-luxury-gradient relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-qeyafa-primary/10 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            <ScrollReveal direction={isRTL ? 'left' : 'right'}>
              <div>
                <h2 className="text-qeyafa-gold text-lg font-medium mb-4 uppercase tracking-wider">
                  {t('ecosystem.badge')}
                </h2>
                <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  {t('ecosystem.title')}
                </h3>
                <p className="text-white/60 text-lg mb-8 leading-relaxed">
                  {t('ecosystem.desc')}
                </p>

                <ul className="space-y-6">
                  {[
                    { title: t('ecosystem.zero_waste.title'), desc: t('ecosystem.zero_waste.desc') },
                    { title: t('ecosystem.localization.title'), desc: t('ecosystem.localization.desc') },
                    { title: t('ecosystem.guarantee.title'), desc: t('ecosystem.guarantee.desc') },
                  ].map((item, i) => (
                    <li key={i} className="flex gap-4">
                      <div className="mt-1 min-w-[24px]">
                        <CheckCircleIcon className="w-6 h-6 text-qeyafa-gold" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold text-lg">{item.title}</h4>
                        <p className="text-white/50">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal direction={isRTL ? 'right' : 'left'} delay={0.2}>
              <div className="relative">
                {/* Abstract visualization of the app/phone */}
                <div className="relative z-10 bg-gradient-to-br from-white/10 to-transparent border border-white/10 rounded-3xl p-8 backdrop-blur-xl aspect-square flex items-center justify-center">
                  <div className="absolute inset-0 bg-grid-pattern opacity-20 rounded-3xl" />
                  <div className="text-center">
                    <ScanLine className="w-32 h-32 text-qeyafa-gold mx-auto mb-6 animate-pulse" />
                    <p className="text-white/40 font-mono text-sm">{t('ecosystem.engine')}</p>
                    <div className="mt-4 flex justify-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
                      <span className="text-green-400 text-xs">{t('ecosystem.system_active')}</span>
                    </div>
                  </div>
                </div>
                {/* Back glow */}
                <div className="absolute -inset-4 bg-qeyafa-gold/20 blur-3xl -z-10 rounded-full opacity-50" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* --- HOW IT WORKS: Simplicity --- */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t('journey.title')}
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              {t('journey.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-transparent via-qeyafa-gold/30 to-transparent" />

            {[
              { step: "01", title: t('journey.step1.title'), desc: t('journey.step1.desc'), icon: Smartphone },
              { step: "02", title: t('journey.step2.title'), desc: t('journey.step2.desc'), icon: Layers },
              { step: "03", title: t('journey.step3.title'), desc: t('journey.step3.desc'), icon: Star },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.2}>
                <div className="relative text-center group">
                  <div className="w-24 h-24 mx-auto bg-qeyafa-black border-2 border-white/10 rounded-full flex items-center justify-center mb-6 z-10 relative group-hover:border-qeyafa-gold transition-colors duration-500">
                    <item.icon className="w-10 h-10 text-white/80 group-hover:text-qeyafa-gold transition-colors" />
                    <div className="absolute -top-3 bg-qeyafa-black px-2 text-qeyafa-gold font-mono text-xs border border-white/10 rounded-full">
                      {item.step}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-white/50 leading-relaxed px-4">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA: Final Conversion --- */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <GlassCard variant="gold" hover={false} className="relative overflow-hidden text-center py-16 px-8">
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                {t('cta_section.title')}
              </h2>
              <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto">
                {t('cta_section.desc')}
              </p>
              <Link to="/book">
                <MagneticButton size="lg" className="min-w-[240px] text-lg">
                  {t('cta_section.button')}
                </MagneticButton>
              </Link>
            </div>

            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-qeyafa-gold/10 blur-[100px] -z-0 rounded-full pointer-events-none" />
          </GlassCard>
        </div>
      </section>
    </div>
  );
};

// Icons needed for this page
function UsersIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
  )
}

function ClockIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
  )
}

function CheckCircleIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
  )
}

export default Home;

