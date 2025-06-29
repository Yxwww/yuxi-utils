'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
var assert_1 = __importDefault(require('assert'))
var vitest_1 = require('vitest')
/**
 * Example 1: 1. Two Sum
 * Given an array of integers nums and an integer target, return indices of two numbers such that they add up to target. You cannot use the same index twice.
 */
function twosum(nums, target) {
  var result = []
  var map = new Map()
  for (var i = 0; i < nums.length; i++) {
    var cur = nums[i]
    var need = target - cur
    var cached = map.get(need)
    if (cached) {
      var first = cached[0]
      result.push([first, i])
      cached.shift()
      if (cached.length === 0) {
        map.delete(need)
      }
    } else {
      map.set(cur, [i])
    }
  }
  return result
}
;(0, vitest_1.it)('twosum should work', function () {
  assert_1.default.deepEqual(twosum([1, 2, 3], 3), [[0, 1]])
})
