import {
  NotStartWithBackslashError,
  NumberOfBackslashesIsNotEvenError,
} from './errors';

export function parse<T = null>(
  bson: string,
  schema?: T,
): T extends null ? Record<string, string> : T {
  assertValid(bson);

  const [, ...split] = bson.split('\\');
  const result = {};

  for (let i = 0; i < split.length; i += 2) {
    const field = split[i];
    const val = split[i + 1];

    if (schema) {
      switch (typeof schema[field]) {
        case 'boolean':
          result[field] = val != 'false';
          break;
        case 'number':
          result[field] = Number(val);
          break;
        case 'string':
          result[field] = val;
          break;
      }
    } else {
      result[field] = val;
    }
  }

  return result as T extends null ? Record<string, string> : T;
}

function assertValid(bson: string) {
  if (bson[0] !== '\\') {
    throw new NotStartWithBackslashError(
      'BSON string should start with a backslash',
    );
  }

  const numOfBackslashes = Array.prototype.reduce.call(
    bson,
    (acc: number, ch: string) => (ch === '\\' ? acc + 1 : acc),
    0,
  );

  if (numOfBackslashes % 2 !== 0) {
    throw new NumberOfBackslashesIsNotEvenError(
      'Number of backslashes should be even',
    );
  }
}
