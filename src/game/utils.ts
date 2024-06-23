import { Primitive } from '../challenges/types.js';

export const formatValue = (value: unknown): string => {
  if (typeof value === 'undefined') {
    return 'undefined';
  }

  if (value === null) {
    return 'null';
  }

  if (typeof value === 'string') {
    return JSON.stringify(value);
  }

  if (typeof value === 'number') {
    return value.toString();
  }

  if (typeof value === 'boolean') {
    return value.toString();
  }

  if (typeof value === 'object') {
    if (Array.isArray(value)) {
      return `[ ${value.map((subValue) => formatValue(subValue)).join(', ')} ]`;
    } else {
      return `{ ${Object.entries(value)
        .map(([key, subValue]) => `${key}: ${formatValue(subValue)}`)
        .join(', ')} }`;
    }
  }

  return `Unknown value: ${value}`;
};

export const formatTypeAndValue = (
  value: Primitive | readonly unknown[] | Record<string, unknown>,
  actual: Primitive
) => {
  if (value === null) {
    return 'null';
  }

  if (typeof value === 'undefined') {
    return 'undefined';
  }

  if (typeof value === 'function') {
    return `${actual ? 'different ' : ''}function`;
  }

  if (Array.isArray(value)) {
    return `${actual ? 'different ' : ''}array (${JSON.stringify(value)})`;
  }

  return `${actual ? 'different ' : ''}${typeof value} (${JSON.stringify(value)})`;
};
