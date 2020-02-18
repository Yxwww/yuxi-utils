import * as assert from 'assert'
import { createStateControll } from './index'

describe('createStateControll', () => {
  it('should create state controller without throwing ', () => {
    const initialState = { initial: 'state' }
    assert.deepEqual(createStateControll(initialState).getState(), initialState)
  })

  it('should update state by passing a new state', () => {
    const update = { initial: 'changed' }
    const stateControll = createStateControll({ initial: 'state' })

    stateControll.update(update)

    assert.deepEqual(stateControll.getState(), update)
  })

  it('should reset to initial state', () => {
    const initial = { initial: 'state' }
    const stateControll = createStateControll({ initial: 'state' })
    stateControll.update({ initial: 'changed' })

    stateControll.reset()

    assert.deepEqual(stateControll.getState(), initial)
  })
})
