'use client';

import { motion } from 'framer-motion';

interface AnswerOptionProps {
  optionKey: string;
  text: string;
  isSelected: boolean;
  onSelect: (key: string) => void;
}

export default function AnswerOption({
  optionKey,
  text,
  isSelected,
  onSelect,
}: AnswerOptionProps) {
  return (
    <motion.button
      type="button"
      onClick={() => onSelect(optionKey)}
      className={`w-full text-left px-5 py-4 rounded-lg border transition-all duration-200 group
        ${
          isSelected
            ? 'border-gold bg-gold/[0.06] shadow-sm'
            : 'border-black/[0.06] bg-white hover:border-navy/20 hover:bg-navy/[0.02]'
        }
        focus:outline-none focus:ring-2 focus:ring-gold/40 focus:ring-offset-2 focus:ring-offset-off-white
      `}
      whileTap={{ scale: 0.995 }}
      role="radio"
      aria-checked={isSelected}
    >
      <div className="flex items-start gap-4">
        {/* Selection indicator */}
        <div
          className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full border-2 transition-all duration-200 flex items-center justify-center
            ${
              isSelected
                ? 'border-gold bg-gold'
                : 'border-navy/20 group-hover:border-navy/40'
            }
          `}
        >
          {isSelected && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.15 }}
              className="w-2 h-2 rounded-full bg-white"
            />
          )}
        </div>

        {/* Answer text */}
        <span
          className={`font-inter text-[15px] leading-relaxed transition-colors duration-200
            ${isSelected ? 'text-navy font-medium' : 'text-charcoal/80'}
          `}
        >
          {text}
        </span>
      </div>
    </motion.button>
  );
}
