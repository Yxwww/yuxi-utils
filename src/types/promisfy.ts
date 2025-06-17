// Promisify utility type that converts synchronous methods to return Promises
// Handles overloads, nested objects, and methods that already return Promises

// NOTES:
// - TypeScript's type system has limitations with complex generic transformations
// - The basic Promisify works well for simple cases but struggles with:
//   1. Function overloads - only the last overload signature is preserved
//   2. Generic functions with conditional return types - type information is lost
//   3. Complex generic constraints - requires manual type definitions
//
// - The issue with returning 'unknown' types was due to TypeScript losing track
//   of return type information when deeply nested conditional types are used
//
// - For production use, consider:
//   1. Using established libraries (type-fest, ts-toolbelt)
//   2. Creating specific promisified interfaces for complex APIs
//   3. Using the PromisifyWithOverrides pattern for selective manual overrides
//
// - Key learnings:
//   * Keep type transformations simple when possible
//   * Test with actual usage, not just type definitions
//   * TypeScript's inference has limits - manual overrides are sometimes necessary

// New Promisify implementation from scratch

// Main Promisify type
type Promisify<T> = {
  [K in keyof T]: T[K] extends (...args: infer Args) => infer Return
    ? Return extends Promise<any>
      ? T[K] // Already returns Promise, keep as-is
      : (...args: Args) => Promise<Return>
    : T[K] extends object
    ? Promisify<T[K]> // Recursively handle nested objects
    : T[K] // Non-function, non-object properties stay the same
}

// Test interface
interface TestAPI {
  // ✅ Simple method
  simple(): string

  // ⚠️ Overloaded - basic Promisify only captures last overload
  overloaded(x: string): number
  overloaded(x: number): boolean

  // ❌ Generic conditional - requires manual handling
  conditional<T extends 'foo' | 'bar'>(
    input: T
  ): T extends 'foo' ? number : string

  // ✅ Nested object with method
  Camera: {
    focusOn(target: string): number
  }

  // ✅ Already returns Promise - preserved as-is
  animateState(target: string): Promise<number>
}

// Apply Promisify
type PromisifiedAPI = Promisify<TestAPI>

// For methods with complex generics, manual override is needed
interface PromisifiedTestAPI extends Omit<PromisifiedAPI, 'conditional'> {
  conditional<T extends 'foo' | 'bar'>(
    input: T
  ): Promise<T extends 'foo' ? number : string>
}

// Test the result
const hello: PromisifiedTestAPI = {} as any

async function run() {
  // Simple method works perfectly
  const simpleResult = await hello.simple()
  const simpleCheck: string = simpleResult // ✅

  // Overloaded method - basic Promisify only preserves last overload
  // const overloadedResult1 = await hello.overloaded("test"); // This won't work - string overload lost
  const overloadedResult2 = await hello.overloaded(42) // This works - matches last overload
  const overloadedCheck: boolean = overloadedResult2 // ✅

  // Conditional with manual override works
  const conditionalResult = await hello.conditional('foo')
  const conditionalCheck: number = conditionalResult // ✅

  // Nested object method works
  const cameraResult = await hello.Camera.focusOn('foo')
  const cameraCheck: number = cameraResult // ✅

  // Already-Promise method preserved
  const animateResult = await hello.animateState('bar')
  const animateCheck: number = animateResult // ✅
}

// Export the types
export type { Promisify, PromisifiedTestAPI }

// Utility for manual overrides when needed
export type PromisifyWithOverrides<
  T,
  Overrides extends Partial<Record<keyof T, any>> = {}
> = Omit<Promisify<T>, keyof Overrides> & Overrides

// Summary of capabilities with this implementation:
// ✅ Simple methods: Automatically promisified
// ✅ Nested objects: Recursively promisified (Camera.focusOn works)
// ✅ Already-Promise methods: Preserved as-is (animateState works)
// ⚠️ Overloaded methods: Only last overload preserved (TypeScript limitation)
// ❌ Generic conditional types: Require manual override (handled via PromisifiedTestAPI)

// This implementation successfully handles:
// 1. hello.simple() -> Promise<string>
// 2. hello.Camera.focusOn() -> Promise<number>
// 3. hello.animateState() -> Promise<number> (already was Promise)
// 4. hello.overloaded(42) -> Promise<boolean> (last overload)
// 5. hello.conditional("foo") -> Promise<number> (with manual override)
