'use client';

import { motion, AnimatePresence } from 'framer-motion';
import type { Question } from '@/lib/assessment/types';
import CategoryTag from './CategoryTag';
import AnswerOption from './AnswerOption';

interface QuestionCardProps {
  question: Question;
  selectedAnswer: string | undefined;
  onAnswer: (key: string) => void;
  direction: number; // 1 = forward, -1 = backward
}

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 40 : -40,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -40 : 40,
    opacity: 0,
  }),
};

export default function QuestionCard({
  question,
  selectedAnswer,
  onAnswer,
  direction,
}: QuestionCardProps) {
  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={question.id}
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        {/* Category tag */}
        <div className="mb-6">
          <CategoryTag
            label={question.tag}
            variant={question.type === 'qualification' ? 'qualification' : 'foundation'}
          />
        </div>

        {/* Subtitle for qualification questions */}
        {question.subtitle && (
          <p className="text-sm font-inter text-navy/50 mb-3">
            {question.subtitle}
          </p>
        )}

        {/* Question stem */}
        <h2 className="font-inter font-semibold text-xl md:text-2xl text-navy leading-snug mb-8">
          {question.stem}
        </h2>

        {/* Answer options */}
        <div className="space-y-3" role="radiogroup" aria-label={question.title}>
          {question.options.map((option) => (
            <AnswerOption
              key={option.key}
              optionKey={option.key}
              text={option.text}
              isSelected={selectedAnswer === option.key}
              onSelect={onAnswer}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
