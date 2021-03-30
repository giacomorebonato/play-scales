import { Box, Container } from '@chakra-ui/react'
import * as Tonal from '@tonaljs/tonal'
import Head from 'next/head'
import React from 'react'
import {
  AltSelect,
  Header,
  MusicSheet,
  NoteSelect,
  NotesRow,
  PlayPause,
  ScaleSelect,
  SimplifiedNote,
} from '../components'
import { useSynth } from '../hooks/useSynth'
import { altToSymbol } from '../lib/altToSymbol'

type State = {
  alt: 1 | -1 | ''
  noteLetter: string
  scale: string
}

export default function Home() {
  const [state, setState] = React.useState<State>({
    alt: '',
    noteLetter: 'C',
    scale: 'major',
  })
  const { currentNote, isPlaying, playSequence, stopSequence } = useSynth()
  const fullNote = `${state.noteLetter}${altToSymbol(state.alt)}`
  const scale = Tonal.Scale.get(`${fullNote}4 ${state.scale}`)
  const scaleNotes = [
    ...scale.notes,
    Tonal.Note.transpose(scale.notes[0], '8M'),
  ]
  return (
    <Container pt='4' pb='4'>
      <Head>
        <title>play-scales</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <Box as='form'>
        <NoteSelect
          isDisabled={isPlaying}
          note={state.noteLetter}
          onChange={(note) => {
            setState({ ...state, noteLetter: note })
          }}
        />
        <AltSelect
          isDisabled={isPlaying}
          alt={state.alt}
          onChange={(alt) => {
            setState({ ...state, alt })
          }}
        />
        <SimplifiedNote
          noteLetter={state.noteLetter}
          alt={state.alt}
          onChange={({ noteLetter, alt }) => {
            setState({
              ...state,
              noteLetter: noteLetter,
              alt,
            })
          }}
        />
        <ScaleSelect
          disabled={isPlaying}
          onChange={(scaleName) => {
            setState({
              ...state,
              scale: scaleName,
            })
          }}
          value={state.scale}
        />
        <PlayPause
          isPlaying={isPlaying}
          onPlay={async () => {
            await playSequence(scaleNotes)
          }}
          onPause={() => {
            stopSequence()
          }}
        />
      </Box>
      <MusicSheet notes={scale.notes} />
      <NotesRow notes={scaleNotes} currentNote={currentNote} />
    </Container>
  )
}
