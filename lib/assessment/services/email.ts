import type { AssessmentResult } from '../types';

/**
 * Email delivery service — PLACEHOLDER.
 *
 * This module models the email delivery interface.
 * Actual email sending is not implemented yet.
 *
 * To wire up email delivery later:
 *
 * Option A: Resend (recommended)
 * ─────────────────────────────────
 *   import { Resend } from 'resend';
 *   const resend = new Resend(process.env.RESEND_API_KEY);
 *   await resend.emails.send({
 *     from: 'Thriving Founder <results@thrivingfounder.com>',
 *     to: result.user.email,
 *     subject: `${result.user.firstName}, your Founder Freedom Pattern™ report`,
 *     html: renderEmailTemplate(result),
 *   });
 *
 * Option B: SendGrid
 * ─────────────────────────────────
 *   import sgMail from '@sendgrid/mail';
 *   sgMail.setApiKey(process.env.SENDGRID_API_KEY);
 *   await sgMail.send({ ... });
 *
 * Option C: Serverless function (API route)
 * ─────────────────────────────────
 *   POST /api/send-report
 *   Body: { resultId, email, firstName, ... }
 *
 * The email template would use these fields from AssessmentResult:
 *   - user.firstName
 *   - scoring.totalPercent
 *   - scoring.foundations (array of foundation scores)
 *   - scoring.lowestBarrier
 *   - tier
 *   - qualification answers
 *   - resultId (for link back to results page)
 */

export interface EmailDeliveryResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

/**
 * Send the full assessment report email.
 * Currently a no-op placeholder.
 */
export async function sendReportEmail(
  _result: AssessmentResult
): Promise<EmailDeliveryResult> {
  // TODO: Wire up actual email delivery service
  console.log('[Email] Report email would be sent to:', _result.user.email);
  return { success: false, error: 'Email delivery not configured' };
}
