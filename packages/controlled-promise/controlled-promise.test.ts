import {createControlledPromise} from './controlled-promise.ts';
import * as util from 'node:util';
import {waitTime} from '../wait-time/wait-time.ts';
import {it, expect} from 'vitest';

it('createControlledPromise', async () => {
  const {promise, controls} = createControlledPromise();
  expect(util.inspect(promise)).toBe('Promise { <pending> }');
  await waitTime(100);

  expect(util.inspect(promise)).toBe('Promise { <pending> }');

  controls.resolve(42);
  controls.resolve(undefined);
  controls.reject();

  expect(await promise).toBe(42);
});
