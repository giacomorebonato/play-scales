import { Box } from '@chakra-ui/react'
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
import { PageView } from '../components/PageView'
import { SynthContext } from '../contexts/synth-context'
import { useScale } from '../hooks'
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
  // const ptsRef = React.createRef<HTMLDivElement>()
  let synth: Tone.Synth
  let polySynth: Tone.PolySynth

  if (process.browser && process.env.NODE_ENV !== 'test') {
    polySynth = new Tone.PolySynth(Tone.Synth, SYNTH_OPTIONS)
    synth = new Tone.Synth(SYNTH_OPTIONS)
  }

  React.useEffect(() => {
    polySynth = new Tone.PolySynth(Tone.Synth, SYNTH_OPTIONS)
    synth = new Tone.Synth(SYNTH_OPTIONS)
  }, [alt, scaleNotes, scaleName])

  // useEffect(() => {
  //   const space = new CanvasSpace(ptsRef.current)
  //   space.setup({ bgcolor: '#fff' })
  // })

  return (
    <SynthContext.Provider value={{ polySynth, synth }}>
      <PageView>
        <Head>
          <title>play-scales</title>
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <Header />
        <Box as='form'>
          <NoteSelect note={noteLetter} onChange={setNoteLetter} />
          <AltSelect alt={alt} onChange={setAlt} />
          <SimplifiedNote
            noteLetter={noteLetter}
            alt={alt}
            onChange={setSimplified}
          />
          <ScaleSelect onChange={setScaleName} value={scaleName} />
          <PlayPause notes={scaleNotes} />
        </Box>
        {/* <div ref={ptsRef} /> */}
        <MusicSheet
          notes={scaleNotes}
          onMidiCreated={(toneMidi) => {
            console.log(toneMidi)
          }}
          title={`${noteLetter}${altToSymbol(alt)} ${scaleName} scale`}
        />
        <Chords tonic={noteLetter} />
      </PageView>
    </SynthContext.Provider>
  )
}
