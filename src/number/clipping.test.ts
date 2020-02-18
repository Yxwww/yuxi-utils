import { clipping } from './clipping'
import { testContext } from '../test'
const assert = require('assert').strict

const context = testContext('Clipping')

context.add('should be able to clip data', () => {
  const expected = 0.5

  const result = clipping(0, 1, expected)

  assert.equal(result, expected)
})

context.add('should return the max number if value is larger than max', () => {
  const expected = 1

  const result = clipping(0, 1, 1.1)

  assert.equal(result, expected)
})

context.add('should return the min number if value is less than max', () => {
  const expected = 0

  const result = clipping(0, 1, -0.1)

  assert.equal(result, expected)
})
module.exports = context
