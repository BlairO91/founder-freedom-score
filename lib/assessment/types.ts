export type Foundation = 'clarity' | 'capacity' | 'cashflow' | 'confidence';

export type QuestionType = 'scored' | 'qualification';

export interface AnswerOption {
  key: string;       // 'A' | 'B' | 'C' | 'D' | 'E'
  text: string;
  score?: number;    // 1–5 for scored questions, undefined for qualification
}

export interface Question {
  id: string;
  step: number;      // 1-indexed position in the sequence
  type: QuestionType;
  foundation?: Foundation;
  tag: string;       // display tag, e.g. "CLARITY" or "ABOUT YOU"
  title: string;
  subtitle?: string; // metadata prompt intro for qualification questions
  stem: string;
  options: AnswerOption[];
}

export interface FoundationScore {
  foundation: Foundation;
  raw: number;       // sum of points (0–15)
  percent: number;   // (raw / 15) * 100
}

export interface ScoringResult {
  totalRaw: number;
  totalPercent: number;
  foundations: FoundationScore[];
  lowestBarrier: Foundation;
}

export type Tier = 'Freedom-Ready' | 'Foundation-Builder' | 'Future Founder';

export interface QualificationAnswers {
  professionalSituation: string;
  timeline: string;
  investmentHistory: string;
}

export interface AssessmentResult {
  resultId: string;
  timestamp: string;
  user: {
    firstName: string;
    email: string;
  };
  answers: Record<number, string>;          // step → selected option key
  scoring: ScoringResult;
  qualification: QualificationAnswers;
  tier: Tier;
  emailReportStatus: 'pending' | 'sent' | 'failed';
  metadata: {
    userAgent: string;
    referrer: string;
    source?: string;
    completionStatus: 'complete';
  };
}

export interface AssessmentState {
  user: { firstName: string; email: string } | null;
  answers: Record<number, string>;
  currentStep: number;
  isEmailGateComplete: boolean;
  resultId: string | null;
  startedAt: string | null;
  completedAt: string | null;
}

export type AssessmentAction =
  | { type: 'SET_USER'; payload: { firstName: string; email: string } }
  | { type: 'SET_ANSWER'; payload: { step: number; key: string } }
  | { type: 'SET_STEP'; payload: number }
  | { type: 'COMPLETE'; payload: { resultId: string } }
  | { type: 'RESTORE'; payload: AssessmentState };

export interface SubmissionPayload {
  resultId: string;
  timestamp: string;
  firstName: string;
  email: string;
  answers: Record<number, string>;
  scoredAnswers: Record<string, { question: string; answer: string; score: number }>;
  qualificationAnswers: QualificationAnswers;
  totalScore: number;
  totalPercent: number;
  foundationScores: Record<Foundation, number>;
  lowestBarrier: Foundation;
  tier: Tier;
  userAgent: string;
  referrer: string;
  source?: string;
  completionStatus: 'complete';
}
