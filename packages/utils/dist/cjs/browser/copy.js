'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.copyHTML = copyHTML
/**
 * globalThis just looks pretty bad. :)
 */
function copyHTML(html) {
  if (!globalThis.window) {
    return Promise.reject(new Error('We are not in browser environment.'))
  }
  return new Promise(function (res, rej) {
    var _a
    if (typeof globalThis.ClipboardItem === 'undefined') {
      globalThis.alert(
        'Sorry! This feature is not yet available in the browser you are using.\n\n' +
          'Selecting the text and pasting it to your email should give you the same result.'
      )
      return
    }
    var type = 'text/html'
    var blob = new globalThis.Blob([html], { type: type })
    var data = [
      new globalThis.ClipboardItem(((_a = {}), (_a[type] = blob), _a)),
    ]
    globalThis.navigator.clipboard.write(data).then(
      function () {
        res()
      },
      function (err) {
        rej(err)
      }
    )
  })
}
