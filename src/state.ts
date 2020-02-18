import { GenericObject } from './types'

interface StateController<T> {
  getState: () => T;
  update: () => void;
  reset: () => void
}
export function createStateControll<T extends GenericObject>(
  initialState: T
): StateController<T> {
  let state = {}
  function update(newState: Partial<T>) {
    state = {
      ...state,
      ...newState,
    }
  }
  return {
    update,
    reset() {},
  }
}
