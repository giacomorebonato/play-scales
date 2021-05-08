import * as Tonal from '@tonaljs/tonal'
import { Note } from '@tonaljs/tonal'
import { Midi as ToneMidi } from '@tonejs/midi'
import React from 'react'
import * as Tone from 'tone'
import { RecursivePartial } from 'tone/build/esm/core/util/Interface'
import { SynthContext } from '../contexts/synth-context'

const toneStart = async () => {
  await Tone.start()

  document.querySelectorAll('button').forEach((button) => {
    button.removeEventListener('click', toneStart)
  })
}

export const SYNTH_OPTIONS: RecursivePartial<Tone.SynthOptions> = {
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
  const { synth, polySynth } = React.useContext(SynthContext)
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [currentNote, setCurrentNote] = React.useState<string>()
  const sequence = React.useRef<Tone.Sequence<string>>()

  const init = React.useCallback(() => {
    polySynth.toDestination()
    synth.toDestination()
  }, [synth, polySynth])

  React.useEffect(() => {
    init()
  }, [synth, polySynth])

  // const sound = Sound.from(synth, synth.context).analyze(128)

  React.useEffect(() => {
    if (!polySynth || !synth) return

    init()

    document.querySelectorAll('button').forEach((button) => {
      button.addEventListener('click', toneStart)
    })
  }, [])

  const stopSequence = React.useCallback(() => {
    sequence.current.stop()
    sequence.current.clear()

    setIsPlaying(false)
    Tone.Transport.stop()
  }, [])

  const playNote = React.useCallback(
    (note: string) => {
      synth.triggerAttackRelease(Note.simplify(note), '8n')
    },
    [synth]
  )

  return {
    currentNote,
    isPlaying,
    playNote,
    releaseChord: (notes: string[]) => {
      polySynth.triggerRelease(notes)
    },
    attackChord: (notes: string[]) => {
      polySynth.triggerAttack(notes)
    },
    setVolume: (volume: number) => {
      polySynth.volume.value = volume
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
    playSequence: (notes: string[]) => {
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
    polySynth,
    synth,
    init
  }
}
