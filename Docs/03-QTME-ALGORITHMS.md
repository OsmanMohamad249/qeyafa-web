# Qeyafa AI — QTME Algorithms

> **The Qeyafa Talent Management Ecosystem:** Complete recruitment logic from application to deployment.

---

## 1. System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│              QEYAFA TALENT MANAGEMENT ECOSYSTEM                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Phase 1          Phase 2         Phase 3         Phase 4       │
│  ┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐   │
│  │FRICTION-│────▶│   AI    │────▶│FORTRESS │────▶│INTERVIEW│   │
│  │LESS     │     │SCREENING│     │ASSESSMENT│     │& SCORING│   │
│  │APPLY    │     │         │     │         │     │         │   │
│  └─────────┘     └─────────┘     └─────────┘     └─────────┘   │
│       │               │               │               │         │
│       ▼               ▼               ▼               ▼         │
│  No Login        Cloud Func      OTP Auth        Google Meet    │
│  Magic Link      CV + GitHub     Anti-Cheat      Calendar API   │
│  Budget Check    AI Report       OpenAI Exam     Weighted Score │
│                                                                  │
│  Phase 5          Phase 6                                       │
│  ┌─────────┐     ┌─────────┐                                   │
│  │ SMART   │────▶│ AGENCY  │                                   │
│  │ OFFER   │     │ PORTAL  │                                   │
│  └─────────┘     └─────────┘                                   │
│       │               │                                         │
│       ▼               ▼                                         │
│  Gold Confetti   RBAC View                                      │
│  Negotiation     Visa Tracking                                  │
│  Salary Modal    Pipeline Steps                                 │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Phase 1: Frictionless Apply (Stateless)

### 2.1 Philosophy

**Zero Login Required.** The application process must have the absolute minimum friction. No account creation, no passwords, no authentication barriers.

### 2.2 UX: Multi-Step Form with Glassmorphism

```
┌─────────────────────────────────────────────────────────────────┐
│                    APPLY FORM UI                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Step Progress: [●]───[●]───[○]───[○]                           │
│                  1     2     3     4                             │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  ╔═══════════════════════════════════════════════════╗  │    │
│  │  ║         GLASSMORPHISM CARD                        ║  │    │
│  │  ║  backdrop-filter: blur(12px);                     ║  │    │
│  │  ║  background: rgba(255,255,255,0.1);               ║  │    │
│  │  ║  border: 1px solid rgba(255,255,255,0.2);         ║  │    │
│  │  ║                                                   ║  │    │
│  │  ║  [Form Fields with Gold Focus States]             ║  │    │
│  │  ║                                                   ║  │    │
│  │  ║  ┌─────────────────────────────────────────┐     ║  │    │
│  │  ║  │ [NEXT STEP] ← Magnetic Gold Button      │     ║  │    │
│  │  ║  └─────────────────────────────────────────┘     ║  │    │
│  │  ╚═══════════════════════════════════════════════════╝  │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 2.3 Form Steps

```typescript
// Step 1: Personal Information
interface Step1Data {
  full_name: string;
  email: string;
  phone: string;  // With country code picker
}

// Step 2: Professional Details
interface Step2Data {
  current_salary: number;
  expected_salary: number;  // KEY FIELD
  currency: 'SAR' | 'USD' | 'AED';
  notice_period: number;    // Days
}

// Step 3: Links & Portfolio
interface Step3Data {
  github_url?: string;
  linkedin_url?: string;
  portfolio_url?: string;
}

// Step 4: CV Upload
interface Step4Data {
  cv_file: File;  // PDF, max 5MB
}
```

### 2.4 Budget Comparison Logic

**CRITICAL:** Compare `expected_salary` vs `job.budget_range` silently. Do NOT reject over-budget candidates — flag them internally.

```typescript
// functions/src/apply/budgetCheck.ts

interface BudgetCheckResult {
  status: 'within' | 'over' | 'under';
  diff_percentage: number;
  flag_color: 'green' | 'yellow' | 'red';
}

