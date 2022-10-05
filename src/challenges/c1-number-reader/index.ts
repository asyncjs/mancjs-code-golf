import type { Challenge } from '../types.js';

const challenge: Challenge<[input: number], string> = {
  title: 'Number Reader',
  description: `Write a function that takes a number and converts it to the equivalant string.`,
  example: {
    input: [12341],
    output: 'one two three four one',
  },
  assertions: [
    {
      input: [877209536],
      output: 'eight seven seven two zero nine five three six',
    },
  ],
};

export default challenge;
