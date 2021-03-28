import {
  Box,
  Button,
  ButtonGroup,
  Container,
  FormControl,
  FormLabel,
  Select,
  Text,
} from '@chakra-ui/react'
import * as Tonal from '@tonaljs/tonal'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import React from 'react'
import * as Tone from 'tone'
import { NotesRow } from '../components/NotesRow'

const scales = Tonal.Scale.names().sort()
const notes = Tonal.Note.names()

type State = {
  alt: 1 | -1 | ''
  note: string
  scale: string
  isPlaying: boolean
}

const altToSymbol = (alt: '' | -1 | 1) => {
  switch (alt) {
    case '':
      return ''
    case 1:
      return '#'
    case -1:
      return 'b'
  }
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
  let synth: Tone.Synth<Tone.SynthOptions>

  const scale = Tonal.Scale.get(
    `${state.note}${altToSymbol(state.alt)}4 ${state.scale}`
  )

  if (process.browser) {
    synth = new Tone.Synth()
    synth.oscillator.type = 'sine'

    synth.toDestination()
  }

  const scaleNotes = scale.notes

  scaleNotes.push(Tonal.Note.transpose(scale.notes[0], '8M'))

  return (
    <Container>
      <Head>
        <title>play-scales</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Text fontSize='2xl' as='h1' mb='4'>
        Play scales
      </Text>
      <Box as='form'>
        <FormControl as='fieldset' mb='4'>
          <FormLabel>Root note</FormLabel>
          <Select
            onChange={(e) => {
              setState({ ...state, note: e.target.value })
            }}
            value={state.note}
          >
            {notes.map((note) => (
              <option key={note} value={note}>
                {note}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl as='fieldset' mb='4'>
          <FormLabel>Alteration</FormLabel>
          <Select
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
        <FormControl as='fieldset' mb='4'>
          <FormLabel>Scale name</FormLabel>
          <Select
            onChange={(e) => {
              setState({ ...state, scale: e.target.value })
            }}
            value={state.scale}
          >
            {scales.map((scale) => (
              <option key={scale} value={scale}>
                {scale}
              </option>
            ))}
          </Select>
        </FormControl>

        <ButtonGroup spacing='6' display='flex'>
          <Button
            flex='1'
            onClick={async () => {
              await Tone.start()

              const synthPart = new Tone.Sequence(
                (time, note) => {
                  if (note === 'end') {
                    setCurrentNote(null)
                    synthPart.stop()
                    setState({ ...state, isPlaying: false })
                    Tone.Transport.stop()

                    return
                  }

                  setCurrentNote(Tonal.Note.get(note).name)

                  synth.triggerAttackRelease(note, '10hz', time)
                },
                [...scaleNotes, 'end'],
                1.5
              )
              synthPart.loop = false

              setState({ ...state, isPlaying: true })

              synthPart.start()
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
              setCurrentNote(null)
              setState({ ...state, isPlaying: false })
              Tone.Transport.stop()
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
