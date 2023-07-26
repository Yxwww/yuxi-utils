function heapify(arr: number[], n: number, i: number) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  if (left < n && arr[left] > arr[largest]) largest = left;

  if (right < n && arr[right] > arr[largest]) largest = right;
  // console.log("heapify", { n, i, largest, left, right }, arr);

  if (largest != i) {
    const swap = arr[i];
    arr[i] = arr[largest];
    arr[largest] = swap;

    heapify(arr, n, largest);
  }
}

export function heapSort(arr: number[]) {
  const n = arr.length;

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) heapify(arr, n, i);

  for (let i = n - 1; i >= 0; i--) {
    const temp = arr[0];
    arr[0] = arr[i];
    arr[i] = temp;

    heapify(arr, i, 0);
  }
  return arr;
}
