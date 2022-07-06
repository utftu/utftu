import lazyFunc from './index.js';
import {jest} from '@jest/globals';

describe('lazy-func', () => {
  it('', () => {
    let deps = 0;
    const listener = jest.fn((symbol) => symbol);
    const lazeListener = lazyFunc(listener, () => [deps]);
    lazeListener('0');
    expect(listener.mock.calls.length).toBe(1);
    expect(listener.mock.calls[0][0]).toBe('0');
    lazeListener('1');
    lazeListener('2');
    expect(listener.mock.calls[0][0]).toBe('0');
    expect(listener.mock.calls.length).toBe(1);
    deps = 1;
    lazeListener('3');
    expect(listener.mock.calls[1][0]).toBe('3');
    expect(listener.mock.calls.length).toBe(2);
    lazeListener('4');
    expect(listener.mock.calls.length).toBe(2);
    expect(listener.mock.calls[1][0]).toBe('3');
  });
});
