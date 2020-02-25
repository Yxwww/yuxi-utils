import { createNode, Node } from './Node'

interface Queue<T> {
  head: Maybe<Node<T>>
  enqueue: (val: T) => void
  length: number
  dequeue: () => Maybe<T>
}

/**
 * Implement Queue DSA FIFO workflow
 */
export function createQueue<T>(val?: T): Queue<T> {
  let head: Maybe<Node<T>> = null

  function enqueue(val: T): void {
    if (!head) {
      head = createNode(val)
      return
    }
    let el = head
    while (el && el.next) {
      el = el.next
    }
    el.next = createNode(val)
  }

  if (typeof val !== 'undefined') {
    enqueue(val)
  }

  return {
    enqueue,
    get head() {
      return head
    },
    dequeue() {
      if (!head) {
        return null
      }
      if (!head.next) {
        const result = head.value
        head = null
        return result
      }
      const result = head.value
      head = head.next
      return result
    },
    get length(): number {
      if (!head) {
        return 0
      }
      let counter = 1
      let el = head
      while (el && el.next) {
        el = el.next
        counter++
      }
      return counter
    },
  }
}