export function checkBudget(
  expectedSalary: number,
  budgetRange: { min: number; max: number }
): BudgetCheckResult {
  const midBudget = (budgetRange.min + budgetRange.max) / 2;
  const diff = ((expectedSalary - midBudget) / midBudget) * 100;
  
  if (expectedSalary <= budgetRange.max) {
    return {
      status: 'within',
      diff_percentage: diff,
      flag_color: 'green'  // Good to go
    };
  }
  
  if (expectedSalary <= budgetRange.max * 1.2) {
    return {
      status: 'over',
      diff_percentage: diff,
      flag_color: 'yellow'  // 0-20% over → Warning (negotiable)
    };
  }
  
  return {
    status: 'over',
    diff_percentage: diff,
    flag_color: 'red'  // >20% over → Flag but don't reject
  };
}
```

### 2.5 Tracking Token Generation

Generate a magic link for stateless status checking.

```typescript
// functions/src/apply/generateTracking.ts
import { v4 as uuidv4 } from 'uuid';

export function generateMagicLink(candidateId: string): {
  token: string;
  url: string;
} {
  const token = uuidv4();
  const baseUrl = process.env.APP_URL || 'https://qeyafa.ai';
  
  return {
    token,
    url: `${baseUrl}/status/${token}`
  };
}
```

### 2.6 Email: Application Confirmation

```typescript
// functions/src/apply/sendConfirmation.ts
import * as sgMail from '@sendgrid/mail';

export async function sendApplicationConfirmation(
  email: string,
  name: string,
  jobTitle: string,
  magicLink: string
) {
  const msg = {
    to: email,
    from: 'careers@qeyafa.ai',
    templateId: 'd-application-confirmation',
    dynamicTemplateData: {
      candidate_name: name,
      job_title: jobTitle,
      status_link: magicLink,
      company_name: 'Qeyafa AI'
    }
  };
  
  await sgMail.send(msg);
}
```

---

## 3. Phase 2: AI Screening (Cloud Function)

### 3.1 Trigger

Firebase Cloud Function triggered `onCreate` of a new candidate document.

```typescript
// functions/src/screening/onCandidateCreate.ts
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { parseCV } from './parsers/cvParser';
import { parseGitHub } from './parsers/githubParser';
import { generateAIReport } from './ai/reportGenerator';

export const onCandidateCreate = functions.firestore
  .document('candidates/{candidateId}')
  .onCreate(async (snapshot, context) => {
    const candidateId = context.params.candidateId;
    const candidate = snapshot.data();
    
    console.log(`[SCREENING] Processing candidate: ${candidateId}`);
    
    // Update status to ai_screening
    await snapshot.ref.update({
      status: 'ai_screening',
      status_history: admin.firestore.FieldValue.arrayUnion({
        from: 'new',
        to: 'ai_screening',
        changed_by: 'system',
        timestamp: admin.firestore.Timestamp.now()
      })
    });
    
    try {
      // Parse CV
      const cvData = await parseCV(candidate.cv_url);
      
      // Parse GitHub (if provided)
      let githubData = null;
      if (candidate.github_url) {
        githubData = await parseGitHub(candidate.github_url);
      }
      
      // Fetch job requirements
      const jobDoc = await admin.firestore()
        .collection('jobs')
        .doc(candidate.job_id)
        .get();
      const jobRequirements = jobDoc.data()!;
      
      // Generate AI Report
      const aiReport = await generateAIReport(cvData, githubData, jobRequirements);
      
      // Update candidate with AI analysis
      await snapshot.ref.update({
        ai_analysis_json: {
          match_score: aiReport.matchScore,
          pros: aiReport.pros,
          cons: aiReport.cons,
          skills_detected: aiReport.skills,
          experience_years: aiReport.experienceYears,
          education_level: aiReport.educationLevel,
          red_flags: aiReport.redFlags,
          parsed_at: admin.firestore.Timestamp.now(),
          model_version: 'qtme-screening-v1.0'
        },
        status: 'pending_review',
        status_history: admin.firestore.FieldValue.arrayUnion({
          from: 'ai_screening',
          to: 'pending_review',
          changed_by: 'system',
          timestamp: admin.firestore.Timestamp.now()
        })
      });
      
      console.log(`[SCREENING] Candidate ${candidateId} scored: ${aiReport.matchScore}`);
      
    } catch (error) {
      console.error(`[SCREENING] Error processing ${candidateId}:`, error);
      
      // Flag for manual review
      await snapshot.ref.update({
        status: 'pending_review',
        ai_analysis_json: {
          error: 'Processing failed',
          parsed_at: admin.firestore.Timestamp.now()
        }
      });
    }
  });
