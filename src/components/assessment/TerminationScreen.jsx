import { motion } from 'framer-motion';
import { XCircle, AlertTriangle } from 'lucide-react';

export function TerminationScreen({ reason }) {
  return (
    <div className="min-h-screen bg-qeyafa-black flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <XCircle className="w-12 h-12 text-red-500" />
        </motion.div>

        <h1 className="text-3xl font-bold text-white mb-4">
          Assessment Terminated
        </h1>

        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-center gap-2 text-red-400 mb-2">
            <AlertTriangle className="w-5 h-5" />
            <span className="font-medium">Reason</span>
          </div>
          <p className="text-white/70">
            {reason || 'Multiple violations detected during the assessment.'}
          </p>
        </div>

        <p className="text-white/60 mb-8">
          Your assessment has been terminated due to policy violations.
          This decision is final and your results have been recorded.
        </p>

        <div className="bg-white/5 rounded-xl p-4 text-left text-sm text-white/50">
          <p className="font-medium text-white/70 mb-2">What happened?</p>
          <ul className="space-y-1 list-disc list-inside">
            <li>Tab switching or window minimizing was detected</li>
            <li>The assessment monitors browser focus to ensure fairness</li>
            <li>After 2 warnings, the exam is automatically terminated</li>
          </ul>
        </div>

        <p className="text-white/40 text-sm mt-6">
          If you believe this is an error, please contact support.
        </p>
      </motion.div>
    </div>
  );
}

