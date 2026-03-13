type AnalyticsEvent =
  | 'assessment_viewed'
  | 'assessment_started'
  | 'email_submitted'
  | 'question_viewed'
  | 'question_answered'
  | 'qualification_answered'
  | 'assessment_completed'
  | 'results_viewed'
  | 'strategy_call_clicked'
  | 'results_shared'
  | 'submission_failed'
  | 'submission_succeeded';

type EventPayload = Record<string, string | number | boolean | undefined>;

interface AnalyticsAdapter {
  track: (event: AnalyticsEvent, payload?: EventPayload) => void;
}

/**
 * Console adapter for development.
 */
const consoleAdapter: AnalyticsAdapter = {
  track: (event, payload) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Analytics] ${event}`, payload ?? '');
    }
  },
};

/**
 * Placeholder GA4 adapter — wire up when NEXT_PUBLIC_GA_ID is set.
 *
 * Replace with:
 *   gtag('event', event, payload);
 *
 * Or Segment:
 *   analytics.track(event, payload);
 *
 * Or PostHog:
 *   posthog.capture(event, payload);
 */
// const ga4Adapter: AnalyticsAdapter = { track: () => {} };

let adapter: AnalyticsAdapter = consoleAdapter;

export function setAnalyticsAdapter(newAdapter: AnalyticsAdapter) {
  adapter = newAdapter;
}

export function track(event: AnalyticsEvent, payload?: EventPayload) {
  adapter.track(event, payload);
}
