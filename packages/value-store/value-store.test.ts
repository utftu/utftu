import {describe, expect, it} from 'vitest';
import {ValueStore} from './value-store.ts';

let nameCounter = 0;

describe('value-store', () => {
  it('dev', () => {
    const cachedObj = {};
    const name = '_key' + nameCounter++;
    const valueStore = new ValueStore(() => cachedObj, name, false);

    expect(valueStore.getValue()).toBe(cachedObj);
    expect((globalThis as any)[name]).toBe(cachedObj);
  });
  it('prod', () => {
    const cachedObj = {};
    const name = '_key' + nameCounter++;
    const valueStore = new ValueStore(() => cachedObj, name, true);
    expect(valueStore.getValue()).toBe(cachedObj);
    expect(name in (globalThis as any)).toBe(false);
  });
});
