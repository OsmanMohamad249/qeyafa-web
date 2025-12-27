import { motion } from 'framer-motion';
import { useState } from 'react';

export function GlowInput({ label, error, ...props }) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative">
      <motion.label
        className={`
          absolute left-4 transition-all duration-300 pointer-events-none
          ${isFocused || props.value 
            ? 'top-1 text-xs text-qeyafa-gold' 
            : 'top-4 text-gray-400'}
        `}
        animate={{
          color: isFocused ? '#D4A017' : error ? '#EF4444' : '#9CA3AF'
        }}
      >
        {label}
      </motion.label>

      <motion.input
        {...props}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`
          w-full pt-6 pb-3 px-4 rounded-xl
          bg-white/5 border backdrop-blur-sm
          text-white placeholder-transparent
          outline-none transition-all duration-300
          ${error 
            ? 'border-red-500' 
            : isFocused 
              ? 'border-qeyafa-gold shadow-[0_0_20px_rgba(212,160,23,0.3)]' 
              : 'border-white/20'}
        `}
        animate={{
          boxShadow: isFocused
            ? '0 0 20px rgba(212, 160, 23, 0.3)'
            : 'none'
        }}
      />

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-400 text-sm mt-1 ml-1"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}

