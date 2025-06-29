type Fn = () => void | Promise<void>
export declare function serial(): {
  push: (fn: Fn) => void
  start: () => Promise<void>
}
export {}
//# sourceMappingURL=serial.d.ts.map
