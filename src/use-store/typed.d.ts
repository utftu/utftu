import type useForceUpdate from '../use-force-update';

type useStore<T> = () => [T, useForceUpdate];

export default useForceUpdate;
