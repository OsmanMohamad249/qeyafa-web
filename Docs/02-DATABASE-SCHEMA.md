# Qeyafa AI — Database Schema

> **Firestore Collections:** Strict typing for the Qeyafa Talent Management Ecosystem (QTME).

---

## 1. Schema Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    FIRESTORE COLLECTIONS                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────┐     ┌─────────────┐     ┌─────────────┐       │
│  │    jobs     │────▶│ candidates  │────▶│ assessments │       │
│  └─────────────┘     └─────────────┘     └─────────────┘       │
│         │                   │                   │                │
│         │                   │                   │                │
│         │            ┌──────┴──────┐            │                │
│         │            │             │            │                │
│         │            ▼             │            │                │
│         │     ┌─────────────┐      │            │                │
│         └────▶│  agencies   │◀─────┘            │                │
│               └─────────────┘                   │                │
│                      │                          │                │
│                      └──────────────────────────┘                │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Collection: `jobs`

> Active job postings on the platform.

### 2.1 Document Structure

```typescript
interface Job {
  // Document ID: Auto-generated Firestore ID
  
  id: string;                       // Same as document ID
  title: string;                    // Job title
  title_ar?: string;                // Arabic title
  slug: string;                     // URL-friendly identifier
  
  // Budget & Salary
  budget_range: {
    min: number;                    // Minimum budget (monthly)
    max: number;                    // Maximum budget (monthly)
    currency: 'SAR' | 'USD' | 'AED';
  };
  
  // Requirements
  skills: string[];                 // Required skills array
  experience_years: {
    min: number;
    max?: number;
  };
  education_level: 'high_school' | 'bachelor' | 'master' | 'phd' | 'any';
  
  // Classification
  department: string;
  location: {
    city: string;
    country: string;
    remote: 'no' | 'hybrid' | 'full';
  };
  employment_type: 'full_time' | 'part_time' | 'contract' | 'internship';
  
  // Description
  description: string;              // Markdown content
  description_ar?: string;
  responsibilities: string[];
  benefits: string[];
  
  // Status
  status: 'draft' | 'active' | 'paused' | 'closed' | 'filled';
  
  // Metrics
  views_count: number;
  applications_count: number;
  
  // Timestamps
  created_at: Timestamp;
  updated_at: Timestamp;
  published_at?: Timestamp;
  closes_at?: Timestamp;
  
  // Admin
  created_by: string;               // Admin UID
}
```

### 2.2 Example Document

```json
{
  "id": "job_senior_ai_engineer",
  "title": "Senior AI Engineer",
  "title_ar": "مهندس ذكاء اصطناعي أول",
  "slug": "senior-ai-engineer-riyadh",
  "budget_range": {
    "min": 25000,
    "max": 45000,
    "currency": "SAR"
  },
  "skills": ["Python", "TensorFlow", "Computer Vision", "NLP", "Docker"],
  "experience_years": {
    "min": 5,
    "max": 10
  },
  "education_level": "master",
  "department": "AI & Innovation",
  "location": {
    "city": "Riyadh",
    "country": "Saudi Arabia",
    "remote": "hybrid"
  },
  "employment_type": "full_time",
  "description": "We are seeking an exceptional AI Engineer...",
  "responsibilities": [
    "Lead AI model development",
    "Collaborate with product teams",
    "Mentor junior engineers"
  ],
  "benefits": [
    "Competitive salary",
    "Health insurance",
    "Annual bonus",
    "Remote work flexibility"
  ],
  "status": "active",
  "views_count": 1523,
  "applications_count": 47,
  "created_at": "2024-12-01T00:00:00Z",
  "updated_at": "2024-12-20T10:00:00Z",
  "published_at": "2024-12-01T08:00:00Z",
  "closes_at": "2025-01-31T23:59:59Z",
  "created_by": "admin_user_123"
}
```

### 2.3 Indexes

| Fields | Order | Use Case |
|--------|-------|----------|
| `status`, `published_at` | ASC, DESC | Active jobs by date |
| `department`, `status` | ASC, ASC | Filter by department |
| `location.city`, `status` | ASC, ASC | Location-based search |
| `skills`, `status` | ARRAY_CONTAINS, ASC | Skill matching |

---

