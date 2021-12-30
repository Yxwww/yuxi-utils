import { clipping } from './clipping'
import { strict as assert } from 'assert'

describe('clipping', () => {
  it('should be able to clip data', () => {
    const expected = 0.5

    const result = clipping(0, 1, expected)

    assert.equal(result, expected)
  })
  it('should return the max number if value is larger than max', () => {
    const expected = 1

    const result = clipping(0, 1, 1.1)

    assert.equal(result, expected)
  })
  it('should return the min number if value is less than max', () => {
    const expected = 0

    const result = clipping(0, 1, -0.1)

    assert.equal(result, expected)
  })
})
