import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('cn', () => {
  it('merges class names', () => {
    expect(cn('a', false && 'b', 'c')).toContain('a');
    expect(cn('a', 'c')).toBe('a c');
  });
});
