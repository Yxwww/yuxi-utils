import { GenericObject, Dictionary } from '../types'

interface StateController<T> {
  getState: () => T
  update: (newState: Partial<T>) => void
  reset: () => void
  __createSelector: <K extends keyof T>(key: K) => () => T[K]
}
export function createStateControl<T extends GenericObject>(
  initialState: T
): StateController<T> {
  let state: T = initialState
  function update(newState: Partial<T>): void {
    state = {
      ...state,
      ...newState,
    }
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
    // experimental
    /**
     * Cons:
     * - original selector was designed to be pure functions
     * - letting consumer to keep a "selector" leads to memory leak
     */
    __createSelector<K extends keyof T>(key: K) {
      return (): T[K] => getState()[key]
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
