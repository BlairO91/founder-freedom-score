'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import AssessmentShell from '@/components/AssessmentShell';
import ScoreGauge from '@/components/ScoreGauge';
import RadarResultsChart from '@/components/RadarResultsChart';
import BarrierInsightCard from '@/components/BarrierInsightCard';
import ResultsSummary from '@/components/ResultsSummary';
import StrategyCallModal from '@/components/StrategyCallModal';
import { loadResult } from '@/lib/assessment/services/persistence';
import { track } from '@/lib/assessment/services/analytics';
import type { AssessmentResult } from '@/lib/assessment/types';

export default function ResultsPage() {
  const params = useParams();
  const router = useRouter();
  const resultId = params.resultId as string;
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [showCalendly, setShowCalendly] = useState(false);

  useEffect(() => {
    const data = loadResult(resultId);
    setResult(data);
    setLoading(false);

    if (data) {
      track('results_viewed', {
        resultId,
        totalScore: data.scoring.totalPercent,
        tier: data.tier,
      });
    }
  }, [resultId]);

  function handleBookCall() {
    track('strategy_call_clicked', { resultId });
    setShowCalendly(true);
  }

  function handleShare() {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: 'My Founder Freedom Score™', url });
    } else {
      navigator.clipboard.writeText(url);
    }
    track('results_shared', { resultId });
  }

  if (loading) {
    return (
      <AssessmentShell maxWidth="wide">
        <div className="flex items-center justify-center py-24">
          <div className="w-8 h-8 border-2 border-navy/20 border-t-gold rounded-full animate-spin" />
        </div>
      </AssessmentShell>
    );
  }

  if (!result) {
    return (
      <AssessmentShell maxWidth="narrow">
        <div className="text-center py-16 md:py-24">
          <div className="w-14 h-14 rounded-full bg-navy/5 flex items-center justify-center mx-auto mb-6">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 9v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                stroke="#1B2A4A"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.4"
              />
            </svg>
          </div>
          <h2 className="font-inter font-semibold text-xl text-navy mb-3">
            Results not found
          </h2>
          <p className="font-inter text-sm text-charcoal/50 mb-8 max-w-sm mx-auto">
            This result may have been created on another device, or the link may
            be invalid. Take the assessment to get your personalized score.
          </p>
          <button
            onClick={() => router.push('/assessment')}
            className="btn-primary"
          >
            Take the Assessment
          </button>
        </div>
      </AssessmentShell>
    );
  }

  return (
    <>
      <AssessmentShell maxWidth="wide">
        <div className="py-8 md:py-12">
          {/* Header */}
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="font-inter text-sm font-medium text-navy/50 tracking-wide mb-2">
              {result.user.firstName}&apos;s
            </p>
            <h1 className="font-playfair text-3xl md:text-4xl font-bold text-navy">
              Founder Freedom Score<span className="text-gold">™</span>
            </h1>
          </motion.div>

          {/* Score Gauge */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
          >
            <ScoreGauge score={result.scoring.totalPercent} />
          </motion.div>

          {/* Radar Chart */}
          <motion.div
            className="card-surface p-6 md:p-8 mb-6"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="font-inter font-semibold text-base text-navy mb-1 text-center">
              The 4 Foundations
            </h2>
            <p className="font-inter text-sm text-charcoal/50 text-center mb-4">
              Your readiness across each dimension
            </p>
            <RadarResultsChart foundations={result.scoring.foundations} />
          </motion.div>

          {/* Barrier Insight */}
          <div className="mb-6">
            <BarrierInsightCard barrier={result.scoring.lowestBarrier} />
          </div>

          {/* Email reminder */}
          <motion.div
            className="card-surface p-5 mb-6 text-center"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <p className="font-inter text-sm text-charcoal/60">
              Your full personalized report is on its way to{' '}
              <span className="font-medium text-navy">{result.user.email}</span>.
              Check your inbox.
            </p>
          </motion.div>

          {/* Strategy Call CTA */}
          <motion.div
            className="bg-navy rounded-xl p-8 md:p-10 text-center mb-6"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <h3 className="font-inter font-semibold text-lg md:text-xl text-white mb-3">
              Remove your #1 barrier — with a clear plan.
            </h3>
            <p className="font-inter text-sm text-white/60 leading-relaxed max-w-md mx-auto mb-6">
              In a 30-minute strategy call, we&apos;ll map out exactly how to
              remove this barrier and move toward your freedom-based business.
            </p>
            <button onClick={handleBookCall} className="btn-primary">
              Book My Strategy Call
            </button>
          </motion.div>

          {/* Summary Details */}
          <ResultsSummary result={result} />

          {/* Share */}
          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <button
              onClick={handleShare}
              className="btn-secondary text-xs"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                className="mr-2"
              >
                <path
                  d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Share Results
            </button>
          </motion.div>
        </div>
      </AssessmentShell>

      <StrategyCallModal
        isOpen={showCalendly}
        onClose={() => setShowCalendly(false)}
      />
    </>
  );
}
