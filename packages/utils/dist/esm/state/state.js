var State = /** @class */ (function () {
  function State(initial) {
    this.subs = new SubscribeControl()
    this.current = initial
  }
  State.prototype.subscribe = function (fn) {
    var unsub = this.subs.subscribe(fn)
    return function () {
      unsub()
    }
  }
  State.prototype.update = function (update) {
    if (typeof update === 'function') {
      this.current = update(this.current)
    } else if (typeof update === 'object' && typeof this.current === 'object') {
      Object.assign(this.current, update)
    } else {
      this.current = update
    }
  }
  State.prototype.broadcast = function () {
    this.subs.broadcast(this.current)
  }
  return State
})()
export { State }
var SubscribeControl = /** @class */ (function () {
  function SubscribeControl() {
    this.subscribers = new Set()
  }
  SubscribeControl.prototype.subscribe = function (fn) {
    var _this = this
    this.subscribers.add(fn)
    return function () {
      _this.subscribers.delete(fn)
    }
  }
  SubscribeControl.prototype.broadcast = function (message) {
    this.subscribers.forEach(function (fn) {
      return fn(message)
    })
  }
  return SubscribeControl
})()
export { SubscribeControl }
