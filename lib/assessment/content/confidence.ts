import type { Question } from '../types';

export const confidenceQuestions: Question[] = [
  {
    id: 'confidence-1',
    step: 13,
    type: 'scored',
    foundation: 'confidence',
    tag: 'CONFIDENCE',
    title: 'Identity Transition',
    stem: 'When you introduce yourself at a networking event, you...',
    options: [
      { key: 'A', text: 'Always lead with your corporate title — it\'s who you are, and without it you feel invisible', score: 1 },
      { key: 'B', text: 'Mention your job but feel a pang of discomfort because it no longer represents where you\'re heading', score: 2 },
      { key: 'C', text: 'Awkwardly straddle both worlds — "I\'m a VP at [company] but I\'m also working on something new"', score: 3 },
      { key: 'D', text: 'Lead with your business identity and mention your corporate role as context, not your core identity', score: 4 },
      { key: 'E', text: 'Introduce yourself entirely through your business — your corporate past is just backstory', score: 5 },
    ],
  },
  {
    id: 'confidence-2',
    step: 14,
    type: 'scored',
    foundation: 'confidence',
    tag: 'CONFIDENCE',
    title: 'Failure Resilience',
    stem: 'You launch your first offer and nobody buys. Zero sales in the first two weeks. You...',
    options: [
      { key: 'A', text: 'Take it as confirmation that this was a mistake — maybe you\'re not cut out for entrepreneurship', score: 1 },
      { key: 'B', text: 'Feel devastated and seriously consider going back to your old career', score: 2 },
      { key: 'C', text: 'Feel disappointed but try to figure out what went wrong, even though self-doubt is creeping in', score: 3 },
      { key: 'D', text: 'Treat it as data — you analyze what happened, adjust your approach, and prepare to try again', score: 4 },
      { key: 'E', text: 'Expected this might happen — you already have a plan B ready and see it as a normal part of the process', score: 5 },
    ],
  },
  {
    id: 'confidence-3',
    step: 15,
    type: 'scored',
    foundation: 'confidence',
    tag: 'CONFIDENCE',
    title: 'Asking for Help',
    stem: 'You realize you\'re stuck on something critical in your business — a skill gap, a strategic decision, or a problem you can\'t solve alone. You...',
    options: [
      { key: 'A', text: 'Ignore it and hope it resolves itself — asking for help feels like admitting failure', score: 1 },
      { key: 'B', text: 'Spend weeks trying to figure it out yourself through YouTube videos and free resources', score: 2 },
      { key: 'C', text: 'Ask a friend or family member for advice, even though they don\'t have relevant expertise', score: 3 },
      { key: 'D', text: 'Actively seek out a mentor, coach, or expert who has solved this problem before', score: 4 },
      { key: 'E', text: 'Already have a trusted advisor or coaching relationship in place — you bring the problem to your next session', score: 5 },
    ],
  },
];
