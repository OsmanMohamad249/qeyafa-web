import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MagneticButton } from '@/components/common/MagneticButton';
import { GlassCard } from '@/components/common/GlassCard';
import confetti from 'canvas-confetti';
import { CheckCircle, X, DollarSign, Calendar, MapPin, Briefcase } from 'lucide-react';

// Demo offer data
const DEMO_OFFER = {
  id: 'offer-123',
  candidate_name: 'Mohammed Al-Harbi',
  job_title: 'Senior AI Engineer',
  department: 'AI & Innovation',
  location: 'Riyadh, Saudi Arabia',
  start_date: '2025-02-01',
  salary: 40000,
  currency: 'SAR',
  benefits: [
    'Health Insurance',
    'Annual Bonus',
    'Remote Work Flexibility',
    'Professional Development',
    'Gym Membership',
    'Relocation Assistance'
  ]
};

export function OfferPage({ offerId }) {
  const [offer, setOffer] = useState(DEMO_OFFER);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);

  // Fire gold confetti on page load
  useEffect(() => {
    fireGoldConfetti();
  }, []);

  const fireGoldConfetti = () => {
    confetti({
      particleCount: 200,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#D4A017', '#F0D78C', '#0F4D3F', '#FFFFFF']
    });
  };

  const handleAccept = () => {
    fireGoldConfetti();
    setIsAccepted(true);
  };

  if (isAccepted) {
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
            transition={{ type: 'spring' }}
            className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-12 h-12 text-green-500" />
          </motion.div>

          <h1 className="text-3xl font-bold text-white mb-4">
            Welcome to Qeyafa! 🎉
          </h1>

          <p className="text-white/60 mb-8">
            We're thrilled to have you join our team. You'll receive an email
            shortly with onboarding instructions.
          </p>

          <div className="bg-white/5 rounded-xl p-4 text-left mb-6">
            <div className="flex justify-between text-white/70 mb-2">
              <span>Position</span>
              <span className="font-medium text-white">{offer.job_title}</span>
            </div>
            <div className="flex justify-between text-white/70">
              <span>Start Date</span>
              <span className="font-medium text-white">
                {new Date(offer.start_date).toLocaleDateString()}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-qeyafa-black bg-grid-pattern flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full"
      >
        <GlassCard variant="gold" hover={false} className="overflow-hidden">
          {/* Header */}
          <div className="bg-qeyafa-primary p-8 -m-6 mb-6 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
              className="text-5xl mb-4"
            >
              🎉
            </motion.div>
            <h1 className="text-3xl font-bold text-white">Congratulations!</h1>
            <p className="text-qeyafa-gold text-xl mt-2">
              You've received an offer from Qeyafa AI
            </p>
          </div>

          {/* Job Details */}
          <div className="space-y-4 mb-6">
            <h2 className="text-2xl font-semibold text-white">{offer.job_title}</h2>

            <div className="flex flex-wrap gap-4 text-white/70">
              <span className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-qeyafa-gold" />
                {offer.department}
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-qeyafa-gold" />
                {offer.location}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-qeyafa-gold" />
                Start: {new Date(offer.start_date).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Salary Box */}
          <div className="bg-qeyafa-gold/10 border-2 border-qeyafa-gold rounded-xl p-6 mb-6">
            <div className="flex items-center justify-between">
              <span className="text-white/70">Monthly Salary</span>
              <span className="text-3xl font-bold text-white flex items-center gap-1">
                <DollarSign className="w-6 h-6 text-qeyafa-gold" />
                {offer.currency} {offer.salary.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Benefits */}
          <div className="mb-8">
            <h3 className="font-semibold text-white mb-3">Benefits</h3>
            <ul className="grid grid-cols-2 gap-2">
              {offer.benefits.map((benefit, i) => (
                <li key={i} className="flex items-center text-white/70">
                  <span className="text-qeyafa-gold mr-2">✓</span>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <MagneticButton onClick={handleAccept} className="flex-1">
              Accept Offer
            </MagneticButton>
            <button
              onClick={() => setShowRejectModal(true)}
              className="flex-1 border-2 border-white/20 text-white/70 py-3 rounded-xl hover:border-red-400 hover:text-red-400 transition-colors"
            >
              Decline
            </button>
          </div>
        </GlassCard>
      </motion.div>

      {/* Rejection Modal */}
      {showRejectModal && (
        <RejectModal
          onClose={() => setShowRejectModal(false)}
          offerId={offerId}
        />
      )}
    </div>
  );
}

function RejectModal({ onClose, offerId }) {
  const [reason, setReason] = useState('');
  const [showSalaryInput, setShowSalaryInput] = useState(false);
  const [expectedSalary, setExpectedSalary] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleReasonSelect = (selectedReason) => {
    setReason(selectedReason);
    setShowSalaryInput(selectedReason === 'salary');
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    onClose();
  };

  const reasons = [
    { value: 'salary', label: 'Salary expectations not met' },
    { value: 'other_offer', label: 'Accepted another offer' },
    { value: 'personal', label: 'Personal reasons' },
    { value: 'relocation', label: 'Unable to relocate' },
    { value: 'other', label: 'Other' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-qeyafa-black border border-white/20 rounded-2xl p-6 max-w-md w-full"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">
            We're sorry to hear that
          </h2>
          <button onClick={onClose} className="text-white/50 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-white/60 mb-4">
          Please let us know why you're declining:
        </p>

        {/* Reason Selection */}
        <div className="space-y-2 mb-4">
          {reasons.map(option => (
            <label
              key={option.value}
              className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                reason === option.value
                  ? 'border-qeyafa-gold bg-qeyafa-gold/10'
                  : 'border-white/20 hover:border-qeyafa-gold/50'
              }`}
            >
              <input
                type="radio"
                name="reason"
                value={option.value}
                checked={reason === option.value}
                onChange={() => handleReasonSelect(option.value)}
                className="mr-3"
              />
              <span className="text-white">{option.label}</span>
            </label>
          ))}
        </div>

        {/* Salary Input (Conditional) */}
        {showSalaryInput && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-4"
          >
            <label className="block text-sm font-medium text-white/70 mb-2">
              What is your minimum expected salary? *
            </label>
            <div className="flex items-center border border-white/20 rounded-lg overflow-hidden">
              <span className="bg-white/10 px-3 py-2 text-white/50">SAR</span>
              <input
                type="number"
                value={expectedSalary}
                onChange={(e) => setExpectedSalary(e.target.value)}
                placeholder="Enter amount"
                className="flex-1 px-3 py-2 bg-transparent text-white outline-none"
              />
            </div>
            <p className="text-xs text-white/40 mt-1">
              This will be shared with HR for potential negotiation.
            </p>
          </motion.div>
        )}

        {/* Actions */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 py-2 border border-white/20 rounded-lg text-white hover:bg-white/5"
          >
            Cancel
          </button>
          <MagneticButton
            onClick={handleSubmit}
            disabled={!reason || (reason === 'salary' && !expectedSalary) || isSubmitting}
            className="flex-1"
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </MagneticButton>
        </div>
      </motion.div>
    </motion.div>
  );
}

