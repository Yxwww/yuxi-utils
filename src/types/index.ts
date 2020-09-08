export interface GenericObject {
  [key: string]: any
}

export type Nullable<T> = T | null
export type Maybe<T> = T | null | undefined
export interface Dictionary<T> {
  [key: string]: T
}
