import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | Founder Freedom Score™',
  description: 'Privacy policy for the Founder Freedom Score™ assessment.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-6 py-16 md:py-24">
        {/* Back link */}
        <Link
          href="/assessment"
          className="inline-flex items-center font-inter text-sm text-navy/50 hover:text-navy transition-colors mb-10"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mr-2">
            <path
              d="M13 8H3m0 0l4-4M3 8l4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back to Assessment
        </Link>

        {/* Header */}
        <h1 className="font-playfair text-3xl md:text-4xl font-bold text-navy mb-2">
          Privacy Policy
        </h1>
        <p className="font-inter text-sm text-charcoal/50 mb-10">
          Last updated: March 2026
        </p>

        {/* Content */}
        <div className="space-y-8 font-inter text-charcoal/80 leading-relaxed">
          <section>
            <h2 className="font-inter font-semibold text-base text-navy mb-3">
              What We Collect
            </h2>
            <p className="text-sm">
              When you take the Founder Freedom Score™ assessment, we collect your first
              name and email address. We also collect your assessment responses to
              generate your personalized score and report.
            </p>
          </section>

          <section>
            <h2 className="font-inter font-semibold text-base text-navy mb-3">
              How We Use Your Information
            </h2>
            <p className="text-sm">
              Your name and email are used to:
            </p>
            <ul className="mt-2 ml-4 space-y-1 text-sm list-disc list-outside">
              <li>Deliver your personalized assessment results and report</li>
              <li>Send follow-up communication related to your results</li>
              <li>Share resources, tools, and offers relevant to your founder journey</li>
            </ul>
          </section>

          <section>
            <h2 className="font-inter font-semibold text-base text-navy mb-3">
              We Do Not Sell Your Data
            </h2>
            <p className="text-sm">
              Your personal information is never sold, rented, or traded to third
              parties. We will not share your data with outside companies for their
              own marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="font-inter font-semibold text-base text-navy mb-3">
              Data Storage
            </h2>
            <p className="text-sm">
              Assessment results are stored locally in your browser and may be
              submitted to our secure systems for report delivery. We take reasonable
              measures to protect your information from unauthorized access.
            </p>
          </section>

          <section>
            <h2 className="font-inter font-semibold text-base text-navy mb-3">
              Unsubscribe
            </h2>
            <p className="text-sm">
              You can opt out of follow-up emails at any time using the unsubscribe
              link included in every message we send.
            </p>
          </section>

          <section>
            <h2 className="font-inter font-semibold text-base text-navy mb-3">
              Contact
            </h2>
            <p className="text-sm">
              Questions about this policy? Reach us at{' '}
              <a
                href="mailto:hello@thrivingfounder.com"
                className="text-navy underline hover:text-navy/70 transition-colors"
              >
                hello@thrivingfounder.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
