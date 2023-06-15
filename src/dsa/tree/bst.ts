import { createQueue } from "../queue/Queue";

export class Node {
  left: Node | null;
  right: Node | null;
  val: number;
  constructor(v: number) {
    this.left = null;
    this.right = null;
    this.val = v;
  }
  toString() {
    return this.val.toString();
  }
}

export function forEachBFS(root: Node, cb: (n: Node) => void) {
  const queue = createQueue<Node>();
  queue.enqueue(root);
  do {
    const current = queue.dequeue();
    if (!current) break;
    cb(current);
    if (current.left) {
      queue.enqueue(current.left);
    }
    if (current.right) {
      queue.enqueue(current.right);
    }
  } while (queue.head);
}

export function toStringBFS(root: Node) {
  let result = "";
  forEachBFS(root, (n) => {
    result += `${n.val}, `;
  });
  return result;
}

export function forEachDFS(root: Node, cb: (n: Node) => void) {
  const stack = [root];
  while (stack.length > 0) {
    const cur = stack.pop();
    if (!cur) break;
    cb(cur);
    if (cur.right) {
      stack.push(cur.right);
    }
    if (cur.left) {
      stack.push(cur.left);
    }
  }
}

export function toStringDFS(root: Node) {
  let result = "";
  forEachDFS(root, (n) => {
    result += `${n.val}, `;
  });
  return result;
}
