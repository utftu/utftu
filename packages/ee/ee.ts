type Cb<TData = any> = (data: TData) => void;
type DefaultRecord = Record<string, any>;

export class EE<TObj extends DefaultRecord = DefaultRecord> {
  events: Map<string, Cb[]> = new Map();
  on<TName extends string = string>(name: TName, cb: Cb<TObj[TName]>) {
    if (!this.events.has(name)) {
      this.events.set(name, [cb]);
    } else {
      this.events.get(name)!.push(cb);
    }

    return () => this.off(name, cb);
  }
  off<TName extends string = string>(name: TName, cb: Cb<TObj[TName]>) {
    if (!this.events.has(name)) {
      return;
    }

    this.events.set(
      name,
      this.events.get(name)!.filter((localCb) => localCb !== cb),
    );
  }
  emit<TName extends string = string>(name: TName, value: TObj[TName]) {
    if (this.events.has(name)) {
      this.events.get(name)!.forEach((cb) => cb(value));
    }
    if (name === '*') {
      return;
    }
    if (this.events.has('*')) {
      this.events.get('*')!.forEach((cb) => cb({name, value}));
    }
  }
}

export function createEventEmitter<
  TObj extends Record<string, any> = Record<string, any>,
>() {
  return new EE<TObj>();
}
