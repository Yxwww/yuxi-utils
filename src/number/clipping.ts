export function clipping(min: number, max: number, value: value): number {
  if (value < min) {
    return min
  } else if (value > max) {
    return max
  }
  return value
}
