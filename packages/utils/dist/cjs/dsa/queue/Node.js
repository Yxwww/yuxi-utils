'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.Node = void 0
exports.createNode = createNode
var Node = /** @class */ (function () {
  function Node(val) {
    this.value = val
  }
  return Node
})()
exports.Node = Node
function createNode(val) {
  return new Node(val)
}
