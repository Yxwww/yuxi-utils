import assert from "assert";
import { heapSort } from "./heapsort";

describe("heapsort", () => {
  it("should work", () => {
    const arr = [12, 11, 13, 5, 6, 7];
    assert.deepEqual(heapSort(arr), [5, 6, 7, 11, 12, 13]);
  });
});
