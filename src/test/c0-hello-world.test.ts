import solution from '../challenges/c0-hello-world/solution.js';

describe('hello world solution', () => {
  test('returns correct hello world string', () => {
    expect(solution()).toBe('Hello, World!');
  });
});
