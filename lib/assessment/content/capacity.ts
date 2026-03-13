import type { Question } from '../types';

export const capacityQuestions: Question[] = [
  {
    id: 'capacity-1',
    step: 5,
    type: 'scored',
    foundation: 'capacity',
    tag: 'CAPACITY',
    title: 'Time Architecture',
    stem: 'It\'s Sunday evening and you\'re planning your week. When you look at the time available for your business, you...',
    options: [
      { key: 'A', text: 'Realize there\'s literally no time — every hour is already spoken for by your job and family', score: 1 },
      { key: 'B', text: 'Can maybe find 2–3 scattered hours if you sacrifice sleep or skip something important', score: 2 },
      { key: 'C', text: 'Have some time blocked, but it keeps getting hijacked by your day job or other obligations', score: 3 },
      { key: 'D', text: 'Have a consistent weekly block of 8–10 hours that you protect and use productively', score: 4 },
      { key: 'E', text: 'Have restructured your entire schedule around your business — it\'s the priority, and everything else fits around it', score: 5 },
    ],
  },
  {
    id: 'capacity-2',
    step: 6,
    type: 'scored',
    foundation: 'capacity',
    tag: 'CAPACITY',
    title: 'Energy Management',
    stem: 'You\'ve just finished a full day at your current job. A potential client wants to have a call at 7 PM about your new business. You...',
    options: [
      { key: 'A', text: 'Can\'t even think about it — you\'re completely drained and just want to collapse on the couch', score: 1 },
      { key: 'B', text: 'Take the call but you\'re running on fumes, and you know you\'re not showing up as your best self', score: 2 },
      { key: 'C', text: 'Can do it some days but not others — your energy is unpredictable', score: 3 },
      { key: 'D', text: 'Feel tired but energized by the conversation — working on your own thing gives you a second wind', score: 4 },
      { key: 'E', text: 'Are fully present and sharp — you\'ve built routines that keep your energy high even after a long day', score: 5 },
    ],
  },
  {
    id: 'capacity-3',
    step: 7,
    type: 'scored',
    foundation: 'capacity',
    tag: 'CAPACITY',
    title: 'Support System',
    stem: 'You tell your partner, closest friend, or family member that you\'re seriously planning to leave your career and start a business. Their reaction is...',
    options: [
      { key: 'A', text: 'Fear, resistance, or outright opposition — they think you\'re making a terrible mistake', score: 1 },
      { key: 'B', text: 'Polite skepticism — they smile and nod but clearly don\'t believe it will work', score: 2 },
      { key: 'C', text: 'Cautious support — they\'re willing to hear you out but have a lot of concerns', score: 3 },
      { key: 'D', text: 'Genuine encouragement — they believe in you and are willing to make adjustments to help', score: 4 },
      { key: 'E', text: 'Full partnership — they\'re actively involved in planning, have helped create financial runway, and are all in', score: 5 },
    ],
  },
];
