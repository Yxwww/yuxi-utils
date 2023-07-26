import assert from "assert";
import { kSmallestPairs } from "./findKPairsOfSmallestSums";

describe.skip("kSmallestPairs", () => {
  it("should work", () => {
    assert.deepEqual(kSmallestPairs([1, 2, 3], [-1, 1, 4], 4), [1, 2, 3]);
    // assert.equal(lengthOfLongestSubstring("easdfajkle"), 8);
  });
});
