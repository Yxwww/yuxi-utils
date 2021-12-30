export class Node<T> {
  value: T
  next: Node<T> | null // eslint-disable-line no-use-before-define
  constructor(val: T) {
    this.value = val
  }
}
export function createNode<T>(val: T): Node<T> {
  return new Node(val)
}
