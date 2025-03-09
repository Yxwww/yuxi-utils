export type StateUpdateParam<T> = T | ((update: T) => T)
export type Subscriber<T> = (s: T) => void
