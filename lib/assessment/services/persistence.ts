import type { AssessmentResult, AssessmentState } from '../types';
import { STORAGE_KEYS } from '../constants';

/**
 * Session progress persistence (sessionStorage).
 * Preserves in-progress assessment state across page refreshes.
 */
export function saveSessionProgress(state: AssessmentState): void {
  try {
    sessionStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(state));
  } catch {
    // Storage full or unavailable — fail silently
  }
}

export function loadSessionProgress(): AssessmentState | null {
  try {
    const data = sessionStorage.getItem(STORAGE_KEYS.SESSION);
    if (!data) return null;
    return JSON.parse(data) as AssessmentState;
  } catch {
    return null;
  }
}

export function clearSessionProgress(): void {
  try {
    sessionStorage.removeItem(STORAGE_KEYS.SESSION);
  } catch {
    // Fail silently
  }
}

/**
 * Result persistence (localStorage).
 * Stores completed results for shareable URL access.
 *
 * Future migration: Replace this module's implementation with
 * API calls to a backend (e.g., /api/results/[id]) while
 * keeping the same interface.
 */
export function saveResult(result: AssessmentResult): void {
  try {
    const key = STORAGE_KEYS.RESULT_PREFIX + result.resultId;
    localStorage.setItem(key, JSON.stringify(result));
  } catch {
    // Storage full — fail silently, submission service handles backup
  }
}

export function loadResult(resultId: string): AssessmentResult | null {
  try {
    const key = STORAGE_KEYS.RESULT_PREFIX + resultId;
    const data = localStorage.getItem(key);
    if (!data) return null;
    return JSON.parse(data) as AssessmentResult;
  } catch {
    return null;
  }
}
