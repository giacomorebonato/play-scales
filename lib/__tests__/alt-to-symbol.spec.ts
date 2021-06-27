import { altToSymbol } from '../alt-utils'

describe('altToSymbol()', () => {
  it('converts alteration value to the right symbol', () => {
    expect(altToSymbol('')).toBe('')
    expect(altToSymbol(1)).toBe('#')
    expect(altToSymbol(2)).toBe('##')
    expect(altToSymbol(-2)).toBe('bb')
    expect(altToSymbol(-1)).toBe('b')
  })
})
