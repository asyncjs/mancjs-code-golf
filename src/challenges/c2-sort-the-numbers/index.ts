import type { Challenge } from '../types.js';

class ArrayNoSort extends Array {
  public override sort() {
    return ['allowed', 'no', 'sort'] as unknown as this;
  }
}

const challenge: Challenge<[arr: readonly number[]], readonly number[]> = {
  title: 'Sort The Numbers',
  description:
    'Write a function that takes an array of numbers and returns a sorted array in ascending order.',
  example: {
    input: [[3, 5, 2, 4, 1]],
    output: [1, 2, 3, 4, 5],
  },
  assertions: [
    {
      input: [[10, 1, 150, 34, 300, 250, 12, 22, 23, 65, 33, 16, 1, 2]],
      output: [1, 1, 2, 10, 12, 16, 22, 23, 33, 34, 65, 150, 250, 300],
    },
  ],
  context: {
    Array: ArrayNoSort,
  },
};

export default challenge;
