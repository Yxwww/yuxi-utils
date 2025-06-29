'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.clipping = clipping
function clipping(min, max, value) {
  if (value < min) {
    return min
  } else if (value > max) {
    return max
  }
  return value
}
