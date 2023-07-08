type Resolve = (value?: any) => void;
type Reject = (reason?: any) => void;

export function createControlledPromise(): [
  Promise<unknown>,
  {resolve: Resolve; reject: Reject}
] {
  let resolve!: Resolve;
  let reject!: Reject;
  const promise = new Promise((promiseResolve, promiseReject) => {
    resolve = promiseResolve;
    reject = promiseReject;
  });
  return [promise, {resolve, reject}];
}
