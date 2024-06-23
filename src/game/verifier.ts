import lodash from 'lodash';
import { readFileSync } from 'fs';
import { runInNewContext } from 'vm';

import type { Challenge, Primitive } from '../challenges/types.js';
import { formatTypeAndValue } from './utils.js';

export interface VerifyJob<
  A extends readonly Primitive[],
  R extends Primitive,
> {
  file: string;
  challenge: Omit<Challenge<A, R>, 'example'> & {
    key: string;
    solution: string;
    example: string;
  };
}

const hasKey = <K extends string>(
  obj: object,
  key: K
): obj is { [P in K]: unknown } => key in obj;

process.on('message', (entry: VerifyJob<readonly Primitive[], Primitive>) => {
  try {
    const script = readFileSync(entry.file, 'utf8');
    const context: { play?: unknown; module: { exports: unknown } } = {
      module: {
        exports: {},
      },
    };

    const toRun =
      "'use strict'\n" +
      script +
      '\ntry{if (!module.exports.play) {module.exports.play = play}} catch(e) {}';

    runInNewContext(toRun, context);

    const play =
      typeof context.module.exports === 'function'
        ? context.module.exports
        : typeof context.module.exports === 'object' &&
            !!context.module.exports &&
            hasKey(context.module.exports, 'play') &&
            typeof context.module.exports.play === 'function'
          ? context.module.exports.play
          : context.play;

    if (typeof play !== 'function') {
      return process.send?.({
        err: 'Could not get play function',
        valid: false,
      });
    }

    try {
      entry.challenge.assertions.forEach((assertion) => {
        const result = play(...assertion.input);

        const expected =
          typeof assertion.output === 'function'
            ? assertion.output(
                play as (...args: readonly Primitive[]) => Primitive,
                assertion.input
              )
            : assertion.output;

        if (!lodash.isEqual(result, expected)) {
          throw new Error(
            `Expected ${formatTypeAndValue(
              expected,
              false
            )} but received ${formatTypeAndValue(
              result,
              true
            )} when supplied with ${formatTypeAndValue(assertion.input, false)}`
          );
        }
      });

      entry.challenge.assertRules?.(entry.challenge.solution);
    } catch (err) {
      return process.send?.({
        err:
          typeof err === 'string'
            ? err
            : err instanceof Error
              ? err.message
              : 'Unknown error',
        valid: false,
      });
    }

    process.send?.({ valid: true });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Verifier failed with error:', err);

    process.send?.({
      err: 'Your script contains an error',
      valid: false,
    });
  }
});