```

### 3.2 AI Report Generator

```typescript
// functions/src/screening/ai/reportGenerator.ts
import OpenAI from 'openai';

interface AIReport {
  matchScore: number;      // 0-100
  pros: string[];
  cons: string[];
  skills: string[];
  experienceYears: number;
  educationLevel: string;
  redFlags: string[];
}

// Type definitions for parser outputs
interface ParsedCV {
  name: string;
  email: string;
  phone: string;
  skills: string[];
  experience: { company: string; role: string; duration: string }[];
  education: { institution: string; degree: string; year: number }[];
  summary: string;
}

interface ParsedGitHub {
  username: string;
  repositories: number;
  languages: string[];
  contributions: number;
  topProjects: { name: string; stars: number; language: string }[];
}

interface JobRequirements {
  title: string;
  skills: string[];
  experience_years: { min: number; max?: number };
  education_level: string;
}

export async function generateAIReport(
  cvData: ParsedCV,
  githubData: ParsedGitHub | null,
  jobRequirements: JobRequirements
): Promise<AIReport> {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  
  const prompt = `
    You are an expert HR AI assistant. Analyze this candidate for the position.
    
    **Job Requirements:**
    - Title: ${jobRequirements.title}
    - Required Skills: ${jobRequirements.skills.join(', ')}
    - Experience: ${jobRequirements.experience_years.min}-${jobRequirements.experience_years.max} years
    - Education: ${jobRequirements.education_level}
    
    **Candidate CV Data:**
    ${JSON.stringify(cvData, null, 2)}
    
    ${githubData ? `**GitHub Analysis:**\n${JSON.stringify(githubData, null, 2)}` : ''}
    
    Return a JSON object with:
    {
      "matchScore": <0-100>,
      "pros": ["strength 1", "strength 2", ...],
      "cons": ["weakness 1", "weakness 2", ...],
      "skills": ["detected skill 1", ...],
      "experienceYears": <number>,
      "educationLevel": "<level>",
      "redFlags": ["concern 1", ...] // Empty if none
    }
  `;
  
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: prompt }],
    response_format: { type: 'json_object' }
  });
  
  return JSON.parse(response.choices[0].message.content!);
}
```

### 3.3 Admin Decision: Kanban Dashboard

Admin sees candidates in a Kanban board with columns: `Pending Review` | `Approved` | `Rejected`

**Actions:**
- **[REJECT]** → Opens modal for rejection reason → Sends rejection email
- **[APPROVE]** → Moves to Phase 3 → Sends assessment invite

---

## 4. Phase 3: The Fortress Assessment (Secure)

### 4.1 Authentication Flow: Email + OTP (No Passwords)

```
┌─────────────────────────────────────────────────────────────────┐
│                    OTP AUTH FLOW                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  [Candidate clicks Assessment Invite Link]                       │
│               │                                                  │
│               ▼                                                  │
│  ┌─────────────────────────────────────────────┐                │
│  │         LANDING PAGE                         │                │
│  │  "Enter your email to start the assessment"  │                │
│  │  ┌─────────────────────────────────────────┐ │                │
│  │  │ Email: [___________________________]    │ │                │
│  │  └─────────────────────────────────────────┘ │                │
│  │  [SEND OTP]                                  │                │
│  └─────────────────────────────────────────────┘                │
│               │                                                  │
│               ▼                                                  │
│  [System sends 6-digit OTP via Firebase Auth]                    │
│               │                                                  │
│               ▼                                                  │
│  ┌─────────────────────────────────────────────┐                │
│  │         OTP VERIFICATION                     │                │
│  │  "Enter the 6-digit code sent to your email" │                │
│  │  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ │          │
│  │  │  _  │ │  _  │ │  _  │ │  _  │ │  _  │ │  _  │ │          │
│  │  └─────┘ └─────┘ └─────┘ └─────┘ └─────┘ └─────┘ │          │
│  │  [VERIFY & START EXAM]                       │                │
│  └─────────────────────────────────────────────┘                │
│               │                                                  │
│               ▼                                                  │
│  [Candidate is now authenticated → Start Exam]                   │
│                                                                  │
│  CONSTRAINT: No password creation at this stage.                 │
│  Passwords are only created for HIRED candidates.                │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 4.2 Exam Engine: OpenAI Question Generation

