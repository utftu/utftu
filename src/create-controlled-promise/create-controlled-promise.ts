type Resolve<TValue> = (value: TValue) => void;
type Reject = (reason?: Error) => void;

function createControlledPromise<TValue>(): [
  Promise<TValue>,
  {resolve: Resolve<TValue>; reject: Reject}
] {
  let resolve: Resolve<TValue>;
  let reject: Reject;
  const promise = new Promise<TValue>((promiseResolve, promiseReject) => {
    resolve = promiseResolve;
    reject = promiseReject;
  });
  return [promise, {resolve, reject}];
}

export default createControlledPromise;
