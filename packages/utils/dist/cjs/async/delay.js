function delay(duration) {
  if (duration === void 0) {
    duration = 1000
  }
  return function delayed() {
    var arg = []
    for (var _i = 0; _i < arguments.length; _i++) {
      arg[_i] = arguments[_i]
    }
    return new Promise(function (resolve) {
      setTimeout(function () {
        resolve.apply(void 0, arg)
      }, duration)
    })
  }
}
