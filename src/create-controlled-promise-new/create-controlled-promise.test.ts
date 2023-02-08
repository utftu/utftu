import createControlledPromise from './create-controlled-promise.js';
import * as util from 'node:util';
import awaitTime from '../wait-time/wait-time';

it('createControlledPromise', async () => {
  const [promise, control] = createControlledPromise();
  expect(util.inspect(promise)).toBe('Promise { <pending> }');
  await awaitTime(100);

  expect(util.inspect(promise)).toBe('Promise { <pending> }');

  control.resolve(42);
  control.resolve(undefined);
  control.reject();

  expect(await promise).toBe(42);
});
