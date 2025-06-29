'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.isOfType = void 0
// Generic Typeguard: https://rangle.io/blog/how-to-use-typescript-type-guards/
var isOfType = function (varToBeChecked, propertyToCheckFor) {
  return varToBeChecked[propertyToCheckFor] !== undefined
}
exports.isOfType = isOfType
