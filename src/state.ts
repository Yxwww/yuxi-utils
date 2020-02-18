import { GenericObject } from './types'

interface StateController<T> {
  getState: () => T
  update: (newState: Partial<T>) => void
  reset: () => void
}
export function createStateControll<T extends GenericObject>(
  initialState: T
): StateController<T> {
  let state: T = initialState
  function update(newState: Partial<T>): void {
    state = {
      ...state,
      ...newState,
    }
  }
  return {
    getState(): T {
      return { ...state }
    },
    update,
    reset(): void {
      update(initialState)
    },
  }
}
