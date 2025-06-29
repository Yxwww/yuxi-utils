export declare function Box(x: any): {
  fold: (f: any) => any
  map: (f: any) => /*elided*/ any
  chain: (f: any) => any
}
export declare function Right(x: any): {
  fold: (f: any, g: any) => any
  map: (f: any) => /*elided*/ any
  chain: (f: any) => any
}
export declare function Left(x: any): {
  fold: (f: any, g: any) => any
  map: (f: any) => /*elided*/ any
  chain: (f: any) => /*elided*/ any
}
export declare function tryCatch(fn: any): {
  fold: (f: any, g: any) => any
  map: (f: any) => /*elided*/ any
  chain: (f: any) => any
}
export declare function fromNullable(x: any): {
  fold: (f: any, g: any) => any
  map: (f: any) => /*elided*/ any
  chain: (f: any) => any
}
export declare function id(x: any): any
export declare function track(x: any): any
export declare function compose(...args: any[]): (initial: any) => any
export declare function Task(f: any): {
  map(g: any): /*elided*/ any
}
export declare function noop(): void
//# sourceMappingURL=index.d.ts.map
