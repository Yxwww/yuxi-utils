import { fromArray, reverse, toString } from "./";
import assert from "assert";

function setup() {
  return fromArray([0, 1, 2, 3]);
}
describe("printLinkedList", () => {
  it("should work with fromArray", () => {
    assert.equal(toString(setup()), "0123");
  });
});

describe("reverse", () => {
  it("should work", () => {
    assert.equal(toString(reverse(setup())), "3210");
  });

  it("should handle null head or list with one item", () => {
    assert.equal(toString(reverse(fromArray([]))), "");
    assert.equal(toString(reverse(fromArray([1]))), "1");
  });
});
