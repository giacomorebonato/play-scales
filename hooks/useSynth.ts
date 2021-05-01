import * as Tonal from '@tonaljs/tonal'
import { Note } from '@tonaljs/tonal'
import { Midi as ToneMidi } from '@tonejs/midi'
import React from 'react'
import * as Tone from 'tone'
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
  const [synth, setSynth] = React.useState<Tone.Synth>(null)
  const [polySynth, setPolySynth] = React.useState<Tone.PolySynth>(null)
  const sequence = React.useRef<Tone.Sequence<string>>()

  React.useEffect(() => {
    if (!process.browser && process.env.NODE_ENV !== 'test') return

    const newSynth = new Tone.Synth(SYNTH_OPTIONS)
    setSynth(newSynth)
    const polySynth = new Tone.PolySynth(Tone.Synth, SYNTH_OPTIONS)
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
    synth.triggerAttackRelease(Note.simplify(note), '8n')
  }

  return {
    currentNote,
    isPlaying,
    playNote,
    playChord: async (notes: string[]) => {
      const mappedNotes = notes.map((note) => `${note}4`)

      polySynth.triggerAttackRelease(mappedNotes, 1, undefined, 0.4)
    },
    playMidi: (currentMidi: ToneMidi) => {
      const now = Tone.now() + 0.5
      const synths: Tone.PolySynth[] = []

      currentMidi.tracks.forEach((track) => {
        const synth = new Tone.PolySynth(Tone.Synth, {
          envelope: SYNTH_OPTIONS.envelope
        }).toDestination()

        synth.debug = true

        synths.push(synth)

        track.notes.forEach((note) => {
          synth.triggerAttackRelease(
            note.name,
            note.duration,
            note.time + now,
            note.velocity
          )
        })
      })
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
