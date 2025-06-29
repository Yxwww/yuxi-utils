/**
 * General Design Principles:
 * - avoid copy of any kind
 * - O(1) subscribe and unsub
 * - classes over closures (prorotype saves memory and works)
 * - only emit on broadcast
 *
 */
type StateUpdateParam<T> = T extends Record<string, any>
  ? Partial<T> | ((update: T) => T)
  : T | ((update: T) => T)
type Subscriber<T> = (s: T) => void

export class State<T> {
  current: T
  private subs = new SubscribeControl()
  dirty?: T extends Record<string, any> ? Partial<T> : T
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
    } else if (typeof update === 'object' && typeof this.current === 'object') {
      Object.assign(this.current as object, update)
    } else {
      this.current = update as any
    }
  }
  broadcast() {
    this.subs.broadcast(this.current)
  }
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
