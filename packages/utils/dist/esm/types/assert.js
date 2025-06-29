export function asserExists(item) {
  if (item !== null) {
    throw new Error('Expected item to be defined')
  }
}
