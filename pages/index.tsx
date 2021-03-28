import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
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
import { MyLink } from '../components/MyLink'
import { NotesRow } from '../components/NotesRow'
import { ScaleSelect } from '../components/ScaleSelect'
import { useSynth } from '../hooks/useSynth'

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
  const { play } = useSynth()

  const scale = Tonal.Scale.get(
    `${state.note}${altToSymbol(state.alt)}4 ${state.scale}`
  )

  const stopSequence = () => {
    setCurrentNote(null)

    sequence.current.stop()
    sequence.current.clear()
    setState({ ...state, isPlaying: false })
    Tone.Transport.stop()
  }

  const scaleNotes = scale.notes

  scaleNotes.push(Tonal.Note.transpose(scale.notes[0], '8M'))

  const sequence = React.useRef<Tone.Sequence<string>>()

  return (
    <Container pt='4' pb='4'>
      <Head>
        <title>play-scales</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Flex flexDirection='row' alignItems='center'>
        <Text
          fontWeight='bold'
          fontSize='2xl'
          as='h1'
          mb='4'
          color='pink.300'
          flex='1'
        >
          Play scales
        </Text>

        <Box>
          <MyLink href='https://github.com/giacomorebonato/play-scales'>
            GitHub
          </MyLink>{' '}
          | <MyLink href='http://giacomorebonato.com/'>Giacomo Rebonato</MyLink>
        </Box>
      </Flex>

      <Box as='form'>
        <FormControl as='fieldset' mb='4'>
          <FormLabel>Root note</FormLabel>
          <Select
            disabled={state.isPlaying}
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
        <ButtonGroup spacing='6' display='flex'>
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
