import assert from 'assert'
import { it } from 'vitest'

/**
 * Example 1: 1. Two Sum
 * Given an array of integers nums and an integer target, return indices of two numbers such that they add up to target. You cannot use the same index twice.
 */

function twosum(nums: number[], target: number) {
  const result: [number, number][] = []
  const map = new Map<number, number[]>()
  for (let i = 0; i < nums.length; i++) {
    const cur = nums[i]
    const need = target - cur
    const cached = map.get(need)
    if (cached) {
      const first = cached[0]
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

it('twosum should work', () => {
  assert.deepEqual(twosum([1, 2, 3], 3), [[0, 1]])
})