Generate 20 unique questions dynamically:
- **5 IQ/Logic Questions** (25 points)
- **10 Core Tech Questions** (50 points) — Stack-specific based on job requirements
- **5 Case Study Questions** (25 points)

```typescript
// functions/src/assessment/generateQuestions.ts
import OpenAI from 'openai';

interface Question {
  id: string;
  type: 'iq_logic' | 'core_tech' | 'case_study';
  question_text: string;
  options?: string[];
  correct_answer?: string;
  points: number;
  time_suggested_seconds: number;
}

export async function generateExamQuestions(
  jobRequirements: JobRequirements
): Promise<Question[]> {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  
  const prompt = `
    Generate a technical assessment for a ${jobRequirements.title} position.
    Required skills: ${jobRequirements.skills.join(', ')}
    
    Create exactly 20 questions in JSON format:
    - 5 IQ/Logic questions (5 points each, 60 seconds suggested)
    - 10 Core Technical questions specific to ${jobRequirements.skills.slice(0, 3).join(', ')} (5 points each, 180 seconds suggested)
    - 5 Case Study/Problem Solving questions (5 points each, 300 seconds suggested)
    
    Mix of MCQ and open-ended. For MCQ, include options and correct_answer.
    
    Return JSON array of questions with: id, type, question_text, options?, correct_answer?, points, time_suggested_seconds
  `;
  
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: prompt }],
    response_format: { type: 'json_object' }
  });
  
  const result = JSON.parse(response.choices[0].message.content!);
  return result.questions;
}
```

### 4.3 Anti-Cheat Algorithm

**Critical:** Prevent cheating using the Page Visibility API.

```typescript
// src/hooks/useAntiCheat.ts
import { useEffect, useRef, useCallback } from 'react';
import { doc, updateDoc, arrayUnion, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface AntiCheatOptions {
  assessmentId: string;
  maxStrikes: number;
  onTerminate: () => void;
}

export function useAntiCheat({ assessmentId, maxStrikes = 2, onTerminate }: AntiCheatOptions) {
  const strikesRef = useRef(0);
  
  const logCheatEvent = useCallback(async (eventType: string, actionTaken: string) => {
    const assessmentRef = doc(db, 'assessments', assessmentId);
    
    await updateDoc(assessmentRef, {
      cheat_strikes: strikesRef.current,
      cheat_events: arrayUnion({
        event_type: eventType,
        timestamp: Timestamp.now(),
        strike_count_after: strikesRef.current,
        action_taken: actionTaken
      })
    });
  }, [assessmentId]);
  
  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (document.visibilityState === 'hidden') {
        strikesRef.current += 1;
        
        if (strikesRef.current >= maxStrikes) {
          // TERMINATE EXAM
          await logCheatEvent('tab_switch', 'terminate');
          
          // Auto-submit with penalty flag
          await updateDoc(doc(db, 'assessments', assessmentId), {
            status: 'terminated',
            is_terminated: true,
            termination_reason: 'Multiple tab switches detected',
            end_time: Timestamp.now()
          });
          
          onTerminate();
        } else {
          // WARNING TOAST
          await logCheatEvent('tab_switch', 'warning');
          
          // Show warning UI
          showWarningToast(
            `Warning ${strikesRef.current}/${maxStrikes}: Tab switching detected. ` +
            `${maxStrikes - strikesRef.current} more will terminate your exam.`
          );
        }
      }
    };
    
    // Prevent copy/paste
    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault();
      logCheatEvent('copy', 'warning');
      showWarningToast('Copy is disabled during the assessment.');
    };
    
    const handlePaste = (e: ClipboardEvent) => {
      e.preventDefault();
      logCheatEvent('paste', 'warning');
      showWarningToast('Paste is disabled during the assessment.');
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('copy', handleCopy);
    document.addEventListener('paste', handlePaste);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('paste', handlePaste);
    };
  }, [assessmentId, maxStrikes, onTerminate, logCheatEvent]);
  
  return { strikes: strikesRef.current };
}

function showWarningToast(message: string) {
  // Implementation depends on toast library
  console.warn('[ANTI-CHEAT]', message);
}
```

### 4.4 Exam UI Component

