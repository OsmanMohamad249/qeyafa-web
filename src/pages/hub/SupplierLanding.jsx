import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Boxes, Recycle, Factory } from 'lucide-react';
import { GlassCard } from '@/components/common/GlassCard';
import { ScrollReveal } from '@/components/common/ScrollReveal';
import { SEO } from '@/components/seo/SEO';

const SupplierLanding = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const features = [
    { key: 'direct', icon: ShoppingBag, color: 'text-blue-400' },
    { key: 'inventory', icon: Boxes, color: 'text-qeyafa-gold' },
    { key: 'waste', icon: Recycle, color: 'text-green-400' },
  ];

  return (
    <div className="min-h-screen bg-qeyafa-black bg-grid-pattern selection:bg-qeyafa-gold/30">
      <SEO
        titleKey="seo.suppliers.title"
        descriptionKey="seo.suppliers.description"
        path="/hub/suppliers"
      />

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-qeyafa-primary/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-qeyafa-gold/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8">
              <Factory className="w-4 h-4 text-qeyafa-gold" />
              <span className="text-xs font-medium tracking-widest uppercase text-qeyafa-gold">
                {t('nav.hub_suppliers')}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              {t('supplier_landing.hero.title')}
            </h1>
            <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed mb-10">
              {t('supplier_landing.hero.subtitle')}
            </p>
            <Link
              to="/hub/register"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-qeyafa-gold text-qeyafa-black font-bold hover:bg-white transition-colors group"
            >
              <span>{t('supplier_landing.hero.cta')}</span>
              <ArrowRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180' : ''}`} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((item, index) => (
              <ScrollReveal key={item.key} delay={index * 0.1}>
                <GlassCard className="h-full text-center p-8 hover:border-qeyafa-gold/50 transition-colors duration-300">
                  <div className={`w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 mx-auto ${item.color}`}>
                    <item.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {t(`supplier_landing.features.${item.key}.title`)}
                  </h3>
                  <p className="text-white/60 leading-relaxed">
                    {t(`supplier_landing.features.${item.key}.desc`)}
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

export default SupplierLanding;
