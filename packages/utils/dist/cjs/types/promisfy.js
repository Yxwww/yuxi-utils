'use strict'
// Promisify utility type that converts synchronous methods to return Promises
// Handles overloads, nested objects, and methods that already return Promises
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1]
          return t[1]
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g = Object.create(
        (typeof Iterator === 'function' ? Iterator : Object).prototype
      )
    return (
      (g.next = verb(0)),
      (g['throw'] = verb(1)),
      (g['return'] = verb(2)),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function () {
          return this
        }),
      g
    )
    function verb(n) {
      return function (v) {
        return step([n, v])
      }
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.')
      while ((g && ((g = 0), op[0] && (_ = 0)), _))
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y['return']
                  : op[0]
                  ? y['throw'] || ((t = y['return']) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t
          if (((y = 0), t)) op = [op[0] & 2, t.value]
          switch (op[0]) {
            case 0:
            case 1:
              t = op
              break
            case 4:
              _.label++
              return { value: op[1], done: false }
            case 5:
              _.label++
              y = op[1]
              op = [0]
              continue
            case 7:
              op = _.ops.pop()
              _.trys.pop()
              continue
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0
                continue
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1]
                break
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1]
                t = op
                break
              }
              if (t && _.label < t[2]) {
                _.label = t[2]
                _.ops.push(op)
                break
              }
              if (t[2]) _.ops.pop()
              _.trys.pop()
              continue
          }
          op = body.call(thisArg, _)
        } catch (e) {
          op = [6, e]
          y = 0
        } finally {
          f = t = 0
        }
      if (op[0] & 5) throw op[1]
      return { value: op[0] ? op[1] : void 0, done: true }
    }
  }
Object.defineProperty(exports, '__esModule', { value: true })
// Test the result
var hello = {}
function run() {
  return __awaiter(this, void 0, void 0, function () {
    var simpleResult,
      simpleCheck,
      overloadedResult1,
      overloadedResult2,
      overloadedCheck1,
      overloadedCheck2,
      conditionalResult,
      conditionalCheck,
      cameraResult,
      cameraCheck,
      animateResult,
      animateCheck
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          return [4 /*yield*/, hello.simple()]
        case 1:
          simpleResult = _a.sent()
          simpleCheck = simpleResult // ✅
          return [4 /*yield*/, hello.overloaded('test')] // Should return Promise<number>
        case 2:
          overloadedResult1 = _a.sent() // Should return Promise<number>
          return [4 /*yield*/, hello.overloaded(42)] // Should return Promise<boolean>
        case 3:
          overloadedResult2 = _a.sent() // Should return Promise<boolean>
          overloadedCheck1 = overloadedResult1 // ✅
          overloadedCheck2 = overloadedResult2 // ✅
          return [4 /*yield*/, hello.conditional('foo')]
        case 4:
          conditionalResult = _a.sent()
          conditionalCheck = conditionalResult // ✅
          hello
          return [4 /*yield*/, hello.Camera.focusOn('foo')]
        case 5:
          cameraResult = _a.sent()
          cameraCheck = cameraResult // ✅
          return [4 /*yield*/, hello.animateState('bar')]
        case 6:
          animateResult = _a.sent()
          animateCheck = animateResult // ✅
          return [2 /*return*/]
      }
    })
  })
}
// Summary of capabilities with this implementation:
// ✅ Simple methods: Automatically promisified
// ✅ Nested objects: Recursively promisified (Camera.focusOn works)
// ✅ Already-Promise methods: Preserved as-is (animateState works)
// ✅ Overloaded methods: Preserved via manual interface extension
// ✅ Generic conditional types: Preserved via manual interface extension
// This implementation successfully handles:
// 1. hello.simple() -> Promise<string>
// 2. hello.Camera.focusOn() -> Promise<number>
// 3. hello.animateState() -> Promise<number> (already was Promise)
// 4. hello.overloaded("test") -> Promise<number> (manually preserved)
// 5. hello.overloaded(42) -> Promise<boolean> (manually preserved)
// 6. hello.conditional("foo") -> Promise<number> (manually preserved)
// EASIER APPROACHES FOR OVERLOADS:
// 1. Manual interface extension (shown above) - most reliable
// 2. Use utility libraries like type-fest's Asyncify
// 3. Generate types with code generation tools
// 4. Use template literal types for simpler cases:
//    type Methods = 'method1' | 'method2';
//    type PromisifiedMethods = { [K in Methods]: (...args: any[]) => Promise<any> }
// 5. For simple cases, just write the full interface manually - often clearer than complex type utilities
