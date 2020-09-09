import {
  deleteItemInArrayImmutable,
  updateObjectInArrayImmutable,
} from './array'
const assert = require('assert').strict

describe('deleteItemInArray', () => {
  it('should remove item from array by index', () => {
    const arr = [{ id: 'a' }, { id: 'b' }]
    assert.deepEqual(deleteItemInArrayImmutable(arr, 1), [{ id: 'a' }])
  })
})

describe('updateObjectInArrayImmutable', () => {
  it('should update item in array', () => {
    const arr = [
      { id: 'a', opacity: 0 },
      { id: 'b', opacity: 0 },
    ]

    const result = updateObjectInArrayImmutable(
      arr,
      v => v.id === 'b',
      state => {
        return {
          ...state,
          opacity: 1,
        }
      }
    )

    assert.deepEqual(result, [
      { id: 'a', opacity: 0 },
      { id: 'b', opacity: 1 },
    ])
  })
})
