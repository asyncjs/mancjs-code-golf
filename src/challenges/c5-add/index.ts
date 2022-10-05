import type { Challenge } from '../types.js';

const challenge: Challenge<[input: [number, number]], number> = {
  title: 'Add',
  description:
    'Write a function to add two numbers without using the plus operator. The function will be called with an array of two numbers and should return the sum.',
  example: {
    input: [[3, 4]],
    output: 7,
  },
  assertions: [
    {
      input: [[3, 4]],
      output: 7,
    },
    {
      input: [[100, 200]],
      output: 300,
    },
    {
      input: [[64722, 87549]],
      output: 152271,
    },
  ],
  context: {
    eval: () => 42,
  },
  assertRules: (playString) => {
    if (playString.includes('+')) {
      throw new Error('You cannot use the plus operator.');
    }
  },
};

export default challenge;
