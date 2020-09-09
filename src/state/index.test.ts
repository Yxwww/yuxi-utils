import * as assert from 'assert'
import { createStateControl, createStateGenerator } from './index'

it('should create state controller without throwing ', () => {
  const initialState = { initial: 'state' }
  assert.deepEqual(createStateControl(initialState).getState(), initialState)
})

it('should update state by passing a new state', () => {
  const update = { initial: 'changed' }
  const stateControl = createStateControl({ initial: 'state' })

  stateControl.update(update)

  assert.deepEqual(stateControl.getState(), update)
})

it('should reset to initial state', () => {
  const initial = { initial: 'state' }
  const stateControl = createStateControl({ initial: 'state' })
  stateControl.update({ initial: 'changed' })

  stateControl.reset()

  assert.deepEqual(stateControl.getState(), initial)
})

describe('.createSelector', () => {
  it('should allow building selectors easy', () => {
    const state = { hello: 'world' }
    const store = createStateControl(state)
    const valueOfHelloProp = store.__createSelector('hello')

    assert.equal(valueOfHelloProp(), 'world')
  })

  it('should handle value update as well', () => {
    const state = { hello: 'world' }
    const update = { hello: 'updated world' }
    const store = createStateControl(state)
    const valueOfHelloProp = store.__createSelector('hello')

    store.update(update)

    assert.equal(valueOfHelloProp(), update.hello)
  })
})

describe('createStateGenerator', () => {
  it('should create default state', () => {
    const stateGen = createStateGenerator({ opacity: 1 })
    assert.deepEqual(stateGen(), { opacity: 1 })
  })
  it('should handle state change', () => {
    const stateGen = createStateGenerator({ opacity: 1 })
    assert.deepEqual(stateGen({ opacity: 0.5 }), { opacity: 0.5 })
  })
})
