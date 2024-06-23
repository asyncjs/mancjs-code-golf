export type PrimitiveValue =
  | string
  | number
  | object
  | boolean
  | null
  | undefined;
export type Primitive = PrimitiveValue | readonly PrimitiveValue[];

export interface Example<A extends readonly Primitive[], R extends Primitive> {
  input: A;
  output: R;
}

export interface Assertion<
  A extends readonly Primitive[],
  R extends Primitive,
> {
  input: A;
  output: R | ((play: (...args: A) => R, input: A) => R);
}

export interface Challenge<
  A extends readonly Primitive[],
  R extends Primitive,
> {
  title: string;
  description: string;
  example: Example<A, R>;
  assertions: readonly Assertion<A, R>[];
  assertRules?: (playString: string) => void;
  context?: Record<string, unknown>;
  timeLimitMinutes?: number;
}
