import { describe, expect, test } from 'vitest';

import { nonNullable } from '@/utils/non-nullable';

describe('nonNullable', () => {
  test('returns true for non-nullable values', () => {
    expect(nonNullable(0)).toBe(true);
    expect(nonNullable('string')).toBe(true);
    expect(nonNullable(true)).toBe(true);
    expect(nonNullable([])).toBe(true);
    expect(nonNullable({})).toBe(true);
  });

  test('returns false for null or undefined', () => {
    expect(nonNullable(null)).toBe(false);
    expect(nonNullable(undefined)).toBe(false);
  });
});
