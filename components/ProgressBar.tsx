'use client';

import { TOTAL_STEPS } from '@/lib/assessment/constants';

interface ProgressBarProps {
  currentStep: number;
}

export default function ProgressBar({ currentStep }: ProgressBarProps) {
  const progress = (currentStep / TOTAL_STEPS) * 100;

  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-inter font-medium text-navy/50 tracking-wide">
          QUESTION {currentStep} OF {TOTAL_STEPS}
        </span>
        <span className="text-xs font-inter font-medium text-navy/50">
          {Math.round(progress)}%
        </span>
      </div>
      <div className="w-full h-1 bg-navy/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-gold rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
