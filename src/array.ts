export function deleteItemInArrayImmutable<T>(arr: T[], index: number) {
  return [...arr.slice(0, index), ...arr.slice(index + 1)]
}

export function updateObjectInArrayImmutable<T>(
  arr: T[],
  predicate: (arg: T) => boolean,
  updater: (arg: T) => any
) {
  const index = arr.findIndex(predicate)
  if (index === -1) {
    return arr
  }
  return [...arr.slice(0, index), updater(arr[index]), ...arr.slice(index + 1)]
}
