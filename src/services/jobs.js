import { db } from '../firebase/config';
import { collection, doc, getDoc, getDocs, query, where, orderBy, limit, addDoc, updateDoc, Timestamp } from 'firebase/firestore';

/**
 * @typedef {Object} Job
 * @property {string} id
 * @property {string} title
 * @property {string} [title_ar]
 * @property {string} slug
 * @property {Object} budget_range
 * @property {number} budget_range.min
 * @property {number} budget_range.max
 * @property {'SAR' | 'USD' | 'AED'} budget_range.currency
 * @property {string[]} skills
 * @property {Object} experience_years
 * @property {number} experience_years.min
 * @property {number} [experience_years.max]
 * @property {'high_school' | 'bachelor' | 'master' | 'phd' | 'any'} education_level
 * @property {string} department
 * @property {Object} location
 * @property {string} location.city
 * @property {string} location.country
 * @property {'no' | 'hybrid' | 'full'} location.remote
 * @property {'full_time' | 'part_time' | 'contract' | 'internship'} employment_type
 * @property {string} description
 * @property {string} [description_ar]
 * @property {string[]} responsibilities
 * @property {string[]} benefits
 * @property {'draft' | 'active' | 'paused' | 'closed' | 'filled'} status
 * @property {number} views_count
 * @property {number} applications_count
 * @property {Timestamp} created_at
 * @property {Timestamp} updated_at
 * @property {Timestamp} [published_at]
 * @property {Timestamp} [closes_at]
 * @property {string} created_by
 */

const COLLECTION_NAME = 'jobs';

export const jobsService = {
  /**
   * Get all active jobs
   * @returns {Promise<Job[]>}
   */
  getActiveJobs: async () => {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('status', '==', 'active'),
      orderBy('published_at', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  /**
   * Get job by slug
   * @param {string} slug
   * @returns {Promise<Job|null>}
   */
  getJobBySlug: async (slug) => {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('slug', '==', slug),
      where('status', '==', 'active'),
      limit(1)
    );
    const snapshot = await getDocs(q);
    if (snapshot.empty) return null;
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() };
  },

  /**
   * Get job by ID
   * @param {string} id
   * @returns {Promise<Job|null>}
   */
  getJobById: async (id) => {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return null;
    return { id: docSnap.id, ...docSnap.data() };
  },

  /**
   * Create a new job (Admin only)
   * @param {Omit<Job, 'id' | 'created_at' | 'updated_at'>} jobData
   * @returns {Promise<string>} Job ID
   */
  createJob: async (jobData) => {
    const now = Timestamp.now();
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...jobData,
      created_at: now,
      updated_at: now,
      views_count: 0,
      applications_count: 0
    });
    return docRef.id;
  },

  /**
   * Increment view count
   * @param {string} id
   */
  incrementViews: async (id) => {
    // Note: In a real app, use increment() from firestore
    // keeping it simple for now or use a cloud function
    // const docRef = doc(db, COLLECTION_NAME, id);
    // await updateDoc(docRef, { views_count: increment(1) });
  }
};
