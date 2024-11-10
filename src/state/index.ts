import { GenericObject } from '../types'

type Subscriber<T> = (arg: T) => void

type StateUpdateParam<T> = Partial<T> | ((update: T) => T)

/**
 * A piece of closure holds state along with utility functions to interact with the state
 */
export function createState<T extends GenericObject>(initialState: T) {
  const state: T = initialState
  const subscribers: Subscriber<T>[] = []

  function update(update: StateUpdateParam<T>): void {
    if (typeof update === 'function') {
      Object.assign(state, update(state))
    } else {
      Object.assign(state, update)
    }
    subscribers.forEach((fn) => fn(state))
  }

  return {
    get state() {
      return state
    },
    update,
    reset(): void {
      update(initialState)
    },
    subscribe(fn: (arg: T) => void) {
      subscribers.push(fn)
      return function unsub() {
        const index = subscribers.indexOf(fn)
        if (index > -1) {
          subscribers.splice(index, 1)
        }
      }
    },
  }
}
