import { describe, it } from 'vitest'
import {
  deleteItemInArrayImmutable,
  updateObjectInArrayImmutable,
} from './array'
import { strict as assert } from 'assert'

describe('deleteItemInArray', () => {
  it('should remove item from array by index', () => {
    const arr = [{ id: 'a' }, { id: 'b' }]
    assert.deepEqual(deleteItemInArrayImmutable(arr, 1), [{ id: 'a' }])
  })
})

describe('updateObjectInArrayImmutable', () => {
  it('should not update item in array', () => {
    const arr = [
      { id: 'a', opacity: 0 },
      { id: 'b', opacity: 0 },
    ]

    const result = updateObjectInArrayImmutable(
      arr,
      (v) => v.id === 'not existsed',
      (state) => {
        return {
          ...state,
          opacity: 1,
        }
      }
    )

    assert.equal(result, arr)
    assert.deepEqual(result, [
      { id: 'a', opacity: 0 },
      { id: 'b', opacity: 0 },
    ])
  })
  it('should update item in array', () => {
    const arr = [
      { id: 'a', opacity: 0 },
      { id: 'b', opacity: 0 },
    ]

    const result = updateObjectInArrayImmutable(
      arr,
      (v) => v.id === 'b',
      (state) => {
        return {
          ...state,
          opacity: 1,
        }
      }
    )

    assert.notEqual(result, arr)
    assert.deepEqual(result, [
      { id: 'a', opacity: 0 },
      { id: 'b', opacity: 1 },
    ])
  })
})
