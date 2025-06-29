type Subscriber<T> = (arg: T) => void
type Unsubscriber = () => void
export declare function createPromiseControl<T>(promise: Promise<T>): {
  subscribe(subscriber: Subscriber<T>): Unsubscriber
  dispose(): void
  getPromise(): Promise<T>
}
export {}
//# sourceMappingURL=promiseControl.d.ts.map
