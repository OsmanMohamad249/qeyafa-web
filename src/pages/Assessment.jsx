import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAssessmentStore } from '@/stores/assessmentStore';
import { useAntiCheat } from '@/hooks/useAntiCheat';
import { OTPVerification } from '@/components/assessment/OTPVerification';
import { QuestionCard } from '@/components/assessment/QuestionCard';
import { TerminationScreen } from '@/components/assessment/TerminationScreen';
import { MagneticButton } from '@/components/common/MagneticButton';
import { formatTime } from '@/lib/qtme';
import { Clock, ChevronLeft, ChevronRight, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';

// Sample questions for demo
const DEMO_QUESTIONS = [
  {
    id: 'q1',
    type: 'iq_logic',
    question_text: 'If all Bloops are Razzles and all Razzles are Lazzles, are all Bloops definitely Lazzles?',
    options: ['Yes', 'No', 'Cannot be determined'],
    correct_answer: 'Yes',
    points: 5,
    time_suggested_seconds: 60
  },
  {
    id: 'q2',
    type: 'iq_logic',
    question_text: 'Complete the sequence: 2, 6, 12, 20, 30, ?',
    options: ['40', '42', '44', '46'],
    correct_answer: '42',
    points: 5,
    time_suggested_seconds: 90
  },
  {
    id: 'q3',
    type: 'core_tech',
    question_text: 'Explain the difference between supervised and unsupervised learning with examples.',
    points: 5,
    time_suggested_seconds: 180
  },
  {
    id: 'q4',
    type: 'core_tech',
    question_text: 'What is the time complexity of binary search?',
    options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'],
    correct_answer: 'O(log n)',
    points: 5,
    time_suggested_seconds: 60
  },
  {
    id: 'q5',
    type: 'case_study',
    question_text: 'You are tasked with designing a recommendation system for an e-commerce platform. Describe your approach, including data requirements, algorithms you would consider, and how you would measure success.',
    points: 5,
    time_suggested_seconds: 300
  }
];

export default function Assessment() {
  const { token } = useParams();
  const navigate = useNavigate();

  const {
    assessmentId,
    questions,
    currentQuestionIndex,
    answers,
    timeRemaining,
    cheatStrikes,
    maxStrikes,
    isTerminated,
    terminationReason,
    status,
    isOtpVerified,
    initAssessment,
    startAssessment,
    setCurrentQuestion,
    nextQuestion,
    prevQuestion,
    saveAnswer,
    decrementTime,
    setOtpVerified,
    submitAssessment
  } = useAssessmentStore();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [candidateEmail, setCandidateEmail] = useState('candidate@example.com');

  // Initialize assessment with demo data
  useEffect(() => {
    if (!assessmentId) {
      initAssessment({
        assessmentId: token || 'demo-assessment',
        candidateId: 'demo-candidate',
        jobId: 'demo-job',
        questions: DEMO_QUESTIONS,
        timeLimit: 60
      });
    }
  }, [token, assessmentId, initAssessment]);

  // Anti-cheat hook
  useAntiCheat({
    assessmentId: assessmentId,
    onTerminate: () => {
      // Already handled by store
    }
  });

  // Timer countdown
  useEffect(() => {
    if (status !== 'in_progress') return;

    const timer = setInterval(() => {
      decrementTime();
    }, 1000);

    return () => clearInterval(timer);
  }, [status, decrementTime]);

  // Auto-submit when time runs out
  useEffect(() => {
    if (timeRemaining === 0 && status === 'in_progress') {
      handleSubmit();
    }
  }, [timeRemaining, status]);

  const handleOtpVerified = (code) => {
    setOtpVerified(true);
    startAssessment();
  };

  const handleAnswer = useCallback((answer) => {
    const currentQuestion = questions[currentQuestionIndex];
    saveAnswer(currentQuestion.id, answer);
  }, [questions, currentQuestionIndex, saveAnswer]);

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    submitAssessment();
    setIsSubmitting(false);
    setShowSubmitConfirm(false);
  };

  const answeredCount = Object.keys(answers).length;
  const progress = (answeredCount / questions.length) * 100;

  // Show termination screen if exam was terminated
  if (isTerminated) {
    return <TerminationScreen reason={terminationReason} />;
  }

  // Show OTP verification if not verified
  if (!isOtpVerified) {
    return (
      <div className="min-h-screen bg-qeyafa-black bg-grid-pattern flex items-center justify-center p-4">
        <OTPVerification
          email={candidateEmail}
          onVerified={handleOtpVerified}
          onResend={() => console.log('Resend OTP')}
        />
      </div>
    );
  }

  // Show completion screen
  if (status === 'submitted') {
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
            className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-12 h-12 text-green-500" />
          </motion.div>

          <h1 className="text-3xl font-bold text-white mb-4">
            Assessment Completed! 🎉
          </h1>

          <p className="text-white/60 mb-8">
            Thank you for completing the assessment. Our team will review your
            responses and get back to you within 3-5 business days.
          </p>

          <div className="bg-white/5 rounded-xl p-4 text-left mb-6">
            <div className="flex justify-between text-white/70 mb-2">
              <span>Questions Answered</span>
              <span className="font-medium text-white">{answeredCount}/{questions.length}</span>
            </div>
            <div className="flex justify-between text-white/70">
              <span>Time Used</span>
              <span className="font-medium text-white">{formatTime(3600 - timeRemaining)}</span>
            </div>
          </div>

          <MagneticButton onClick={() => navigate('/')}>
            Return to Homepage
          </MagneticButton>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-qeyafa-black">
      {/* Header with Timer */}
      <header className="fixed top-0 left-0 right-0 bg-qeyafa-black/95 backdrop-blur-lg border-b border-white/10 z-50">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Progress */}
            <div className="flex items-center gap-4">
              <span className="text-white font-medium">
                Question {currentQuestionIndex + 1} / {questions.length}
              </span>
              <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-qeyafa-gold"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Timer */}
            <div className={`
              flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-lg font-bold
              ${timeRemaining < 300 
                ? 'bg-red-500/20 text-red-400 animate-pulse' 
                : 'bg-qeyafa-gold/20 text-qeyafa-gold'}
            `}>
              <Clock className="w-5 h-5" />
              {formatTime(timeRemaining)}
            </div>

            {/* Cheat Strikes Indicator */}
            {cheatStrikes > 0 && (
              <div className="flex items-center gap-2 text-red-400">
                <AlertCircle className="w-5 h-5" />
                <span className="text-sm">
                  Warnings: {cheatStrikes}/{maxStrikes}
                </span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-32 px-4">
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            {questions[currentQuestionIndex] && (
              <QuestionCard
                key={currentQuestionIndex}
                question={questions[currentQuestionIndex]}
                answer={answers[questions[currentQuestionIndex].id]}
                onAnswer={handleAnswer}
                questionNumber={currentQuestionIndex + 1}
                totalQuestions={questions.length}
              />
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Navigation Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-qeyafa-black/95 backdrop-blur-lg border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          {/* Question Navigator */}
          <div className="flex gap-1 justify-center mb-4 flex-wrap">
            {questions.map((q, index) => (
              <button
                key={q.id}
                onClick={() => setCurrentQuestion(index)}
                className={`
                  w-8 h-8 rounded-lg text-sm font-medium transition-all
                  ${index === currentQuestionIndex 
                    ? 'bg-qeyafa-gold text-qeyafa-black' 
                    : answers[q.id] 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                      : 'bg-white/10 text-white/50 hover:bg-white/20'}
                `}
              >
                {index + 1}
              </button>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center">
            <button
              onClick={prevQuestion}
              disabled={currentQuestionIndex === 0}
              className="flex items-center gap-2 text-white/70 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" /> Previous
            </button>

            {currentQuestionIndex === questions.length - 1 ? (
              <MagneticButton onClick={() => setShowSubmitConfirm(true)}>
                Submit Exam
              </MagneticButton>
            ) : (
              <button
                onClick={nextQuestion}
                className="flex items-center gap-2 text-qeyafa-gold hover:text-qeyafa-gold/80"
              >
                Next <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </footer>

      {/* Submit Confirmation Modal */}
      <AnimatePresence>
        {showSubmitConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-[100] p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-qeyafa-black border border-white/20 rounded-2xl p-6 max-w-md w-full"
            >
              <h3 className="text-xl font-semibold text-white mb-4">
                Submit Assessment?
              </h3>

              <p className="text-white/60 mb-4">
                You have answered {answeredCount} out of {questions.length} questions.
              </p>

              {answeredCount < questions.length && (
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 mb-4">
                  <p className="text-yellow-400 text-sm flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    You have {questions.length - answeredCount} unanswered question(s).
                  </p>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => setShowSubmitConfirm(false)}
                  className="flex-1 py-3 border border-white/20 rounded-xl text-white hover:bg-white/5"
                >
                  Continue Exam
                </button>
                <MagneticButton
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Submitting...
                    </>
                  ) : (
                    'Submit Now'
                  )}
                </MagneticButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
