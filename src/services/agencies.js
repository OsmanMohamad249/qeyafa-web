import { db } from '../firebase/config';
import { collection, doc, getDoc, getDocs, query, where, limit, updateDoc, Timestamp } from 'firebase/firestore';

/**
 * @typedef {Object} Agency
 * @property {string} id
 * @property {string} name
 * @property {string} [name_ar]
 * @property {string} contact_email
 * @property {string} contact_phone
 * @property {string} contact_person
 * @property {string} firebase_uid
 * @property {string[]} assigned_candidates
 * @property {string[]} permissions
 * @property {Timestamp} contract_start
 * @property {Timestamp} contract_end
 * @property {number} commission_percentage
 * @property {'active' | 'suspended' | 'expired'} status
 * @property {Timestamp} created_at
 * @property {Timestamp} updated_at
 * @property {Timestamp} [last_login_at]
 */

const COLLECTION_NAME = 'agencies';

export const agenciesService = {
  /**
   * Get agency by Firebase UID
   * @param {string} uid
   * @returns {Promise<Agency|null>}
   */
  getAgencyByUid: async (uid) => {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('firebase_uid', '==', uid),
      limit(1)
    );
    const snapshot = await getDocs(q);
    if (snapshot.empty) return null;
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() };
  },

  /**
   * Assign candidate to agency
   * @param {string} agencyId
   * @param {string} candidateId
   */
  assignCandidate: async (agencyId, candidateId) => {
    const docRef = doc(db, COLLECTION_NAME, agencyId);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) throw new Error('Agency not found');

    const currentCandidates = docSnap.data().assigned_candidates || [];
    if (currentCandidates.includes(candidateId)) return;

    await updateDoc(docRef, {
      assigned_candidates: [...currentCandidates, candidateId],
      updated_at: Timestamp.now()
    });
  }
};
