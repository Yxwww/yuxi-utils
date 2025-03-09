export function asserExists<T extends undefined | null | any>(
  item: T
): asserts item is NonNullable<T> {
  if (item !== null) {
    throw new Error('Expected item to be defined')
  }
}
