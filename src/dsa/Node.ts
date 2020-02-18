function Node(value) {
  this.value = value
  this.next = null
}

Node.prototype.push = function push(val) {
  this.next = new Node(val)
}

module.exports = Node
