export class Node<T> {
  value: T
  next: Node<T> | null
  constructor(val: T) {
    this.value = val
  }
}
export function createNode<T>(val: T): Node<T> {
  return new Node(val)
}
