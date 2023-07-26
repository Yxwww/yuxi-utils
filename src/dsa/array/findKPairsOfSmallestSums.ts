type Vec2 = [number, number];
interface QueueNode {
  sum: number;
  pos: Vec2;
}
function enqueue(queue: QueueNode[], pos: Vec2, sum: number) {
  if (queue.length === 0) {
    queue.push({ pos, sum });
    return;
  }
  for (let i = 0; i < queue.length; i++) {
    const item = queue[i];
    if (sum > item.sum || i === queue.length - 1) {
      queue.splice(i, 0, { pos, sum });
    }
  }
}
function dequeue(queue) {
  return queue.shift();
}

function getSum(nums1: number[], nums2: number[], pos: Vec2) {
  return nums1[pos[0]] + nums2[pos[1]];
}
export function kSmallestPairs(
  nums1: number[],
  nums2: number[],
  k: number
): number[][] {
  const result: [number, number][] = [];
  const queue: QueueNode[] = [];
  let picked = 0;
  for (let i = 0; i < nums1.length; i++) {
    for (let j = 0; j < nums2.length; j++) {
      enqueue(queue, [i, j], getSum(nums1, nums2, [i, j]));
    }
  }
  console.log("fn", queue);

  while (picked < k && queue.length !== 0) {
    const { pos, sum } = dequeue(queue);
    result.push(pos);
  }

  return result;
}
