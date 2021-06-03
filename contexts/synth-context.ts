import React from 'react'
import * as Tone from 'tone'

export type SyntContextProps = {
  polySynth?: Tone.PolySynth
  monoSynth?: Tone.Synth
}

export const SynthContext = React.createContext<SyntContextProps>({
  polySynth: null,
  monoSynth: null
})
