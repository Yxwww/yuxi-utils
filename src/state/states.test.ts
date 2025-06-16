import { describe, expect, it, vi } from 'vitest'
import { State } from './state'

it('should create state that is updatable', () => {
  const state = new State(1)
  state.update((v) => v + 1)
  expect(state.current).toBe(2)
  state.update(3)
  expect(state.current).toBe(3)
})

it('should be able to subscribe and broadcast', () => {
  const state = new State(1)
  const subscriber = vi.fn()
  state.subscribe(subscriber)
  expect(subscriber).toHaveBeenCalledTimes(0)
  state.update(2)
  expect(subscriber).toHaveBeenCalledTimes(0)
  state.broadcast()
  expect(subscriber).toHaveBeenNthCalledWith(1, 2)
  state.update((v) => v * 2)
  expect(subscriber).toHaveBeenCalledTimes(1)
})

describe('dirty', () => {
  it('should pass dirty state', () => {
    const state = new State(1)
    const subscriber = vi.fn()
    state.subscribe(subscriber)
    expect(subscriber).toHaveBeenCalledTimes(0)
  })
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
    state.broadcast()
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
    state.broadcast()
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

describe('derive', () => {
  it('should be able to compute derived value', () => {
    const s1 = new State(1)
    const s2 = new State('hello')

    const derived = new State('label')

    s1.subscribe((v) => {
      derived.update(v + ' ' + s2.current)
    })
    s2.subscribe((v) => {
      derived.update(s1.current + ' ' + v)
    })

    expect(derived.current).toBe('label')
    s1.broadcast()
    expect(derived.current).toBe('1 hello')
  })

  it('should fire subscriber once only derived is broadcasted', () => {
    const s1 = new State(1)
    const s2 = new State('hello')

    const derived = new State('label')

    s1.subscribe((v) => {
      derived.update(v + ' ' + s2.current)
    })
    s2.subscribe((v) => {
      derived.update(s1.current + ' ' + v)
    })

    const subscriber = vi.fn()
    derived.subscribe(subscriber)

    s1.broadcast()
    expect(subscriber).toHaveBeenCalledTimes(0)

    derived.broadcast()
    expect(subscriber).toHaveBeenCalledTimes(1)
  })
})
