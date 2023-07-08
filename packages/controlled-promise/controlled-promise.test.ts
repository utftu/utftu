import {createControlledPromise} from './controlled-promise.ts';
import * as util from 'node:util';
import {waitTime} from '../wait-time/wait-time.ts';
import {it, expect} from 'vitest';

it('createControlledPromise', async () => {
  const [promise, control] = createControlledPromise();
  expect(util.inspect(promise)).toBe('Promise { <pending> }');
  await waitTime(100);

  expect(util.inspect(promise)).toBe('Promise { <pending> }');

  control.resolve(42);
  control.resolve(undefined);
  control.reject();

  expect(await promise).toBe(42);
});