## 3. Collection: `candidates`

> Job applicants — supports both **Stateless** (no auth) and **Stateful** (OTP auth) flows.

### 3.1 Document Structure

```typescript
interface Candidate {
  // Document ID: Auto-generated Firestore ID
  
  id: string;                       // Same as document ID
  
  // Personal Info (Collected during Apply)
  email: string;                    // Primary identifier
  phone: string;                    // With country code
  full_name: string;
  full_name_ar?: string;
  
  // Professional Info
  current_salary: number;           // Monthly
  expected_salary: number;          // Monthly (KEY for budget comparison)
  currency: 'SAR' | 'USD' | 'AED';
  notice_period: number;            // Days
  
  // Links
  github_url?: string;              // For AI parsing
  linkedin_url?: string;
  portfolio_url?: string;
  cv_url: string;                   // Cloud Storage URL
  
  // AI Analysis (Generated by Cloud Function)
  ai_analysis_json: {
    match_score: number;            // 0-100
    pros: string[];                 // Strengths detected
    cons: string[];                 // Weaknesses/gaps
    skills_detected: string[];
    experience_years: number;
    education_level: string;
    red_flags: string[];
    parsed_at: Timestamp;
    model_version: string;
  } | null;
  
  // Budget Comparison (Internal)
  budget_status: 'within' | 'over' | 'under';
  budget_diff_percentage?: number;  // % over/under budget
  
  // Tracking (Stateless Status Checking)
  tracking_token: string;           // UUID for magic link
  magic_link_url: string;           // Full URL sent to candidate
  
  // Application Details
  job_id: string;                   // Reference to jobs collection
  job_title: string;                // Denormalized for display
  
  // Pipeline Status
  status: CandidateStatus;
  status_history: StatusChange[];
  
  // Agency (if referred)
  agency_id?: string;               // Reference to agencies collection
  
  // Auth Status
  has_otp_verified: boolean;        // True after assessment auth
  has_password: boolean;            // True only for hired candidates
  firebase_uid?: string;            // Set after OTP verification
  
  // Timestamps
  applied_at: Timestamp;
  updated_at: Timestamp;
  last_activity_at: Timestamp;
}

type CandidateStatus = 
  | 'new'                           // Just applied
  | 'ai_screening'                  // Being analyzed
  | 'ai_flagged'                    // Over budget (yellow/red flag) - requires HR attention
  | 'pending_review'                // Awaiting admin decision
  | 'approved'                      // Admin approved, assessment pending
  | 'assessment_invited'            // Assessment invite sent
  | 'assessment_in_progress'        // Currently taking assessment
  | 'assessment_completed'          // Assessment done
  | 'interview_scheduled'           // Interview booked
  | 'interview_completed'           // Interview done
  | 'offer_pending'                 // Preparing offer
  | 'offer_sent'                    // Offer extended
  | 'offer_accepted'                // Candidate accepted
  | 'offer_rejected'                // Candidate rejected
  | 'negotiation'                   // Salary negotiation
  | 'hired'                         // Onboarded
  | 'rejected'                      // Admin rejected
  | 'withdrawn';                    // Candidate withdrew

interface StatusChange {
  from: CandidateStatus;
  to: CandidateStatus;
  changed_by: string;               // 'system' or admin UID
  reason?: string;
  timestamp: Timestamp;
}
```

### 3.2 Example Document

