declare function createLazyFunc(
  func: Function,
  getDeps: () => any[]
): (...args: any[]) => any;

export default createLazyFunc;
