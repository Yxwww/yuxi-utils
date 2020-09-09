import * as assert from 'assert'
import { createStateControl, createStateGenerator } from './index'

describe('createStateControl', () => {
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
  describe('.subscribe', () => {
    it('subscribe should emit current state', () => {
      const stateControl = createStateControl({ opacity: 1 })
      stateControl.subscribe(v => {
        assert.deepEqual(v, { opacity: 1 })
      })
    })
    it('should emit value twice if subscription is fired twice ', () => {
      let count = 0
      const emittedValue: any[] = []
      const subscriber = (state: any) => {
        count++
        emittedValue.push(state)
      }
      const stateControl = createStateControl({ opacity: 0 })
      stateControl.subscribe(subscriber)
      stateControl.update({ opacity: 1 })
      assert.equal(count, 2)
      assert.deepEqual(emittedValue, [{ opacity: 0 }, { opacity: 1 }])
    })

    it('should not emit more value if subscribe is ', () => {
      let count = 0
      const subscriber = () => {
        count++
      }
      const stateControl = createStateControl({ opacity: 0 })
      const unsub = stateControl.subscribe(subscriber)
      unsub()
      stateControl.update({ opacity: 1 })
      assert.equal(count, 1)
    })
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
