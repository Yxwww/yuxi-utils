import * as assert from 'assert'
import { $state } from './index'

describe('createStateControl', () => {
  it('should create state controller without throwing ', () => {
    const initialState = { initial: 'state' }
    assert.deepEqual($state(initialState).state, initialState)
  })

  describe('update', () => {
    it('should update state by passing a new state', () => {
      const update = { status: 'changed' }
      const s = $state({ status: 'state' })

      s.update(update)

      assert.deepEqual(s.state, update)
    })

    it('should update state by using a function', () => {
      const s = $state({ count: 0 })

      s.update((v) => ({ count: v.count + 1 }))

      assert.deepEqual(s.state, { count: 1 })
    })
  })

  it('should reset to initial state', () => {
    const initial = { state: 'initial' }
    const stateControl = $state(initial)
    stateControl.update({ state: 'changed' })

    stateControl.reset()

    assert.deepEqual(stateControl.state, initial)
  })
  describe('.subscribe', () => {
    it('subscribe should emit current state', () => {
      const stateControl = $state({ opacity: 1 })
      stateControl.subscribe((v) => {
        assert.deepEqual(v, { opacity: 1 })
      })
    })

    it('should emit value twice if subscription is fired twice ', () => {
      let count = 0
      const emittedValue: unknown[] = []
      const stateControl = $state({ opacity: 0 })
      stateControl.subscribe((state) => {
        count++
        emittedValue.push(state)
      })
      stateControl.update({ opacity: 1 })
      assert.equal(count, 1)
      assert.deepEqual(emittedValue, [{ opacity: 1 }])
    })

    it('should not emit more value if subscribe is ', () => {
      let count = 0
      const state = $state({ opacity: 0 })
      const unsub = state.subscribe(() => {
        count++
      })
      state.update({ opacity: 0.5 })
      unsub()
      state.update({ opacity: 1 })
      assert.equal(count, 1)
    })
  })
})