```tsx
// src/pages/Assessment.tsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAntiCheat } from '@/hooks/useAntiCheat';

export default function AssessmentPage() {
  const { assessmentId } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(3600); // 60 minutes
  const [isTerminated, setIsTerminated] = useState(false);
  
  // Anti-cheat hook
  useAntiCheat({
    assessmentId: assessmentId!,
    maxStrikes: 2,
    onTerminate: () => {
      setIsTerminated(true);
      // Show termination modal
    }
  });
  
  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 0) {
          clearInterval(timer);
          // Auto-submit
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  if (isTerminated) {
    return <TerminationScreen />;
  }
  
  return (
    <div className="min-h-screen bg-qeyafa-green-dark">
      {/* Timer Header */}
      <header className="fixed top-0 w-full bg-qeyafa-green p-4 z-50">
        <div className="flex justify-between items-center max-w-4xl mx-auto">
          <span className="text-white">Question {currentQuestion + 1}/20</span>
          <span className={`text-xl font-bold ${timeRemaining < 300 ? 'text-red-400' : 'text-qeyafa-gold'}`}>
            {formatTime(timeRemaining)}
          </span>
        </div>
      </header>
      
      {/* Question Card */}
      <main className="pt-24 pb-32 px-4">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="max-w-3xl mx-auto"
        >
          <QuestionCard question={questions[currentQuestion]} />
        </motion.div>
      </main>
      
      {/* Navigation Footer */}
      <footer className="fixed bottom-0 w-full bg-qeyafa-green p-4">
        <div className="flex justify-between max-w-4xl mx-auto">
          <button 
            onClick={() => setCurrentQuestion(c => c - 1)}
            disabled={currentQuestion === 0}
            className="text-white disabled:opacity-50"
          >
            Previous
          </button>
          
          {currentQuestion === 19 ? (
            <MagneticButton onClick={handleSubmit}>
              Submit Exam
            </MagneticButton>
          ) : (
            <MagneticButton onClick={() => setCurrentQuestion(c => c + 1)}>
              Next Question
            </MagneticButton>
          )}
        </div>
      </footer>
    </div>
  );
}
```

---

## 5. Phase 4: Interview & Scoring

### 5.1 Google Calendar Integration

Fetch available slots from admin's Google Calendar.

```typescript
// functions/src/interview/getAvailableSlots.ts
import { google } from 'googleapis';

export async function getAvailableSlots(adminEmail: string): Promise<TimeSlot[]> {
  const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });
  
  const now = new Date();
  const twoWeeksLater = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);
  
  // Get busy times
  const busyResponse = await calendar.freebusy.query({
    requestBody: {
      timeMin: now.toISOString(),
      timeMax: twoWeeksLater.toISOString(),
      items: [{ id: adminEmail }]
    }
  });
  
  const busySlots = busyResponse.data.calendars?.[adminEmail]?.busy || [];
  
  // Generate available 1-hour slots (9 AM - 5 PM)
  const availableSlots: TimeSlot[] = [];
  
  for (let day = 0; day < 14; day++) {
    const date = new Date(now.getTime() + day * 24 * 60 * 60 * 1000);
    
    // Skip weekends
    if (date.getDay() === 0 || date.getDay() === 6) continue;
    
    for (let hour = 9; hour < 17; hour++) {
      const slotStart = new Date(date);
      slotStart.setHours(hour, 0, 0, 0);
      
      const slotEnd = new Date(slotStart.getTime() + 60 * 60 * 1000);
      
      // Check if slot is busy
      const isBusy = busySlots.some(busy => {
        const busyStart = new Date(busy.start!);
        const busyEnd = new Date(busy.end!);
        return slotStart < busyEnd && slotEnd > busyStart;
      });
      
      if (!isBusy) {
        availableSlots.push({
          start: slotStart.toISOString(),
          end: slotEnd.toISOString()
        });
      }
    }
  }
  
  return availableSlots;
}
```

### 5.2 Google Meet Link Generation

