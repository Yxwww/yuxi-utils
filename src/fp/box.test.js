import * as assert from 'assert'
import { Box, id } from './index'

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
