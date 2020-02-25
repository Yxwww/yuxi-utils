import { createQueue } from './Queue'
import { Node } from './Node'
const assert = require('assert').strict

describe('Queue', () => {
  it('should create a queue without head, and its length should be 0 when empty', () => {
    const queue = createQueue()
    assert.equal(queue.length, 0)
  })
  it('should be able to create a queue that head stores the value', () => {
    const queue = createQueue(1)
    assert.equal((queue.head as Node<number>).value, 1)
  })

  it('should enqueue new node after the first node', () => {
    const subject = createQueue(0)
    const expected = 1

    subject.enqueue(expected)

    assert.equal((subject.head as Node<number>).next.value, expected)
  })

  it('length method should return the length current nodes', () => {
    const subject = createQueue(0)
    subject.enqueue(1)
    subject.enqueue(2)

    const result = subject.length

    assert.equal(result, 3)
  })
})

describe('dequeue', () => {
  it('if head is null, dequeue should return null', () => {
    const queue = createQueue()
    assert.equal(queue.dequeue(), null)
  })

  it('if head.next is null, dequeue should return head and set head to null', () => {
    const queue = createQueue(0)
    assert.equal(queue.dequeue(), 0)
    assert.equal(queue.head, null)
  })

  it('should follow FIFO to remove the head and attach the head to the second', () => {
    const queue = createQueue(0)
    queue.enqueue(1)
    assert.equal(queue.dequeue(), 0)
    assert.equal(queue.length, 1)
    assert.equal((queue.head as Node<number>).value, 1)
  })
})
