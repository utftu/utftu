class EE {
  events = new Map();
  on(name, cb) {
    if (!this.events.has(name)) {
      this.events.set(name, [cb]);
    } else {
      this.events.get(name).push(cb);
    }

    return () => this.off(name, cb);
  }
  off(name, cb) {
    if (!this.events.has(name)) {
      return;
    }

    this.events.set(
      name,
      this.events.get(name).filter((localCb) => localCb !== cb)
    );
  }
  emit(name, data) {
    if (this.events.has(name)) {
      this.events.get(name).forEach((cb) => cb(data));
    }
    if (name === '*') {
      return;
    }
    if (this.events.has('*')) {
      this.events.get('*').forEach((cb) => cb(name, data));
    }
  }
}

export function createEventEmitter() {
  return new EE();
}
