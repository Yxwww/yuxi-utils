import * as assert from 'assert'
import { Box, id, fromNullable, noop } from './index'

describe('Box', () => {
  it('should fold correctly', () => {
    const box = Box(5)
    assert.equal(box.fold(id), 5)
  })
  it('should map correctly', () => {
    const box = Box(5)
    assert.equal(box.map(v => v * 2).fold(id), 10)
    box
      .map(v => v + 1)
      .fold(v => {
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
    findColor('red').fold(noop, v => {
      assert.equal('#ff0000', v)
    })
  })

  it('should use Left when found redd', () => {
    findColor('redd').fold(v => {
      assert.equal('#ff0000', v)
    }, noop)
  })
})
