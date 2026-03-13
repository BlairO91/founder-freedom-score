import { ENV } from '../constants';

export function getCalendlyUrl(): string {
  return ENV.CALENDLY_URL;
}

/**
 * Calendly inline widget configuration.
 *
 * Usage with Calendly's embed script:
 *   <div
 *     className="calendly-inline-widget"
 *     data-url={getCalendlyUrl()}
 *     style={{ minWidth: '320px', height: '630px' }}
 *   />
 *
 * Or with their popup widget:
 *   window.Calendly.initPopupWidget({ url: getCalendlyUrl() });
 *
 * The StrategyCallModal component wraps this in a modal overlay.
 */
