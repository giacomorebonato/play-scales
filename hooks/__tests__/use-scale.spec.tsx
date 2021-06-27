import { act, renderHook } from '@testing-library/react-hooks'
import { scalesMap } from '../../lib/scales'
import { useScale } from '../use-scale'

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn()
  })
}))

describe('useScale()', () => {
  describe('setSimplified()', () => {
    it('sets alt and noteLetter', () => {
      const { result } = renderHook(() => useScale())

      act(() => {
        result.current.setSimplified({
          alt: -1,
          noteLetter: 'A'
        })
      })

      expect(result.current.state.alt).toBe(-1)
      expect(result.current.state.noteLetter).toBe('A')
    })
  })
  describe('setAlt()', () => {
    it('sets alt', () => {
      const { result } = renderHook(() => useScale())

      act(() => {
        result.current.setAlt(2)
      })

      expect(result.current.state.alt).toBe(2)
    })
  })
  describe('setNoteLetter()', () => {
    it('sets noteLetter', () => {
      const { result } = renderHook(() => useScale())

      act(() => {
        result.current.setNoteLetter('d')
      })

      expect(result.current.state.noteLetter).toBe('d')
    })
  })
  describe('setScale()', () => {
    it('sets scaleId and scaleName', () => {
      const { result } = renderHook(() => useScale())
      const scaleId = 1
      const scaleName = scalesMap.get(scaleId)

      act(() => {
        result.current.setScale({
          scaleId,
          scaleName
        })
      })

      expect(result.current.state.scaleId).toBe(scaleId)
      expect(result.current.state.scaleName).toBe(scaleName)
    })
  })
  describe('initialState on server', () => {
    it('matches', () => {
      const { result } = renderHook(() => useScale())

      expect(result.current.state.alt).toBe('')
      expect(result.current.state.noteLetter).toBe('C')
      expect(result.current.state.scaleId).toBe(49)
    })
  })
})
