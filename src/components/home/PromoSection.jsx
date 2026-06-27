import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ScrollReveal } from '@/components/common/ScrollReveal';
import { MagneticButton } from '@/components/common/MagneticButton';
import { useHomeContent } from '@/hooks/useHomeContent';
import { Skeleton } from '@/components/common/Skeleton';

const videoSrc = null; // Removed external video that returns 403

// Static fallback mimicking the dynamic structure
const STATIC_SLIDES = [{
  title: 'hero.title',
  subtitle: 'hero.description',
  videoUrl: videoSrc,
  ctaLink: '/about',
  isStatic: true
}];

export function PromoSection() {
  const { t, i18n } = useTranslation();
  const { promoSlides, isLoading } = useHomeContent(i18n.language);

  const activeContent = (promoSlides && promoSlides.length > 0) ? promoSlides : STATIC_SLIDES;
  const slide = activeContent[0]; // For MVP, we just show the first active slide or static fallback

  if (isLoading) {
    return (
      <section className="px-4 pb-16">
        <div className="max-w-6xl mx-auto">
           <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#0b1411]/80 h-[420px] md:h-[520px]">
              <Skeleton width="100%" height="100%" className="opacity-10" />
              <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between">
                 <div className="space-y-4">
                    <Skeleton width={100} height={20} />
                    <Skeleton width="60%" height={60} />
                    <Skeleton width="40%" height={30} />
                 </div>
                 <div className="flex gap-4">
                    <Skeleton width={200} height={50} rounded="lg" />
                 </div>
              </div>
           </div>
        </div>
      </section>
    );
  }

  // Helper to get title strings whether they are keys or direct text
  const titleText = slide.isStatic ? t('hero.title_line1') : slide.title;
  const highlightText = slide.isStatic ? t('hero.title_line2') : '';
  const subtitleText = slide.isStatic ? t('hero.description') : slide.subtitle;
  const ctaText = t('hero.learnMore');

  return (
    <section className="px-4 pb-16">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#0b1411]/80 backdrop-blur-2xl shadow-[0_40px_80px_rgba(0,0,0,0.45)] h-[420px] md:h-[520px]">
            {slide.videoUrl ? (
               <video
                 className="w-full h-full object-cover opacity-70"
                 autoPlay
                 muted
                 loop
                 playsInline
                 src={slide.videoUrl}
               >
                 <track kind="captions" />
               </video>
            ) : (
               <div className="w-full h-full bg-gradient-to-br from-[#0b1411] via-[#115E59]/30 to-[#C5A065]/20" aria-hidden="true" />
            )}

            <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-transparent to-qeyafa-primary/40" />

            <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-12">
              <div>
                <p className="text-sm uppercase tracking-[0.4em] text-qeyafa-gold mb-4">
                  {t('hero.badge')}
                </p>
                <h2 className="text-3xl md:text-5xl font-bold max-w-3xl leading-tight">
                  {titleText} {highlightText}
                </h2>
                <p className="text-white/70 mt-6 max-w-2xl">
                  {subtitleText}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
                <Link to={slide.ctaLink || '/about'}>
                  <MagneticButton size="lg" className="min-w-[200px]">
                    {ctaText}
                  </MagneticButton>
                </Link>
                <span className="text-white/60 text-sm font-mono tracking-[0.4em]">
                  4K · AI POWERED · IMMERSIVE
                </span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
