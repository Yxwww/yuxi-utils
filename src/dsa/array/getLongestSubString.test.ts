import assert from "assert";
import { lengthOfLongestSubstring } from "./getLongestSubString";

describe("lengthOfLongestSubstring", () => {
  it("should work", () => {
    assert.equal(lengthOfLongestSubstring("abcabc"), 3);
    // assert.equal(lengthOfLongestSubstring("easdfajkle"), 8);
  });
});
