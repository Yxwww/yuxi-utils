import { convertToDebounce } from './debounce'
import { addAll } from '../math'
import { describe, it } from 'vitest'

import { strict as assert } from 'assert'

describe('debounce', () => {
  it('should resolve after invoked multiple times', async () => {
    const debouncedAdd = convertToDebounce(addAll, 0)
    const result = await Promise.all([debouncedAdd(1), debouncedAdd(2)])

    assert.deepEqual(result, [2, 2])
  })
  it('should resolve after invoked multiple times', async () => {
    const asyncAdd = async (a: number, b: number) => {
      return addAll(a, b)
    }
    const debouncedAdd = convertToDebounce(asyncAdd, 0)
    const result = await Promise.all([debouncedAdd(1, 2), debouncedAdd(2, 3)])
    assert.deepEqual(result, [5, 5])
  })
})
