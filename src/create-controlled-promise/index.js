import awaitTime from '../await-time/index.js';

function createControlledPromise(cb) {
  let resolve, reject;
  const promise = new Promise((promiseResolve, promiseReject) => {
    resolve = promiseResolve;
    reject = promiseReject;
    if (cb) {
      cb(resolve, reject);
    }
  });
  return [promise, {resolve, reject}];
}

export default createControlledPromise;
