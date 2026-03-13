import type { Question } from '../types';

export const qualificationQuestions: Question[] = [
  {
    id: 'qual-professional',
    step: 4,
    type: 'qualification',
    tag: 'ABOUT YOU',
    title: 'Professional Situation',
    subtitle: 'To personalize your results, tell us a bit about where you are right now.',
    stem: 'Which best describes your current professional situation?',
    options: [
      { key: 'A', text: 'Corporate executive or senior leader' },
      { key: 'B', text: 'Mid-level manager or director' },
      { key: 'C', text: 'Business owner looking to pivot or restructure' },
      { key: 'D', text: 'Independent consultant or freelancer' },
      { key: 'E', text: 'Other' },
    ],
  },
  {
    id: 'qual-timeline',
    step: 8,
    type: 'qualification',
    tag: 'ABOUT YOU',
    title: 'Timeline',
    subtitle: 'Understanding your timeline helps us tailor your roadmap.',
    stem: 'What\'s your realistic timeline for launching or fully transitioning to your own business?',
    options: [
      { key: 'A', text: 'I\'ve already started — I\'m in it now' },
      { key: 'B', text: 'Within the next 6 months' },
      { key: 'C', text: '6–12 months from now' },
      { key: 'D', text: '1–2 years from now' },
      { key: 'E', text: 'I\'m just exploring the idea' },
    ],
  },
  {
    id: 'qual-investment',
    step: 12,
    type: 'qualification',
    tag: 'ABOUT YOU',
    title: 'Investment History',
    subtitle: 'One last context question before your final section.',
    stem: 'What level of investment have you made in professional development or coaching in the past 2 years?',
    options: [
      { key: 'A', text: 'Under $1,000' },
      { key: 'B', text: '$1,000–$5,000' },
      { key: 'C', text: '$5,000–$15,000' },
      { key: 'D', text: '$15,000–$50,000' },
      { key: 'E', text: 'Over $50,000' },
    ],
  },
];
