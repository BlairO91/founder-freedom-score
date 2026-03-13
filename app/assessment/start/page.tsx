'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AssessmentShell from '@/components/AssessmentShell';
import EmailGateForm from '@/components/EmailGateForm';
import { useAssessment } from '@/lib/assessment/context';
import { track } from '@/lib/assessment/services/analytics';
import type { EmailGateData } from '@/lib/assessment/engine/validation';

export default function AssessmentStart() {
  const router = useRouter();
  const { state, setUser } = useAssessment();

  useEffect(() => {
    track('assessment_started');
  }, []);

  // If already past email gate, redirect to current step or first question
  useEffect(() => {
    if (state.isEmailGateComplete) {
      const step = state.currentStep > 0 ? state.currentStep : 1;
      router.replace(`/assessment/questions/${step}`);
    }
  }, [state.isEmailGateComplete, state.currentStep, router]);

  function handleSubmit(data: EmailGateData) {
    setUser(data.firstName, data.email);
    track('email_submitted', { email: data.email });
    router.push('/assessment/questions/1');
  }

  return (
    <AssessmentShell maxWidth="narrow">
      <div className="py-12 md:py-16">
        <div className="text-center mb-10">
          <h1 className="font-playfair text-3xl md:text-4xl font-bold text-navy leading-tight mb-4">
            Let&apos;s find out where you stand.
          </h1>
          <p className="font-inter text-base text-charcoal/60 leading-relaxed max-w-md mx-auto">
            Enter your details below. Your personalized Founder Freedom Score™
            and custom roadmap will be delivered to your inbox.
          </p>
        </div>

        <div className="card-surface p-6 md:p-8">
          <EmailGateForm onSubmit={handleSubmit} />
        </div>
      </div>
    </AssessmentShell>
  );
}
