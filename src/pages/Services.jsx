import { motion } from 'framer-motion';

const Services = () => {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Our Services
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Coming soon...
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Services;
