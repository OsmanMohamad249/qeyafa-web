import { create } from 'zustand';

export const useApplicationStore = create((set) => ({
  // Current step (1-4)
  currentStep: 1,

  // Form data
  formData: {
    // Step 1: Personal Information
    full_name: '',
    email: '',
    phone: '',

    // Step 2: Professional Details
    current_salary: '',
    expected_salary: '',
    currency: 'SAR',
    notice_period: 30,

    // Step 3: Links & Portfolio
    github_url: '',
    linkedin_url: '',
    portfolio_url: '',

    // Step 4: CV Upload
    cv_file: null,
    cv_url: ''
  },

  // Job being applied to
  jobId: null,
  jobTitle: '',

  // Submission state
  isSubmitting: false,
  isSubmitted: false,
  trackingToken: null,
  magicLink: null,
  error: null,

  // Actions
  setStep: (step) => set({ currentStep: step }),

  nextStep: () => set((state) => ({
    currentStep: Math.min(state.currentStep + 1, 4)
  })),

  prevStep: () => set((state) => ({
    currentStep: Math.max(state.currentStep - 1, 1)
  })),

  updateFormData: (data) => set((state) => ({
    formData: { ...state.formData, ...data }
  })),

  setJob: (jobId, jobTitle) => set({ jobId, jobTitle }),

  setSubmitting: (isSubmitting) => set({ isSubmitting }),

  setSubmitted: (trackingToken, magicLink) => set({
    isSubmitted: true,
    trackingToken,
    magicLink,
    isSubmitting: false
  }),

  setError: (error) => set({ error, isSubmitting: false }),

  reset: () => set({
    currentStep: 1,
    formData: {
      full_name: '',
      email: '',
      phone: '',
      current_salary: '',
      expected_salary: '',
      currency: 'SAR',
      notice_period: 30,
      github_url: '',
      linkedin_url: '',
      portfolio_url: '',
      cv_file: null,
      cv_url: ''
    },
    jobId: null,
    jobTitle: '',
    isSubmitting: false,
    isSubmitted: false,
    trackingToken: null,
    magicLink: null,
    error: null
  })
}));

