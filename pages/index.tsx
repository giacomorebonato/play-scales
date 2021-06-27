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
  SimplifiedNote,
  Waveform
} from '../components'
import { PageView } from '../components/page-view'
import { SyntContextProps, SynthContext } from '../contexts/synth-context'
import { useScale } from '../hooks'
import { SYNTH_OPTIONS } from '../hooks/use-synth'
import { altToSymbol } from '../lib/alt-utils'
import awsExports from '../lib/aws-exports'

Amplify.configure({ ...awsExports, ssr: true })

const createSynths = (): SyntContextProps => {
  if (process.browser && process.env.NODE_ENV !== 'test') {
    return {
      polySynth: new Tone.PolySynth(Tone.Synth, SYNTH_OPTIONS),
      monoSynth: new Tone.Synth(SYNTH_OPTIONS)
    }
  }

  return {
    polySynth: null,
    monoSynth: null
  }
}

export default function Home() {
  const { state, setAlt, setNoteLetter, setScale, setSimplified } = useScale()
  const { alt, scaleId, noteLetter, scaleNotes, scaleName } = state
  const synths = createSynths()

  return (
    <SynthContext.Provider value={synths}>
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
        <Waveform />
      </PageView>
    </SynthContext.Provider>
  )
}
