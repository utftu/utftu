import {waitTime} from './wait-time.ts';
import {it, expect} from 'vitest';

it('awaitTime', async () => {
  const time = 50;
  const start = Date.now();
  await waitTime(time);
  const end = Date.now();
  const difference = end - start;
  expect(difference >= time).toBe(true);
  expect(difference < time * 2).toBe(true);
});
