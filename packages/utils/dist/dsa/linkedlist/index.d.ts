export declare class Node {
  next: Node | null
  val: number
  constructor(v: number)
  toString(): string
}
/**
 * creates linkedlist from array
 */
export declare function fromArray(arr: number[]): Node | null
export declare function toString(n: Node | null): string
export declare function reverse(head: Node | null): Node | null
//# sourceMappingURL=index.d.ts.map
