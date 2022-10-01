/**
 * @jest-environment jsdom
 */

import React, {createElement} from 'react';
import {act} from 'react-dom/test-utils';
import '@testing-library/jest-dom';
import {render} from '@testing-library/react';
import useStore from './use-store.js';

it('use store', async () => {
  const stores = [];

  let countRender = 0;
  function Test() {
    countRender++;
    stores.push(useStore({}));
    return createElement('div', null, 'hello');
  }
  render(createElement(Test));
  expect(countRender).toBe(1);
  act(() => {
    stores.at(-1)[1]();
  });
  expect(countRender).toBe(2);
  act(() => {
    stores.at(-1)[1]();
  });
  expect(countRender).toBe(3);
  expect(stores.at(0)[0]).toBe(stores.at(1)[0]);
});
