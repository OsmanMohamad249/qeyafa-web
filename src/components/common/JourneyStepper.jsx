import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import { useHomeContent } from '@/hooks/useHomeContent';
import { Skeleton } from '@/components/common/Skeleton';

const STATIC_STEPS = ['journey.step1', 'journey.step2', 'journey.step3'];

export function JourneyStepper({ className = '' }) {
  const { t, i18n } = useTranslation();
  const { journeySteps, isLoading } = useHomeContent(i18n.language);
  const [activeStep, setActiveStep] = useState(0);

  const activeContent = (journeySteps && journeySteps.length > 0) ? journeySteps : STATIC_STEPS;
  const isStatic = activeContent === STATIC_STEPS;

  // Helper to safely get step data whether static or dynamic
  const getStepData = (step) => {
    if (isStatic) {
      return {
        title: t(`${step}.title`),
        desc: t(`${step}.desc`)
      };
    }
    return step;
  };

  const currentStepData = getStepData(activeContent[activeStep], activeStep);

  if (isLoading) {
    return (
      <div className={`w-full ${className} opacity-50`}>
         <div className="flex flex-col lg:flex-row gap-10">
            <div className="flex-1 space-y-6">
               {[1,2,3].map(i => (
                  <div key={i} className="flex gap-4">
                     <Skeleton width={48} height={48} rounded="full" />
                     <div className="space-y-2 flex-1">
                        <Skeleton width={100} height={20} />
                        <Skeleton width="80%" height={16} />
                     </div>
                  </div>
               ))}
            </div>
            <div className="flex-1">
               <Skeleton width="100%" height={300} rounded="xl" />
            </div>
         </div>
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1">
          <div className="flex lg:flex-col gap-6">
            {activeContent.map((step, index) => {
              const isActive = index === activeStep;
              const { title, desc } = getStepData(step, index);

              return (
                <button
                  key={step}
                  type="button"
                  onClick={() => setActiveStep(index)}
                  className={`group flex items-center gap-4 text-left transition-all duration-300 ${isActive ? 'text-white' : 'text-white/50'}`}
                >
                  <div className="relative flex items-center">
                    <span className={`w-12 h-12 rounded-full flex items-center justify-center border text-lg font-semibold transition-all duration-300 ${isActive ? 'bg-qeyafa-gold text-qeyafa-black border-qeyafa-gold shadow-[0_0_25px_rgba(212,160,23,0.4)]' : 'border-white/20 text-white/70 bg-white/5'}`}>
                      {(index + 1).toString().padStart(2, '0')}
                    </span>
                    {index < activeContent.length - 1 && (
                      <span className="hidden lg:block w-1 h-16 mx-auto bg-gradient-to-b from-white/10 to-transparent" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-white/40">{t('journey.title')}</p>
                    <p className="text-lg font-semibold">{title}</p>
                    <p className="text-white/50 text-sm mt-1">{desc}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex-1">
          <div className="bg-[#101615]/70 border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.35)]">
            <p className="text-qeyafa-gold text-sm uppercase tracking-[0.35em] mb-4">
              {t('journey.subtitle')}
            </p>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="space-y-4"
              >
                <h3 className="text-3xl font-bold">
                  {currentStepData.title}
                </h3>
                <p className="text-white/60 text-lg leading-relaxed">
                  {currentStepData.desc || currentStepData.description}
                </p>
                <div className="flex items-center gap-3 text-sm text-white/40">
                  {activeContent.map((_, idx) => (
                    <span
                      key={idx}
                      className={`h-1 flex-1 rounded-full transition ${idx <= activeStep ? 'bg-qeyafa-gold' : 'bg-white/10'}`}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
