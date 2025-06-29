export function addAll() {
  var args = []
  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i]
  }
  return args.reduce(function (acc, cur) {
    return acc + cur
  }, 0)
}
