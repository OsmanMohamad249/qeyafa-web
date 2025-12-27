import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/common/GlassCard';
import { MagneticButton } from '@/components/common/MagneticButton';
import { ScrollReveal } from '@/components/common/ScrollReveal';
import {
  Briefcase, MapPin, Clock, DollarSign, ChevronRight,
  Sparkles, Users, Zap, Shield, ArrowRight
} from 'lucide-react';

// Demo Jobs Data
const JOBS = [
  {
    id: 'senior-ai-engineer',
    title: 'Senior AI Engineer',
    title_ar: 'مهندس ذكاء اصطناعي أول',
    department: 'AI & Innovation',
    location: 'Riyadh, Saudi Arabia',
    remote: 'hybrid',
    employment_type: 'full_time',
    salary_range: '25,000 - 45,000 SAR',
    skills: ['Python', 'TensorFlow', 'Computer Vision', 'NLP'],
    posted_days_ago: 5
  },
  {
    id: 'product-designer',
    title: 'Senior Product Designer',
    title_ar: 'مصمم منتجات أول',
    department: 'Design',
    location: 'Riyadh, Saudi Arabia',
    remote: 'full',
    employment_type: 'full_time',
    salary_range: '18,000 - 28,000 SAR',
    skills: ['Figma', 'UI/UX', 'Design Systems', 'Prototyping'],
    posted_days_ago: 3
  },
  {
    id: 'backend-developer',
    title: 'Backend Developer',
    title_ar: 'مطور خلفي',
    department: 'Engineering',
    location: 'Riyadh, Saudi Arabia',
    remote: 'hybrid',
    employment_type: 'full_time',
    salary_range: '15,000 - 25,000 SAR',
    skills: ['Node.js', 'Python', 'Firebase', 'PostgreSQL'],
    posted_days_ago: 7
  }
];

const BENEFITS = [
  { icon: DollarSign, title: 'Competitive Salary', description: 'Above market rates with annual reviews' },
  { icon: Shield, title: 'Health Insurance', description: 'Comprehensive medical coverage for you and family' },
  { icon: Zap, title: 'Learning Budget', description: '$2,000 annual professional development' },
  { icon: Users, title: 'Remote Flexibility', description: 'Hybrid or fully remote options available' }
];

export default function Careers() {
  return (
    <div className="min-h-screen bg-qeyafa-black bg-grid-pattern">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-qeyafa-gold/10 border border-qeyafa-gold/30 px-4 py-2 rounded-full mb-6"
          >
            <Sparkles className="w-4 h-4 text-qeyafa-gold" />
            <span className="text-qeyafa-gold text-sm font-medium">We're Hiring!</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            Join the Future of{' '}
            <span className="gradient-text">AI Fashion</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/60 text-lg max-w-2xl mx-auto mb-8"
          >
            Build cutting-edge AI solutions that revolutionize the fashion industry.
            Work with talented people on meaningful problems.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <MagneticButton onClick={() => document.getElementById('jobs').scrollIntoView({ behavior: 'smooth' })}>
              View Open Positions <ArrowRight className="w-4 h-4 ml-2" />
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Why Join Qeyafa?
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {BENEFITS.map((benefit, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <GlassCard className="h-full">
                  <div className="w-12 h-12 bg-qeyafa-gold/20 rounded-xl flex items-center justify-center mb-4">
                    <benefit.icon className="w-6 h-6 text-qeyafa-gold" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
                  <p className="text-white/60 text-sm">{benefit.description}</p>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Jobs Section */}
      <section id="jobs" className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-white text-center mb-4">
              Open Positions
            </h2>
            <p className="text-white/60 text-center mb-12">
              {JOBS.length} open roles across our teams
            </p>
          </ScrollReveal>

          <div className="space-y-4">
            {JOBS.map((job, index) => (
              <ScrollReveal key={job.id} delay={index * 0.1}>
                <JobCard job={job} />
              </ScrollReveal>
            ))}
          </div>

          {/* General Application CTA */}
          <ScrollReveal delay={0.4}>
            <div className="mt-12 text-center">
              <p className="text-white/60 mb-4">
                Don't see a role that fits? We're always looking for talented people.
              </p>
              <Link to="/apply">
                <MagneticButton variant="outline">
                  Submit General Application
                </MagneticButton>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <GlassCard variant="gold" hover={false} className="text-center py-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Make an Impact?
            </h2>
            <p className="text-white/70 mb-8 max-w-lg mx-auto">
              Join our mission to transform the fashion industry with AI.
              Your next career adventure starts here.
            </p>
            <Link to="/apply">
              <MagneticButton size="lg">
                Apply Now <ChevronRight className="w-5 h-5 ml-2" />
              </MagneticButton>
            </Link>
          </GlassCard>
        </div>
      </section>
    </div>
  );
}

function JobCard({ job }) {
  return (
    <Link to={`/apply/${job.id}`}>
      <motion.div
        whileHover={{ scale: 1.02, x: 5 }}
        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6
                   hover:border-qeyafa-gold/40 hover:bg-white/10 transition-all cursor-pointer group"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-xl font-semibold text-white group-hover:text-qeyafa-gold transition-colors">
                {job.title}
              </h3>
              {job.posted_days_ago <= 7 && (
                <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full">
                  New
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-4 text-white/60 text-sm mb-3">
              <span className="flex items-center gap-1">
                <Briefcase className="w-4 h-4" />
                {job.department}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {job.location}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {job.remote === 'full' ? 'Remote' : job.remote === 'hybrid' ? 'Hybrid' : 'On-site'}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {job.skills.slice(0, 4).map((skill, i) => (
                <span
                  key={i}
                  className="px-2 py-1 bg-qeyafa-primary/20 text-qeyafa-gold/80 text-xs rounded"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden md:block">
              <p className="text-white font-medium">{job.salary_range}</p>
              <p className="text-white/50 text-sm">Monthly</p>
            </div>
            <ChevronRight className="w-5 h-5 text-white/50 group-hover:text-qeyafa-gold group-hover:translate-x-1 transition-all" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
