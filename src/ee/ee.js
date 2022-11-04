function ee(customEvents) {
  const events = customEvents || new Map();
  return {
    on(name, cb) {
      if (!events.has(name)) {
        events.set(name, []);
      }
      events.get(name).push(cb);
    },
    off(name, cb) {
      if (events.has(name)) {
        events.set(
          name,
          events.get(name).filter((localCb) => localCb !== cb)
        );
      }
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
  };
}

export default ee;
