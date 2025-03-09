import { createQueue } from '../queue/Queue'
import { describe, it } from 'vitest'

export class Node {
  left: Node | null
  right: Node | null
  val: number
  constructor(v: number) {
    this.left = null
    this.right = null
    this.val = v
  }
  toString() {
    return this.val.toString()
  }
}

export function forEachBFS(root: Node, cb: (n: Node) => void) {
  const queue = createQueue<Node>()
  queue.enqueue(root)
  do {
    const current = queue.dequeue()
    if (!current) break
    cb(current)
    if (current.left) {
      queue.enqueue(current.left)
    }
    if (current.right) {
      queue.enqueue(current.right)
    }
  } while (queue.head)
}

/**
 * Handles each level independently and flush the memory when moving on to the next
 */
export function forEachLevel(
  root: Node,
  cb: (items: number[], level: number) => void
) {
  let currentLevel = createQueue<Node>(root)
  let nextLevel = createQueue<Node>()
  let level = 1
  let currentLevelItems: number[] = []

  while (!currentLevel.isEmpty) {
    const cur = currentLevel.dequeue()
    if (!cur) break
    currentLevelItems.push(cur.val)

    if (cur.left) nextLevel.enqueue(cur.left)
    if (cur.right) nextLevel.enqueue(cur.right)

    if (currentLevel.isEmpty) {
      cb(currentLevelItems, level)
      currentLevelItems = []
      level += 1

      ;[nextLevel, currentLevel] = [currentLevel, nextLevel]
    }
  }
}

export function toStringBFS(root: Node) {
  let result = ''
  forEachBFS(root, (n) => {
    result += `${n.val}, `
  })
  return result
}

export function forEachDFS(root: Node, cb: (n: Node) => void) {
  const stack = [root]
  while (stack.length > 0) {
    const cur = stack.pop()
    if (!cur) break
    cb(cur)
    if (cur.right) {
      stack.push(cur.right)
    }
    if (cur.left) {
      stack.push(cur.left)
    }
  }
}

export function toStringDFS(root: Node) {
  let result = ''
  forEachDFS(root, (n) => {
    result += `${n.val}, `
  })
  return result
}
