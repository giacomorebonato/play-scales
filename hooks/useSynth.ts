import * as Tonal from '@tonaljs/tonal'
import React from 'react'
import * as Tone from 'tone'
import { Synth } from 'tone'

export const useSynth = () => {
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [currentNote, setCurrentNote] = React.useState<string>()
  const [synth, setSynth] = React.useState<Synth>(null)
  const sequence = React.useRef<Tone.Sequence<string>>()

  React.useEffect(() => {
    if (process.browser) {
      const newSynth = new Synth({
        oscillator: {
          type: 'triangle8',
          volume: 2
        },
        envelope: {
          attack: 2,
          decay: 1,
          sustain: 0.4,
          release: 4
        }
      })
      setSynth(newSynth)

      newSynth.toDestination()
    }
  }, [])

  const stopSequence = () => {
    sequence.current.stop()
    sequence.current.clear()

    setIsPlaying(false)
    Tone.Transport.stop()
  }
  const play = async (note: string) => {
    await Tone.start()
    synth.triggerAttackRelease(note, '8n')
  }

  return {
    currentNote,
    isPlaying,
    play,
    playSequence: async (notes: string[]) => {
      await Tone.start()
      sequence.current = new Tone.Sequence(
        (time, note) => {
          if (note === 'end') {
            stopSequence()

            return
          }
          const currentNote = Tonal.Note.get(note).name

          setCurrentNote(currentNote)
          play(note)
        },
        [...notes, 'end'],
        1.2
      )

      sequence.current.loop = false

      setIsPlaying(true)
      sequence.current.start()
      Tone.Transport.start()
    },
    stopSequence,
    synth
  }
}
