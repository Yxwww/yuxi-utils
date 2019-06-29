const Node = require("./Node");

function Queue(val) {
  this.head = new Node(val);
}

Queue.prototype.push = function push(val) {
  this.head.push(val);
};

Queue.prototype.pop = function pop() {
  const poppedVal = this.head.value;
  this.head = this.head.next;
  return poppedVal;
};

Queue.prototype.toString = function toString() {
  let print = "";
  let current = this.head;
  while (current) {
    print += `${current.value} =>`;
    current = current.next;
  }
  console.log(print);
};

module.exports = Queue;
