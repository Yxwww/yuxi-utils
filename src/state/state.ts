/**
 * General Design Principles:
 * - avoid copy of any kind
 * - O(1) subscribe and unsub
 * - classes over closures (prorotype saves memory and works)
 *
 */

import { StateUpdateParam, Subscriber } from './types'
import { SubscribeControl } from './util'

export class State<T extends any = any> {
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
