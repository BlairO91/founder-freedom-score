import type { Foundation } from './types';

export const TOTAL_STEPS = 15;
export const TOTAL_SCORED_QUESTIONS = 12;
export const MAX_SCORE_PER_QUESTION = 5;
export const MAX_FOUNDATION_SCORE = 15;
export const MAX_TOTAL_SCORE = 60;

export const FOUNDATION_ORDER: Foundation[] = [
  'clarity',
  'capacity',
  'cashflow',
  'confidence',
];

export const FOUNDATION_LABELS: Record<Foundation, string> = {
  clarity: 'Clarity',
  capacity: 'Capacity',
  cashflow: 'Cashflow',
  confidence: 'Confidence',
};

export const STORAGE_KEYS = {
  SESSION: 'ffs_session',
  RESULT_PREFIX: 'ffs_result_',
  PENDING_SUBMISSIONS: 'ffs_pending_submissions',
} as const;

export const ENV = {
  SHEETS_WEBHOOK_URL: process.env.NEXT_PUBLIC_SHEETS_WEBHOOK_URL || '',
  CALENDLY_URL: process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com',
  GA_ID: process.env.NEXT_PUBLIC_GA_ID || '',
} as const;
