import { Subscriber } from './types'

export class SubscribeControl<T> {
  subscribers = new Set<Subscriber<T>>()
  subscribe(fn: Subscriber<T>): () => void {
    this.subscribers.add(fn)
    return () => {
      this.subscribers.delete(fn)
    }
  }
  broadcast(message: T) {
    this.subscribers.forEach((fn) => fn(message))
  }
}
