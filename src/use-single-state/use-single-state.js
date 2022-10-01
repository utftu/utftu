import {useCallback} from 'react';
import useStore from '../use-store/use-store.js';

function getValue(value, prevValue) {
  if (typeof value === 'function') {
    return value(prevValue);
  }
  return value;
}

function useSingleState(initState) {
  const [store, forceUpdate] = useStore({value: initState});

  return useCallback((...args) => {
    if (args.length === 0) {
      return store.value;
    } else {
      const value = args[0];
      if (value instanceof Function) {
        store.value = value(store.value);
        forceUpdate();
      } else {
        store.value = value;
        forceUpdate();
      }
    }
  }, []);
}

export default useSingleState;
