export function serial() {
  let stack = [];
  let started = false;
  let current = 0;
  async function start() {
    if (started) {
      return;
    }
    started = true;
    while (stack.length !== 0) {
      const before = new Date();
      console.log("stack length", stack.length, stack);
      const fn = pop();
      console.log("fn", fn);
      await fn();
      console.log("timelapsed: ", new Date() - before);
    }
    started = false;
  }

  function push(fn) {
    stack.push(fn);
    start();
  }

  function pop() {
    const first = stack[0];
    stack = stack.slice(1);
    return first;
  }

  return {
    push,
    start
  };
}
