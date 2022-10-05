import type { Challenge } from '../types.js';

const challenge: Challenge<
  [input: readonly (readonly (string | number)[])[]],
  readonly (string | number)[]
> = {
  title: 'Array Flatten',
  description: `Write a function that takes an array of three other arrays and returns a single, flattened array. The second array's values should remain in the middle, but the first and third should be swapped.`,
  example: {
    input: [
      [
        [4, 5, 6],
        ['a', 'b', 'c'],
        [1, 2, 3],
      ],
    ],
    output: [1, 2, 3, 'a', 'b', 'c', 4, 5, 6],
  },
  assertions: [
    {
      input: [
        [
          [4, 5, 6],
          ['a', 'b', 'c'],
          [1, 2, 3],
        ],
      ],
      output: [1, 2, 3, 'a', 'b', 'c', 4, 5, 6],
    },
    {
      input: [
        [
          [1, 2, 3, 4, 5],
          ['unu', 'du', 'tri', 'kvar', 'kvin'],
          ['v', 'w', 'x', 'y', 'z'],
        ],
      ],
      output: [
        'v',
        'w',
        'x',
        'y',
        'z',
        'unu',
        'du',
        'tri',
        'kvar',
        'kvin',
        1,
        2,
        3,
        4,
        5,
      ],
    },
  ],
};

export default challenge;
