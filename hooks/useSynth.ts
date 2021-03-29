import React from 'react'
import * as Tone from 'tone'
import { Synth } from 'tone'

export const useSynth = () => {
  const [synth, setSynth] = React.useState<Synth>(null)
  const [currentNote, setCurrentNote] = React.useState<string>()

  React.useEffect(() => {
    if (process.browser) {
      const newSynth = new Synth({
        oscillator: {
          type: 'triangle8',
          volume: 2,
        },
        envelope: {
          attack: 2,
          decay: 1,
          sustain: 0.4,
          release: 4,
        },
      })
      setSynth(newSynth)

      newSynth.toDestination()
    }
  }, [])

  return {
    play: async (note: string) => {
      await Tone.start()
      synth.triggerAttackRelease(note, '8n')
    },
    playSequence: () => {},
    synth,
  }
}
