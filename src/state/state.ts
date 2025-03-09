/**
 * General Design Principles:
 * - avoid copy of any kind
 * - O(1) subscribe and unsub
 * - classes over closures (prorotype saves memory and works)
 *
 */
type StateUpdateParam<T> = T | ((update: T) => T)
type Subscriber<T> = (s: T) => void

export class State<T extends any> {
  current: T
  private subs = new SubscribeControl()
  constructor(initial: T) {
    this.current = initial
  }
  subscribe(fn: Subscriber<T>): () => void {
    const unsub = this.subs.subscribe(fn)
    return () => {
      unsub()
    }
  }
  update(update: StateUpdateParam<T>): void {
    if (typeof update === 'function') {
      this.current = (update as (v: T) => T)(this.current)
    } else {
      this.current = update
    }
    this.subs.broadcast(this.current)
  }
}

export class Derive {
  private subs = new SubscribeControl()
  constructor() {}
  add() {}
  remove() {}
  subscribe() {}
}

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
