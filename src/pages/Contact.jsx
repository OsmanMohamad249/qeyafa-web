import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <div className="min-h-screen bg-qeyafa-black bg-grid-pattern pt-24 pb-16">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-qeyafa-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-qeyafa-gold/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="subheading-luxury">Get In Touch</span>
          <h1 className="heading-luxury heading-lg text-white mt-4 mb-6">
            Contact <span className="text-gradient-gold">Us</span>
          </h1>
          <p className="text-xl text-white/60 max-w-3xl mx-auto">
            Coming soon...
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
