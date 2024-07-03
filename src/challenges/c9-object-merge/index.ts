import type { Challenge, Primitive } from '../types.js';

const challenge: Challenge<
  [
    input: [
      Record<string, Primitive>,
      Record<string, Primitive>,
      Record<string, Primitive>,
    ],
  ],
  Record<string, Primitive>
> = {
  title: 'Object Merge',
  description: `Write a function that takes an array containing three objects and merges them together, returning the single merged object. The three objects passed in (including any child objects) will not contain keys of the same name.`,
  example: {
    input: [[{ a: 'a' }, { b: 'b' }, { c: 'c' }]],
    output: { a: 'a', b: 'b', c: 'c' },
  },
  assertions: [
    {
      input: [[{ a: 'a' }, { b: 'b' }, { c: 'c' }]],
      output: { a: 'a', b: 'b', c: 'c' },
    },
    {
      input: [
        [
          { x: 1, y: 2, z: 3, a1: { a2: { a3: { x: 1 } } } },
          { xx: 11, yy: 22, zz: 33, a2: { y: 2 } },
          { xxx: 111, yyy: 223, zzz: 333, a3: { z: 3 } },
        ],
      ],
      output: {
        x: 1,
        y: 2,
        z: 3,
        a1: { a2: { a3: { x: 1 } } },
        xx: 11,
        yy: 22,
        zz: 33,
        a2: { y: 2 },
        xxx: 111,
        yyy: 223,
        zzz: 333,
        a3: { z: 3 },
      },
    },
  ],
};

export default challenge;
