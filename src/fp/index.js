export function Box(x) {
  return {
    fold: f => f(x),
    map: f => Box(f(x)),
    chain: f => f(x),
  }
}

export function id(x) {
  return x
}
