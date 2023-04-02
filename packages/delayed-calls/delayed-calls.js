import {createControlledPromise} from '../controlled-promise/controlled-promise.js';

export class DelayedCalls {
  constructor(batch) {
    this.batch = batch || ((cb) => cb());
  }
  calls = new Map();
  promise = null;
  promiseControls = null;
  add(name, callback) {
    this.calls.set(name, callback);
    if (!this.promise) {
      const [promise, promiseControls] = createControlledPromise();
      this.promise = promise;
      this.promiseConrtols = promiseControls;
      queueMicrotask(async () => {
        await this._call();
        this.promiseConrtols.resolve();
        this.calls.clear();
        this.promise = null;
        this.promiseConrtols = null;
      });
    }
    return this.promise;
  }
  _call() {
    return this.batch(() => {
      for (const cb of this.calls.values()) {
        cb();
      }
    });
  }
}
