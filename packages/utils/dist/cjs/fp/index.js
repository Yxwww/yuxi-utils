'use strict'
// Course: https://frontendmasters.com/courses/hardcore-js-v2
Object.defineProperty(exports, '__esModule', { value: true })
exports.Box = Box
exports.Right = Right
exports.Left = Left
exports.tryCatch = tryCatch
exports.fromNullable = fromNullable
exports.id = id
exports.track = track
exports.compose = compose
exports.Task = Task
exports.noop = noop
function Box(x) {
  return {
    // foldable
    fold: function (f) {
      return f(x)
    },
    // functor
    map: function (f) {
      return Box(f(x))
    },
    // monad
    chain: function (f) {
      return f(x)
    },
  }
}
// MARK: Either : null checker
// Since Left, and Right both have the same contract .map
// when it happens to Left it just straight up return Left, thus it's short circuit
function Right(x) {
  return {
    // foldable
    fold: function (f, g) {
      return g(x)
    },
    // functor
    map: function (f) {
      return Right(f(x))
    },
    // monad, chain pass in function that return another monad
    chain: function (f) {
      return f(x)
    },
  }
}
function Left(x) {
  return {
    // foldable
    fold: function (f, g) {
      return f(x)
    },
    // functor
    map: function (f) {
      return Left(x)
    },
    // monad
    chain: function (f) {
      return Left(x)
    },
  }
}
function tryCatch(fn) {
  try {
    return Right(fn())
  } catch (e) {
    return Left(e)
  }
}
function fromNullable(x) {
  return x !== null ? Right(x) : Left(x)
}
function id(x) {
  return x
}
function track(x) {
  console.log('Track: ', x)
  return x
}
// TODO: look into  https://devblogs.microsoft.com/typescript/announcing-typescript-4-0-beta/#variadic-tuple-types
function compose() {
  var args = []
  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i]
  }
  var rightToLeft = args.reverse()
  return function (initial) {
    return rightToLeft.reduce(function (acc, cur) {
      return cur(acc)
    }, initial)
  }
}
function Task(f) {
  return {
    map: function (g) {
      return Task(compose(f, g))
    },
  }
}
// eslint-disable-next-line
function noop() {}
