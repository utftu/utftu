/**
 * @jest-environment jsdom
 */

import React, {createElement} from 'react';
import {act} from 'react-dom/test-utils';
import {render} from '@testing-library/react';
import '@testing-library/jest-dom';
import useForceUpdate from './useForceUpdate.js';
import {act} from 'react-dom/test-utils';
import {it, expect} from '@jest/globals';

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
