import { isOfType } from './guard'
import * as assert from 'assert'

describe('isOfType', () => {
  it('should check union types', () => {
    enum UnionTypes {
      typeA = 'typeA',
      typeB = 'typeB',
    }
    interface TypeA {
      type: UnionTypes.typeA
      propForA: string
    }
    interface TypeB {
      type: UnionTypes.typeB
      propForA: string
    }
    type TestUnion = TypeA | TypeB
    const instance = { propForA: 'sup' } as TestUnion
    const result = isOfType<TypeA>(instance, 'propForA')
      ? instance.propForA
      : 'not TypeA'
    assert.equal(result, 'sup')
  })
})
