/**
 * @jest-environment jsdom
 */

import {createElement} from 'react';
import {act} from 'react-dom/test-utils';
import {render} from '@testing-library/react';
import '@testing-library/jest-dom';
import useForceUpdate from './use-force-update.js';

it('use force update', async () => {
  let countRender = 0;
  let forceUpdate = null;
  function Test() {
    countRender++;
    forceUpdate = useForceUpdate();
    return createElement('div', null, 'hello');
  }
  render(createElement(Test));
  expect(countRender).toBe(1);
  act(() => {
    forceUpdate();
  });
  expect(countRender).toBe(2);
  act(() => {
    forceUpdate();
    forceUpdate();
  });
  expect(countRender).toBe(3);
});
