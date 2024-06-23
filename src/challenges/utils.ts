import fs from 'fs';
import path from 'path';
import { formatValue } from '../game/utils.js';

import type { Challenge, Primitive } from './types.js';

const UTF8 = 'utf8';

export const getChallenges = async (challengeDir: string) => {
  const challenges = await Promise.all(
    fs.readdirSync(challengeDir).map(async (key) => {
      const dir = path.resolve(challengeDir, key);
      const solutionPath = path.resolve(challengeDir, key, 'solution.js');
      const detailsPath = path.resolve(challengeDir, key, 'index.ts');

      if (!fs.existsSync(dir)) {
        return null;
      }

      if (!fs.lstatSync(dir).isDirectory()) {
        return null;
      }

      if (!fs.existsSync(solutionPath)) {
        // eslint-disable-next-line no-console
        console.error(`No solution at ${solutionPath}`);
        return null;
      }

      if (!fs.lstatSync(solutionPath).isFile()) {
        // eslint-disable-next-line no-console
        console.error(`Solution was not a file at ${solutionPath}`);
        return null;
      }

      if (!fs.existsSync(detailsPath)) {
        // eslint-disable-next-line no-console
        console.log(`No challenge details at ${detailsPath}`);
        return null;
      }

      if (!fs.lstatSync(detailsPath).isFile()) {
        // eslint-disable-next-line no-console
        console.log(`Challenge details was not a file at ${detailsPath}`);
        return null;
      }

      const challenge = (await import(path.resolve(dir, 'index.js')))
        .default as Challenge<readonly Primitive[], Primitive>;

      return {
        key,
        solution: fs.readFileSync(solutionPath, UTF8),
        ...challenge,
        example: `(${challenge.example.input
          .map(formatValue)
          .join(', ')}) => ${formatValue(challenge.example.output)}`,
      };
    })
  );

  return challenges.filter(
    (challenge): challenge is Exclude<typeof challenge, null> => !!challenge
  );
};
