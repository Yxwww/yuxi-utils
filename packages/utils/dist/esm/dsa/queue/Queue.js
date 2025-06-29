import { createNode } from './Node'
/**
 * Implement Queue DSA FIFO.
 * - O(1) on both enqueue and dequeue
 */
export function createQueue(val) {
  var head = null
  function enqueue(val) {
    if (!head) {
      head = createNode(val)
      return
    }
    var el = head
    while (el && el.next) {
      el = el.next
    }
    el.next = createNode(val)
  }
  if (typeof val !== 'undefined') {
    enqueue(val)
  }
  return {
    enqueue: enqueue,
    get head() {
      return head
    },
    get isEmpty() {
      return !head
    },
    dequeue: function () {
      var _a
      if (!head) {
        return null
      }
      var result = head.value
      head = (_a = head.next) !== null && _a !== void 0 ? _a : null
      return result
    },
    get length() {
      if (!head) {
        return 0
      }
      var counter = 1
      var el = head
      while (el && el.next) {
        el = el.next
        counter++
      }
      return counter
    },
  }
}
