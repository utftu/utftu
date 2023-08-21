export function createOptimizedFunc<TValue = any>(
  func: () => TValue,
  prod: boolean
): () => TValue {
  const symbol = Symbol();

  return () => {
    if (prod === false) {
      if (!globalThis[symbol]) {
        globalThis[symbol] = func();
      }
      return globalThis[symbol];
    }
    return func();
  };
}
