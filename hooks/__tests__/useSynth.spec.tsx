import { act, renderHook } from '@testing-library/react-hooks'
import { useSynth } from '../useSynth'

let mockStart: jest.Mock<any, any>
const mockTriggerAttackRelease = jest.fn()

jest.mock('tone', () => {
  mockStart = jest.fn().mockImplementation(() => Promise.resolve())
  return {
    start: mockStart,
    PolySynth: class {
      triggerAttackRelease = mockTriggerAttackRelease
      toDestination = jest.fn()
    } as any,
    Synth: class {
      toDestination = jest.fn()
      triggerAttackRelease = mockTriggerAttackRelease
    }
  }
})

describe('useSynth', () => {
  describe('playNote()', () => {
    it('calls triggerAttackRelease', () => {
      const { result } = renderHook(() => useSynth())

      act(() => {
        result.current.playNote('c4')
      })

      expect(mockTriggerAttackRelease).toHaveBeenCalledWith('c4', '8n')
    })
  })

  describe('playChord()', () => {
    it('calls triggerAttackRelease', () => {
      const { result } = renderHook(() => useSynth())

      act(() => {
        result.current.playChord(['c'])
      })

      expect(mockTriggerAttackRelease).toHaveBeenCalledWith(
        ['c4'],
        1,
        undefined,
        0.4
      )
    })
  })
})
