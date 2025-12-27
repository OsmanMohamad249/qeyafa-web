import { db } from '../firebase/config';
import { collection, doc, getDoc, getDocs, query, where, addDoc, updateDoc, Timestamp } from 'firebase/firestore';

/**
 * @typedef {Object} Assessment
 * @property {string} id
 * @property {string} candidate_id
 * @property {string} job_id
 * @property {Object[]} questions
 * @property {Timestamp|null} start_time
 * @property {Timestamp|null} end_time
 * @property {number} time_limit_minutes
 * @property {number} [time_remaining_seconds]
 * @property {number} cheat_strikes
 * @property {Object[]} cheat_events
 * @property {boolean} is_terminated
 * @property {string} [termination_reason]
 * @property {Object[]} answers
 * @property {number|null} score
 * @property {Object|null} score_breakdown
 * @property {string} session_token
 * @property {string} ip_address
 * @property {string} user_agent
 * @property {string} status
 * @property {Timestamp} invited_at
 * @property {Timestamp} created_at
 * @property {Timestamp} updated_at
 * @property {Timestamp} [submitted_at]
 */

const COLLECTION_NAME = 'assessments';

export const assessmentsService = {
  /**
   * Create a new assessment invite
   * @param {string} candidateId
   * @param {string} jobId
   * @param {Object[]} questions
   * @returns {Promise<string>} Assessment ID
   */
  createAssessment: async (candidateId, jobId, questions) => {
    const now = Timestamp.now();
    // Generate a random session token (in real app use crypto)
    const sessionToken = Math.random().toString(36).substring(2) + Date.now().toString(36);

    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      candidate_id: candidateId,
      job_id: jobId,
      questions,
      start_time: null,
      end_time: null,
      time_limit_minutes: 60,
      cheat_strikes: 0,
      cheat_events: [],
      is_terminated: false,
      answers: [],
      score: null,
      score_breakdown: null,
      session_token: sessionToken,
      status: 'invited',
      invited_at: now,
      created_at: now,
      updated_at: now
    });
    return docRef.id;
  },

  /**
   * Start assessment
   * @param {string} id
   * @param {string} ipAddress
   * @param {string} userAgent
   */
  startAssessment: async (id, ipAddress, userAgent) => {
    const docRef = doc(db, COLLECTION_NAME, id);
    const now = Timestamp.now();
    await updateDoc(docRef, {
      start_time: now,
      status: 'in_progress',
      ip_address: ipAddress,
      user_agent: userAgent,
      updated_at: now
    });
  },

  /**
   * Submit answer
   * @param {string} id
   * @param {string} questionId
   * @param {string} answerText
   * @param {number} timeSpentSeconds
   */
  submitAnswer: async (id, questionId, answerText, timeSpentSeconds) => {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) throw new Error('Assessment not found');

    const currentAnswers = docSnap.data().answers || [];
    const newAnswer = {
      question_id: questionId,
      answer_text: answerText,
      answered_at: Timestamp.now(),
      time_spent_seconds: timeSpentSeconds
    };

    // Remove existing answer for this question if any
    const filteredAnswers = currentAnswers.filter(a => a.question_id !== questionId);

    await updateDoc(docRef, {
      answers: [...filteredAnswers, newAnswer],
      updated_at: Timestamp.now()
    });
  },

  /**
   * Log cheat event
   * @param {string} id
   * @param {'tab_switch' | 'minimize' | 'copy' | 'paste'} eventType
   */
  logCheatEvent: async (id, eventType) => {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return;

    const data = docSnap.data();
    const newStrikeCount = (data.cheat_strikes || 0) + 1;
    const actionTaken = newStrikeCount >= 3 ? 'terminate' : 'warning';

    const newEvent = {
      event_type: eventType,
      timestamp: Timestamp.now(),
      strike_count_after: newStrikeCount,
      action_taken: actionTaken
    };

    const updates = {
      cheat_strikes: newStrikeCount,
      cheat_events: [...(data.cheat_events || []), newEvent],
      updated_at: Timestamp.now()
    };

    if (actionTaken === 'terminate') {
      updates.is_terminated = true;
      updates.status = 'terminated';
      updates.termination_reason = 'Excessive cheat strikes';
      updates.end_time = Timestamp.now();
    }

    await updateDoc(docRef, updates);
  }
};

