export function serial() {
  let stack: Function[] = []
  let started = false
  // const current = 0

  function pop() {
    const first = stack[0]
    stack = stack.slice(1)
    return first
  }

  async function start() {
    if (started) {
      return
    }
    started = true
    while (stack.length !== 0) {
      const before = +new Date()
      console.log('stack length', stack.length, stack)
      const fn = pop()
      console.log('fn', fn)
      await fn()
      console.log('timelapsed: ', +new Date() - before)
    }
    started = false
  }

  function push(fn: Function) {
    stack.push(fn)
    start()
  }

  return {
    push,
    start,
  }
}
