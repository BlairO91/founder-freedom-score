import { nanoid } from 'nanoid';
import type { AssessmentResult, AssessmentState, QualificationAnswers } from '../types';
import { computeScores } from './scoring';
import { computeTier } from './segmentation';

function extractQualificationAnswers(answers: Record<number, string>): QualificationAnswers {
  return {
    professionalSituation: answers[4] ?? '',
    timeline: answers[8] ?? '',
    investmentHistory: answers[12] ?? '',
  };
}

export function buildResult(state: AssessmentState): AssessmentResult {
  const { answers, user } = state;

  if (!user) throw new Error('Cannot build result without user data');

  const scoring = computeScores(answers);
  const qualification = extractQualificationAnswers(answers);
  const tier = computeTier(scoring.totalPercent, qualification.timeline);

  const resultId = nanoid(21);

  return {
    resultId,
    timestamp: new Date().toISOString(),
    user: {
      firstName: user.firstName,
      email: user.email,
    },
    answers,
    scoring,
    qualification,
    tier,
    emailReportStatus: 'pending',
    metadata: {
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
      referrer: typeof document !== 'undefined' ? document.referrer : '',
      completionStatus: 'complete',
    },
  };
}