```typescript
// functions/src/interview/createMeeting.ts
import { google } from 'googleapis';

export async function createInterviewMeeting(
  candidateEmail: string,
  candidateName: string,
  adminEmail: string,
  slotStart: string,
  slotEnd: string
): Promise<{ meetLink: string; eventId: string }> {
  const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });
  
  const event = await calendar.events.insert({
    calendarId: adminEmail,
    conferenceDataVersion: 1,
    sendUpdates: 'all',
    requestBody: {
      summary: `Interview: ${candidateName} - Qeyafa AI`,
      description: `Technical interview for ${candidateName}`,
      start: { dateTime: slotStart, timeZone: 'Asia/Riyadh' },
      end: { dateTime: slotEnd, timeZone: 'Asia/Riyadh' },
      attendees: [
        { email: candidateEmail },
        { email: adminEmail }
      ],
      conferenceData: {
        createRequest: {
          requestId: `qeyafa-interview-${Date.now()}`,
          conferenceSolutionKey: { type: 'hangoutsMeet' }
        }
      }
    }
  });
  
  return {
    meetLink: event.data.hangoutLink!,
    eventId: event.data.id!
  };
}
```

### 5.3 Digital Scorecard

Weighted average calculation for interview scoring.

```typescript
// src/components/admin/InterviewScorecard.tsx

interface ScoreCategory {
  name: string;
  weight: number;
  score: number;  // 1-5
}

const SCORE_WEIGHTS = {
  technical: 0.5,   // 50%
  cultural: 0.3,    // 30%
  soft_skills: 0.2  // 20%
};

export function calculateWeightedScore(scores: ScoreCategory[]): number {
  let totalWeightedScore = 0;
  
  for (const category of scores) {
    const normalizedScore = (category.score / 5) * 100;  // Convert 1-5 to 0-100
    totalWeightedScore += normalizedScore * category.weight;
  }
  
  return Math.round(totalWeightedScore);
}

// Example:
// Tech: 4/5 (80) * 0.5 = 40
// Culture: 5/5 (100) * 0.3 = 30
// Soft: 4/5 (80) * 0.2 = 16
// Total: 86/100
```

---

## 6. Phase 5: Smart Offer & Negotiation

### 6.1 Digital Offer UI

```tsx
// src/pages/Offer.tsx
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';

export default function OfferPage() {
  const { offerId } = useParams();
  const [offer, setOffer] = useState<Offer | null>(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
  
  // Gold Confetti on page load
  useEffect(() => {
    if (offer) {
      fireGoldConfetti();
    }
  }, [offer]);
  
  const fireGoldConfetti = () => {
    confetti({
      particleCount: 200,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#D4A017', '#F0D78C', '#0F4D3F', '#FFFFFF']
    });
  };
  
  const handleAccept = async () => {
    await updateOfferStatus(offerId!, 'accepted');
    fireGoldConfetti();
    // Redirect to onboarding
  };
  
  const handleReject = () => {
    setShowRejectModal(true);
  };
  
  return (
    <div className="min-h-screen bg-qeyafa-green-dark flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden"
      >
        {/* Header */}
        <div className="bg-qeyafa-green p-8 text-center">
          <h1 className="text-3xl font-bold text-white">🎉 Congratulations!</h1>
          <p className="text-qeyafa-gold text-xl mt-2">You've received an offer from Qeyafa AI</p>
        </div>
        
        {/* Offer Details */}
        <div className="p-8">
          <h2 className="text-2xl font-semibold text-qeyafa-green">{offer?.jobTitle}</h2>
          
          <div className="mt-6 bg-qeyafa-cream p-6 rounded-xl border-2 border-qeyafa-gold">
            <div className="flex justify-between">
              <span className="text-gray-600">Monthly Salary</span>
              <span className="text-2xl font-bold text-qeyafa-green">
                {offer?.currency} {offer?.salary.toLocaleString()}
              </span>
            </div>
          </div>
          
          {/* Benefits */}
          <div className="mt-6">
            <h3 className="font-semibold text-qeyafa-green mb-3">Benefits</h3>
            <ul className="grid grid-cols-2 gap-2">
              {offer?.benefits.map((benefit, i) => (
                <li key={i} className="flex items-center text-gray-700">
                  <span className="text-qeyafa-gold mr-2">✓</span>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Action Buttons */}
          <div className="mt-8 flex gap-4">
            <MagneticButton onClick={handleAccept} className="flex-1">
              Accept Offer
            </MagneticButton>
            <button
              onClick={handleReject}
              className="flex-1 border-2 border-gray-300 text-gray-600 py-3 rounded-xl hover:border-red-400 hover:text-red-500 transition-colors"
            >
              Decline
            </button>
          </div>
        </div>
      </motion.div>
      
      {/* Rejection Modal */}
      {showRejectModal && (
        <RejectModal
          onClose={() => setShowRejectModal(false)}
          offerId={offerId!}
        />
      )}
    </div>
  );
}
```

