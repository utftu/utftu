import {createEventEmitter} from './ee.js';
import {vi, describe, expect, it} from 'vitest';

describe('ee', () => {
  it('function', () => {
    expect(typeof createEventEmitter).toBe('function');
  });
  it('off', () => {
    const ee = createEventEmitter();
    const func = vi.fn();
    ee.on('event1', func);
    ee.off('event1', func);
    expect(func.mock.calls.length).toBe(0);
  });
});
