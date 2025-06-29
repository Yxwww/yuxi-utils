export var createMutex = function () {
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
var mutex = createMutex()
mutex(function () {
  console.log('hello')
  mutex(function () {
    console.log('second')
  })
})