### 6.2 Rejection & Negotiation Logic

**CRITICAL:** If candidate rejects due to salary, force them to input their minimum expected salary.

```tsx
// src/components/RejectModal.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RejectModalProps {
  onClose: () => void;
  offerId: string;
}

export function RejectModal({ onClose, offerId }: RejectModalProps) {
  const [reason, setReason] = useState<string>('');
  const [showSalaryInput, setShowSalaryInput] = useState(false);
  const [expectedSalary, setExpectedSalary] = useState<number>(0);
  
  const handleReasonSelect = (selectedReason: string) => {
    setReason(selectedReason);
    
    // IF salary is the reason → FORCE salary input
    if (selectedReason === 'salary') {
      setShowSalaryInput(true);
    } else {
      setShowSalaryInput(false);
    }
  };
  
  const handleSubmit = async () => {
    await submitRejection(offerId, {
      reason,
      expected_salary: reason === 'salary' ? expectedSalary : undefined
    });
    
    // Notify HR Dashboard: "Negotiation Requested: Candidate asks for $X"
    if (reason === 'salary' && expectedSalary > 0) {
      await notifyHR({
        type: 'negotiation_request',
        offerId,
        candidateExpectedSalary: expectedSalary,
        message: `Candidate rejected offer due to salary. Requests: ${expectedSalary}`
      });
    }
    
    onClose();
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 max-w-md w-full"
      >
        <h2 className="text-xl font-semibold text-qeyafa-green mb-4">
          We're sorry to hear that
        </h2>
        
        <p className="text-gray-600 mb-4">
          Please let us know why you're declining:
        </p>
        
        {/* Reason Selection */}
        <div className="space-y-2 mb-4">
          {[
            { value: 'salary', label: 'Salary expectations not met' },
            { value: 'other_offer', label: 'Accepted another offer' },
            { value: 'personal', label: 'Personal reasons' },
            { value: 'relocation', label: 'Unable to relocate' },
            { value: 'other', label: 'Other' }
          ].map(option => (
            <label
              key={option.value}
              className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                reason === option.value
                  ? 'border-qeyafa-gold bg-qeyafa-gold/10'
                  : 'border-gray-200 hover:border-qeyafa-gold'
              }`}
            >
              <input
                type="radio"
                name="reason"
                value={option.value}
                checked={reason === option.value}
                onChange={() => handleReasonSelect(option.value)}
                className="mr-3"
              />
              {option.label}
            </label>
          ))}
        </div>
        
        {/* SALARY INPUT (Conditional) */}
        <AnimatePresence>
          {showSalaryInput && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4"
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What is your minimum expected salary? *
              </label>
              <div className="flex items-center border rounded-lg overflow-hidden">
                <span className="bg-gray-100 px-3 py-2 text-gray-500">SAR</span>
                <input
                  type="number"
                  value={expectedSalary || ''}
                  onChange={(e) => setExpectedSalary(Number(e.target.value))}
                  placeholder="Enter amount"
                  className="flex-1 px-3 py-2 outline-none"
                  required
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                This will be shared with HR for potential negotiation.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Actions */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 py-2 border rounded-lg text-gray-600 hover:bg-gray-50"
          >
            Cancel
          </button>
          <MagneticButton
            onClick={handleSubmit}
            disabled={!reason || (reason === 'salary' && !expectedSalary)}
            className="flex-1"
          >
            Submit
          </MagneticButton>
        </div>
      </motion.div>
    </motion.div>
  );
}
```

---

## 7. Phase 6: Agency Portal (RBAC)

### 7.1 Authentication: Password Creation for Hired Candidates & Agencies Only

**CONSTRAINT:** Only hired candidates and agency users create permanent passwords.

```typescript
// functions/src/auth/createAgencyAccount.ts
import * as admin from 'firebase-admin';

