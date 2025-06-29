var Node = /** @class */ (function () {
  function Node(val) {
    this.value = val
  }
  return Node
})()
export { Node }
export function createNode(val) {
  return new Node(val)
}
