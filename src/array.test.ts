import { deleteItemInArray } from './array'
const assert = require('assert').strict

describe('deleteItemInArray', () => {
  it('should remove item from array by index', () => {
    const arr = [{ id: 'a' }, { id: 'b' }]
    assert.deepEqual(deleteItemInArray(arr, 1), [{ id: 'a' }])
  })
})
