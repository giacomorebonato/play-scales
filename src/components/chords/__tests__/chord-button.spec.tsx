import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import { ChordButton } from '../chord-button'

const mockAttack = jest.fn()
const mockRelease = jest.fn()

jest.mock('../../../hooks', () => ({
  useSynth: () => ({
    attackChord: mockAttack,
    releaseChord: mockRelease
  })
}))

describe('<ChordButton />', () => {
  it('handles attack and release', () => {
    const r = render(<ChordButton chordName='Cmaj7' />)

    expect(r.getByText(/Cmaj7/g)).toBeInTheDocument()

    const chordButton = r.getByTestId('chord-button')

    fireEvent.mouseDown(chordButton)

    expect(mockAttack).toHaveBeenCalledWith(['C4', 'E4', 'G4', 'B4'])
    expect(mockRelease).not.toHaveBeenCalled()

    fireEvent.mouseUp(chordButton)

    expect(mockRelease).toHaveBeenCalledWith(['C4', 'E4', 'G4', 'B4'])
  })
})
