import createControlledPromise from './index.js'
import util from 'node:util'
import awaitTime from '../await-time/index.js'


it('createControlledPromise',  async () => {
  const [promise, control] = createControlledPromise()
  expect(util.inspect(promise)).toBe('Promise { <pending> }')
  await awaitTime(100)
  
  expect(util.inspect(promise)).toBe('Promise { <pending> }')
  
  control.resolve(42)
  control.resolve()
  control.reject()
  
  expect(await promise).toBe(42)
})