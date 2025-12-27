import { useState } from 'react';
import { motion } from 'framer-motion';
import { MagneticButton } from '@/components/common/MagneticButton';
import { Lock, Loader2 } from 'lucide-react';

export function OTPVerification({ email, onVerified, onResend }) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setError('');

    // Auto-focus next input
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (/^\d+$/.test(pastedData)) {
      const newOtp = pastedData.split('').concat(Array(6 - pastedData.length).fill(''));
      setOtp(newOtp);
    }
  };

  const handleVerify = async () => {
    const code = otp.join('');
    if (code.length !== 6) {
      setError('Please enter the complete 6-digit code');
      return;
    }

    setIsVerifying(true);
    setError('');

    try {
      // In a real app, verify OTP with Firebase
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Simulate verification (in production, check against Firebase)
      onVerified?.(code);

    } catch {
      setError('Invalid code. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0) return;

    setResendCooldown(60);
    onResend?.();

    // Countdown
    const interval = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="max-w-md mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10"
      >
        <div className="w-16 h-16 bg-qeyafa-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Lock className="w-8 h-8 text-qeyafa-gold" />
        </div>

        <h2 className="text-2xl font-semibold text-white mb-2">
          Verify Your Email
        </h2>

        <p className="text-white/60 mb-6">
          We've sent a 6-digit code to <br />
          <span className="text-qeyafa-gold font-medium">{email}</span>
        </p>

        {/* OTP Input */}
        <div className="flex justify-center gap-3 mb-6" onPaste={handlePaste}>
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className={`
                w-12 h-14 text-center text-2xl font-bold
                bg-white/5 border rounded-xl
                text-white outline-none
                transition-all duration-300
                ${error 
                  ? 'border-red-500' 
                  : digit 
                    ? 'border-qeyafa-gold' 
                    : 'border-white/20 focus:border-qeyafa-gold'}
              `}
            />
          ))}
        </div>

        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-400 text-sm mb-4"
          >
            {error}
          </motion.p>
        )}

        <MagneticButton
          onClick={handleVerify}
          disabled={isVerifying || otp.join('').length !== 6}
          className="w-full"
        >
          {isVerifying ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Verifying...
            </>
          ) : (
            'Verify & Start Assessment'
          )}
        </MagneticButton>

        <div className="mt-6 text-white/50 text-sm">
          Didn't receive the code?{' '}
          <button
            onClick={handleResend}
            disabled={resendCooldown > 0}
            className={`text-qeyafa-gold hover:underline ${
              resendCooldown > 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend Code'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

