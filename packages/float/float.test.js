import {Float} from './float.ts';
import {describe, it, expect} from 'vitest';

describe('float', () => {
  it('plus', () => {
    const float = Float.add(0.1, 0.2);
    expect(float).toBe(0.3);
  });
  it('sub', () => {
    const float = Float.sub(0.3, 0.1);
    expect(float).toBe(0.2);
  });
  it('mul', () => {
    const float = Float.mul(0.1, 0.2);
    expect(float).toBe(0.02);
  });
  it('div', () => {
    const float = Float.div(0.02, 0.1);
    expect(float).toBe(0.2);
  });
});
