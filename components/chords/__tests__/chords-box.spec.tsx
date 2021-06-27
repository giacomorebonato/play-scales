import { render } from '@testing-library/react'
import React from 'react'
import { ChordsBox } from '../chords-box'

describe('<ChordsBox />', () => {
  it('renders chords', async () => {
    const chords = ['C', 'B', 'D']
    const r = render(<ChordsBox title='chords title' chords={chords} />)

    expect(r.queryByText(/chords title/g)).toBeInTheDocument()

    const chordButtons = await r.getAllByTestId('chord-button')

    expect(chordButtons.length).toBe(3)
  })
})
