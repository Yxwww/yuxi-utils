// Promisify utility type that converts synchronous methods to return Promises
// Handles overloads, nested objects, and methods that already return Promises

// Simple version that works for most cases
type Promisify<T> = {
  [K in keyof T]: T[K] extends (...args: infer A) => infer R
    ? R extends Promise<any>
      ? T[K] // Already returns a Promise, keep as-is
      : (...args: A) => Promise<R>
    : T[K] extends object
    ? Promisify<T[K]>
    : T[K]
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

  // Overloaded method - only last overload is preserved by basic Promisify
  const overloadedResult = await hello.overloaded(42) // Using number to match last overload
  const overloadedCheck: boolean = overloadedResult // ✅

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

// Summary of capabilities:
// ✅ Simple methods: Automatically promisified
// ✅ Nested objects: Recursively promisified
// ✅ Already-Promise methods: Preserved as-is
// ⚠️ Overloaded methods: Only last overload preserved (TypeScript limitation)
// ❌ Generic conditional types: Require manual override

// For production use, consider using established libraries like:
// - type-fest's Asyncify
// - ts-toolbelt's Function.Promisify
// which may handle edge cases better
