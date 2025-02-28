export class ValueStore<TValue> {
  private exec: () => TValue;
  private store: { value?: TValue } = {};
  private prod: boolean;
  private name: string;
  constructor(exec: () => TValue, name: string, prod: boolean = true) {
    this.exec = exec;
    this.name = name;
    this.prod = prod;
  }
  getValue(): TValue {
    if ('value' in this.store) {
      return this.store.value!;
    }
    if (!this.prod && this.name in globalThis) {
      this.store.value = globalThis[this.name as keyof typeof globalThis] as TValue;
      return this.store.value;
    }

    this.store.value = this.exec();
    if (!this.prod) {
      (globalThis as any)[this.name] = this.store.value;
    }
    
    return this.store.value;
  }
}
