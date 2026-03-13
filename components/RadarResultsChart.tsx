'use client';

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  PolarRadiusAxis,
} from 'recharts';
import type { FoundationScore } from '@/lib/assessment/types';
import { FOUNDATION_LABELS } from '@/lib/assessment/constants';

interface RadarResultsChartProps {
  foundations: FoundationScore[];
}

export default function RadarResultsChart({ foundations }: RadarResultsChartProps) {
  const data = foundations.map((f) => ({
    foundation: FOUNDATION_LABELS[f.foundation],
    score: f.percent,
    fullMark: 100,
  }));

  return (
    <div className="w-full h-[320px] md:h-[360px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} cx="50%" cy="50%" outerRadius="75%">
          <PolarGrid
            stroke="#1B2A4A"
            strokeOpacity={0.08}
            radialLines={false}
          />
          <PolarAngleAxis
            dataKey="foundation"
            tick={{
              fill: '#1B2A4A',
              fontSize: 13,
              fontFamily: 'var(--font-inter)',
              fontWeight: 500,
            }}
            tickLine={false}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={false}
            axisLine={false}
          />
          <Radar
            dataKey="score"
            stroke="#C9A84C"
            fill="#C9A84C"
            fillOpacity={0.12}
            strokeWidth={2}
            dot={{
              r: 4,
              fill: '#C9A84C',
              stroke: '#FFFFFF',
              strokeWidth: 2,
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
