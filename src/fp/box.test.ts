import * as assert from 'assert'
import { Box, id, fromNullable, noop, tryCatch, compose } from './index'
import { describe, it } from 'vitest'

describe('compose', () => {
  it('should compose function from right to left together', () => {
    const add2 = (v) => v + 2
    const three = () => 3
    const threeAdd2 = compose(add2, three) as any
    assert.equal(threeAdd2(), 5)
  })
})

describe('Box', () => {
  it('should fold correctly', () => {
    const box = Box(5)
    assert.equal(box.fold(id), 5)
  })
  it('should map correctly', () => {
    const box = Box(5)
    assert.equal(box.map((v) => v * 2).fold(id), 10)
    box
      .map((v) => v + 1)
      .fold((v) => {
        console.log('v', v)
      })
  })
})

describe('Either', () => {
  const color = {
    red: '#ff0000',
    blue: '#0000ff',
    green: '#00ff00',
  }

  function findColor(name) {
    return fromNullable(color[name])
  }

  it('should use Right when found red', () => {
    findColor('red').fold(noop, (v) => {
      assert.equal('#ff0000', v)
    })
  })

  it('should use Left when found redd', () => {
    findColor('redd').fold((v) => {
      assert.equal('#ff0000', v)
    }, noop)
  })
})

describe('Using tryCatch with Either', () => {
  function someSyntask(success) {
    if (success) {
      return 200
    } else {
      throw new Error('task failed due to:')
    }
  }

  it('should handle success case', () => {
    tryCatch(() => someSyntask(true))
      .map((v) => v + 5)
      .fold(noop, (v) => {
        assert.equal(v, 205)
      })
  })

  it('should handle failure', () => {
    tryCatch(() => someSyntask(false))
      .map((v) => v + 5)
      .fold((v) => {
        assert.equal(v instanceof Error, true)
      }, noop)
  })
})