```json
{
  "id": "cand_abc123xyz",
  "email": "mohammed.alharbi@email.com",
  "phone": "+966551234567",
  "full_name": "Mohammed Al-Harbi",
  "full_name_ar": "محمد الحربي",
  "current_salary": 20000,
  "expected_salary": 35000,
  "currency": "SAR",
  "notice_period": 30,
  "github_url": "https://github.com/malharbi",
  "linkedin_url": "https://linkedin.com/in/malharbi",
  "cv_url": "gs://qeyafa-cvs/cand_abc123xyz/resume.pdf",
  "ai_analysis_json": {
    "match_score": 87,
    "pros": [
      "Strong Python experience",
      "Published ML research",
      "Leadership experience"
    ],
    "cons": [
      "No direct TensorFlow experience",
      "Limited cloud platform exposure"
    ],
    "skills_detected": ["Python", "PyTorch", "Computer Vision", "Docker"],
    "experience_years": 6,
    "education_level": "Master",
    "red_flags": [],
    "parsed_at": "2024-12-15T10:30:00Z",
    "model_version": "qtme-screening-v1.0"
  },
  "budget_status": "within",
  "budget_diff_percentage": -22,
  "tracking_token": "550e8400-e29b-41d4-a716-446655440000",
  "magic_link_url": "https://qeyafa.ai/status/550e8400-e29b-41d4-a716-446655440000",
  "job_id": "job_senior_ai_engineer",
  "job_title": "Senior AI Engineer",
  "status": "approved",
  "status_history": [
    { "from": "new", "to": "ai_screening", "changed_by": "system", "timestamp": "2024-12-15T10:00:00Z" },
    { "from": "ai_screening", "to": "pending_review", "changed_by": "system", "timestamp": "2024-12-15T10:30:00Z" },
    { "from": "pending_review", "to": "approved", "changed_by": "admin_123", "reason": "Strong candidate", "timestamp": "2024-12-16T09:00:00Z" }
  ],
  "agency_id": null,
  "has_otp_verified": false,
  "has_password": false,
  "firebase_uid": null,
  "applied_at": "2024-12-15T10:00:00Z",
  "updated_at": "2024-12-16T09:00:00Z",
  "last_activity_at": "2024-12-16T09:00:00Z"
}
```

### 3.3 Indexes

| Fields | Order | Use Case |
|--------|-------|----------|
| `job_id`, `status`, `applied_at` | ASC, ASC, DESC | Candidates per job |
| `status`, `applied_at` | ASC, DESC | Pipeline view |
| `email` | ASC | Duplicate detection |
| `tracking_token` | ASC | Magic link lookup |
| `agency_id`, `status` | ASC, ASC | Agency view |
| `ai_analysis_json.match_score`, `status` | DESC, ASC | Top candidates |

---

## 4. Collection: `assessments`

> Secure examination records with anti-cheat tracking.

### 4.1 Document Structure

```typescript
interface Assessment {
  // Document ID: Auto-generated Firestore ID
  
  id: string;                       // Same as document ID
  candidate_id: string;             // Reference to candidates
  job_id: string;                   // Reference to jobs
  
  // Questions (Generated by OpenAI)
  questions: Question[];            // Array of 20 questions
  
  // Timing
  start_time: Timestamp | null;     // Set when exam starts
  end_time: Timestamp | null;       // Set when exam ends
  time_limit_minutes: number;       // Default: 60
  time_remaining_seconds?: number;  // For resume capability
  
  // Anti-Cheat
  cheat_strikes: number;            // Tab switches/minimizes
  cheat_events: CheatEvent[];       // Detailed log
  is_terminated: boolean;           // True if auto-terminated
  termination_reason?: string;
  
  // Answers & Scoring
  answers: Answer[];
  score: number | null;             // Final score (0-100)
  score_breakdown: {
    iq_logic: number;               // /25 (5 questions)
    core_tech: number;              // /50 (10 questions)
    case_study: number;             // /25 (5 questions)
  } | null;
  
  // Session Security
  session_token: string;            // Unique session identifier
  ip_address: string;
  user_agent: string;
  
  // Status
  status: AssessmentStatus;
  
  // Timestamps
  invited_at: Timestamp;
  created_at: Timestamp;
  updated_at: Timestamp;
  submitted_at?: Timestamp;
}

type AssessmentStatus = 
  | 'invited'                       // Invite sent, not started
  | 'otp_pending'                   // Waiting for OTP verification
  | 'in_progress'                   // Currently taking exam
  | 'submitted'                     // Candidate submitted
  | 'auto_submitted'                // Time ran out
  | 'terminated'                    // Terminated due to cheating
  | 'scored'                        // Scoring complete
  | 'expired';                      // Invite expired (not started)

interface Question {
  id: string;
  type: 'iq_logic' | 'core_tech' | 'case_study';
  question_text: string;
  options?: string[];               // For MCQ
  correct_answer?: string;          // For auto-scoring
  points: number;
  time_suggested_seconds: number;
}

interface Answer {
  question_id: string;
  answer_text: string;
  answered_at: Timestamp;
  time_spent_seconds: number;
  is_correct?: boolean;             // Set after scoring
  points_earned?: number;
}

interface CheatEvent {
  event_type: 'tab_switch' | 'minimize' | 'copy' | 'paste' | 'screenshot_attempt';
  timestamp: Timestamp;
  strike_count_after: number;
  action_taken: 'warning' | 'terminate';
}
```

