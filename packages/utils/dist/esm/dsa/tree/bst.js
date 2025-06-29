import { createQueue } from '../queue/Queue'
var Node = /** @class */ (function () {
  function Node(v) {
    this.left = null
    this.right = null
    this.val = v
  }
  Node.prototype.toString = function () {
    return this.val.toString()
  }
  return Node
})()
export { Node }
export function forEachBFS(root, cb) {
  var queue = createQueue()
  queue.enqueue(root)
  do {
    var current = queue.dequeue()
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
export function forEachLevel(root, cb) {
  var _a
  var currentLevel = createQueue(root)
  var nextLevel = createQueue()
  var level = 1
  var currentLevelItems = []
  while (!currentLevel.isEmpty) {
    var cur = currentLevel.dequeue()
    if (!cur) break
    currentLevelItems.push(cur.val)
    if (cur.left) nextLevel.enqueue(cur.left)
    if (cur.right) nextLevel.enqueue(cur.right)
    if (currentLevel.isEmpty) {
      cb(currentLevelItems, level)
      currentLevelItems = []
      level += 1
      ;(_a = [currentLevel, nextLevel]),
        (nextLevel = _a[0]),
        (currentLevel = _a[1])
    }
  }
}
export function toStringBFS(root) {
  var result = ''
  forEachBFS(root, function (n) {
    result += ''.concat(n.val, ', ')
  })
  return result
}
export function forEachDFS(root, cb) {
  var stack = [root]
  while (stack.length > 0) {
    var cur = stack.pop()
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
export function toStringDFS(root) {
  var result = ''
  forEachDFS(root, function (n) {
    result += ''.concat(n.val, ', ')
  })
  return result
}
