/**
 * A piece of closure holds state along with utility functions to interact with the state
 */
export function createState(initialState) {
  var state = initialState
  var subscribers = []
  function update(update) {
    if (typeof update === 'function') {
      Object.assign(state, update(state))
    } else {
      Object.assign(state, update)
    }
    subscribers.forEach(function (fn) {
      return fn(state)
    })
  }
  return {
    get state() {
      return state
    },
    update: update,
    reset: function () {
      update(initialState)
    },
    subscribe: function (fn) {
      subscribers.push(fn)
      return function unsub() {
        var index = subscribers.indexOf(fn)
        if (index > -1) {
          subscribers.splice(index, 1)
        }
      }
    },
  }
}
