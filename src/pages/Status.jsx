import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getStatusInfo } from '@/lib/qtme';
import { Loader2 } from 'lucide-react';

// Demo status for preview
const DEMO_CANDIDATE = {
  id: 'demo-123',
  full_name: 'Mohammed Al-Harbi',
  email: 'mohammed@example.com',
  job_title: 'Senior AI Engineer',
  status: 'approved',
  applied_at: new Date('2024-12-15'),
  status_history: [
    { from: 'new', to: 'ai_screening', timestamp: new Date('2024-12-15T10:00:00'), changed_by: 'system' },
    { from: 'ai_screening', to: 'pending_review', timestamp: new Date('2024-12-15T10:30:00'), changed_by: 'system' },
    { from: 'pending_review', to: 'approved', timestamp: new Date('2024-12-16T09:00:00'), changed_by: 'admin' }
  ]
};

export default function Status() {
  const { token } = useParams();
  const [candidate, setCandidate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate fetching candidate by token
    const fetchStatus = async () => {
      setIsLoading(true);

      try {
        // In production, fetch from Firestore using tracking token
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Demo data
        setCandidate(DEMO_CANDIDATE);
      } catch {
        setError('Unable to find your application. Please check the link.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStatus();
  }, [token]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-qeyafa-black flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-qeyafa-gold animate-spin mx-auto mb-4" />
          <p className="text-white/60">Loading your application status...</p>
        </div>
      </div>
    );
  }

  if (error || !candidate) {
    return (
      <div className="min-h-screen bg-qeyafa-black flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">❌</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Application Not Found</h1>
          <p className="text-white/60">{error}</p>
        </div>
      </div>
    );
  }

  const statusInfo = getStatusInfo(candidate.status);

  return (
    <div className="min-h-screen bg-qeyafa-black bg-grid-pattern py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <p className="text-qeyafa-gold uppercase tracking-[0.3em] text-sm mb-2">
            Application Status
          </p>
          <h1 className="text-3xl font-bold text-white">
            {candidate.full_name}
          </h1>
          <p className="text-white/60 mt-2">
            Applied for: <span className="text-white">{candidate.job_title}</span>
          </p>
        </motion.div>

        {/* Current Status Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 mb-8"
        >
          <div className="text-center">
            <div className="text-5xl mb-4">{statusInfo.icon}</div>
            <h2 className="text-2xl font-semibold text-white mb-2">
              {statusInfo.label}
            </h2>
            <p className="text-white/60">
              {getStatusMessage(candidate.status)}
            </p>
          </div>

          {/* Status Progress Bar */}
          <div className="mt-8">
            <div className="flex justify-between mb-2">
              {['Applied', 'Reviewed', 'Assessment', 'Interview', 'Offer'].map((step, index) => {
                const stepIndex = getStepIndex(candidate.status);
                const isComplete = index < stepIndex;
                const isCurrent = index === stepIndex;

                return (
                  <div
                    key={step}
                    className={`text-xs font-medium ${
                      isComplete || isCurrent ? 'text-qeyafa-gold' : 'text-white/30'
                    }`}
                  >
                    {step}
                  </div>
                );
              })}
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(getStepIndex(candidate.status) / 4) * 100}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full bg-qeyafa-gold"
              />
            </div>
          </div>
        </motion.div>

        {/* Status History Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Activity Timeline</h3>

          <div className="space-y-4">
            {candidate.status_history.map((event, index) => {
              const info = getStatusInfo(event.to);
              return (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-qeyafa-gold/20 flex items-center justify-center text-sm">
                      {info.icon}
                    </div>
                    {index < candidate.status_history.length - 1 && (
                      <div className="w-0.5 h-full bg-white/10 my-1" />
                    )}
                  </div>
                  <div className="pb-4">
                    <p className="text-white font-medium">{info.label}</p>
                    <p className="text-white/50 text-sm">
                      {new Date(event.timestamp).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Help Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-white/40 text-sm text-center mt-8"
        >
          Questions about your application? Contact us at{' '}
          <a href="mailto:careers@qeyafa.ai" className="text-qeyafa-gold hover:underline">
            careers@qeyafa.ai
          </a>
        </motion.p>
      </div>
    </div>
  );
}

function getStatusMessage(status) {
  const messages = {
    new: 'Your application has been received and is in our queue.',
    ai_screening: 'Our AI is analyzing your profile and qualifications.',
    pending_review: 'A human recruiter is reviewing your application.',
    approved: 'Great news! You\'ve been approved for the next stage.',
    assessment_invited: 'Check your email for the assessment invitation.',
    assessment_in_progress: 'Good luck with your assessment!',
    assessment_completed: 'Assessment completed. Results are being reviewed.',
    interview_scheduled: 'Interview scheduled! Check your email for details.',
    offer_sent: 'Congratulations! You have an offer waiting.',
    hired: 'Welcome to the team! 🎉',
    rejected: 'Thank you for your interest. We\'ll keep your profile on file.'
  };
  return messages[status] || 'Status update pending.';
}

function getStepIndex(status) {
  const steps = {
    new: 0,
    ai_screening: 0,
    pending_review: 1,
    approved: 1,
    assessment_invited: 2,
    assessment_in_progress: 2,
    assessment_completed: 2,
    interview_scheduled: 3,
    interview_completed: 3,
    offer_pending: 4,
    offer_sent: 4,
    offer_accepted: 4,
    hired: 4
  };
  return steps[status] ?? 0;
}

