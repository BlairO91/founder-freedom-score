'use client';

import { motion } from 'framer-motion';
import type { AssessmentResult } from '@/lib/assessment/types';
import { FOUNDATION_LABELS } from '@/lib/assessment/constants';

interface ResultsSummaryProps {
  result: AssessmentResult;
}

export default function ResultsSummary({ result }: ResultsSummaryProps) {
  const completedDate = new Date(result.timestamp).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <motion.div
      className="card-surface p-6"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.7 }}
    >
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {/* Tier */}
        <div>
          <span className="text-xs font-inter font-medium text-navy/40 tracking-wide">
            YOUR TIER
          </span>
          <p className="font-inter font-semibold text-sm text-navy mt-1">
            {result.tier}
          </p>
        </div>

        {/* Date */}
        <div>
          <span className="text-xs font-inter font-medium text-navy/40 tracking-wide">
            COMPLETED
          </span>
          <p className="font-inter font-semibold text-sm text-navy mt-1">
            {completedDate}
          </p>
        </div>

        {/* Foundation scores */}
        {result.scoring.foundations.map((f) => (
          <div key={f.foundation}>
            <span className="text-xs font-inter font-medium text-navy/40 tracking-wide">
              {FOUNDATION_LABELS[f.foundation].toUpperCase()}
            </span>
            <div className="flex items-center gap-2 mt-1">
              <p className="font-inter font-semibold text-sm text-navy">
                {f.percent}%
              </p>
              <div className="flex-1 h-1.5 bg-navy/8 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gold/60 rounded-full"
                  style={{ width: `${f.percent}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
