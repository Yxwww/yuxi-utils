'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.createMutex = void 0
var createMutex = function () {
  var token = true
  return function (f, g) {
    if (token) {
      token = false
      try {
        f()
      } finally {
        token = true
      }
    } else if (g !== undefined) {
      g()
    }
  }
}
exports.createMutex = createMutex
var mutex = (0, exports.createMutex)()
mutex(function () {
  console.log('hello')
  mutex(function () {
    console.log('second')
  })
})
