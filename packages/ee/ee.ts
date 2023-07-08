type Cb = (data: any) => void;

export class EE {
  events: Map<string, Cb[]> = new Map();
  on(name: string, cb: Cb) {
    if (!this.events.has(name)) {
      this.events.set(name, [cb]);
    } else {
      this.events.get(name)!.push(cb);
    }

    return () => this.off(name, cb);
  }
  off(name: string, cb: Cb) {
    if (!this.events.has(name)) {
      return;
    }

    this.events.set(
      name,
      this.events.get(name)!.filter((localCb) => localCb !== cb)
    );
  }
  emit(name: string, value: any) {
    if (this.events.has(name)) {
      const cb = this.events.get(name);
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

export function createEventEmitter() {
  return new EE();
}
