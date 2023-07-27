type Resolve<TValue> = (value?: TValue) => void;
type Reject = (reason?: any) => void;

export type PromiseControls<TValue> = {
  resolve: Resolve<TValue>;
  reject: Reject;
};

export function createControlledPromise<TValue>(): [
  Promise<TValue>,
  PromiseControls<TValue>
] {
  let resolve!: Resolve<TValue>;
  let reject!: Reject;
  const promise = new Promise<TValue>((promiseResolve, promiseReject) => {
    resolve = promiseResolve;
    reject = promiseReject;
  });
  return [promise, {resolve, reject}];
}
