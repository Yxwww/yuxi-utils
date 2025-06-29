export class Node {
  next: Node | null
  val: number
  constructor(v: number) {
    this.val = v
    this.next = null
  }
  toString() {
    return this.val.toString()
  }
}

/**
 * creates linkedlist from array
 */
export function fromArray(arr: number[]) {
  if (arr.length === 0) return null
  return arr.reduce(
    (acc, cur) => {
      if (!acc.head || !acc.tail) {
        const head = new Node(cur)
        return { head, tail: head }
      }
      const newTail = new Node(cur)
      acc.tail.next = newTail
      acc.tail = newTail
      return acc
    },
    { head: null as null | Node, tail: null as null | Node }
  ).head
}

export function toString(n: Node | null) {
  if (!n) return ''
  let str = ''
  let cur: Node | null = n
  while (cur) {
    str += `${cur}`
    cur = cur.next
  }
  return str
}

export function reverse(head: Node | null) {
  if (!head || !head.next) return head

  const cur: Node | null = head
  let prev: Node | null = head

  while (cur?.next) {
    const next = cur.next

    cur.next = next.next
    next.next = prev

    prev = next
  }

  return prev
}
