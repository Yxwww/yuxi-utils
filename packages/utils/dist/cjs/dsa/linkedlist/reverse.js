'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.reverse = reverse
function reverse(head) {
  if (!head) {
    return null
  }
  if (!head.next) {
    return head
  }
  var cur = head,
    last = head,
    next = cur.next
  while (cur && cur.next) {
    next = cur.next
    cur.next = next.next
    next.next = last
    last = next
  }
  return last
}
// export function reverse(head: ListNode | null): ListNode | null {
//   if (!head) {
//     return null
//   }
//   if (!head.next) {
//     return head;
//   }
//
//   let cur = head, last = head, next = cur.next;
//   while(cur && cur.next) {
//     next = cur.next;
//
//     next.next = last;
//     cur.next = next.next;
//
//     last = next;
//   }
//
//   return last;
// };
