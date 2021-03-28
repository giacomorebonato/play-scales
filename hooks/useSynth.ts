import React from 'react'
import { start, Synth } from 'tone'

export const useSynth = () => {
  const [synth, setSynth] = React.useState<Synth>(null)

  React.useEffect(() => {
    if (process.browser) {
      const newSynth = new Synth({
        oscillator: {
          type: 'sine',
        },
        envelope: {
          release: 0.4,
        },
      })
      setSynth(newSynth)

      newSynth.toDestination()
    }
  }, [])

  return {
    play: async (note: string) => {
      await start()
      synth.triggerAttackRelease(note, '8n')
    },
    synth,
  }
}
