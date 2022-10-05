import type { Challenge } from '../types.js';

const challenge: Challenge<[input: number], string> = {
  title: 'Number To Words',
  description: `Write a function that takes a number and converts it to words.`,
  example: {
    input: [12341],
    output: 'twelve thousand three hundred forty one',
  },
  assertions: [
    {
      input: [12341],
      output: 'twelve thousand three hundred forty one',
    },
    {
      input: [1290489],
      output:
        'one million two hundred ninety thousand four hundred eighty nine',
    },
    {
      input: [743243892],
      output:
        'seven hundred forty three million two hundred forty three thousand eight hundred ninety two',
    },
  ],
};

export default challenge;
