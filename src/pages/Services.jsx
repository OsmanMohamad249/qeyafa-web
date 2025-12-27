import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Zap, Users } from 'lucide-react';

const Services = () => {
  const { t } = useTranslation();

  const services = [
    {
      title: t('features.engine.title'),
      description: t('features.engine.desc'),
      icon: Zap
    },
    {
      title: t('features.marketplace.title'),
      description: t('features.marketplace.desc'),
      icon: Users
    }
  ];

  return (
    <div className="min-h-screen bg-qeyafa-black bg-grid-pattern pt-24 pb-16">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-qeyafa-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-qeyafa-gold/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="subheading-luxury">What We Offer</span>
          <h1 className="heading-luxury heading-lg text-white mt-4 mb-6">
            Our <span className="text-gradient-gold">Services</span>
          </h1>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card-luxury"
            >
              <div className="w-12 h-12 rounded-lg bg-qeyafa-primary/20 flex items-center justify-center mb-6">
                <service.icon className="w-6 h-6 text-qeyafa-gold" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">{service.title}</h3>
              <p className="text-white/60 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
