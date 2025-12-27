/**
 * Budget Comparison Logic
 * Compare expected_salary vs job.budget_range silently
 * Do NOT reject over-budget candidates — flag them internally
 */

export function checkBudget(expectedSalary, budgetRange) {
  const midBudget = (budgetRange.min + budgetRange.max) / 2;
  const diff = ((expectedSalary - midBudget) / midBudget) * 100;

  if (expectedSalary <= budgetRange.max) {
    return {
      status: 'within',
      diff_percentage: Math.round(diff),
      flag_color: 'green' // Good to go
    };
  }

  if (expectedSalary <= budgetRange.max * 1.2) {
    return {
      status: 'over',
      diff_percentage: Math.round(diff),
      flag_color: 'yellow' // 0-20% over → Warning (negotiable)
    };
  }

  return {
    status: 'over',
    diff_percentage: Math.round(diff),
    flag_color: 'red' // >20% over → Flag but don't reject
  };
}

/**
 * Generate a UUID v4 tracking token
 */
export function generateTrackingToken() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * Generate magic link URL for status checking
 */
export function generateMagicLink(trackingToken) {
  const baseUrl = import.meta.env.VITE_APP_URL || 'https://qeyafa.ai';
  return `${baseUrl}/status/${trackingToken}`;
}

/**
 * Calculate interview weighted score
 */
export function calculateWeightedScore(scores) {
  const weights = {
    technical: 0.5,   // 50%
    cultural: 0.3,    // 30%
    soft_skills: 0.2  // 20%
  };

  let totalWeightedScore = 0;

  for (const category of scores) {
    const normalizedScore = (category.score / 5) * 100; // Convert 1-5 to 0-100
    totalWeightedScore += normalizedScore * (weights[category.name] || 0);
  }

  return Math.round(totalWeightedScore);
}

/**
 * Format time remaining (seconds) to MM:SS
 */
export function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Validate email format
 */
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone number (international format)
 */
export function isValidPhone(phone) {
  const phoneRegex = /^\+?[1-9]\d{6,14}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

/**
 * Validate URL
 */
export function isValidUrl(url) {
  if (!url) return true; // Optional fields
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Get candidate status display info
 */
export function getStatusInfo(status) {
  const statusMap = {
    new: { label: 'Application Received', color: 'blue', icon: '📥' },
    ai_screening: { label: 'Under Review', color: 'yellow', icon: '🔍' },
    ai_flagged: { label: 'Additional Review', color: 'orange', icon: '⚠️' },
    pending_review: { label: 'Pending Review', color: 'yellow', icon: '⏳' },
    approved: { label: 'Approved', color: 'green', icon: '✅' },
    assessment_invited: { label: 'Assessment Invited', color: 'blue', icon: '📧' },
    assessment_in_progress: { label: 'Assessment In Progress', color: 'blue', icon: '📝' },
    assessment_completed: { label: 'Assessment Completed', color: 'green', icon: '✔️' },
    interview_scheduled: { label: 'Interview Scheduled', color: 'purple', icon: '📅' },
    interview_completed: { label: 'Interview Completed', color: 'green', icon: '🎤' },
    offer_pending: { label: 'Offer Pending', color: 'yellow', icon: '📋' },
    offer_sent: { label: 'Offer Sent', color: 'gold', icon: '🎁' },
    offer_accepted: { label: 'Offer Accepted', color: 'green', icon: '🎉' },
    offer_rejected: { label: 'Offer Declined', color: 'red', icon: '❌' },
    negotiation: { label: 'In Negotiation', color: 'orange', icon: '💬' },
    hired: { label: 'Hired', color: 'green', icon: '🏆' },
    rejected: { label: 'Not Selected', color: 'red', icon: '❌' },
    withdrawn: { label: 'Withdrawn', color: 'gray', icon: '↩️' }
  };

  return statusMap[status] || { label: status, color: 'gray', icon: '❓' };
}

