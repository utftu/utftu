import awaitTime from '../await-time/index.js'

function createControlledPromise(cb) {
  let resolve, reject;
  const promise = new Promise((promiseResolve, promiseReject) => {
    resolve = promiseResolve
    reject = promiseReject
    if (cb) {
      cb(resolve, reject)
    }
  })
  return [promise, {resolve, reject}]
}

// const [promise, control] = createControlledPromise()
// promise.then(() => {
//   console.log('-----', 'resolve')
// })
// await awaitTime()
// console.log('-----', 'before')
// control.resolve()
// await awaitTime()
// console.log('-----', 'middle')
// await awaitTime()
// control.resolve()
// console.log('-----', 'after')

export default createControlledPromise