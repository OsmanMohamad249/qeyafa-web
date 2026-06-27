import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Shield, Ruler, LineChart } from 'lucide-react';
import { ScrollReveal } from '@/components/common/ScrollReveal';
import { MagneticButton } from '@/components/common/MagneticButton';
import { ModernCard } from '@/components/common/ModernCard';
import { JourneyStepper } from '@/components/common/JourneyStepper';
import { PromoSection } from '@/components/home/PromoSection';
import { Partners } from '@/components/home/Partners';
import { SEO } from '@/components/seo/SEO';

const services = [
	{
		icon: Shield,
		titleKey: 'features.engine.title',
		descKey: 'features.engine.desc'
	},
	{
		icon: LineChart,
		titleKey: 'features.marketplace.title',
		descKey: 'features.marketplace.desc'
	},
	{
		icon: Ruler,
		titleKey: 'home.impact.fabric',
		descKey: 'hero.description'
	}
];

export default function Home() {
	const { t, i18n } = useTranslation();
	const isRTL = i18n.language === 'ar';
	const containerRef = useRef(null);
	const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });
	const heroParallax = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

	const organizationJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: 'Qeyafa',
		url: 'https://qeyafa.com',
		logo: 'https://qeyafa.com/logo.png',
		description: 'AI-Powered Custom Tailoring Technology. Transform your fashion experience with 95% accurate 3D body measurements from 2D photos.',
		sameAs: [],
		contactPoint: {
			'@type': 'ContactPoint',
			contactType: 'customer service',
			availableLanguage: ['English', 'Arabic']
		}
	};

	return (
		<div ref={containerRef} className="min-h-screen bg-background text-text-body overflow-hidden">
			<SEO
				titleKey="seo.home.title"
				descriptionKey="seo.home.description"
				path="/"
				jsonLd={organizationJsonLd}
			/>
			{/* HERO */}
			<section className="relative min-h-[90vh] flex items-center justify-center pt-24 px-4">
				<motion.div
					style={{ y: heroParallax }}
					className="absolute inset-0 pointer-events-none"
				>
					<div className="absolute inset-0 bg-grid-pattern opacity-10" />
					<div className="absolute top-1/3 left-1/4 w-[420px] h-[420px] bg-gold/15 blur-[120px] rounded-full" />
					<div className="absolute bottom-1/4 right-1/4 w-[360px] h-[360px] bg-deep-teal/10 blur-[100px] rounded-full" />
				</motion.div>

				<div className="relative z-10 max-w-6xl mx-auto w-full text-center space-y-8">
					<ScrollReveal>
						<span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl text-[11px] uppercase tracking-[0.4em] text-gold font-medium">
							<Sparkles className="w-4 h-4" />
							{t('hero.badge')}
						</span>
					</ScrollReveal>

					<ScrollReveal delay={0.1}>
						<div className="max-w-5xl mx-auto">
							<h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.2] tracking-tight">
								<span className="block text-[#C5A065] mb-1">{t('hero.title_line1')}</span>
								<span className="block text-[#115E59] mb-1">{t('hero.title_line2')}</span>
								<span className="block text-[#C5A065]">{t('hero.title_line3')}</span>
							</h1>
						</div>
					</ScrollReveal>

					<ScrollReveal delay={0.2}>
						<p className="text-base md:text-lg text-text-body/60 max-w-3xl mx-auto leading-relaxed">
							{t('hero.description')}
						</p>
					</ScrollReveal>

					<ScrollReveal delay={0.3}>
						<div className="flex flex-col sm:flex-row items-center justify-center gap-4">
							<Link to="/book">
								<MagneticButton size="lg" className="min-w-[220px] bg-[#115E59] text-white hover:bg-deep-teal/90 border-none">
									{t('hero.cta')}
								</MagneticButton>
							</Link>
							<Link to="/about" className="px-8 py-4 rounded-xl border border-gold/30 text-gold hover:text-black hover:bg-gold transition-all flex items-center gap-3 group">
								<span>{t('hero.learnMore')}</span>
								<ArrowRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180' : ''}`} />
							</Link>
						</div>
					</ScrollReveal>
				</div>
			</section>

			{/* PROMO SECTION - RESTORED */}
			<PromoSection />

			{/* PARTNERS SECTION - RESTORED */}
			<Partners />

			{/* SERVICES */}
			<section className="py-24 px-4">
				<div className="max-w-6xl mx-auto space-y-16">
					<ScrollReveal>
						<div className="flex flex-col gap-4 text-center">
							<p className="text-sm uppercase tracking-[0.4em] text-gold">{t('ecosystem.badge')}</p>
							<h2 className="text-3xl md:text-5xl font-bold">{t('ecosystem.title')}</h2>
							<p className="text-text-body/60 max-w-3xl mx-auto">{t('ecosystem.desc')}</p>
						</div>
					</ScrollReveal>

					<div className="grid md:grid-cols-3 gap-8">
						{services.map((service, index) => (
							<ScrollReveal key={service.titleKey} delay={index * 0.1}>
								<ModernCard>
									<service.icon className="w-10 h-10 text-gold mb-6" />
									<h3 className="text-2xl font-semibold mb-3">{t(service.titleKey)}</h3>
									<p className="text-text-body/60 leading-relaxed">{t(service.descKey)}</p>
								</ModernCard>
							</ScrollReveal>
						))}
					</div>
				</div>
			</section>

			{/* JOURNEY */}
			<section className="py-24 px-4 bg-[#070f0d] border-y border-white/5">
				<div className="max-w-6xl mx-auto space-y-12">
					<ScrollReveal>
						<div className="text-center space-y-4">
							<p className="text-sm uppercase tracking-[0.4em] text-gold">{t('journey.title')}</p>
							<h2 className="text-3xl md:text-5xl font-bold">{t('journey.subtitle')}</h2>
						</div>
					</ScrollReveal>
					<JourneyStepper />
				</div>
			</section>

			{/* CTA */}
			<section className="py-24 px-4">
				<div className="max-w-5xl mx-auto">
					<ScrollReveal>
						<div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#101615]/70 px-8 py-16 text-center backdrop-blur-2xl">
							<div className="absolute inset-0 bg-gradient-to-br from-gold/20 via-transparent to-deep-teal/5" />
							<div className="relative z-10 space-y-6">
								<p className="text-sm uppercase tracking-[0.4em] text-gold">{t('cta_section.title')}</p>
								<h2 className="text-4xl font-bold">{t('cta_section.desc')}</h2>
								<Link to="/book">
									<MagneticButton size="lg" className="min-w-[220px] bg-deep-teal text-white">
										{t('cta_section.button')}
									</MagneticButton>
								</Link>
							</div>
						</div>
					</ScrollReveal>
				</div>
			</section>
		</div>
	);
}
