import { Box, Container } from '@chakra-ui/react'
import Head from 'next/head'
import React from 'react'
import * as Tone from 'tone'
import {
  AltSelect,
  Chords,
  Header,
  MusicSheet,
  NoteSelect,
  PlayPause,
  ScaleSelect,
  SimplifiedNote
} from '../components'
import { SynthContext } from '../contexts/synth-context'
import { useScale, useSynth } from '../hooks'
import { SYNTH_OPTIONS } from '../hooks/useSynth'
import { altToSymbol } from '../lib/altToSymbol'

export default function Home() {
  const {
    state,
    setAlt,
    setNoteLetter,
    setScaleName,
    setSimplified
  } = useScale()
  const { alt, noteLetter, scaleNotes, scaleName } = state
  const { isPlaying, playSequence, stopSequence } = useSynth()
  let synth: Tone.Synth
  let polySynth: Tone.PolySynth

  if (process.browser && process.env.NODE_ENV !== 'test') {
    polySynth = new Tone.PolySynth(Tone.Synth, SYNTH_OPTIONS)
    synth = new Tone.Synth(SYNTH_OPTIONS)
  }

  return (
    <SynthContext.Provider value={{ polySynth, synth }}>
      <Container
        pt='4'
        pb='4'
        pl='2'
        pr='2'
        maxW={{ base: 'container.sm', md: 'container.md', lg: 'container.md' }}
      >
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
        <MusicSheet
          notes={scaleNotes}
          onMidiCreated={(toneMidi) => {
            console.log(toneMidi)
          }}
          title={`${noteLetter}${altToSymbol(alt)} ${scaleName} scale`}
        />
        <Chords tonic={noteLetter} />
      </Container>
    </SynthContext.Provider>
  )
}
