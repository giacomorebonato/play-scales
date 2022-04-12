import React from 'react'
import * as Tone from 'tone'
import { SYNTH_OPTIONS } from '../hooks/use-synth'

export type SyntContextProps = {
  polySynth?: Tone.PolySynth
  monoSynth?: Tone.Synth
}

export const SynthContext = React.createContext<SyntContextProps>({
  polySynth: null,
  monoSynth: null
})

export const createSynths = (): SyntContextProps => {
  if (process.browser && process.env.NODE_ENV !== 'test') {
    return {
      polySynth: new Tone.PolySynth(Tone.Synth, SYNTH_OPTIONS),
      monoSynth: new Tone.Synth(SYNTH_OPTIONS)
    }
  }

  return {
    polySynth: null,
    monoSynth: null
  }
}
