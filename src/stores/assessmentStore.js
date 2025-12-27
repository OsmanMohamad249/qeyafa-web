import { create } from 'zustand';

export const useAssessmentStore = create((set, get) => ({
  // Assessment data
  assessmentId: null,
  candidateId: null,
  jobId: null,

  // Questions
  questions: [],
  currentQuestionIndex: 0,

  // Answers
  answers: {},

  // Timer
  timeRemaining: 3600, // 60 minutes in seconds
  startTime: null,

  // Anti-cheat
  cheatStrikes: 0,
  maxStrikes: 2,
  isTerminated: false,
  terminationReason: null,

  // Status
  status: 'not_started', // 'not_started' | 'in_progress' | 'submitted' | 'terminated'
  isSubmitting: false,

  // OTP verification
  isOtpVerified: false,

  // Actions
  initAssessment: (data) => set({
    assessmentId: data.assessmentId,
    candidateId: data.candidateId,
    jobId: data.jobId,
    questions: data.questions,
    timeRemaining: data.timeLimit * 60,
    status: 'not_started'
  }),

  startAssessment: () => set({
    status: 'in_progress',
    startTime: Date.now()
  }),

  setCurrentQuestion: (index) => set({ currentQuestionIndex: index }),

  nextQuestion: () => set((state) => ({
    currentQuestionIndex: Math.min(state.currentQuestionIndex + 1, state.questions.length - 1)
  })),

  prevQuestion: () => set((state) => ({
    currentQuestionIndex: Math.max(state.currentQuestionIndex - 1, 0)
  })),

  saveAnswer: (questionId, answer) => set((state) => ({
    answers: { ...state.answers, [questionId]: answer }
  })),

  decrementTime: () => set((state) => ({
    timeRemaining: Math.max(state.timeRemaining - 1, 0)
  })),

  addCheatStrike: () => {
    const state = get();
    const newStrikes = state.cheatStrikes + 1;

    if (newStrikes >= state.maxStrikes) {
      set({
        cheatStrikes: newStrikes,
        isTerminated: true,
        terminationReason: 'Multiple tab switches detected',
        status: 'terminated'
      });
      return true; // Terminated
    }

    set({ cheatStrikes: newStrikes });
    return false; // Warning only
  },

  setOtpVerified: (verified) => set({ isOtpVerified: verified }),

  submitAssessment: () => set({
    status: 'submitted',
    isSubmitting: false
  }),

  setSubmitting: (isSubmitting) => set({ isSubmitting }),

  reset: () => set({
    assessmentId: null,
    candidateId: null,
    jobId: null,
    questions: [],
    currentQuestionIndex: 0,
    answers: {},
    timeRemaining: 3600,
    startTime: null,
    cheatStrikes: 0,
    isTerminated: false,
    terminationReason: null,
    status: 'not_started',
    isSubmitting: false,
    isOtpVerified: false
  })
}));

