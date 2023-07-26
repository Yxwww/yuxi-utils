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

/**
 * Handles each level independently and flush the memory when moving on to the next
 */
export function forEachLevel(
  root: Node,
  cb: (items: number[], level: number) => void
) {
  let currentLevel = createQueue<Node>(root);
  let nextLevel = createQueue<Node>();
  let level = 1;
  let currentLevelItems: number[] = [];

  while (!currentLevel.isEmpty) {
    const cur = currentLevel.dequeue();
    if (!cur) break;
    currentLevelItems.push(cur.val);

    if (cur.left) nextLevel.enqueue(cur.left);
    if (cur.right) nextLevel.enqueue(cur.right);

    if (currentLevel.isEmpty) {
      cb(currentLevelItems, level);
      currentLevelItems = [];
      level += 1;

      [nextLevel, currentLevel] = [currentLevel, nextLevel];
    }
  }
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

/**
 * in order traversal with stack instead of recursion
 */
function forEachInDFSStack(root: Node | null, cb: (v: Node) => void) {
  if (!root) return;
  let current: Node | null = root;
  const stack: Node[] = [];
  // eslint-disable-next-line
  while (true) {
    if (current) {
      stack.push(current);
      current = current.left;
    } else if (stack.length > 0) {
      const n = stack.pop();
      if (!n) break;
      cb(n);
      current = n.right;
    } else {
      break;
    }
  }
}
export function diameterOfBinaryTree(root: Node | null): number {
  let diameter = -Infinity;

  function dfs(node: null | Node) {
    console.log("n", node?.val);
    if (!node) return 0;
    const left = dfs(node.left);
    const right = dfs(node.right);
    if (right + left > diameter) {
      diameter = right + left;
    }
    console.log("\t c", node?.val, { left, right });
    return Math.max(left, right) + 1;
  }

  dfs(root);

  return diameter;
}

export function toStringInDFSStack(root: Node) {
  let result = "";
  forEachInDFSStack(root, (n) => {
    result += `${n.val}, `;
  });
  return result;
}

export function forEachPre(n: Node | null, cb: (n: Node) => void) {
  if (!n) return;

  cb(n);
  forEachPre(n.left, cb);
  forEachPre(n.right, cb);
}
export function toStringPreDFS(n: Node | null): string {
  let result = "";

  forEachPre(n, (n) => {
    result += `${n.val},`;
  });

  return result;
}

export function forEachInDFS(n: Node | null, cb: (n: Node) => void) {
  if (!n) return;

  forEachPre(n.left, cb);
  cb(n);
  forEachPre(n.right, cb);
}

export function toStringInDFS(n: Node | null): string {
  let result = "";

  forEachInDFS(n, (n) => {
    result += `${n.val},`;
  });

  return result;
}
