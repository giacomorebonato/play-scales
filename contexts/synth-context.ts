import React from 'react'
import * as Tone from 'tone'

type SyntContextProps = {
  polySynth: Tone.PolySynth
  synth: Tone.Synth
}

export const SynthContext = React.createContext<SyntContextProps>({
  polySynth: null,
  synth: null
})
