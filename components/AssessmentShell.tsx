'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface AssessmentShellProps {
  children: ReactNode;
  maxWidth?: 'narrow' | 'default' | 'wide';
}

const widthClasses = {
  narrow: 'max-w-lg',
  default: 'max-w-content',
  wide: 'max-w-results',
};

export default function AssessmentShell({
  children,
  maxWidth = 'default',
}: AssessmentShellProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="py-6 px-6">
        <div className="max-w-results mx-auto">
          <span className="font-inter font-semibold text-sm tracking-wide text-navy/70">
            THRIVING FOUNDER™
          </span>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 flex items-start justify-center px-6 pb-12">
        <motion.div
          className={`w-full ${widthClasses[maxWidth]} mx-auto`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}
