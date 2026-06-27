import { useTranslation } from 'react-i18next';
import { ScrollReveal } from '@/components/common/ScrollReveal';
import { Building2, Target, BadgeCheck, Lightbulb } from 'lucide-react';

const PARTNERS = [
  { key: 'trust.monshaat', icon: Building2 },
  { key: 'trust.vision2030', icon: Target },
  { key: 'trust.saudi_made', icon: BadgeCheck },
  { key: 'trust.fikra', icon: Lightbulb },
];

export function Partners() {
  const { t } = useTranslation();

  return (
    <section className="py-20 border-y border-white/5 bg-background">
      <div className="max-w-7xl mx-auto px-4 space-y-12">
        <ScrollReveal>
          <p className="text-center text-sm uppercase tracking-[0.4em] text-gold/60 font-medium">
            {t('trust.title')}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 justify-items-center items-stretch">
          {PARTNERS.map((partner, index) => {
            const Icon = partner.icon;
            const name = t(partner.key);

            return (
              <ScrollReveal key={partner.key} delay={index * 0.1} className="w-full">
                <div className="group flex flex-col items-center justify-center gap-5 p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-gold/30 transition-all duration-500 w-full h-full hover:-translate-y-1">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold/15 to-deep-teal/10 flex items-center justify-center border border-white/5 group-hover:border-gold/30 transition-all duration-500">
                    <Icon className="w-8 h-8 text-white/50 group-hover:text-gold transition-colors duration-500" />
                  </div>
                  <span className="text-sm font-medium text-white/50 group-hover:text-gold/90 transition-colors uppercase tracking-wider text-center">
                    {name}
                  </span>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
