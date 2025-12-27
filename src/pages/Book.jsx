import { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/common/GlassCard';
import { ArrowRight, CheckCircle } from 'lucide-react';

const steps = ['Style', 'Measurement', 'Confirm'];
const styles = ['Saudi Style', 'Kuwaiti Style', 'Qatari Style'];
const methods = ['AI Body Scan (Recommended)', 'Manual Entry'];

const Book = () => {
  const [step, setStep] = useState(0);
  const [selection, setSelection] = useState({ style: styles[0], method: methods[0] });

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <div className="min-h-screen bg-qeyafa-black bg-grid-pattern selection:bg-qeyafa-gold/30 py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-qeyafa-gold text-sm uppercase tracking-[0.3em] mb-3">Measurement Booking</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white">Start Your Experience</h1>
        </div>

        <div className="flex justify-center gap-4 mb-8 flex-wrap">
          {steps.map((label, idx) => (
            <div
              key={label}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
                idx === step ? 'border-qeyafa-gold text-qeyafa-gold' : 'border-white/10 text-white/50'
              }`}
            >
              {label}
            </div>
          ))}
        </div>

        <GlassCard className="p-8 border-qeyafa-gold/30">
          {step === 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white mb-4">Choose Your Style</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {styles.map((style) => (
                  <button
                    key={style}
                    onClick={() => setSelection((s) => ({ ...s, style }))}
                    className={`p-4 rounded-xl border transition-colors text-white/80 hover:text-white ${
                      selection.style === style ? 'border-qeyafa-gold bg-qeyafa-gold/10' : 'border-white/10 hover:bg-white/5'
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white mb-4">Select Measurement Method</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {methods.map((method) => (
                  <button
                    key={method}
                    onClick={() => setSelection((s) => ({ ...s, method }))}
                    className={`p-4 rounded-xl border transition-colors text-white/80 hover:text-white ${
                      selection.method === method ? 'border-qeyafa-gold bg-qeyafa-gold/10' : 'border-white/10 hover:bg-white/5'
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 text-white">
              <h2 className="text-2xl font-bold mb-2">Request Received</h2>
              <p className="text-white/70">We will confirm your measurement appointment shortly.</p>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <p className="text-white/80"><strong>Style:</strong> {selection.style}</p>
                <p className="text-white/80"><strong>Method:</strong> {selection.method}</p>
              </div>
            </div>
          )}

          <div className="flex justify-between items-center mt-8">
            <button
              onClick={prev}
              disabled={step === 0}
              className="text-white/60 hover:text-white disabled:opacity-30"
            >
              Back
            </button>
            {step < steps.length - 1 ? (
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={next}
                className="px-6 py-3 rounded-xl bg-qeyafa-gold text-qeyafa-black font-bold flex items-center gap-2 hover:bg-white"
              >
                Next <ArrowRight className="w-5 h-5" />
              </motion.button>
            ) : (
              <div className="flex items-center gap-2 text-green-400">
                <CheckCircle className="w-5 h-5" />
                Done
              </div>
            )}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default Book;