### 4.2 Example Document

```json
{
  "id": "assess_xyz789",
  "candidate_id": "cand_abc123xyz",
  "job_id": "job_senior_ai_engineer",
  "questions": [
    {
      "id": "q1",
      "type": "iq_logic",
      "question_text": "If all Bloops are Razzles and all Razzles are Lazzles, are all Bloops definitely Lazzles?",
      "options": ["Yes", "No", "Cannot be determined"],
      "correct_answer": "Yes",
      "points": 5,
      "time_suggested_seconds": 60
    },
    {
      "id": "q2",
      "type": "core_tech",
      "question_text": "Explain the difference between supervised and unsupervised learning with examples.",
      "points": 5,
      "time_suggested_seconds": 180
    }
  ],
  "start_time": "2024-12-17T14:00:00Z",
  "end_time": null,
  "time_limit_minutes": 60,
  "time_remaining_seconds": 2847,
  "cheat_strikes": 1,
  "cheat_events": [
    {
      "event_type": "tab_switch",
      "timestamp": "2024-12-17T14:15:32Z",
      "strike_count_after": 1,
      "action_taken": "warning"
    }
  ],
  "is_terminated": false,
  "answers": [
    {
      "question_id": "q1",
      "answer_text": "Yes",
      "answered_at": "2024-12-17T14:02:15Z",
      "time_spent_seconds": 45,
      "is_correct": true,
      "points_earned": 5
    }
  ],
  "score": null,
  "score_breakdown": null,
  "session_token": "sess_unique_token_abc",
  "ip_address": "192.168.1.1",
  "user_agent": "Mozilla/5.0...",
  "status": "in_progress",
  "invited_at": "2024-12-16T12:00:00Z",
  "created_at": "2024-12-16T12:00:00Z",
  "updated_at": "2024-12-17T14:15:32Z"
}
```

### 4.3 Indexes

| Fields | Order | Use Case |
|--------|-------|----------|
| `candidate_id`, `status` | ASC, ASC | Candidate's assessments |
| `job_id`, `status`, `score` | ASC, ASC, DESC | Job assessment results |
| `session_token` | ASC | Session lookup |
| `status`, `invited_at` | ASC, DESC | Pending invites |

---

## 5. Collection: `agencies`

> External recruitment agencies with restricted access.

### 5.1 Document Structure

```typescript
interface Agency {
  // Document ID: Auto-generated Firestore ID
  
  id: string;                       // Same as document ID
  name: string;                     // Agency name
  name_ar?: string;
  
  // Contact
  contact_email: string;
  contact_phone: string;
  contact_person: string;
  
  // Credentials
  firebase_uid: string;             // Auth UID (password-based)
  
  // Assigned Candidates
  assigned_candidates: string[];    // Array of candidate IDs
  
  // Access Control
  permissions: AgencyPermission[];
  
  // Contract
  contract_start: Timestamp;
  contract_end: Timestamp;
  commission_percentage: number;
  
  // Status
  status: 'active' | 'suspended' | 'expired';
  
  // Timestamps
  created_at: Timestamp;
  updated_at: Timestamp;
  last_login_at?: Timestamp;
}

type AgencyPermission = 
  | 'view_candidates'               // See assigned candidates only
  | 'update_visa_status'            // Update visa tracking
  | 'view_pipeline';                // See pipeline stages

interface AgencyCandidateView {
  // Restricted view for agencies
  candidate_id: string;
  full_name: string;
  status: 'hired' | 'visa_processing' | 'deployed';
  visa_tracking: {
    passport_submitted: boolean;
    passport_submitted_at?: Timestamp;
    medical_completed: boolean;
    medical_completed_at?: Timestamp;
    visa_applied: boolean;
    visa_applied_at?: Timestamp;
    visa_approved: boolean;
    visa_approved_at?: Timestamp;
    flight_booked: boolean;
    flight_date?: Timestamp;
  };
}
```

