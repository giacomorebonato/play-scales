import * as Tonal from '@tonaljs/tonal'
import React from 'react'
import * as Tone from 'tone'
import { PolySynth, Synth } from 'tone'
import { RecursivePartial } from 'tone/build/esm/core/util/Interface'

const toneStart = async () => {
  await Tone.start()

  document.querySelectorAll('button').forEach((button) => {
    button.removeEventListener('click', toneStart)
  })
}

const SYNTH_OPTIONS: RecursivePartial<Tone.SynthOptions> = {
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
}

export const useSynth = () => {
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [currentNote, setCurrentNote] = React.useState<string>()
  const [synth, setSynth] = React.useState<Synth>(null)
  const [polySynth, setPolySynth] = React.useState<PolySynth>(null)
  const sequence = React.useRef<Tone.Sequence<string>>()

  React.useEffect(() => {
    if (!process.browser) return

    const newSynth = new Synth(SYNTH_OPTIONS)
    setSynth(newSynth)
    const polySynth = new PolySynth(Synth, SYNTH_OPTIONS)
    setPolySynth(polySynth)

    polySynth.toDestination()
    newSynth.toDestination()

    document.querySelectorAll('button').forEach((button) => {
      button.addEventListener('click', toneStart)
    })
  }, [])

  const stopSequence = () => {
    sequence.current.stop()
    sequence.current.clear()

    setIsPlaying(false)
    Tone.Transport.stop()
  }
  const playNote = async (note: string) => {
    synth.triggerAttackRelease(note, '8n')
  }

  return {
    currentNote,
    isPlaying,
    play: playNote,
    playChord: async (notes: string[]) => {
      const mappedNotes = notes.map((note) => `${note}4`)

      polySynth.triggerAttackRelease(mappedNotes, 1, undefined, 0.4)
    },
    playSequence: async (notes: string[]) => {
      sequence.current = new Tone.Sequence(
        (time, note) => {
          if (note === 'end') {
            stopSequence()

            return
          }
          const currentNote = Tonal.Note.get(note).name

          setCurrentNote(currentNote)
          playNote(note)
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
