import type { Challenge } from '../types';
import solution from './solution';

const challenge: Challenge = {
  input: '',
  title: 'Hello World',
  output: solution(),
  description: `Write a function that returns "Hello, World!".`,
  example: `⟶ "Hello, World!"`,
};

export = challenge;
