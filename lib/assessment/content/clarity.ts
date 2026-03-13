import type { Question } from '../types';

export const clarityQuestions: Question[] = [
  {
    id: 'clarity-1',
    step: 1,
    type: 'scored',
    foundation: 'clarity',
    tag: 'CLARITY',
    title: 'Vision Articulation',
    stem: 'A former colleague reaches out and says, "I heard you\'re starting something — what is it?" You...',
    options: [
      { key: 'A', text: 'Feel a wave of anxiety because you honestly don\'t know yet', score: 1 },
      { key: 'B', text: 'Give a vague answer about "consulting" or "doing your own thing" and change the subject', score: 2 },
      { key: 'C', text: 'Share a general idea, but realize halfway through that it sounds different every time you explain it', score: 3 },
      { key: 'D', text: 'Describe a clear concept — the problem you solve, who you help, and why you\'re the right person to do it', score: 4 },
      { key: 'E', text: 'Light up and deliver a compelling 30-second pitch that makes them say, "I know someone who needs that"', score: 5 },
    ],
  },
  {
    id: 'clarity-2',
    step: 2,
    type: 'scored',
    foundation: 'clarity',
    tag: 'CLARITY',
    title: 'Market Clarity',
    stem: 'You sit down to write the "About" page for your new business website. After an hour, you...',
    options: [
      { key: 'A', text: 'Have a blank screen — you\'re not sure who you\'re even writing to', score: 1 },
      { key: 'B', text: 'Have a few scattered paragraphs but they could describe almost any business', score: 2 },
      { key: 'C', text: 'Have something decent, but you keep second-guessing whether you\'re targeting the right audience', score: 3 },
      { key: 'D', text: 'Have a clear page that speaks directly to a specific type of client and their specific problem', score: 4 },
      { key: 'E', text: 'Have a page so precise that a stranger reading it would say, "This was written for me"', score: 5 },
    ],
  },
  {
    id: 'clarity-3',
    step: 3,
    type: 'scored',
    foundation: 'clarity',
    tag: 'CLARITY',
    title: 'Decision Confidence',
    stem: 'You\'re weighing two very different directions for your business — different markets, different offers, different lifestyles. You...',
    options: [
      { key: 'A', text: 'Feel paralyzed and avoid making either choice, hoping the answer will become obvious eventually', score: 1 },
      { key: 'B', text: 'Ask everyone you know for their opinion and end up more confused than when you started', score: 2 },
      { key: 'C', text: 'Have a slight lean toward one direction but keep going back and forth weekly', score: 3 },
      { key: 'D', text: 'Have made a clear decision based on research and self-reflection, even though some uncertainty remains', score: 4 },
      { key: 'E', text: 'Made the call months ago, committed fully, and haven\'t looked back', score: 5 },
    ],
  },
];
