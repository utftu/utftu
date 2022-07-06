/**
 * @jest-environment jsdom
 */

import React, {createElement} from 'react';
import {act} from 'react-dom/test-utils';
import {render} from '@testing-library/react';
import '@testing-library/jest-dom';
import Show from './index.js';
import useForceUpdate from '../use-force-update/index.js';

it('show', async () => {
  let showChild = true;
  let childRenders = 0;
  let parentForceUpdate = null;
  function Parent() {
    parentForceUpdate = useForceUpdate();
    return createElement(Show, {show: showChild}, createElement(Child));
  }
  function Child() {
    childRenders++;
    return createElement('div', null, 'hello');
  }
  render(createElement(Parent));
  expect(childRenders).toBe(1);
  act(() => {
    showChild = false;
    parentForceUpdate();
  });
  expect(childRenders).toBe(1);
  act(() => {
    showChild = true;
    parentForceUpdate();
    parentForceUpdate();
  });
  expect(childRenders).toBe(2);
});
