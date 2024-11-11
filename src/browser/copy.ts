/**
 * globalThis just looks pretty bad. :)
 */
export function copyHTML(html: string): Promise<void> {
  if (!globalThis.window) {
    return Promise.reject(new Error('We are not in browser environment.'))
  }
  return new Promise((res, rej) => {
    if (typeof globalThis.ClipboardItem === 'undefined') {
      globalThis.alert(
        'Sorry! This feature is not yet available in the browser you are using.\n\n' +
          'Selecting the text and pasting it to your email should give you the same result.'
      )
      return
    }

    const type = 'text/html'
    const blob = new globalThis.Blob([html], { type })
    const data = [new globalThis.ClipboardItem({ [type]: blob })]

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
