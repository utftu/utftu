export function createOptimizedValue<TValue = any>(
  func: () => TValue,
  prod: boolean,
  name: string = '_createOptimizedValue'
): TValue {
  let value: TValue;

  if (prod === false) {
    if (name in globalThis) {
      value = (globalThis as any)[name];
    } else {
      (globalThis as any)[name] = func();
      value = (globalThis as any)[name];
    }
  } else {
    value = func();
  }

  return value;
}

export function createOptimizedCachedValue<TCb extends (...args: any[]) => any>(
  func: TCb,
  prod: boolean,
  name: string = '_createOptimizedCachedValue'
) {
  let state: Record<string, ReturnType<TCb>>;

  if (prod === false && typeof globalThis !== 'undefined') {
    if (name in globalThis) {
      state = (globalThis as any)[name];
    } else {
      state = (globalThis as any)[name] = {};
    }
  } else {
    state = {};
  }

  if (
    prod === false &&
    typeof globalThis !== 'undefined' &&
    name in globalThis
  ) {
    state = (globalThis as any)[name];
  } else {
    state = {};
  }

  return (key: string = 'default') => {
    const handler = ((...args: Parameters<TCb>) => {
      if (key in state) {
        return state[key];
      }

      const result = func(...args);
      state[key] = result;
      return result;
    }) as typeof func;

    return handler;
  };
}
