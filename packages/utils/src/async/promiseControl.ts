type Subscriber<T> = (arg: T) => void
type Unsubscriber = () => void

export function createPromiseControl<T>(promise: Promise<T>) {
  const subscribers: Subscriber<T>[] = []
  return {
    subscribe(subscriber: Subscriber<T>): Unsubscriber {
      subscribers.push(subscriber)
      promise.then((v) => {
        subscribers.forEach((fn) => fn(v))
      })
      return () => {
        const index = subscribers.indexOf(subscriber)
        subscribers.splice(index, 1)
      }
    },
    dispose() {
      subscribers.length = 0
    },
    getPromise() {
      return promise
    },
  }
}
