export type PrimativeValue = string | number | object;
export type Primative = PrimativeValue | PrimativeValue[];
export type Rule = 'no-sort' | 'no-add' | 'no-eval';

export interface Challenge {
  title: string;
  input: Primative;
  output: Primative;
  description: string;
  example: string;
  rules?: Rule[];
}
