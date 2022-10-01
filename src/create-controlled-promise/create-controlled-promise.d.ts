type createControlledPromise<TValue> = (
  cb?: (resolve: () => void, reject: () => void) => any
) => [
  Promise<TValue>,
  {
    resolve: () => void;
    reject: () => void;
  }
];

export default createControlledPromise;
