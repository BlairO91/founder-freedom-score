import type { AssessmentResult, Foundation, SubmissionPayload } from '../types';
import { STORAGE_KEYS, ENV } from '../constants';
import { allQuestions } from '../content/questions';
import { track } from './analytics';

function buildPayload(result: AssessmentResult): SubmissionPayload {
  const scoredAnswers: Record<string, { question: string; answer: string; score: number }> = {};

  for (const question of allQuestions) {
    if (question.type !== 'scored') continue;
    const answerKey = result.answers[question.step];
    const option = question.options.find((o) => o.key === answerKey);
    scoredAnswers[question.id] = {
      question: question.stem,
      answer: option?.text ?? '',
      score: option?.score ?? 0,
    };
  }

  const foundationScores = result.scoring.foundations.reduce(
    (acc, f) => ({ ...acc, [f.foundation]: f.percent }),
    {} as Record<Foundation, number>
  );

  return {
    resultId: result.resultId,
    timestamp: result.timestamp,
    firstName: result.user.firstName,
    email: result.user.email,
    answers: result.answers,
    scoredAnswers,
    qualificationAnswers: result.qualification,
    totalScore: result.scoring.totalRaw,
    totalPercent: result.scoring.totalPercent,
    foundationScores,
    lowestBarrier: result.scoring.lowestBarrier,
    tier: result.tier,
    userAgent: result.metadata.userAgent,
    referrer: result.metadata.referrer,
    source: result.metadata.source,
    completionStatus: 'complete',
  };
}

/**
 * Submit result to Google Apps Script webhook.
 * Non-blocking — user sees results regardless.
 */
export async function submitResult(result: AssessmentResult): Promise<boolean> {
  const payload = buildPayload(result);
  const webhookUrl = ENV.SHEETS_WEBHOOK_URL;

  if (!webhookUrl) {
    console.warn('[Submission] No webhook URL configured. Storing for later.');
    queuePendingSubmission(payload);
    return false;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      mode: 'no-cors', // Apps Script may require this
    });

    // no-cors returns opaque response, treat as success
    if (response.type === 'opaque' || response.ok) {
      track('submission_succeeded', { resultId: result.resultId });
      clearPendingSubmission(result.resultId);
      return true;
    }

    throw new Error(`Submission failed: ${response.status}`);
  } catch (error) {
    console.error('[Submission] Failed:', error);
    track('submission_failed', { resultId: result.resultId });
    queuePendingSubmission(payload);
    return false;
  }
}

/**
 * Queue failed submission for retry.
 */
function queuePendingSubmission(payload: SubmissionPayload): void {
  try {
    const existing = localStorage.getItem(STORAGE_KEYS.PENDING_SUBMISSIONS);
    const queue: SubmissionPayload[] = existing ? JSON.parse(existing) : [];
    const filtered = queue.filter((p) => p.resultId !== payload.resultId);
    filtered.push(payload);
    localStorage.setItem(STORAGE_KEYS.PENDING_SUBMISSIONS, JSON.stringify(filtered));
  } catch {
    // Storage unavailable
  }
}

function clearPendingSubmission(resultId: string): void {
  try {
    const existing = localStorage.getItem(STORAGE_KEYS.PENDING_SUBMISSIONS);
    if (!existing) return;
    const queue: SubmissionPayload[] = JSON.parse(existing);
    const filtered = queue.filter((p) => p.resultId !== resultId);
    localStorage.setItem(STORAGE_KEYS.PENDING_SUBMISSIONS, JSON.stringify(filtered));
  } catch {
    // Fail silently
  }
}

/**
 * Retry any pending submissions. Call on app mount if desired.
 */
export async function retryPendingSubmissions(): Promise<void> {
  try {
    const existing = localStorage.getItem(STORAGE_KEYS.PENDING_SUBMISSIONS);
    if (!existing) return;
    const queue: SubmissionPayload[] = JSON.parse(existing);
    const webhookUrl = ENV.SHEETS_WEBHOOK_URL;
    if (!webhookUrl || queue.length === 0) return;

    for (const payload of queue) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          mode: 'no-cors',
        });
        clearPendingSubmission(payload.resultId);
      } catch {
        // Will retry next time
      }
    }
  } catch {
    // Fail silently
  }
}

/**
 * SECONDARY PATH: Google Sheets API integration.
 *
 * To use Google Sheets API directly (e.g., from a serverless function):
 *
 * import { google } from 'googleapis';
 *
 * const sheets = google.sheets({ version: 'v4', auth });
 * await sheets.spreadsheets.values.append({
 *   spreadsheetId: process.env.GOOGLE_SHEET_ID,
 *   range: 'Submissions!A:Z',
 *   valueInputOption: 'USER_ENTERED',
 *   requestBody: {
 *     values: [[ payload.resultId, payload.timestamp, payload.firstName, ... ]],
 *   },
 * });
 */
