import { Nullable } from '../types'

export function convertToDebounce<T extends any[], P>(
  fn: ((...args: T) => P) | ((...args: T) => Promise<P>),
  duration = 500
) {
  let timeout: Nullable<NodeJS.Timeout> = null
  const resolves: any[] = []
  const rejects: any[] = []
  return function debounced(...args: T): Promise<P> {
    return new Promise((resolve, reject) => {
      if (timeout) {
        clearTimeout(timeout)
      }
      resolves.push(resolve)
      rejects.push(reject)
      timeout = setTimeout(async () => {
        try {
          const result = await fn(...args)
          resolves.forEach(res => {
            res(result)
          })
          resolves.length = 0
          rejects.length = 0
        } catch (e) {
          rejects.forEach(rej => {
            rej(e)
          })
          resolves.length = 0
          rejects.length = 0
        }
      }, duration)
    })
  }
}
