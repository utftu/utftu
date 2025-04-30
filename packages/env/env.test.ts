import {beforeEach, describe, expect, it} from 'vitest';
import {getEnv, getEnvs} from './env.ts';

describe('env', () => {
  const originalEnv = {...process.env}; // копия исходных переменных

  beforeEach(() => {
    process.env = {...originalEnv}; // сброс перед каждым тестом
  });

  describe.sequential('getEnvs', () => {
    it('exist', () => {
      process.env.HELLO = 'hello';
      process.env.WORLD = 'world';

      const {HELLO, WORLD} = getEnvs(['HELLO', 'WORLD']);
      expect(HELLO).toBe('hello');
      expect(WORLD).toBe('world');
    });

    it('not exist', () => {
      delete process.env.HELLO;
      delete process.env.WORLD;

      expect(() => getEnvs(['HELLO', 'WORLD'])).toThrow();
    });
  });

  describe('getEnv', () => {
    it('exist', () => {
      process.env.HELLO = 'hello';

      const hello = getEnv('HELLO');
      expect(hello).toBe('hello');
    });

    it('not exist', () => {
      delete process.env.HELLO;

      expect(() => getEnv('HELLO')).toThrow();
    });
  });
});
