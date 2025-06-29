type Promisify<T> = {
  [K in keyof T]: T[K] extends (...args: infer Args) => infer Return
    ? Return extends Promise<any>
      ? T[K]
      : (...args: Args) => Promise<Return>
    : T[K] extends object
    ? Promisify<T[K]>
    : T[K]
}
interface TestAPI {
  simple(): string
  overloaded(x: string): number
  overloaded(x: number): boolean
  conditional<T extends 'foo' | 'bar'>(
    input: T
  ): T extends 'foo' ? number : string
  Camera: {
    focusOn(target: string): number
  }
  animateState(target: string): Promise<number>
}
type PromisifiedAPI = Promisify<TestAPI>
interface PromisifiedTestAPI
  extends Omit<PromisifiedAPI, 'conditional' | 'overloaded'> {
  overloaded(x: string): Promise<number>
  overloaded(x: number): Promise<boolean>
  conditional<T extends 'foo' | 'bar'>(
    input: T
  ): Promise<T extends 'foo' ? number : string>
  aNumber: number
}
export type { Promisify, PromisifiedTestAPI }
export type PromisifyWithOverrides<
  T,
  Overrides extends Partial<Record<keyof T, any>> = {}
> = Omit<Promisify<T>, keyof Overrides> & Overrides
//# sourceMappingURL=promisfy.d.ts.map
