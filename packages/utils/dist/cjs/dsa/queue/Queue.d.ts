import { Node } from './Node'
import { Maybe } from '../../types'
interface Queue<T> {
  head: Maybe<Node<T>>
  enqueue: (val: T) => void
  length: number
  dequeue: () => Maybe<T>
  isEmpty: boolean
}
/**
 * Implement Queue DSA FIFO.
 * - O(1) on both enqueue and dequeue
 */
export declare function createQueue<T>(val?: T): Queue<T>
export {}
//# sourceMappingURL=Queue.d.ts.map
