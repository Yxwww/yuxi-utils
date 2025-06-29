export function addAll(...args: number[]) {
  return args.reduce((acc, cur) => {
    return acc + cur
  }, 0)
}
