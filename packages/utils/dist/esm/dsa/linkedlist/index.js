var Node = /** @class */ (function () {
  function Node(v) {
    this.val = v
    this.next = null
  }
  Node.prototype.toString = function () {
    return this.val.toString()
  }
  return Node
})()
export { Node }
/**
 * creates linkedlist from array
 */
export function fromArray(arr) {
  if (arr.length === 0) return null
  return arr.reduce(
    function (acc, cur) {
      if (!acc.head || !acc.tail) {
        var head = new Node(cur)
        return { head: head, tail: head }
      }
      var newTail = new Node(cur)
      acc.tail.next = newTail
      acc.tail = newTail
      return acc
    },
    { head: null, tail: null }
  ).head
}
export function toString(n) {
  if (!n) return ''
  var str = ''
  var cur = n
  while (cur) {
    str += ''.concat(cur)
    cur = cur.next
  }
  return str
}
export function reverse(head) {
  if (!head || !head.next) return head
  var cur = head
  var prev = head
  while (cur === null || cur === void 0 ? void 0 : cur.next) {
    var next = cur.next
    cur.next = next.next
    next.next = prev
    prev = next
  }
  return prev
}
