import { testContext } from '../test'
import { Queue } from './Queue'
const assert = require('assert').strict

const context = testContext('Queue')
context.add(
  'should be able to create a queue that head stores the value',
  () => {
    const subject = new Queue(1)
    assert.equal(subject.head.value, 1)
  }
)

context.add('should push new node after the first node', () => {
  const subject = new Queue(0)
  const expected = 1

  subject.push(expected)

  assert.equal(subject.head.next.value, expected)
})

context.add('length method should return the length current nodes', () => {
  const subject = new Queue(0)
  subject.push(1)
  subject.push(2)

  const result = subject.length()

  assert.equal(result, 3)
})

module.exports = context
