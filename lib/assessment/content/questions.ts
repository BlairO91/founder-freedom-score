import type { Question } from '../types';
import { clarityQuestions } from './clarity';
import { capacityQuestions } from './capacity';
import { cashflowQuestions } from './cashflow';
import { confidenceQuestions } from './confidence';
import { qualificationQuestions } from './qualification';

/**
 * All 15 questions in order of presentation.
 * Steps 1-3:  Clarity (scored)
 * Step 4:     Qualification A — Professional Situation
 * Steps 5-7:  Capacity (scored)
 * Step 8:     Qualification B — Timeline
 * Steps 9-11: Cashflow (scored)
 * Step 12:    Qualification C — Investment History
 * Steps 13-15: Confidence (scored)
 */
export const allQuestions: Question[] = [
  ...clarityQuestions,          // steps 1, 2, 3
  qualificationQuestions[0],    // step 4
  ...capacityQuestions,         // steps 5, 6, 7
  qualificationQuestions[1],    // step 8
  ...cashflowQuestions,         // steps 9, 10, 11
  qualificationQuestions[2],    // step 12
  ...confidenceQuestions,       // steps 13, 14, 15
].sort((a, b) => a.step - b.step);

export function getQuestionByStep(step: number): Question | undefined {
  return allQuestions.find((q) => q.step === step);
}

export function isValidStep(step: number): boolean {
  return step >= 1 && step <= 15;
}
