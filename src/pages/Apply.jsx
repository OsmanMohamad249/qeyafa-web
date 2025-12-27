import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApplicationStore } from '@/stores/applicationStore';
import { MultiStepApplicationForm } from '@/components/apply/MultiStepApplicationForm';
import { MagneticButton } from '@/components/common/MagneticButton';
import { CheckCircle, Copy, ExternalLink } from 'lucide-react';

export default function Apply() {
  const { jobId } = useParams();
  const { isSubmitted, magicLink, reset } = useApplicationStore();
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(magicLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Success screen after submission
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-qeyafa-black bg-grid-pattern flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-12 h-12 text-green-500" />
          </motion.div>

          <h1 className="text-3xl font-bold text-white mb-4">
            Application Submitted! 🎉
          </h1>

          <p className="text-white/60 mb-8">
            Thank you for applying! We'll review your application and get back
            to you soon. You can track your application status using the link below.
          </p>

          {/* Magic Link */}
          <div className="bg-white/5 rounded-xl p-4 mb-6">
            <p className="text-white/50 text-sm mb-2">Your Status Tracking Link</p>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={magicLink}
                readOnly
                className="flex-1 bg-white/10 rounded-lg px-3 py-2 text-white text-sm"
              />
              <button
                onClick={copyToClipboard}
                className="p-2 bg-qeyafa-gold/20 rounded-lg hover:bg-qeyafa-gold/30 transition-colors"
              >
                {copied ? (
                  <CheckCircle className="w-5 h-5 text-green-400" />
                ) : (
                  <Copy className="w-5 h-5 text-qeyafa-gold" />
                )}
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <MagneticButton
              onClick={() => window.open(magicLink, '_blank')}
              className="w-full"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Track Application Status
            </MagneticButton>

            <button
              onClick={reset}
              className="w-full py-3 text-white/50 hover:text-white transition-colors"
            >
              Submit Another Application
            </button>
          </div>

          <p className="text-white/40 text-sm mt-6">
            💡 Save this link! You'll need it to check your application status.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-qeyafa-black bg-grid-pattern py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-qeyafa-gold uppercase tracking-[0.3em] text-sm mb-4"
          >
            Career Opportunity
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Join Our Team
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/60 max-w-2xl mx-auto"
          >
            Complete the application form below. No account required –
            we'll send you a magic link to track your application status.
          </motion.p>
        </div>

        {/* Application Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <MultiStepApplicationForm
            jobId={jobId || 'general'}
            jobTitle="General Application"
          />
        </motion.div>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-6 text-white/40 text-sm">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              No login required
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-qeyafa-gold rounded-full" />
              Track via magic link
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full" />
              AI-powered screening
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
