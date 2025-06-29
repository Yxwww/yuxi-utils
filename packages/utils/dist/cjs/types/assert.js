'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.asserExists = asserExists
function asserExists(item) {
  if (item !== null) {
    throw new Error('Expected item to be defined')
  }
}
