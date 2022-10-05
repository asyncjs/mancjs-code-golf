import type { Challenge } from '../types.js';

const challenge: Challenge<[input: readonly string[]], number> = {
  title: 'Palindromes',
  description: `Write a function to count how many words in an array are palindromes. The function will be called with an array of words and should return the number of palindromes found.`,
  example: {
    input: [['abba', 'hello', 'high', 'bob']],
    output: 2,
  },
  assertions: [
    {
      input: [['abba', 'hello', 'high', 'bob']],
      output: 2,
    },
    {
      input: [
        [
          'lemel',
          'level',
          'john',
          'maam',
          'madam',
          'mem',
          'mesem',
          'tim',
          'mim',
          'minim',
          'mum',
          'murdrum',
          'nan',
          'language',
          'non',
          'noon',
          'pasta',
          'nun',
          'tea',
        ],
      ],
      output: 14,
    },
  ],
};

export default challenge;
