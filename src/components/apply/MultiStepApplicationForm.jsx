import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApplicationStore } from '@/stores/applicationStore';
import { GlowInput } from '@/components/common/GlowInput';
import { MagneticButton } from '@/components/common/MagneticButton';
import { Check, Upload, ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';

// Step indicators
function StepIndicator({ currentStep }) {
  const steps = [
    { num: 1, label: 'Personal' },
    { num: 2, label: 'Professional' },
    { num: 3, label: 'Portfolio' },
    { num: 4, label: 'CV Upload' }
  ];

  return (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => (
        <div key={step.num} className="flex items-center">
          <div
            className={`
              w-10 h-10 rounded-full flex items-center justify-center font-semibold
              transition-all duration-300
              ${currentStep > step.num 
                ? 'bg-qeyafa-gold text-qeyafa-black' 
                : currentStep === step.num 
                  ? 'bg-qeyafa-primary text-white ring-2 ring-qeyafa-gold ring-offset-2 ring-offset-qeyafa-black' 
                  : 'bg-white/10 text-white/50'}
            `}
          >
            {currentStep > step.num ? <Check className="w-5 h-5" /> : step.num}
          </div>
          {index < steps.length - 1 && (
            <div
              className={`w-12 h-1 mx-2 rounded transition-all duration-300 ${
                currentStep > step.num ? 'bg-qeyafa-gold' : 'bg-white/20'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// Step 1: Personal Information
function Step1({ formData, updateFormData, onNext }) {
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.full_name.trim()) newErrors.full_name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) onNext();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-white mb-6">Personal Information</h2>

      <GlowInput
        label="Full Name"
        value={formData.full_name}
        onChange={(e) => updateFormData({ full_name: e.target.value })}
        error={errors.full_name}
      />

      <GlowInput
        label="Email Address"
        type="email"
        value={formData.email}
        onChange={(e) => updateFormData({ email: e.target.value })}
        error={errors.email}
      />

      <GlowInput
        label="Phone Number"
        type="tel"
        value={formData.phone}
        onChange={(e) => updateFormData({ phone: e.target.value })}
        error={errors.phone}
        placeholder="+966 5XX XXX XXXX"
      />

      <div className="flex justify-end pt-4">
        <MagneticButton onClick={handleNext}>
          Next Step <ArrowRight className="w-4 h-4 ml-2" />
        </MagneticButton>
      </div>
    </div>
  );
}

// Step 2: Professional Details
function Step2({ formData, updateFormData, onNext, onPrev }) {
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.current_salary) newErrors.current_salary = 'Current salary is required';
    if (!formData.expected_salary) newErrors.expected_salary = 'Expected salary is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) onNext();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-white mb-6">Professional Details</h2>

      <div className="grid grid-cols-2 gap-4">
        <GlowInput
          label="Current Salary (Monthly)"
          type="number"
          value={formData.current_salary}
          onChange={(e) => updateFormData({ current_salary: e.target.value })}
          error={errors.current_salary}
        />

        <div>
          <label className="block text-sm text-white/70 mb-2">Currency</label>
          <select
            value={formData.currency}
            onChange={(e) => updateFormData({ currency: e.target.value })}
            className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:border-qeyafa-gold focus:outline-none"
          >
            <option value="SAR">SAR</option>
            <option value="USD">USD</option>
            <option value="AED">AED</option>
          </select>
        </div>
      </div>

      <GlowInput
        label="Expected Salary (Monthly)"
        type="number"
        value={formData.expected_salary}
        onChange={(e) => updateFormData({ expected_salary: e.target.value })}
        error={errors.expected_salary}
      />

      <div>
        <label className="block text-sm text-white/70 mb-2">Notice Period (Days)</label>
        <select
          value={formData.notice_period}
          onChange={(e) => updateFormData({ notice_period: parseInt(e.target.value) })}
          className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:border-qeyafa-gold focus:outline-none"
        >
          <option value={0}>Immediate</option>
          <option value={15}>15 Days</option>
          <option value={30}>30 Days</option>
          <option value={60}>60 Days</option>
          <option value={90}>90 Days</option>
        </select>
      </div>

      <div className="flex justify-between pt-4">
        <button onClick={onPrev} className="text-white/70 hover:text-white flex items-center">
          <ArrowLeft className="w-4 h-4 mr-2" /> Previous
        </button>
        <MagneticButton onClick={handleNext}>
          Next Step <ArrowRight className="w-4 h-4 ml-2" />
        </MagneticButton>
      </div>
    </div>
  );
}

// Step 3: Links & Portfolio
function Step3({ formData, updateFormData, onNext, onPrev }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-white mb-6">Links & Portfolio</h2>
      <p className="text-white/60 text-sm mb-4">Optional but highly recommended</p>

      <GlowInput
        label="GitHub URL"
        type="url"
        value={formData.github_url}
        onChange={(e) => updateFormData({ github_url: e.target.value })}
        placeholder="https://github.com/username"
      />

      <GlowInput
        label="LinkedIn URL"
        type="url"
        value={formData.linkedin_url}
        onChange={(e) => updateFormData({ linkedin_url: e.target.value })}
        placeholder="https://linkedin.com/in/username"
      />

      <GlowInput
        label="Portfolio URL"
        type="url"
        value={formData.portfolio_url}
        onChange={(e) => updateFormData({ portfolio_url: e.target.value })}
        placeholder="https://yourportfolio.com"
      />

      <div className="flex justify-between pt-4">
        <button onClick={onPrev} className="text-white/70 hover:text-white flex items-center">
          <ArrowLeft className="w-4 h-4 mr-2" /> Previous
        </button>
        <MagneticButton onClick={onNext}>
          Next Step <ArrowRight className="w-4 h-4 ml-2" />
        </MagneticButton>
      </div>
    </div>
  );
}

// Step 4: CV Upload
function Step4({ formData, updateFormData, onPrev, onSubmit, isSubmitting }) {
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState('');

  const handleFile = (file) => {
    if (!file) return;

    // Validate file type
    if (file.type !== 'application/pdf') {
      setError('Please upload a PDF file');
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      return;
    }

    setError('');
    updateFormData({ cv_file: file });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleSubmit = () => {
    if (!formData.cv_file) {
      setError('Please upload your CV');
      return;
    }
    onSubmit();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-white mb-6">Upload Your CV</h2>

      <div
        className={`
          border-2 border-dashed rounded-2xl p-12 text-center
          transition-all duration-300 cursor-pointer
          ${dragOver 
            ? 'border-qeyafa-gold bg-qeyafa-gold/10' 
            : formData.cv_file 
              ? 'border-green-500 bg-green-500/10' 
              : 'border-white/30 hover:border-qeyafa-gold/50'}
        `}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => document.getElementById('cv-input').click()}
      >
        <input
          id="cv-input"
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={(e) => handleFile(e.target.files[0])}
        />

        {formData.cv_file ? (
          <div className="text-green-400">
            <Check className="w-12 h-12 mx-auto mb-4" />
            <p className="font-medium">{formData.cv_file.name}</p>
            <p className="text-sm text-white/50 mt-2">Click to change file</p>
          </div>
        ) : (
          <div className="text-white/70">
            <Upload className="w-12 h-12 mx-auto mb-4" />
            <p className="font-medium">Drag & drop your CV here</p>
            <p className="text-sm text-white/50 mt-2">or click to browse (PDF, max 5MB)</p>
          </div>
        )}
      </div>

      {error && (
        <p className="text-red-400 text-sm">{error}</p>
      )}

      <div className="flex justify-between pt-4">
        <button onClick={onPrev} className="text-white/70 hover:text-white flex items-center">
          <ArrowLeft className="w-4 h-4 mr-2" /> Previous
        </button>
        <MagneticButton onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Submitting...
            </>
          ) : (
            'Submit Application'
          )}
        </MagneticButton>
      </div>
    </div>
  );
}

// Main Multi-Step Form Component
export function MultiStepApplicationForm({ jobId, jobTitle, onSuccess }) {
  const {
    currentStep,
    formData,
    isSubmitting,
    nextStep,
    prevStep,
    updateFormData,
    setSubmitting,
    setSubmitted,
    setError
  } = useApplicationStore();

  const handleSubmit = async () => {
    setSubmitting(true);

    try {
      // Generate tracking token
      const trackingToken = crypto.randomUUID ? crypto.randomUUID() :
        'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
          const r = Math.random() * 16 | 0;
          const v = c === 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });

      const magicLink = `${window.location.origin}/status/${trackingToken}`;

      // In a real app, this would upload CV and create candidate document
      // For now, simulate success
      await new Promise(resolve => setTimeout(resolve, 2000));

      setSubmitted(trackingToken, magicLink);
      onSuccess?.(trackingToken, magicLink);

    } catch (error) {
      console.error('Application submission error:', error);
      setError('Failed to submit application. Please try again.');
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <StepIndicator currentStep={currentStep} />

      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentStep === 1 && (
              <Step1
                formData={formData}
                updateFormData={updateFormData}
                onNext={nextStep}
              />
            )}
            {currentStep === 2 && (
              <Step2
                formData={formData}
                updateFormData={updateFormData}
                onNext={nextStep}
                onPrev={prevStep}
              />
            )}
            {currentStep === 3 && (
              <Step3
                formData={formData}
                updateFormData={updateFormData}
                onNext={nextStep}
                onPrev={prevStep}
              />
            )}
            {currentStep === 4 && (
              <Step4
                formData={formData}
                updateFormData={updateFormData}
                onPrev={prevStep}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

