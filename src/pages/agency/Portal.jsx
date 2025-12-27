import { useState, useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/common/GlassCard';
import {
  Users, Briefcase, FileCheck, Plane, AlertCircle, Loader2,
  Check, Clock, FileText
} from 'lucide-react';

// Visa Tracking Steps
const VISA_STEPS = [
  { key: 'passport_submitted', label: 'Passport', icon: '📘' },
  { key: 'medical_completed', label: 'Medical', icon: '🏥' },
  { key: 'visa_applied', label: 'Visa Applied', icon: '📝' },
  { key: 'visa_approved', label: 'Visa Approved', icon: '✅' },
  { key: 'flight_booked', label: 'Flight', icon: '✈️' }
];

// Demo data
const DEMO_CANDIDATES = [
  {
    id: '1',
    full_name: 'Mohammed Al-Harbi',
    job_title: 'Senior AI Engineer',
    status: 'hired',
    visa_tracking: {
      passport_submitted: true,
      passport_submitted_at: new Date('2024-12-15'),
      medical_completed: true,
      medical_completed_at: new Date('2024-12-18'),
      visa_applied: true,
      visa_applied_at: new Date('2024-12-20'),
      visa_approved: false,
      flight_booked: false
    }
  },
  {
    id: '2',
    full_name: 'Fatima Hassan',
    job_title: 'Product Designer',
    status: 'hired',
    visa_tracking: {
      passport_submitted: true,
      passport_submitted_at: new Date('2024-12-10'),
      medical_completed: true,
      medical_completed_at: new Date('2024-12-12'),
      visa_applied: true,
      visa_applied_at: new Date('2024-12-14'),
      visa_approved: true,
      visa_approved_at: new Date('2024-12-19'),
      flight_booked: true,
      flight_date: new Date('2025-01-15')
    }
  }
];

export default function Portal() {
  useAuthStore();
  const [candidates, setCandidates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching assigned candidates
    setTimeout(() => {
      setCandidates(DEMO_CANDIDATES);
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-qeyafa-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-qeyafa-gold animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-qeyafa-black bg-grid-pattern">
      {/* Header */}
      <header className="bg-qeyafa-black/90 backdrop-blur-lg border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Agency Portal</h1>
              <p className="text-white/50 text-sm">Track your assigned candidates</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-white font-medium">ACME Recruiting</p>
                <p className="text-white/50 text-sm">Agency Account</p>
              </div>
              <div className="w-10 h-10 bg-qeyafa-primary rounded-full flex items-center justify-center text-white font-bold">
                A
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatsCard icon={Users} label="Assigned Candidates" value={candidates.length} />
          <StatsCard icon={FileCheck} label="Visa Processing" value={1} />
          <StatsCard icon={Plane} label="Ready to Deploy" value={1} />
          <StatsCard icon={Briefcase} label="Deployed" value={0} />
        </div>

        {/* Candidates List */}
        <h2 className="text-xl font-semibold text-white mb-4">Assigned Candidates</h2>

        <div className="space-y-6">
          {candidates.map(candidate => (
            <CandidateVisaCard key={candidate.id} candidate={candidate} />
          ))}

          {candidates.length === 0 && (
            <GlassCard hover={false}>
              <div className="text-center py-12">
                <AlertCircle className="w-12 h-12 text-white/30 mx-auto mb-4" />
                <p className="text-white/50">No candidates assigned to your agency.</p>
              </div>
            </GlassCard>
          )}
        </div>
      </main>
    </div>
  );
}

// eslint-disable-next-line no-unused-vars
function StatsCard({ icon: IconComponent, label, value }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10"
    >
      <div className="w-10 h-10 rounded-lg bg-qeyafa-gold/20 flex items-center justify-center mb-3">
        <IconComponent className="w-5 h-5 text-qeyafa-gold" />
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-white/50 text-sm">{label}</p>
    </motion.div>
  );
}

function CandidateVisaCard({ candidate }) {
  return (
    <GlassCard hover={false}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white">{candidate.full_name}</h3>
          <p className="text-white/50">{candidate.job_title}</p>
        </div>
        <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium">
          Hired
        </span>
      </div>

      {/* Visa Pipeline */}
      <div className="mb-4">
        <p className="text-white/70 text-sm mb-3">Visa Processing Progress</p>
        <VisaPipeline tracking={candidate.visa_tracking} />
      </div>

      {/* Details */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-white/10">
        {VISA_STEPS.map(step => {
          const isComplete = candidate.visa_tracking[step.key];
          const dateKey = `${step.key}_at`;
          const date = candidate.visa_tracking[dateKey];

          return (
            <div key={step.key} className="text-sm">
              <p className="text-white/50 mb-1">{step.label}</p>
              <p className={isComplete ? 'text-green-400' : 'text-white/30'}>
                {isComplete && date
                  ? new Date(date).toLocaleDateString()
                  : isComplete
                    ? 'Completed'
                    : 'Pending'}
              </p>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
}

function VisaPipeline({ tracking }) {
  return (
    <div className="flex items-center justify-between">
      {VISA_STEPS.map((step, index) => {
        const isComplete = tracking[step.key];
        const isActive = !isComplete && (
          index === 0 || tracking[VISA_STEPS[index - 1].key]
        );

        return (
          <div key={step.key} className="flex items-center flex-1">
            {/* Step Circle */}
            <div
              className={`
                w-12 h-12 rounded-full flex items-center justify-center text-xl
                transition-all duration-300
                ${isComplete
                  ? 'bg-qeyafa-gold text-qeyafa-black'
                  : isActive
                    ? 'bg-qeyafa-primary text-white animate-pulse ring-2 ring-qeyafa-gold'
                    : 'bg-white/10 text-white/30'}
              `}
            >
              {step.icon}
            </div>

            {/* Connector Line */}
            {index < VISA_STEPS.length - 1 && (
              <div
                className={`h-1 flex-1 mx-2 rounded ${
                  isComplete ? 'bg-qeyafa-gold' : 'bg-white/10'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