export async function createAgencyAccount(
  agencyEmail: string,
  agencyName: string,
  tempPassword: string
): Promise<string> {
  // Create Firebase Auth user
  const userRecord = await admin.auth().createUser({
    email: agencyEmail,
    password: tempPassword,
    displayName: agencyName
  });
  
  // Set custom claims for RBAC
  await admin.auth().setCustomUserClaims(userRecord.uid, {
    role: 'agency'
  });
  
  // Create agency document
  await admin.firestore().collection('agencies').doc(userRecord.uid).set({
    id: userRecord.uid,
    name: agencyName,
    contact_email: agencyEmail,
    firebase_uid: userRecord.uid,
    permissions: ['view_candidates', 'update_visa_status', 'view_pipeline'],
    assigned_candidates: [],
    status: 'active',
    created_at: admin.firestore.Timestamp.now(),
    updated_at: admin.firestore.Timestamp.now()
  });
  
  return userRecord.uid;
}
```

### 7.2 Agency View: Restricted Dashboard

Agencies can ONLY see candidates where `agency_id == current_user.uid`.

```tsx
// src/pages/agency/Portal.tsx
import { useAuthStore } from '@/stores/authStore';
import { collection, query, where, getDocs } from 'firebase/firestore';

export default function AgencyPortal() {
  const { user } = useAuthStore();
  const [candidates, setCandidates] = useState<AgencyCandidate[]>([]);
  
  useEffect(() => {
    async function fetchAssignedCandidates() {
      // RBAC: Only fetch candidates assigned to this agency
      const q = query(
        collection(db, 'candidates'),
        where('agency_id', '==', user!.uid),
        where('status', '==', 'hired')
      );
      
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as AgencyCandidate[];
      
      setCandidates(data);
    }
    
    fetchAssignedCandidates();
  }, [user]);
  
  return (
    <div className="min-h-screen bg-qeyafa-cream p-6">
      <h1 className="text-2xl font-bold text-qeyafa-green mb-6">
        Agency Portal - Assigned Candidates
      </h1>
      
      <div className="grid gap-4">
        {candidates.map(candidate => (
          <CandidateVisaCard key={candidate.id} candidate={candidate} />
        ))}
      </div>
    </div>
  );
}
```

### 7.3 Visa Tracking Pipeline

Visual stepper for deployment progress.

```tsx
// src/components/agency/VisaPipeline.tsx

const VISA_STEPS = [
  { key: 'passport_submitted', label: 'Passport', icon: '📘' },
  { key: 'medical_completed', label: 'Medical', icon: '🏥' },
  { key: 'visa_applied', label: 'Visa Applied', icon: '📝' },
  { key: 'visa_approved', label: 'Visa Approved', icon: '✅' },
  { key: 'flight_booked', label: 'Flight', icon: '✈️' }
];

export function VisaPipeline({ tracking }: { tracking: VisaTracking }) {
  return (
    <div className="flex items-center justify-between">
      {VISA_STEPS.map((step, index) => {
        const isComplete = tracking[step.key as keyof VisaTracking];
        const isActive = !isComplete && (index === 0 || tracking[VISA_STEPS[index - 1].key as keyof VisaTracking]);
        
        return (
          <div key={step.key} className="flex items-center">
            {/* Step Circle */}
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${
                isComplete
                  ? 'bg-qeyafa-gold text-qeyafa-green'
                  : isActive
                  ? 'bg-qeyafa-green text-white animate-pulse'
                  : 'bg-gray-200 text-gray-400'
              }`}
            >
              {step.icon}
            </div>
            
            {/* Connector Line */}
            {index < VISA_STEPS.length - 1 && (
              <div
                className={`h-1 w-16 mx-2 ${
                  isComplete ? 'bg-qeyafa-gold' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
```

---

## 8. Email Templates Reference

| Trigger | Template ID | Dynamic Data |
|---------|-------------|--------------|
| Application Received | `d-application-confirmation` | candidate_name, job_title, status_link |
| Rejected | `d-application-rejected` | candidate_name, job_title |
| Assessment Invite | `d-assessment-invite` | candidate_name, assessment_link, deadline |
| Interview Scheduled | `d-interview-scheduled` | candidate_name, interview_time, meet_link |
| Offer Extended | `d-offer-extended` | candidate_name, offer_link |
| Offer Accepted | `d-offer-accepted` | candidate_name, start_date |
| Negotiation Request | `d-negotiation-alert` | candidate_name, requested_salary (HR only) |

---

**Document Version:** 2.0  
**Last Updated:** December 2024  
**System:** QTME v1.0 (Qeyafa Talent Management Ecosystem)
