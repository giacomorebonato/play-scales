import { act, renderHook } from '@testing-library/react-hooks'
import { useSynth } from '../use-synth'

const mockTriggerAttackRelease = jest.fn()
const mockTriggerAttack = jest.fn()

jest.mock('react', () => {
  return {
    ...jest.requireActual('react'),
    useContext: () => ({
      polySynth: {
        toDestination: jest.fn(),
        triggerAttack: mockTriggerAttack,
        triggerAttackRelease: mockTriggerAttackRelease
      },
      synth: {
        toDestination: jest.fn(),
        triggerAttack: mockTriggerAttack,
        triggerAttackRelease: mockTriggerAttackRelease
      }
    })
  }
})

describe('useSynth()', () => {
  describe('playNote()', () => {
    it('calls triggerAttackRelease', () => {
      const { result } = renderHook(() => useSynth())

      act(() => {
        result.current.playNote('C4')
      })

      expect(mockTriggerAttackRelease).toHaveBeenCalledWith('C4', '8n')
    })
  })

  describe('playChord()', () => {
    it('calls triggerAttackRelease', () => {
      const { result } = renderHook(() => useSynth())

      act(() => {
        result.current.attackChord(['c'])
      })

      expect(mockTriggerAttackRelease).toHaveBeenCalledWith('C4', '8n')
    })
  })
})
