import type { Foundation, FoundationScore, ScoringResult } from '../types';
import { FOUNDATION_ORDER, MAX_FOUNDATION_SCORE, MAX_TOTAL_SCORE } from '../constants';
import { allQuestions } from '../content/questions';

/**
 * Foundation-to-steps mapping for scored questions only.
 */
const FOUNDATION_STEPS: Record<Foundation, number[]> = {
  clarity: [1, 2, 3],
  capacity: [5, 6, 7],
  cashflow: [9, 10, 11],
  confidence: [13, 14, 15],
};

/**
 * Get the score value for a given step and selected answer key.
 */
function getScoreForAnswer(step: number, answerKey: string): number {
  const question = allQuestions.find((q) => q.step === step);
  if (!question || question.type !== 'scored') return 0;
  const option = question.options.find((o) => o.key === answerKey);
  return option?.score ?? 0;
}

/**
 * Compute the full scoring result from a map of step → answer key.
 */
export function computeScores(answers: Record<number, string>): ScoringResult {
  let totalRaw = 0;

  const foundations: FoundationScore[] = FOUNDATION_ORDER.map((foundation) => {
    const steps = FOUNDATION_STEPS[foundation];
    const raw = steps.reduce((sum, step) => {
      return sum + getScoreForAnswer(step, answers[step] ?? '');
    }, 0);
    totalRaw += raw;
    return {
      foundation,
      raw,
      percent: Math.round((raw / MAX_FOUNDATION_SCORE) * 100),
    };
  });

  const totalPercent = Math.round((totalRaw / MAX_TOTAL_SCORE) * 100);

  // Lowest barrier: lowest percent; ties broken by FOUNDATION_ORDER
  const lowestBarrier = foundations.reduce<Foundation>((lowest, current) => {
    const lowestScore = foundations.find((f) => f.foundation === lowest)!;
    if (current.percent < lowestScore.percent) {
      return current.foundation;
    }
    return lowest;
  }, foundations[0].foundation);

  return {
    totalRaw,
    totalPercent,
    foundations,
    lowestBarrier,
  };
}
