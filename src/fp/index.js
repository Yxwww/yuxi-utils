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
    // monad
    chain: f => f(x),
  }
}

export function Left(x) {
  return {
    // foldable
    fold: (f, g) => f(x),
    // functor
    map: f => Left(f(x)),
    // monad
    chain: f => Left(x),
  }
}

export function fromNullable(x) {
  return x !== null ? Right(x) : Left(x)
}

export function id(x) {
  return x
}

// eslint-disable-next-line
export function noop() {}
