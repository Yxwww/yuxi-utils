import assert from "assert";
import { Node, toStringBFS, toStringDFS } from "./bst";

function setupTree() {
  const root = new Node(0);
  const rootL = new Node(1);
  const rootR = new Node(2);
  root.left = rootL;
  root.right = rootR;
  root.left.left = new Node(3);
  root.left.right = new Node(4);
  return root;
}

describe("BST", () => {
  it("toStringBFS", () => {
    assert.equal(toStringBFS(setupTree()), "0, 1, 2, 3, 4, ");
  });

  it("toStringDFS", () => {
    assert.equal(toStringDFS(setupTree()), "0, 1, 3, 4, 2, ");
  });
});
