import * as assert from 'assert'
import { createStateControll } from './index'

describe('createStateControll', () => {
  it('should create state controller without throwing ', () => {
    const initialState = { initial: 'state' }
    assert.deepEqual(createStateControll(initialState).getState(), initialState)
  })
})
