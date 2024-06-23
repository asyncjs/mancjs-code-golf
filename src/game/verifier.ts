import lodash from 'lodash';
import { readFileSync } from 'fs';
import { runInNewContext } from 'vm';

import { formatTypeAndValue, formatValue } from './utils.js';
import { challenges } from '../challenges/index.js';
import { Primitive } from '../challenges/types.js';

export interface VerifyJob {
  file: string;
  key: string;
}

const hasKey = <K extends string>(
  obj: object,
  key: K
): obj is { [P in K]: unknown } => key in obj;

process.on('message', (entry: VerifyJob) => {
  try {
    const challenge = challenges.find((ch) => ch.key === entry.key);

    if (!challenge) {
      throw new Error('Challenge not found');
    }

    const script = readFileSync(entry.file, 'utf8');
    const context: { play?: unknown; module: { exports: unknown } } = {
      ...challenge.context,
      module: {
        exports: {
          runBefore: challenge.runBefore,
        },
      },
    };

    const toRun =
      "'use strict'\n" +
      script +
      '\ntry{if (!module.exports.play) {module.exports.play = play}} catch(e) {}';

    runInNewContext(toRun, context);

    if (
      typeof context.module.exports === 'object' &&
      !!context.module.exports &&
      hasKey(context.module.exports, 'runBefore') &&
      typeof context.module.exports.runBefore === 'function'
    ) {
      context.module.exports.runBefore();
    }

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
      challenge.assertRules?.(script);

      challenge.assertions.forEach((assertion) => {
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
            )} when supplied with arguments: ${assertion.input.map((input) => formatValue(input)).join(', ')}`
          );
        }
      });
    } catch (err) {
      return process.send?.({
        err:
          typeof err === 'string'
            ? err
            : err instanceof Error
              ? err.message
              : `Unknown error ${err}`,
        valid: false,
      });
    }

    process.send?.({ valid: true });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Verifier failed with error:', err);

    process.send?.({
      err: `Your script contains an error: ${err}`,
      valid: false,
    });
  }
});
