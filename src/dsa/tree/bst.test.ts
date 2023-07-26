import assert from "assert";
import {
  Node,
  toStringBFS,
  toStringDFS,
  forEachLevel,
  toStringInDFS,
  toStringInDFSStack,
  minDepth,
  diameterOfBinaryTree,
} from "./bst";

/**
 *    0
 *  1  2
 * 3 4
 */

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

  it("toStringInDFSStack", () => {
    assert.equal(toStringInDFSStack(setupTree()), "3, 1, 4, 0, 2, ");
  });
});

describe("BST with recursion", () => {
  it("toStringPreDFS", () => {
    assert.equal(toStringBFS(setupTree()), "0, 1, 2, 3, 4, ");
  });
  it("toStringInDFS", () => {
    assert.equal(toStringInDFS(setupTree()), "1,3,4,0,2,");
  });
});

describe.skip("diameterOfBinaryTree", () => {
  it("should work", () => {
    assert.equal(diameterOfBinaryTree(setupTree()), 5);
  });
});

describe("BST", () => {
  it("toStringBFS", () => {
    assert.equal(toStringBFS(setupTree()), "0, 1, 2, 3, 4, ");
  });

  it("toStringDFS", () => {
    assert.equal(toStringDFS(setupTree()), "0, 1, 3, 4, 2, ");
  });
});

describe("forEachLevel", () => {
  it("should work", () => {
    const tree = setupTree();
    forEachLevel(tree, (nums, level) => {
      if (level === 1) {
        assert.deepEqual(nums, [0]);
      }
      if (level === 2) {
        assert.deepEqual(nums, [1, 2]);
      }
      if (level === 3) {
        assert.deepEqual(nums, [3, 4]);
      }
    });
  });
});
