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

export const formatTypeAndValue = (value: unknown, actual: any) => {
  if (value === null) {
    return 'null';
  }

  if (typeof value === 'undefined') {
    return 'undefined';
  }

  if (typeof value === 'function') {
    return 'function';
  }

  if (Array.isArray(value)) {
    return (actual ? 'different ' : '') + 'array of ' + value.length + ' items';
  }

  if (typeof value === 'string') {
    return (
      (actual ? 'different ' : '') + 'string of ' + value.length + ' chars'
    );
  }

  if (typeof value === 'object') {
    return (actual ? 'different ' : '') + 'object';
  }

  const digits = value.toString().replace(/[^0-9]/g, '').length;
  return (actual ? 'different ' : '') + `${digits} digit number`;
};
