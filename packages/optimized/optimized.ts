export function createOptimizedValue<TValue = any>(
  func: () => TValue,
  prod: boolean,
  name: string
): TValue {
  let value: TValue;

  if (prod === false) {
    if (name in globalThis) {
      value = globalThis[name];
    } else {
      globalThis[name] = func();
      value = globalThis[name];
    }
  } else {
    value = func();
  }

  return value;
}
