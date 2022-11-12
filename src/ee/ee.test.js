import {describe, it, expect, jest} from '@jest/globals';
import ee from './ee.js';

describe('ee', () => {
  it('function', () => {
    expect(typeof ee).toBe('function');
  });

  it('optional event handler map', () => {
    const map = new Map();
    const a = jest.fn();
    const b = jest.fn();
    const eeInstance = ee(map);
    eeInstance.events.set('foo', [a, b]);
    eeInstance.emit('foo');
    expect(a.mock.calls.length).toBe(1);
    expect(b.mock.calls.length).toBe(1);
  });
});
