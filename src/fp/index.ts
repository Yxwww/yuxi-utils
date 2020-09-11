// Course: https://frontendmasters.com/courses/hardcore-js-v2

export function Box(x) {
  return {
    // foldable
    fold: f => f(x),
    // functor
    map: f => Box(f(x)),
    // monad
    chain: f => f(x),
  }
}

// MARK: Either : null checker
// Since Left, and Right both have the same contract .map
// when it happens to Left it just straight up return Left, thus it's short circuit
export function Right(x) {
  return {
    // foldable
    fold: (f, g) => g(x),
    // functor
    map: f => Right(f(x)),
    // monad, chain pass in function that return another monad
    chain: f => f(x),
  }
}

export function Left(x) {
  return {
    // foldable
    fold: (f, g) => f(x),
    // functor
    map: f => Left(x),
    // monad
    chain: f => Left(x),
  }
}

export function tryCatch(fn) {
  try {
    return Right(fn())
  } catch (e) {
    return Left(e)
  }
}

export function fromNullable(x) {
  return x !== null ? Right(x) : Left(x)
}

export function id(x) {
  return x
}

export function track(x) {
  console.log('Track: ', x)
  return x
}

// TODO: look into  https://devblogs.microsoft.com/typescript/announcing-typescript-4-0-beta/#variadic-tuple-types
export function compose(...args: any[]) {
  const rightToLeft = args.reverse()
  return (initial: any) => {
    return rightToLeft.reduce((acc, cur) => {
      return cur(acc)
    }, initial)
  }
}

export function Task(f) {
  return {
    map(g) {
      return Task(compose(f, g))
    },
  }
}

// eslint-disable-next-line
export function noop() {}
