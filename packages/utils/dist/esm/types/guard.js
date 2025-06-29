// Generic Typeguard: https://rangle.io/blog/how-to-use-typescript-type-guards/
export var isOfType = function (varToBeChecked, propertyToCheckFor) {
  return varToBeChecked[propertyToCheckFor] !== undefined
}
