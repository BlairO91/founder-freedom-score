import type { Tier } from '../types';

/**
 * Determine the tier based on overall percent score and timeline answer.
 *
 * Timeline answer keys (step 8):
 *   A = "I've already started — I'm in it now"
 *   B = "Within the next 6 months"
 *   C = "6–12 months from now"
 *   D = "1–2 years from now"
 *   E = "I'm just exploring the idea"
 *
 * Rules (applied in order):
 *   1. Future Founder: timeline D or E (any score)
 *   2. Freedom-Ready: score > 80 → demote to Foundation-Builder (edge case)
 *   3. Freedom-Ready: score < 30 + timeline A → stays Freedom-Ready (edge case)
 *   4. Freedom-Ready: score 50–80 + timeline A or B
 *   5. Foundation-Builder: score 50–80 + timeline C (edge case overlap)
 *   6. Foundation-Builder: score 30–70 + timeline C
 *   7. Default: most conservative reasonable assignment
 */
export function computeTier(totalPercent: number, timelineAnswer: string): Tier {
  // Rule 1: Long timeline → Future Founder regardless of score
  if (timelineAnswer === 'D' || timelineAnswer === 'E') {
    return 'Future Founder';
  }

  // Rule 2: Very high score → Foundation-Builder (not ready yet per spec)
  if (totalPercent > 80) {
    return 'Foundation-Builder';
  }

  // Rule 3: Low score but already started → Freedom-Ready
  if (totalPercent < 30 && timelineAnswer === 'A') {
    return 'Freedom-Ready';
  }

  // Rule 4: Mid-high score + immediate timeline → Freedom-Ready
  if (totalPercent >= 50 && totalPercent <= 80 && (timelineAnswer === 'A' || timelineAnswer === 'B')) {
    return 'Freedom-Ready';
  }

  // Rule 5/6: Mid-range score + 6–12 month timeline → Foundation-Builder
  if (timelineAnswer === 'C') {
    return 'Foundation-Builder';
  }

  // Rule 7: Score 30-49 with immediate timelines → Foundation-Builder (conservative)
  if (totalPercent >= 30 && totalPercent < 50 && (timelineAnswer === 'A' || timelineAnswer === 'B')) {
    return 'Foundation-Builder';
  }

  // Fallback: most conservative
  if (totalPercent < 30) {
    return 'Future Founder';
  }

  return 'Foundation-Builder';
}
