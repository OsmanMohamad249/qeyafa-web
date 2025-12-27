import { useState, useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/common/GlassCard';
import { MagneticButton } from '@/components/common/MagneticButton';
import {
  Users, Briefcase, FileText, Clock, CheckCircle, XCircle,
  AlertTriangle, TrendingUp, Calendar, Loader2
} from 'lucide-react';

// Demo data
const DEMO_STATS = {
  total_candidates: 156,
  pending_review: 23,
  approved: 45,
  rejected: 88,
  this_week_applications: 12
};

const DEMO_CANDIDATES = [
  {
    id: '1',
    full_name: 'Mohammed Al-Harbi',
    email: 'mohammed@example.com',
    job_title: 'Senior AI Engineer',
    status: 'pending_review',
    match_score: 87,
    expected_salary: 35000,
    budget_status: 'within',
    applied_at: new Date('2024-12-20')
  },
  {
    id: '2',
    full_name: 'Fatima Hassan',
    email: 'fatima@example.com',
    job_title: 'Product Designer',
    status: 'approved',
    match_score: 92,
    expected_salary: 28000,
    budget_status: 'within',
    applied_at: new Date('2024-12-19')
  },
  {
    id: '3',
    full_name: 'Ahmed Ali',
    email: 'ahmed@example.com',
    job_title: 'Backend Developer',
    status: 'ai_flagged',
    match_score: 65,
    expected_salary: 50000,
    budget_status: 'over',
    applied_at: new Date('2024-12-18')
  }
];

export default function Dashboard() {
  useAuthStore();
  const [stats] = useState(DEMO_STATS);
  const [candidates] = useState(DEMO_CANDIDATES);
  const [selectedTab, setSelectedTab] = useState('pending_review');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const filteredCandidates = candidates.filter(c =>
    selectedTab === 'all' ? true : c.status === selectedTab
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-qeyafa-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-qeyafa-gold animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-qeyafa-black bg-grid-pattern">
      {/* Header */}
      <header className="bg-qeyafa-black/90 backdrop-blur-lg border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-white/50 text-sm">Manage candidates and recruitment pipeline</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-white/70">Welcome, Admin</span>
              <div className="w-10 h-10 bg-qeyafa-gold rounded-full flex items-center justify-center text-qeyafa-black font-bold">
                A
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <StatsCard
            icon={Users}
            label="Total Candidates"
            value={stats.total_candidates}
            color="blue"
          />
          <StatsCard
            icon={Clock}
            label="Pending Review"
            value={stats.pending_review}
            color="yellow"
          />
          <StatsCard
            icon={CheckCircle}
            label="Approved"
            value={stats.approved}
            color="green"
          />
          <StatsCard
            icon={XCircle}
            label="Rejected"
            value={stats.rejected}
            color="red"
          />
          <StatsCard
            icon={TrendingUp}
            label="This Week"
            value={stats.this_week_applications}
            color="purple"
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {[
            { key: 'pending_review', label: 'Pending Review', count: stats.pending_review },
            { key: 'approved', label: 'Approved', count: stats.approved },
            { key: 'ai_flagged', label: 'AI Flagged', count: 5 },
            { key: 'all', label: 'All Candidates', count: stats.total_candidates }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setSelectedTab(tab.key)}
              className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                selectedTab === tab.key
                  ? 'bg-qeyafa-gold text-qeyafa-black'
                  : 'bg-white/5 text-white/70 hover:bg-white/10'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Candidates Table */}
        <GlassCard hover={false}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-white/50 font-medium">Candidate</th>
                  <th className="text-left py-3 px-4 text-white/50 font-medium">Position</th>
                  <th className="text-left py-3 px-4 text-white/50 font-medium">Match Score</th>
                  <th className="text-left py-3 px-4 text-white/50 font-medium">Salary</th>
                  <th className="text-left py-3 px-4 text-white/50 font-medium">Status</th>
                  <th className="text-left py-3 px-4 text-white/50 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCandidates.map(candidate => (
                  <CandidateRow key={candidate.id} candidate={candidate} />
                ))}
              </tbody>
            </table>

            {filteredCandidates.length === 0 && (
              <div className="text-center py-12 text-white/50">
                No candidates found in this category.
              </div>
            )}
          </div>
        </GlassCard>
      </main>
    </div>
  );
}

function StatsCard({ icon, label, value, color }) {
  const Icon = icon;
  const colors = {
    blue: 'bg-blue-500/20 text-blue-400',
    yellow: 'bg-yellow-500/20 text-yellow-400',
    green: 'bg-green-500/20 text-green-400',
    red: 'bg-red-500/20 text-red-400',
    purple: 'bg-purple-500/20 text-purple-400'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10"
    >
      <div className={`w-10 h-10 rounded-lg ${colors[color]} flex items-center justify-center mb-3`}>
        <Icon className="w-5 h-5" />
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-white/50 text-sm">{label}</p>
    </motion.div>
  );
}

function CandidateRow({ candidate }) {
  const getStatusBadge = (status) => {
    const badges = {
      pending_review: { bg: 'bg-yellow-500/20', text: 'text-yellow-400', label: 'Pending' },
      approved: { bg: 'bg-green-500/20', text: 'text-green-400', label: 'Approved' },
      rejected: { bg: 'bg-red-500/20', text: 'text-red-400', label: 'Rejected' },
      ai_flagged: { bg: 'bg-orange-500/20', text: 'text-orange-400', label: 'AI Flagged' }
    };
    return badges[status] || badges.pending_review;
  };

  const badge = getStatusBadge(candidate.status);

  return (
    <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
      <td className="py-4 px-4">
        <div>
          <p className="font-medium text-white">{candidate.full_name}</p>
          <p className="text-white/50 text-sm">{candidate.email}</p>
        </div>
      </td>
      <td className="py-4 px-4 text-white/70">{candidate.job_title}</td>
      <td className="py-4 px-4">
        <div className="flex items-center gap-2">
          <div className="w-12 h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className={`h-full ${candidate.match_score >= 80 ? 'bg-green-500' : candidate.match_score >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
              style={{ width: `${candidate.match_score}%` }}
            />
          </div>
          <span className="text-white font-medium">{candidate.match_score}%</span>
        </div>
      </td>
      <td className="py-4 px-4">
        <div className="flex items-center gap-2">
          <span className="text-white">{candidate.expected_salary.toLocaleString()} SAR</span>
          {candidate.budget_status === 'over' && (
            <AlertTriangle className="w-4 h-4 text-orange-400" />
          )}
        </div>
      </td>
      <td className="py-4 px-4">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${badge.bg} ${badge.text}`}>
          {badge.label}
        </span>
      </td>
      <td className="py-4 px-4">
        <div className="flex gap-2">
          <button className="px-3 py-1 bg-green-500/20 text-green-400 rounded-lg text-sm hover:bg-green-500/30 transition-colors">
            Approve
          </button>
          <button className="px-3 py-1 bg-red-500/20 text-red-400 rounded-lg text-sm hover:bg-red-500/30 transition-colors">
            Reject
          </button>
        </div>
      </td>
    </tr>
  );
}