### 5.2 Example Document

```json
{
  "id": "agency_acme_recruiting",
  "name": "ACME Recruiting",
  "name_ar": "أكمي للتوظيف",
  "contact_email": "hr@acme-recruiting.com",
  "contact_phone": "+966501234567",
  "contact_person": "Ahmed Hassan",
  "firebase_uid": "auth_agency_acme_123",
  "assigned_candidates": [
    "cand_abc123xyz",
    "cand_def456uvw"
  ],
  "permissions": [
    "view_candidates",
    "update_visa_status",
    "view_pipeline"
  ],
  "contract_start": "2024-01-01T00:00:00Z",
  "contract_end": "2024-12-31T23:59:59Z",
  "commission_percentage": 10,
  "status": "active",
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-12-15T10:00:00Z",
  "last_login_at": "2024-12-20T08:30:00Z"
}
```

### 5.3 Indexes

| Fields | Order | Use Case |
|--------|-------|----------|
| `status`, `name` | ASC, ASC | Active agencies list |
| `firebase_uid` | ASC | Auth lookup |
| `assigned_candidates` | ARRAY_CONTAINS | Find agency by candidate |

---

## 6. Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isAdmin() {
      return isAuthenticated() && 
        request.auth.token.role == 'admin';
    }
    
    function isAgency() {
      return isAuthenticated() && 
        request.auth.token.role == 'agency';
    }
    
    function isCandidate() {
      return isAuthenticated() && 
        request.auth.token.role == 'candidate';
    }
    
    // Jobs - Public read, Admin write
    match /jobs/{jobId} {
      allow read: if resource.data.status == 'active' || isAdmin();
      allow write: if isAdmin();
    }
    
    // Candidates - Restricted access
    match /candidates/{candidateId} {
      // Admins can read/write all
      allow read, write: if isAdmin();
      
      // Candidates can read their own (after OTP)
      allow read: if isCandidate() && 
        resource.data.firebase_uid == request.auth.uid;
      
      // Agencies can read assigned only
      allow read: if isAgency() && 
        candidateId in get(/databases/$(database)/documents/agencies/$(request.auth.uid)).data.assigned_candidates;
      
      // Public stateless access via tracking token (handled by Cloud Function)
    }
    
    // Assessments - Restricted
    match /assessments/{assessmentId} {
      allow read, write: if isAdmin();
      
      // Candidates can read/write their own during exam
      allow read, write: if isCandidate() && 
        resource.data.candidate_id == request.auth.uid &&
        resource.data.status == 'in_progress';
    }
    
    // Agencies - Restricted
    match /agencies/{agencyId} {
      allow read, write: if isAdmin();
      allow read: if isAgency() && agencyId == request.auth.uid;
    }
  }
}
```

---

## 7. Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        DATA FLOW                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  [CANDIDATE]                                                     │
│      │                                                           │
│      │ Apply (Stateless)                                         │
│      ▼                                                           │
│  ┌─────────────────┐                                            │
│  │ Create candidate │──────────▶ [AI SCREENING]                  │
│  │ + tracking_token │           Cloud Function                   │
│  └─────────────────┘                   │                         │
│                                        ▼                         │
│                              ┌─────────────────┐                │
│                              │ ai_analysis_json │                │
│                              └────────┬────────┘                │
│                                       │                         │
│  [ADMIN]◀─────────────────────────────┘                         │
│      │                                                           │
│      │ Approve/Reject                                            │
│      ▼                                                           │
│  ┌─────────────────┐          ┌─────────────────┐               │
│  │ Send Assessment │─────────▶│ Create assessment│               │
│  │ Invite (Email)  │          │ + session_token  │               │
│  └─────────────────┘          └─────────────────┘               │
│                                       │                         │
│  [CANDIDATE]◀─────────────────────────┘                         │
│      │                                                           │
│      │ OTP Auth → Take Exam                                      │
│      ▼                                                           │
│  ┌─────────────────┐                                            │
│  │ Assessment      │──────────▶ [SCORING]                       │
│  │ Answers         │           Cloud Function                    │
│  └─────────────────┘                                            │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

**Document Version:** 2.0  
**Last Updated:** December 2024  
**Schema Version:** QTME-1.0
