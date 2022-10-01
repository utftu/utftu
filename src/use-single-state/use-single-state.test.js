/**
 * @jest-environment jsdom
 */

import React, {createElement} from 'react';
import {act} from 'react-dom/test-utils';
import {render} from '@testing-library/react';
import '@testing-library/jest-dom';
import {it, expect} from '@jest/globals';
import useSingleState from './use-single-state.js';

it('use single state', async () => {
  let countRender = 0;
  let value;
  let singleState;
  function Test() {
    countRender++;
    singleState = useSingleState('value1');
    value = singleState();
    return createElement('div', null, 'hello');
  }
  await render(createElement(Test));
  expect(value).toBe('value1');
  expect(countRender).toBe(1);
  await act(() => {
    singleState('value2');
  });
  expect(value).toBe('value2');
  expect(countRender).toBe(2);
  await act(() => {
    singleState('value3');
    singleState('value4');
  });
  expect(value).toBe('value4');
  expect(countRender).toBe(3);
});
