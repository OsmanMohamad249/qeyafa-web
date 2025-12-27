import { db } from '../firebase/config';
import { collection, doc, getDoc, getDocs, query, where, limit, addDoc, updateDoc, Timestamp } from 'firebase/firestore';

/**
 * @typedef {Object} Candidate
 * @property {string} id
 * @property {string} email
 * @property {string} phone
 * @property {string} full_name
 * @property {string} [full_name_ar]
 * @property {number} current_salary
 * @property {number} expected_salary
 * @property {'SAR' | 'USD' | 'AED'} currency
 * @property {number} notice_period
 * @property {string} [github_url]
 * @property {string} [linkedin_url]
 * @property {string} [portfolio_url]
 * @property {string} cv_url
 * @property {Object|null} ai_analysis_json
 * @property {'within' | 'over' | 'under'} budget_status
 * @property {number} [budget_diff_percentage]
 * @property {string} tracking_token
 * @property {string} magic_link_url
 * @property {string} job_id
 * @property {string} job_title
 * @property {string} status
 * @property {Object[]} status_history
 * @property {string|null} agency_id
 * @property {boolean} has_otp_verified
 * @property {boolean} has_password
 * @property {string|null} firebase_uid
 * @property {Timestamp} applied_at
 * @property {Timestamp} updated_at
 * @property {Timestamp} last_activity_at
 */

const COLLECTION_NAME = 'candidates';

export const candidatesService = {
  /**
   * Create a new candidate application
   * @param {Omit<Candidate, 'id' | 'applied_at' | 'updated_at' | 'last_activity_at'>} candidateData
   * @returns {Promise<string>} Candidate ID
   */
  createApplication: async (candidateData) => {
    const now = Timestamp.now();
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...candidateData,
      applied_at: now,
      updated_at: now,
      last_activity_at: now,
      status: 'new',
      status_history: [{
        from: 'new',
        to: 'new',
        changed_by: 'system',
        timestamp: now
      }]
    });
    return docRef.id;
  },

  /**
   * Get candidate by tracking token
   * @param {string} token
   * @returns {Promise<Candidate|null>}
   */
  getCandidateByToken: async (token) => {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('tracking_token', '==', token),
      limit(1)
    );
    const snapshot = await getDocs(q);
    if (snapshot.empty) return null;
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() };
  },

  /**
   * Update candidate status
   * @param {string} id
   * @param {string} newStatus
   * @param {string} changedBy
   * @param {string} [reason]
   */
  updateStatus: async (id, newStatus, changedBy, reason) => {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) throw new Error('Candidate not found');

    const currentData = docSnap.data();
    const now = Timestamp.now();

    const newHistoryEntry = {
      from: currentData.status,
      to: newStatus,
      changed_by: changedBy,
      timestamp: now,
      ...(reason && { reason })
    };

    await updateDoc(docRef, {
      status: newStatus,
      status_history: [...currentData.status_history, newHistoryEntry],
      updated_at: now,
      last_activity_at: now
    });
  }
};
