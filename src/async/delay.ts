function delay(duration = 1000) {
  return function delayed(...arg) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(...arg)
      }, duration)
    })
  }
}
