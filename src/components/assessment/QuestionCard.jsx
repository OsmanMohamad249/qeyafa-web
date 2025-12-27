import { motion } from 'framer-motion';

export function QuestionCard({ question, answer, onAnswer, questionNumber, totalQuestions }) {
  const isMultipleChoice = question.options && question.options.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10"
    >
      {/* Question Header */}
      <div className="flex items-center justify-between mb-6">
        <span className={`
          px-3 py-1 rounded-full text-sm font-medium
          ${question.type === 'iq_logic' 
            ? 'bg-blue-500/20 text-blue-400' 
            : question.type === 'core_tech' 
              ? 'bg-green-500/20 text-green-400' 
              : 'bg-purple-500/20 text-purple-400'}
        `}>
          {question.type === 'iq_logic'
            ? '🧠 Logic'
            : question.type === 'core_tech'
              ? '💻 Technical'
              : '📋 Case Study'}
        </span>
        <span className="text-white/50 text-sm">
          {question.points} points
        </span>
      </div>

      {/* Question Text */}
      <h3 className="text-xl font-medium text-white mb-6 leading-relaxed">
        {question.question_text}
      </h3>

      {/* Answer Section */}
      {isMultipleChoice ? (
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => onAnswer(option)}
              className={`
                w-full text-left p-4 rounded-xl border transition-all duration-300
                ${answer === option 
                  ? 'bg-qeyafa-gold/20 border-qeyafa-gold text-white' 
                  : 'bg-white/5 border-white/10 text-white/80 hover:border-qeyafa-gold/50 hover:bg-white/10'}
              `}
            >
              <span className="inline-block w-8 h-8 rounded-full bg-white/10 text-center leading-8 mr-3 font-medium">
                {String.fromCharCode(65 + index)}
              </span>
              {option}
            </button>
          ))}
        </div>
      ) : (
        <textarea
          value={answer || ''}
          onChange={(e) => onAnswer(e.target.value)}
          placeholder="Type your answer here..."
          className="
            w-full h-40 p-4 rounded-xl
            bg-white/5 border border-white/20
            text-white placeholder-white/30
            outline-none resize-none
            focus:border-qeyafa-gold transition-colors
          "
        />
      )}

      {/* Suggested Time */}
      <p className="text-white/40 text-sm mt-4">
        💡 Suggested time: {Math.round(question.time_suggested_seconds / 60)} min
      </p>
    </motion.div>
  );
}

