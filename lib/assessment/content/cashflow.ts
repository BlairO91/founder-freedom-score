import type { Question } from '../types';

export const cashflowQuestions: Question[] = [
  {
    id: 'cashflow-1',
    step: 9,
    type: 'scored',
    foundation: 'cashflow',
    tag: 'CASHFLOW',
    title: 'Financial Runway',
    stem: 'Imagine you handed in your resignation tomorrow. Without any business income, how long could you maintain your current lifestyle?',
    options: [
      { key: 'A', text: 'Less than one month — I\'m living paycheck to paycheck', score: 1 },
      { key: 'B', text: '1–3 months — I have some savings but it would get tight fast', score: 2 },
      { key: 'C', text: '3–6 months — enough to get started but the pressure would build quickly', score: 3 },
      { key: 'D', text: '6–12 months — I\'ve been intentionally building a runway for this transition', score: 4 },
      { key: 'E', text: '12+ months — I\'ve planned this carefully and have significant financial reserves', score: 5 },
    ],
  },
  {
    id: 'cashflow-2',
    step: 10,
    type: 'scored',
    foundation: 'cashflow',
    tag: 'CASHFLOW',
    title: 'Revenue Model Clarity',
    stem: 'A potential investor asks you to walk them through exactly how your business will make money in the first 12 months. You...',
    options: [
      { key: 'A', text: 'Have no idea — you haven\'t thought that far ahead', score: 1 },
      { key: 'B', text: 'Have a vague sense that you\'ll "figure it out once you get clients"', score: 2 },
      { key: 'C', text: 'Can describe a general model but haven\'t tested any of the assumptions', score: 3 },
      { key: 'D', text: 'Have a clear revenue model with specific pricing, target client volume, and realistic projections', score: 4 },
      { key: 'E', text: 'Have already validated your model — you\'ve made sales, signed clients, or generated revenue before fully launching', score: 5 },
    ],
  },
  {
    id: 'cashflow-3',
    step: 11,
    type: 'scored',
    foundation: 'cashflow',
    tag: 'CASHFLOW',
    title: 'Financial Decision-Making',
    stem: 'You need to invest $25,000 in your business right now — for coaching, equipment, branding, or a key hire. Your gut reaction is...',
    options: [
      { key: 'A', text: 'Pure panic — that amount of money feels impossible right now', score: 1 },
      { key: 'B', text: 'Stress — you could technically pull it together, but it would mean a serious sacrifice', score: 2 },
      { key: 'C', text: 'Hesitation — you have the funds available, but you\'re not sure it\'s the right investment', score: 3 },
      { key: 'D', text: 'Calculated consideration — you evaluate the ROI and make a decision based on strategy, not fear', score: 4 },
      { key: 'E', text: 'Confidence — you\'ve already set aside capital for business investments and this fits within your plan', score: 5 },
    ],
  },
];
