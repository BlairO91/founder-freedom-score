'use client';

import { motion } from 'framer-motion';

interface ScoreGaugeProps {
  score: number; // 0–100
}

export default function ScoreGauge({ score }: ScoreGaugeProps) {
  const radius = 80;
  const stroke = 8;
  const circumference = 2 * Math.PI * radius;
  const arc = circumference * 0.75; // 270 degrees
  const offset = arc - (score / 100) * arc;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-[200px] h-[200px]">
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full -rotate-[135deg]"
        >
          {/* Background arc */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="#1B2A4A"
            strokeOpacity="0.08"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${arc} ${circumference}`}
          />
          {/* Score arc */}
          <motion.circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="#C9A84C"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${arc} ${circumference}`}
            initial={{ strokeDashoffset: arc }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
          />
        </svg>

        {/* Score number */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className="font-playfair text-5xl font-bold text-navy"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {score}
          </motion.span>
          <span className="text-xs font-inter font-medium text-navy/40 tracking-wider mt-1">
            OUT OF 100
          </span>
        </div>
      </div>
    </div>
  );
}
