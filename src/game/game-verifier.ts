import child_process from 'child_process';
import * as path from 'path';
import * as url from 'url';

import type { VerifyJob } from './verifier.js';
import * as game from './game.js';
import { challenges } from '../challenges/index.js';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const MAX_RUNTIME = 10000;

export const verify = (
  file: string,
  callback: (res: { valid: false; err: string }) => void
) => {
  const currentGame = game.getOrError();
  const verifier = child_process.fork(path.resolve(__dirname, 'verifier.ts'));
  const challenge = challenges.find((ch) => ch.key === currentGame.key);

  if (!challenge) {
    throw new Error('Challenge not found');
  }

  const job: VerifyJob<any, any> = {
    file,
    challenge,
  };

  verifier.send(job);

  const timer = setTimeout(() => {
    verifier.kill();

    return callback({
      valid: false,
      err: `script took too long to complete (${MAX_RUNTIME / 1000}s)`,
    });
  }, MAX_RUNTIME);

  verifier.on('message', (result: any) => {
    clearTimeout(timer);
    return callback({ valid: result.valid, err: result.err });
  });
};
