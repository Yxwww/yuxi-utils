export declare class Node {
  left: Node | null
  right: Node | null
  val: number
  constructor(v: number)
  toString(): string
}
export declare function forEachBFS(root: Node, cb: (n: Node) => void): void
/**
 * Handles each level independently and flush the memory when moving on to the next
 */
export declare function forEachLevel(
  root: Node,
  cb: (items: number[], level: number) => void
): void
export declare function toStringBFS(root: Node): string
export declare function forEachDFS(root: Node, cb: (n: Node) => void): void
export declare function toStringDFS(root: Node): string
//# sourceMappingURL=bst.d.ts.map
