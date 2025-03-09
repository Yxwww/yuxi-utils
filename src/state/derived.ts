import type { State } from './state'
import { SubscribeControl } from './util'

export class Derived<T, S extends State<any>[]> {
  private subs = new SubscribeControl<T>()
  private states: S
  private by: (values: {
    [K in keyof S]: S[K] extends State<infer U> ? U : never
  }) => T
  constructor(
    states: [...S],
    by: (values: {
      [K in keyof S]: S[K] extends State<infer U> ? U : never
    }) => T
  ) {
    this.by = by
    this.states = states
  }

  get current() {
    return this.by(this.states.map((v) => v.current) as any)
  }

  subscribe(callback: (value: T) => void) {
    this.subs.subscribe(callback)
  }
}
