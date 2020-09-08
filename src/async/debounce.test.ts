import { convertToDebounce } from './debounce'
import { addAll } from '../math'

const assert = require('assert').strict

describe('debounce', () => {
  it('should resolve after invoked multiple times', async () => {
    const debouncedAdd = convertToDebounce(addAll, 0)
    const result = await Promise.all([debouncedAdd(1), debouncedAdd(2)])

    assert.deepEqual(result, [2, 2])
  })
})
