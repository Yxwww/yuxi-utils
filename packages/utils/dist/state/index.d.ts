import { GenericObject } from '../types'
type StateUpdateParam<T> = Partial<T> | ((update: T) => T)
/**
 * A piece of closure holds state along with utility functions to interact with the state
 */
export declare function createState<T extends GenericObject>(
  initialState: T
): {
  readonly state: T
  update: (update: StateUpdateParam<T>) => void
  reset(): void
  subscribe(fn: (arg: T) => void): () => void
}
export {}
//# sourceMappingURL=index.d.ts.map
