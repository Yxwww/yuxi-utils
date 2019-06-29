const Node = require("./Node");

function Queue(val) {
  this.head = new Node(val);
  this.tail = this.head;
}

Queue.prototype.push = function push(val) {
  this.tail.push(val);
  this.tail = this.tail.next;
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
};

Queue.prototype.length = function length() {
  let count = 0;
  let current = this.head;
  while(current) {
    count ++;
    current = current.next;
  }
  return count;
}

module.exports = Queue;
