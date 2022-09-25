import type { Challenge } from '../types.js';

const challenge: Challenge<[], string> = {
  title: 'Hello World',
  description: `Write a function that returns "Hello, World!".`,
  example: {
    input: [],
    output: 'Hello, World!',
  },
  assertions: [
    {
      input: [],
      output: 'Hello, World!',
    },
  ],
};

export default challenge;
