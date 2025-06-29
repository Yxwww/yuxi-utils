'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.createPromiseControl = createPromiseControl
function createPromiseControl(promise) {
  var subscribers = []
  return {
    subscribe: function (subscriber) {
      subscribers.push(subscriber)
      promise.then(function (v) {
        subscribers.forEach(function (fn) {
          return fn(v)
        })
      })
      return function () {
        var index = subscribers.indexOf(subscriber)
        subscribers.splice(index, 1)
      }
    },
    dispose: function () {
      subscribers.length = 0
    },
    getPromise: function () {
      return promise
    },
  }
}
