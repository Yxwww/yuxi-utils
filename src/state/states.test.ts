import { describe, expect, it, vi } from 'vitest'
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

describe('object state', () => {
  it('should handle partial update', () => {
    const state = new State({
      name: 'john',
      age: 12,
    })
    const subscriber = vi.fn()
    state.subscribe(subscriber)
    expect(subscriber).toHaveBeenCalledTimes(0)
    state.update({
      name: 'Sam',
    })
    expect(subscriber).toHaveBeenCalledTimes(1)
    expect(subscriber).toHaveBeenCalledWith({
      name: 'Sam',
      age: 12,
    })
    expect(state.current).toEqual({
      name: 'Sam',
      age: 12,
    })
  })

  it('should handle function update', () => {
    const state = new State({
      name: 'john',
      age: 12,
    })
    const subscriber = vi.fn()
    state.subscribe(subscriber)
    expect(subscriber).toHaveBeenCalledTimes(0)
    state.update((s) => ({
      ...s,
      name: 'Sam',
    }))
    expect(subscriber).toHaveBeenCalledTimes(1)
    expect(subscriber).toHaveBeenCalledWith({
      name: 'Sam',
      age: 12,
    })
    expect(state.current).toEqual({
      name: 'Sam',
      age: 12,
    })
  })
})
