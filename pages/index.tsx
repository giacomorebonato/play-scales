import { Box, Text } from '@chakra-ui/react'
import { Amplify } from 'aws-amplify'
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
import { PageView } from '../components/page-view'
import { SynthContext } from '../contexts/synth-context'
import { useScale } from '../hooks'
import { SYNTH_OPTIONS } from '../hooks/use-synth'
import { altToSymbol } from '../lib/altToSymbol'
import awsExports from '../src/aws-exports'

Amplify.configure({ ...awsExports, ssr: true })

export default function Home() {
  const { state, setAlt, setNoteLetter, setScale, setSimplified } = useScale()
  const { alt, scaleId, noteLetter, scaleNotes, scaleName } = state
  let synth: Tone.Synth
  let polySynth: Tone.PolySynth

  if (process.browser && process.env.NODE_ENV !== 'test') {
    polySynth = new Tone.PolySynth(Tone.Synth, SYNTH_OPTIONS)
    synth = new Tone.Synth(SYNTH_OPTIONS)
  }

  React.useEffect(() => {
    polySynth = new Tone.PolySynth(Tone.Synth, SYNTH_OPTIONS)
    synth = new Tone.Synth(SYNTH_OPTIONS)
  }, [alt, scaleNotes, scaleId])

  return (
    <SynthContext.Provider value={{ polySynth, synth }}>
      <PageView>
        <Head>
          <title>play-scales</title>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
        </Head>
        <Header />
        <Box mb={4}>
          <Text>
            play-scales is a free educational application for learning music
            scales and chords progressions.
          </Text>
        </Box>
        <Box as='form'>
          <NoteSelect note={noteLetter} onChange={setNoteLetter} />
          <AltSelect alt={alt} onChange={setAlt} />
          <SimplifiedNote
            noteLetter={noteLetter}
            alt={alt}
            onChange={setSimplified}
          />
          <ScaleSelect onChange={setScale} scaleId={scaleId} />
          <PlayPause notes={scaleNotes} />
        </Box>

        <MusicSheet
          notes={scaleNotes}
          onMidiCreated={(toneMidi) => {
            console.log('onMidiCreated', toneMidi)
          }}
          title={`${noteLetter}${altToSymbol(alt)} ${scaleName} scale`}
        />
        <Chords tonic={noteLetter} />
      </PageView>
    </SynthContext.Provider>
  )
}
