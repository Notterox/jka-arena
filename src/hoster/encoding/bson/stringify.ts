export function stringify(obj: Record<string, unknown>): string {
  const builder = [];
  for (const [key, value] of Object.entries(obj)) {
    if (
      typeof value === 'boolean' ||
      typeof value === 'string' ||
      typeof value === 'number'
    ) {
      builder.push('\\', key, '\\', String(value));
    }
  }

  return builder.join('');
}
