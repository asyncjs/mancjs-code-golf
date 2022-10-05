import type { Challenge } from '../types.js';

const challenge: Challenge<[input: [number, number]], number> = {
  title: 'Remainder',
  description: `Write a function that takes an array of two numbers – the first the dividend, the second the divisor – and returns the remainder.`,
  example: {
    input: [[10, 2]],
    output: 0,
  },
  assertions: [
    {
      input: [[10, 2]],
      output: 0,
    },
    {
      input: [[25, 4]],
      output: 1,
    },
    {
      input: [[12, 7]],
      output: 5,
    },
    {
      input: [[7362, 392]],
      output: 306,
    },
  ],
};

export default challenge;
