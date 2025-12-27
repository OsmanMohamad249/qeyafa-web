import { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/common/GlassCard';

const PartnerRegister = () => {
  const [type, setType] = useState('tailor');
  const [form, setForm] = useState({
    atelierName: '',
    location: '',
    capacity: '',
    companyName: '',
    fabricTypes: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-qeyafa-black bg-grid-pattern flex items-center justify-center px-4">
        <GlassCard className="max-w-2xl w-full text-center p-10 border-qeyafa-gold/40">
          <h1 className="text-3xl font-bold text-white mb-4">Application Received</h1>
          <p className="text-white/60">Our partnerships team will reach out shortly.</p>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-qeyafa-black bg-grid-pattern selection:bg-qeyafa-gold/30 py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-qeyafa-gold text-sm uppercase tracking-[0.3em] mb-3">Ecosystem Registration</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">Join the Qeyafa Hub</h1>
          <p className="text-white/60">Choose your role and submit your details to get started.</p>
        </div>

        <GlassCard className="p-8 border-qeyafa-gold/30">
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setType('tailor')}
              className={`flex-1 py-3 rounded-xl border transition-colors ${
                type === 'tailor'
                  ? 'border-qeyafa-gold bg-qeyafa-gold/10 text-qeyafa-gold'
                  : 'border-white/10 text-white/70 hover:bg-white/5'
              }`}
            >
              I am a Tailor
            </button>
            <button
              onClick={() => setType('supplier')}
              className={`flex-1 py-3 rounded-xl border transition-colors ${
                type === 'supplier'
                  ? 'border-qeyafa-gold bg-qeyafa-gold/10 text-qeyafa-gold'
                  : 'border-white/10 text-white/70 hover:bg-white/5'
              }`}
            >
              I am a Supplier
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {type === 'tailor' ? (
              <>
                <div>
                  <label className="text-white/70 text-sm block mb-2">Atelier Name</label>
                  <input
                    type="text"
                    name="atelierName"
                    value={form.atelierName}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-qeyafa-gold"
                  />
                </div>
                <div>
                  <label className="text-white/70 text-sm block mb-2">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-qeyafa-gold"
                  />
                </div>
                <div>
                  <label className="text-white/70 text-sm block mb-2">Capacity (items/week)</label>
                  <input
                    type="number"
                    name="capacity"
                    value={form.capacity}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-qeyafa-gold"
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="text-white/70 text-sm block mb-2">Company Name</label>
                  <input
                    type="text"
                    name="companyName"
                    value={form.companyName}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-qeyafa-gold"
                  />
                </div>
                <div>
                  <label className="text-white/70 text-sm block mb-2">Fabric Types (e.g., Cotton, Wool)</label>
                  <input
                    type="text"
                    name="fabricTypes"
                    value={form.fabricTypes}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-qeyafa-gold"
                    placeholder="Cotton, Wool, Linen"
                  />
                </div>
              </>
            )}

            <motion.button
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-3 rounded-xl bg-qeyafa-gold text-qeyafa-black font-bold flex items-center justify-center gap-2 hover:bg-white transition-colors"
            >
              Submit Application
            </motion.button>
          </form>
        </GlassCard>
      </div>
    </div>
  );
};

export default PartnerRegister;

