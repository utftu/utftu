function ee() {
  const events = new Map();
  return {
    on(name, cb) {
      if (!events.has(name)) {
        events.set(name, [cb]);
        return;
      }

      events.get(name).push(cb);
    },
    off(name, cb) {
      if (!events.has(name)) {
        return;
      }

      events.set(
        name,
        events.get(name).filter((localCb) => localCb !== cb)
      );
    },
    emit(name, data) {
      if (events.has(name)) {
        events.get(name).forEach((cb) => cb(data));
      }
      if (name === '*') {
        return;
      }
      if (events.has('*')) {
        events.get('*').forEach((cb) => cb(name, data));
      }
    },
    events,
  };
}

export default ee;
