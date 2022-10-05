import type { Challenge } from '../types.js';

const challenge: Challenge<[input: number], string> = {
  title: 'Roman Numerals',
  description: `Write a function that converts numbers to roman numerals.`,
  example: {
    input: [23],
    output: 'XXIII',
  },
  assertions: [
    {
      input: [23],
      output: 'XXIII',
    },
    {
      input: [2743],
      output: 'MMDCCXLIII',
    },
    {
      input: [2476],
      output: 'MMCDLXXVI',
    },
  ],
};

export default challenge;
