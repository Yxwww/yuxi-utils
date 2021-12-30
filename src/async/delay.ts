function delay(duration = 1000) {
  return function delayed(...arg: any[]) {
    return new Promise((resolve: (...args: any[]) => void) => {
      setTimeout(() => {
        resolve(...arg)
      }, duration)
    })
  }
}
