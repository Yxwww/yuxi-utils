export declare function convertToDebounce<T extends any[], P>(
  fn: ((...args: T) => P) | ((...args: T) => Promise<P>),
  duration?: number
): (...args: T) => Promise<P>
//# sourceMappingURL=debounce.d.ts.map
