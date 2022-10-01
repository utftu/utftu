import type useForceUpdate from '../use-force-update/useForceUpdate';

type useStore<T> = () => [T, useForceUpdate];

export default useForceUpdate;
