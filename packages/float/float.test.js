import {floatAdd, floatDiv, floatMul, floatSub} from './float.js';
import {describe, it, expect} from 'vitest';

describe('float', () => {
  it('plus', () => {
    const float = floatAdd(0.1, 0.2);
    expect(float).toBe(0.3);
  });
  it('sub', () => {
    const float = floatSub(0.3, 0.1);
    expect(float).toBe(0.2);
  });
  it('mul', () => {
    const float = floatMul(0.1, 0.2);
    expect(float).toBe(0.02);
  });
  it('div', () => {
    const float = floatDiv(0.02, 0.1);
    expect(float).toBe(0.2);
  });
});
