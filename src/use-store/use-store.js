import {useState} from 'react';
import useForceUpdate from '../use-force-update/use-force-update.js';

function useStore(initData) {
  const [store] = useState(initData);
  const forceUpdate = useForceUpdate();

  return [store, forceUpdate];
}

export default useStore;
