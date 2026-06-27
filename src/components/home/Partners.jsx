import { useTranslation } from 'react-i18next';
import { useHomeContent } from '@/hooks/useHomeContent';
import { ScrollReveal } from '@/components/common/ScrollReveal';
import { Skeleton } from '@/components/common/Skeleton';
import { Lightbulb } from 'lucide-react';

import monshaat from '@/assets/partners/monshaat.png';
import vision2030 from '@/assets/partners/vision2030.png';
import saudimade from '@/assets/partners/saudimade.png';

const STATIC_PARTNERS = [
  { displayName: 'Monshaat', logo: monshaat, key: 'trust.monshaat' },
  { displayName: 'Vision 2030', logo: vision2030, key: 'trust.vision2030' },
  { displayName: 'Saudi Made', logo: saudimade, key: 'trust.saudi_made' },
  { displayName: 'Fikra', logo: null, icon: Lightbulb, key: 'trust.fikra' }
];

export function Partners() {
  const { t, i18n } = useTranslation();
  const { partners, isLoading } = useHomeContent(i18n.language);

  // Use dynamic data if available, otherwise fallback
  const activeContent = (partners && partners.length > 0) ? partners : STATIC_PARTNERS;

  if (isLoading) {
    return (
      <section className="py-16 border-y border-white/5 bg-background">
        <div className="max-w-6xl mx-auto px-4 space-y-12">
          <div className="flex justify-center">
            <Skeleton width={200} height={20} />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
             {[...Array(4)].map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-4 p-6 rounded-xl border border-white/5 bg-white/5">
                   <Skeleton width={64} height={64} rounded="full" />
                   <Skeleton width={80} height={16} />
                </div>
             ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 border-y border-white/5 bg-background">
      <div className="max-w-7xl mx-auto px-4 space-y-12">
        <ScrollReveal>
          <p className="text-center text-sm uppercase tracking-[0.4em] text-gold/60 font-medium">
            {t('trust.title')}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 justify-items-center items-center">
          {activeContent.map((partner, index) => {
            const displayName = partner.displayName || (partner.key ? t(partner.key) : partner.name);
            const logoSrc = partner.logoUrl || partner.logo;
            const Icon = partner.icon;

            return (
              <ScrollReveal key={`${index}-${displayName}`} delay={index * 0.1} className="w-full">
                <div className="group flex flex-col items-center gap-4 p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-gold/30 transition-all duration-500 w-full hover:-translate-y-1">
                  <div className="h-20 w-auto flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-500 opacity-60 group-hover:opacity-100">
                    {logoSrc ? (
                      <img
                        src={logoSrc}
                        alt={displayName}
                        width="150"
                        height="50"
                        className="h-full w-full object-contain max-h-12"
                      />
                    ) : Icon ? (
                        <Icon className="w-12 h-12 text-white group-hover:text-gold transition-colors" />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-white/20 font-bold text-xl">
                        {displayName.charAt(0)}
                      </div>
                    )}
                  </div>
                  <span className="text-sm font-medium text-white/40 group-hover:text-gold/80 transition-colors uppercase tracking-widest text-center">
                    {displayName}
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
