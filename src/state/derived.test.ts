import { expect, it } from 'vitest'
import { Derived } from './derived'
import { State } from './state'

it('should derived value of state', () => {
  const derived = new Derived(
    [new State(1), new State('hello')],
    ([a, b]) => `${b} ${a}`
  )

  expect(derived.current).toBe('hello 1')
})
