import ee from './ee.js';
import {vi} from 'vitest';

describe('ee', () => {
  it('function', () => {
    expect(typeof ee).toBe('function');
  });

  it('optional event handler map', () => {
    const map = new Map();
    const a = vi.fn();
    const b = vi.fn();
    const eeInstance = ee(map);
    eeInstance.events.set('foo', [a, b]);
    eeInstance.emit('foo');
    expect(a.mock.calls.length).toBe(1);
    expect(b.mock.calls.length).toBe(1);
  });
  // describe('on', () => {
  //   it('', () => {

  //   })
  //   const e = ee();
  //   const listener =
  // });
});
