import useStore from '../use-store/use-store.js';
import {useCallback, useMemo} from 'react';

function getValue(value, prevValue) {
  if (typeof value === 'function') {
    return value(prevValue);
  }
  return value;
}

function useStateDeps(initValue, deps) {
  const [store, forceUpdate] = useStore({value: initValue});

  useMemo(() => {
    store.value = initValue;
  }, deps);

  const setState = useCallback((value) => {
    if (value instanceof Function) {
      store.value = value(store.value);
      forceUpdate();
    } else {
      store.value = value;
      forceUpdate();
    }
  }, []);

  return [store.value, setState];
}

export default useStateDeps;
