function delay(duration = 1000) {
  return function delayed(...arg) {
    return new Promise(res => {
      setTimeout(() => {
        res(...arg);
      }, duration);
    });
  };
}

