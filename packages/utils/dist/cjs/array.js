'use strict'
var __spreadArray =
  (this && this.__spreadArray) ||
  function (to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i)
          ar[i] = from[i]
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from))
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.deleteItemInArrayImmutable = deleteItemInArrayImmutable
exports.updateObjectInArrayImmutable = updateObjectInArrayImmutable
function deleteItemInArrayImmutable(arr, index) {
  return __spreadArray(
    __spreadArray([], arr.slice(0, index), true),
    arr.slice(index + 1),
    true
  )
}
function updateObjectInArrayImmutable(arr, predicate, updater) {
  var index = arr.findIndex(predicate)
  if (index === -1) {
    return arr
  }
  return __spreadArray(
    __spreadArray(
      __spreadArray([], arr.slice(0, index), true),
      [updater(arr[index])],
      false
    ),
    arr.slice(index + 1),
    true
  )
}
