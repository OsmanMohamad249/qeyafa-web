import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useApplicationStore } from '@/stores/applicationStore';
import { GlowInput } from '@/components/common/GlowInput';
import { MagneticButton } from '@/components/common/MagneticButton';
import { Check, Upload, ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import { checkBudget } from '@/lib/qtme';

// Step indicators
function StepIndicator({ currentStep }) {
  const { t } = useTranslation();
  const steps = [
    { num: 1, label: t('application_form.steps.personal') },
    { num: 2, label: t('application_form.steps.professional') },
    { num: 3, label: t('application_form.steps.portfolio') },
    { num: 4, label: t('application_form.steps.cv') }
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
  const { t } = useTranslation();
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.full_name.trim()) newErrors.full_name = t('application_form.errors.name_required');
    if (!formData.email.trim()) newErrors.email = t('application_form.errors.email_required');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('application_form.errors.email_invalid');
    }
    if (!formData.phone.trim()) newErrors.phone = t('application_form.errors.phone_required');

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) onNext();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-white mb-6">{t('application_form.personal.title')}</h2>

      <GlowInput
        label={t('application_form.personal.full_name')}
        value={formData.full_name}
        onChange={(e) => updateFormData({ full_name: e.target.value })}
        error={errors.full_name}
      />

      <GlowInput
        label={t('application_form.personal.email')}
        type="email"
        value={formData.email}
        onChange={(e) => updateFormData({ email: e.target.value })}
        error={errors.email}
      />

      <GlowInput
        label={t('application_form.personal.phone')}
        type="tel"
        value={formData.phone}
        onChange={(e) => updateFormData({ phone: e.target.value })}
        error={errors.phone}
        placeholder="+966 5XX XXX XXXX"
      />

      <div className="flex justify-end pt-4">
        <MagneticButton onClick={handleNext}>
          {t('application_form.buttons.next')} <ArrowRight className="w-4 h-4 ml-2" />
        </MagneticButton>
      </div>
    </div>
  );
}

// Step 2: Professional Details
function Step2({ formData, updateFormData, onNext, onPrev }) {
  const { t } = useTranslation();
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.current_salary) newErrors.current_salary = t('application_form.errors.current_salary_required');
    if (!formData.expected_salary) newErrors.expected_salary = t('application_form.errors.expected_salary_required');

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) onNext();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-white mb-6">{t('application_form.professional.title')}</h2>

      <div className="grid grid-cols-2 gap-4">
        <GlowInput
          label={t('application_form.professional.current_salary')}
          type="number"
          value={formData.current_salary}
          onChange={(e) => updateFormData({ current_salary: e.target.value })}
          error={errors.current_salary}
        />

        <div>
          <label className="block text-sm text-white/70 mb-2">{t('application_form.professional.currency')}</label>
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
        label={t('application_form.professional.expected_salary')}
        type="number"
        value={formData.expected_salary}
        onChange={(e) => updateFormData({ expected_salary: e.target.value })}
        error={errors.expected_salary}
      />

      <div>
        <label className="block text-sm text-white/70 mb-2">{t('application_form.professional.notice_period')}</label>
        <select
          value={formData.notice_period}
          onChange={(e) => updateFormData({ notice_period: parseInt(e.target.value) })}
          className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:border-qeyafa-gold focus:outline-none"
        >
          <option value={0}>{t('application_form.professional.notice_options.immediate')}</option>
          <option value={15}>{t('application_form.professional.notice_options.days_15')}</option>
          <option value={30}>{t('application_form.professional.notice_options.days_30')}</option>
          <option value={60}>{t('application_form.professional.notice_options.days_60')}</option>
          <option value={90}>{t('application_form.professional.notice_options.days_90')}</option>
        </select>
      </div>

      <div className="flex justify-between pt-4">
        <button onClick={onPrev} className="text-white/70 hover:text-white flex items-center">
          <ArrowLeft className="w-4 h-4 mr-2" /> {t('application_form.buttons.prev')}
        </button>
        <MagneticButton onClick={handleNext}>
          {t('application_form.buttons.next')} <ArrowRight className="w-4 h-4 ml-2" />
        </MagneticButton>
      </div>
    </div>
  );
}

