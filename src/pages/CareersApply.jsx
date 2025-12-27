import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { CheckCircle, Copy, ExternalLink } from 'lucide-react';
import { GlassCard } from '@/components/common/GlassCard';
import { MultiStepApplicationForm } from '@/components/apply/MultiStepApplicationForm';
import { MagneticButton } from '@/components/common/MagneticButton';

const CareersApply = () => {
  const { t } = useTranslation();
  const [submittedData, setSubmittedData] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleSuccess = (trackingToken, magicLink) => {
    setSubmittedData({ trackingToken, magicLink });
  };

  const copyToClipboard = () => {
    if (submittedData?.magicLink) {
      navigator.clipboard.writeText(submittedData.magicLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (submittedData) {
    return (
      <div className="min-h-screen bg-qeyafa-black bg-grid-pattern flex items-center justify-center px-4">
        <GlassCard className="max-w-2xl w-full text-center p-10 border-qeyafa-gold/40">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 rounded-full bg-green-500/15 flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-10 h-10 text-green-400" />
          </motion.div>

          <h1 className="text-3xl font-bold text-white mb-4">{t('careers_apply.success.title')}</h1>
          <p className="text-white/60 mb-8">
            {t('careers_apply.success.desc')}
          </p>

          <div className="bg-white/5 rounded-xl p-4 border border-white/10 mb-8">
            <p className="text-xs text-white/40 uppercase tracking-wider mb-2">{t('careers_apply.success.magic_link')}</p>
            <div className="flex items-center gap-3">
              <code className="flex-1 bg-black/30 rounded px-3 py-2 text-qeyafa-gold font-mono text-sm truncate">
                {submittedData.magicLink}
              </code>
              <button
                onClick={copyToClipboard}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/60 hover:text-white"
                title="Copy to clipboard"
              >
                {copied ? <CheckCircle className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
              </button>
              <a
                href={submittedData.magicLink}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/60 hover:text-white"
                title="Open link"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </div>

          <p className="text-white/40 text-sm">
            {t('careers_apply.success.note')}
          </p>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-qeyafa-black bg-grid-pattern selection:bg-qeyafa-gold/30 py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-qeyafa-gold text-sm uppercase tracking-[0.3em] mb-3">{t('careers_apply.badge')}</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">{t('careers_apply.title')}</h1>
          <p className="text-white/60">{t('careers_apply.subtitle')}</p>
        </div>

        <MultiStepApplicationForm onSuccess={handleSuccess} />
      </div>
    </div>
  );
};

export default CareersApply;
