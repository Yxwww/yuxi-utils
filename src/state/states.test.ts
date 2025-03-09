import { expect, it, vi } from 'vitest'
import { State } from './state'

it('should create state that is updatable', () => {
  const state = new State(1)
  state.update((v) => v + 1)
  expect(state.current).toBe(2)
  state.update(3)
  expect(state.current).toBe(3)
})

it('should be able subscribe', () => {
  const state = new State(1)
  const subscriber = vi.fn()
  state.subscribe(subscriber)
  expect(subscriber).toHaveBeenCalledTimes(0)
  state.update(2)
  expect(subscriber).toHaveBeenNthCalledWith(1, 2)
  state.update((v) => v * 2)
  expect(subscriber).toHaveBeenNthCalledWith(2, 4)
})

it('should handle unsub', () => {
  const state = new State(1)
  const subscriber = vi.fn()
  const unsub = state.subscribe(subscriber)
  expect(subscriber).toHaveBeenCalledTimes(0)
  unsub()
  state.update(2)
  expect(subscriber).toHaveBeenCalledTimes(0)
  expect(state['subs'].subscribers.size).toBe(0)
})
