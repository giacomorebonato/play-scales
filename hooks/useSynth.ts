import React from 'react'
import * as Tone from 'tone'
import { Synth } from 'tone'

export const useSynth = () => {
  const [synth, setSynth] = React.useState<Synth>(null)

  React.useEffect(() => {
    if (process.browser) {
      const newSynth = new Synth({
        oscillator: {
          type: 'amtriangle10',
          volume: 2,
        },
        envelope: {
          attack: 0.3,
          release: 0.4,
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
    synth,
  }
}
