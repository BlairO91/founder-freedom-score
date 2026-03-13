'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AssessmentShell from '@/components/AssessmentShell';
import { useAssessment } from '@/lib/assessment/context';
import { track } from '@/lib/assessment/services/analytics';

export default function AssessmentIntro() {
  const router = useRouter();
  const { state } = useAssessment();

  useEffect(() => {
    track('assessment_viewed');
  }, []);

  // If user already completed email gate, resume
  useEffect(() => {
    if (state.isEmailGateComplete && state.currentStep > 0 && !state.completedAt) {
      router.replace(`/assessment/questions/${state.currentStep}`);
    }
  }, [state.isEmailGateComplete, state.currentStep, state.completedAt, router]);

  return (
    <AssessmentShell maxWidth="narrow">
      <div className="text-center py-12 md:py-20">
        <h1 className="font-playfair text-4xl md:text-5xl font-bold text-navy leading-tight mb-6">
          Founder Freedom
          <br />
          Score<span className="text-gold">™</span>
        </h1>

        <p className="font-inter text-lg text-charcoal/70 leading-relaxed max-w-md mx-auto mb-4">
          A strategic diagnostic for mid-career professionals considering the
          transition from corporate life to entrepreneurship.
        </p>

        <p className="font-inter text-sm text-charcoal/50 leading-relaxed max-w-sm mx-auto mb-10">
          Evaluate your readiness across the 4 Foundations — Clarity, Capacity,
          Cashflow, and Confidence — and discover your #1 barrier to freedom.
        </p>

        <button
          onClick={() => router.push('/assessment/start')}
          className="btn-primary text-base"
        >
          Begin Assessment
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none" className="ml-2">
            <path
              d="M3 8h10m0 0L9 4m4 4L9 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <p className="mt-8 text-xs font-inter text-charcoal/40">
          Takes approximately 5 minutes. Your results are immediate.
        </p>
      </div>
    </AssessmentShell>
  );
}
