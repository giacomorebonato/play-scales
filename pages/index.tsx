import { Box, Container } from '@chakra-ui/react'
import Head from 'next/head'
import React from 'react'
import {
  AltSelect,
  Chords,
  Header,
  MusicSheet,
  NoteSelect,
  NotesRow,
  PlayPause,
  ScaleSelect,
  SimplifiedNote,
} from '../components'
import { useScale, useSynth } from '../hooks'

export default function Home() {
  const {
    state,
    setAlt,
    setNoteLetter,
    setScaleName,
    setSimplified,
  } = useScale()
  const { alt, noteLetter, scaleNotes, scaleName } = state
  const { currentNote, isPlaying, playSequence, stopSequence } = useSynth()

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
          note={noteLetter}
          onChange={setNoteLetter}
        />
        <AltSelect isDisabled={isPlaying} alt={alt} onChange={setAlt} />
        <SimplifiedNote
          noteLetter={noteLetter}
          alt={alt}
          onChange={setSimplified}
        />
        <ScaleSelect
          disabled={isPlaying}
          onChange={setScaleName}
          value={scaleName}
        />
        <PlayPause
          isPlaying={isPlaying}
          onPlay={async () => {
            await playSequence(scaleNotes)
          }}
          onPause={stopSequence}
        />
      </Box>
      <MusicSheet notes={scaleNotes} />
      <NotesRow notes={scaleNotes} currentNote={currentNote} />
      <Chords tonic={noteLetter} />
    </Container>
  )
}
