declare function useSingleState<T>(value: T): [T, (prev: T) => T];
export default useSingleState;
