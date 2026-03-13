'use client';

import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import AssessmentShell from '@/components/AssessmentShell';
import { useAssessment } from '@/lib/assessment/context';

function CompleteContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { state } = useAssessment();

  const resultId = searchParams.get('id') || state.resultId;

  useEffect(() => {
    if (!resultId) {
      router.replace('/assessment');
    }
  }, [resultId, router]);

  if (!resultId) return null;

  return (
    <div className="text-center py-16 md:py-24">
      <motion.div
        className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-8"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', duration: 0.6 }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <motion.path
            d="M5 13l4 4L19 7"
            stroke="#C9A84C"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          />
        </svg>
      </motion.div>

      <motion.h1
        className="font-playfair text-3xl md:text-4xl font-bold text-navy leading-tight mb-4"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Your Founder Freedom Score™ is ready.
      </motion.h1>

      <motion.p
        className="font-inter text-base text-charcoal/60 leading-relaxed max-w-md mx-auto mb-10"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
      >
        Check your inbox for your full personalized report — including your
        custom roadmap across all 4 Foundations.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <button
          onClick={() => router.push(`/results/${resultId}`)}
          className="btn-primary text-base"
        >
          View My Score
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
      </motion.div>
    </div>
  );
}

export default function AssessmentComplete() {
  return (
    <AssessmentShell maxWidth="narrow">
      <Suspense fallback={null}>
        <CompleteContent />
      </Suspense>
    </AssessmentShell>
  );
}
