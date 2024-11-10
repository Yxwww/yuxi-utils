import assert from 'assert'
import { wait } from './async'

describe('wait', () => {
  it('should wait for the specified time', async () => {
    const start = Date.now()
    await wait(10)
    const end = Date.now()
    assert.equal(Math.round(end - start) > 5, true)
  })
})