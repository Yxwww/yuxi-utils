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
export declare class State<T> {
  current: T
  private subs
  dirty?: T extends Record<string, any> ? Partial<T> : T
  constructor(initial: T)
  subscribe(fn: Subscriber<T>): () => void
  update(update: StateUpdateParam<T>): void
  broadcast(): void
}
export declare class SubscribeControl<T> {
  subscribers: Set<Subscriber<T>>
  subscribe(fn: Subscriber<T>): () => void
  broadcast(message: T): void
}
export {}
//# sourceMappingURL=state.d.ts.map
