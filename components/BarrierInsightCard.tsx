'use client';

import { motion } from 'framer-motion';
import type { Foundation } from '@/lib/assessment/types';
import { FOUNDATION_LABELS } from '@/lib/assessment/constants';
import { barrierInsights } from '@/lib/assessment/content/metadata';

interface BarrierInsightCardProps {
  barrier: Foundation;
}

export default function BarrierInsightCard({ barrier }: BarrierInsightCardProps) {
  return (
    <motion.div
      className="card-surface p-6 md:p-8"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.5 }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-1 h-8 bg-gold rounded-full" />
        <h3 className="font-inter font-semibold text-lg text-navy">
          Your biggest barrier to freedom is{' '}
          <span className="text-gold">{FOUNDATION_LABELS[barrier]}</span>.
        </h3>
      </div>
      <p className="font-inter text-[15px] leading-relaxed text-charcoal/75">
        {barrierInsights[barrier]}
      </p>
    </motion.div>
  );
}
