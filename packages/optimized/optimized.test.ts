import {describe, expect, it} from 'vitest';
import {createOptimizedCachedValue, createOptimizedValue} from './optimized.ts';

let nameCounter = 0;

describe('optimized', () => {
  describe('createOptimizedValue', () => {
    it('dev', () => {
      const cachedObj = {};
      const name = '_key' + nameCounter++;
      const fn = createOptimizedValue(() => cachedObj, false, name);
      expect(fn).toBe(cachedObj);
      expect((globalThis as any)[name]).toBe(cachedObj);
    });
    it('prod', () => {
      const cachedObj = {};
      const name = '_key' + nameCounter++;
      const fn = createOptimizedValue(() => cachedObj, true, name);
      expect(fn).toBe(cachedObj);
      expect(name in (globalThis as any)).toBe(false);
    });
  });
  describe('createOptimizedCachedValue', () => {
    it('dev', () => {
      let accessCounter = 0;
      const name = '_key' + nameCounter++;
      (globalThis as any)[name] = {
        default: 5,
      };
      const cached = createOptimizedCachedValue(
        () => accessCounter++,
        false,
        name
      );
      expect(cached()()).toBe(5);
      expect(cached()()).toBe(5);
      expect(cached()()).toBe(5);
      expect(accessCounter).toBe(0);
    });
    it('prod', () => {
      let accessCounter = 0;
      const name = '_key' + nameCounter++;
      const cached = createOptimizedCachedValue(
        () => accessCounter++,
        true,
        name
      );
      expect(cached()()).toBe(0);
      expect(cached()()).toBe(0);
      expect(name in (globalThis as any)).toBe(false);
    });
  });
});
