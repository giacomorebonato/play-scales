import {
  Box,
  Button,
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

const scales = Tonal.Scale.names().sort()
const notes = Tonal.Note.names()

type State = {
  alt: 1 | -1 | ''
  note: string
  scale: string
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
  })
  const [currentNote, setCurrentNote] = React.useState<string>(null)
  let synth: Tone.Synth<Tone.SynthOptions>

  const scale = Tonal.Scale.get(
    `${state.note}${altToSymbol(state.alt)}4 ${state.scale}`
  )

  if (process.browser) {
    synth = new Tone.Synth().toDestination()
  }

  const scaleNotes = scale.notes

  scaleNotes.push(Tonal.Note.transpose(scale.notes[0], '8M'))

  return (
    <Container>
      <Head>
        <title>play-scales</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Text fontSize='xl' as='h1'>
        Play scales
      </Text>
      <Box as='form'>
        <FormControl as='fieldset' mb='2'>
          <FormLabel>Note</FormLabel>
          <Select
            onChange={(e) => {
              setState({ ...state, note: e.target.value })
            }}
            placeholder='Select note'
            value={state.note}
          >
            {notes.map((note) => (
              <option key={note} value={note}>
                {note}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl as='fieldset' mb='2'>
          <FormLabel>Alt</FormLabel>
          <Select
            onChange={(e) => {
              const alt =
                e.target.value === '' ? '' : (parseInt(e.target.value) as any)

              setState({ ...state, alt })
            }}
            placeholder='Select alt'
            value={state.alt}
          >
            <option value=''>Natural</option>
            <option value='1'>Sharp - #</option>
            <option value='-1'>Flat - b</option>
          </Select>
        </FormControl>
        <FormControl as='fieldset' mb='2'>
          <FormLabel>Scale name</FormLabel>
          <Select
            onChange={(e) => {
              setState({ ...state, scale: e.target.value })
            }}
            placeholder='Select scale'
            value={state.scale}
          >
            {scales.map((scale) => (
              <option key={scale} value={scale}>
                {scale}
              </option>
            ))}
          </Select>
        </FormControl>

        <Button
          onClick={async () => {
            await Tone.start()

            const synthPart = new Tone.Sequence(
              (time, note) => {
                setCurrentNote(Tonal.Note.get(note).letter)

                synth.triggerAttackRelease(note, '10hz', time)
              },
              scaleNotes,
              1.5
            )
            synthPart.loop = false

            synthPart.start()
            Tone.Transport.start()
          }}
        >
          Play scale
        </Button>
      </Box>

      <DynamicMusicSheet notes={scale.notes} />

      <Flex mt='2'>
        {scaleNotes.map((note) => {
          const tonalNote = Tonal.Note.get(note)
          let alt = ''

          if (tonalNote.alt === 1) {
            alt = '#'
          } else if (tonalNote.alt === -1) {
            alt = 'b'
          }

          return (
            <Text
              padding='2'
              flex='1'
              key={note}
              textAlign='center'
              bg={currentNote === tonalNote.letter ? 'red.100' : null}
              borderRadius='md'
            >
              {tonalNote.letter}
              {alt}
            </Text>
          )
        })}
      </Flex>
    </Container>
  )
}
