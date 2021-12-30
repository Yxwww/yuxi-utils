import { GenericObject, Dictionary } from '../types'
import { deleteItemInArrayImmutable } from '../array'

type Subscriber<T> = (arg: T) => void
interface StateController<T> {
  getState: () => T
  update: (newState: Partial<T>) => void
  reset: () => void
  subscribe(sub: Subscriber<T>): () => void
}

/**
 * A piece of closure holds state along with utility functions to interact with the state
 */
export function createStateControl<T extends GenericObject>(
  initialState: T
): StateController<T> {
  let state: T = initialState
  let subscribers: Subscriber<T>[] = []
  function update(newState: Partial<T>): void {
    state = {
      ...state,
      ...newState,
    }
    subscribers.forEach((fn) => fn(state))
  }
  function getState(): T {
    return { ...state }
  }
  return {
    getState,
    update,
    reset(): void {
      update(initialState)
    },
    subscribe(fn: (arg: T) => void) {
      subscribers.push(fn)
      fn(getState())
      return function unsub() {
        const index = subscribers.indexOf(fn)
        if (index > -1) {
          // does this need to be handled immutably ?
          subscribers = deleteItemInArrayImmutable(subscribers, index)
        }
      }
    },
  }
}

export function createStateGenerator<T extends Dictionary<any>>(
  defaultState: T
) {
  return function stateGenerator(initialState: Partial<T> = {}) {
    return {
      ...defaultState,
      ...initialState,
    }
  }
}
