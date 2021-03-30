import {
  Box,
  Button,
  ButtonGroup,
  Container,
  FormControl,
  FormLabel,
  Select,
} from '@chakra-ui/react'
import * as Tonal from '@tonaljs/tonal'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import React from 'react'
import * as Tone from 'tone'
import {
  Header,
  NoteSelect,
  NotesRow,
  ScaleSelect,
  SimplifiedNote,
} from '../components'
import { useSynth } from '../hooks/useSynth'
import { altToSymbol } from '../lib/altToSymbol'

type State = {
  alt: 1 | -1 | ''
  note: string
  scale: string
  isPlaying: boolean
}

const DynamicMusicSheet = dynamic(
  () => import('../components/MusicSheet').then((mod) => mod.MusicSheet),
  {
    ssr: false,
  }
)

export default function Home() {
  const [state, setState] = React.useState<State>({
    alt: '',
    note: 'C',
    scale: 'major',
    isPlaying: false,
  })
  const [currentNote, setCurrentNote] = React.useState<string>(null)
  const { play } = useSynth()

  const fullNote = `${state.note}${altToSymbol(state.alt)}`
  const scale = Tonal.Scale.get(`${fullNote}4 ${state.scale}`)

  const stopSequence = () => {
    setCurrentNote(null)

    sequence.current.stop()
    sequence.current.clear()
    setState({ ...state, isPlaying: false })
    Tone.Transport.stop()
  }

  const scaleNotes = [
    ...scale.notes,
    Tonal.Note.transpose(scale.notes[0], '8M'),
  ]

  const sequence = React.useRef<Tone.Sequence<string>>()

  return (
    <Container pt='4' pb='4'>
      <Head>
        <title>play-scales</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header />

      <Box as='form'>
        <NoteSelect
          isDisabled={state.isPlaying}
          note={state.note}
          onChange={(note) => {
            setState({ ...state, note: note })
          }}
        />
        <FormControl as='fieldset' mb='4'>
          <FormLabel>Alteration</FormLabel>
          <Select
            disabled={state.isPlaying}
            onChange={(e) => {
              const alt =
                e.target.value === 'natural'
                  ? ''
                  : (parseInt(e.target.value) as any)

              setState({ ...state, alt })
            }}
            value={state.alt || 'natural'}
          >
            <option value='natural'>Natural</option>
            <option value='1'>Sharp - #</option>
            <option value='-1'>Flat - b</option>
          </Select>
        </FormControl>

        <SimplifiedNote
          noteLetter={state.note}
          alt={state.alt}
          onChange={({ noteLetter, alt }) => {
            setState({
              ...state,
              note: noteLetter,
              alt,
            })
          }}
        />

        <ScaleSelect
          disabled={state.isPlaying}
          onChange={(scaleName) => {
            setState({
              ...state,
              scale: scaleName,
            })
          }}
          value={state.scale}
        />
        <ButtonGroup spacing='6' pb='2' display='flex'>
          <Button
            flex='1'
            onClick={async () => {
              await Tone.start()
              sequence.current = new Tone.Sequence(
                (time, note) => {
                  if (note === 'end') {
                    stopSequence()

                    return
                  }

                  setCurrentNote(Tonal.Note.get(note).name)
                  play(note)
                },
                [...scaleNotes, 'end'],
                1.2
              )

              sequence.current.loop = false

              setState({ ...state, isPlaying: true })

              sequence.current.start()
              Tone.Transport.start()
            }}
            colorScheme='pink'
            variant='solid'
            disabled={state.isPlaying}
          >
            Play
          </Button>

          <Button
            flex='1'
            colorScheme='pink'
            variant='outline'
            disabled={!state.isPlaying}
            onClick={() => {
              stopSequence()
            }}
          >
            Stop
          </Button>
        </ButtonGroup>
      </Box>

      <DynamicMusicSheet notes={scale.notes} />

      <NotesRow notes={scaleNotes} currentNote={currentNote} />
    </Container>
  )
}