// Step 3: Links & Portfolio
function Step3({ formData, updateFormData, onNext, onPrev }) {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-white mb-6">{t('application_form.portfolio.title')}</h2>
      <p className="text-white/60 text-sm mb-4">{t('application_form.portfolio.subtitle')}</p>

      <GlowInput
        label={t('application_form.portfolio.github')}
        type="url"
        value={formData.github_url}
        onChange={(e) => updateFormData({ github_url: e.target.value })}
        placeholder="https://github.com/username"
      />

      <GlowInput
        label={t('application_form.portfolio.linkedin')}
        type="url"
        value={formData.linkedin_url}
        onChange={(e) => updateFormData({ linkedin_url: e.target.value })}
        placeholder="https://linkedin.com/in/username"
      />

      <GlowInput
        label={t('application_form.portfolio.portfolio')}
        type="url"
        value={formData.portfolio_url}
        onChange={(e) => updateFormData({ portfolio_url: e.target.value })}
        placeholder="https://yourportfolio.com"
      />

      <div className="flex justify-between pt-4">
        <button onClick={onPrev} className="text-white/70 hover:text-white flex items-center">
          <ArrowLeft className="w-4 h-4 mr-2" /> {t('application_form.buttons.prev')}
        </button>
        <MagneticButton onClick={onNext}>
          {t('application_form.buttons.next')} <ArrowRight className="w-4 h-4 ml-2" />
        </MagneticButton>
      </div>
    </div>
  );
}

// Step 4: CV Upload
function Step4({ formData, updateFormData, onPrev, onSubmit, isSubmitting }) {
  const { t } = useTranslation();
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState('');

  const handleFile = (file) => {
    if (!file) return;

    // Validate file type
    if (file.type !== 'application/pdf') {
      setError(t('application_form.errors.pdf_only'));
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setError(t('application_form.errors.file_size'));
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
      setError(t('application_form.errors.cv_required'));
      return;
    }
    onSubmit();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-white mb-6">{t('application_form.cv.title')}</h2>

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
            <p className="text-sm text-white/50 mt-2">{t('application_form.cv.change')}</p>
          </div>
        ) : (
          <div className="text-white/70">
            <Upload className="w-12 h-12 mx-auto mb-4" />
            <p className="font-medium">{t('application_form.cv.drag_drop')}</p>
            <p className="text-sm text-white/50 mt-2">{t('application_form.cv.browse')}</p>
          </div>
        )}
      </div>

      {error && (
        <p className="text-red-400 text-sm">{error}</p>
      )}

      <div className="flex justify-between pt-4">
        <button onClick={onPrev} className="text-white/70 hover:text-white flex items-center">
          <ArrowLeft className="w-4 h-4 mr-2" /> {t('application_form.buttons.prev')}
        </button>
        <MagneticButton onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" /> {t('application_form.buttons.submitting')}
            </>
          ) : (
            t('application_form.buttons.submit')
          )}
        </MagneticButton>
      </div>
    </div>
  );
}

// Main Multi-Step Form Component
export function MultiStepApplicationForm({ jobId: _jobId, jobTitle: _jobTitle, onSuccess }) {
  const { t } = useTranslation();
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
      // Budget Check (Silent)
      // In a real app, fetch job budget from DB. Here we simulate a range.
      const jobBudgetRange = { min: 15000, max: 25000 };
      const budgetCheckResult = checkBudget(Number(formData.expected_salary), jobBudgetRange);
      console.log('Budget Check Result:', budgetCheckResult);

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
      setError(t('application_form.errors.submit_failed'));
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
