import { Amplify } from 'aws-amplify'
import Head from 'next/head'
import React from 'react'
import * as Tone from 'tone'
import { Header } from '../components'
import { PageView } from '../components/page-view'
import { SyntContextProps, SynthContext } from '../contexts/synth-context'
import { SYNTH_OPTIONS } from '../hooks/use-synth'
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

export default function MynthFlow() {
  const synths = createSynths()

  return (
    <SynthContext.Provider value={synths}>
      <PageView>
        <Head>
          <title>play-scales - mynth-flow</title>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
        </Head>
        <Header />
      </PageView>
    </SynthContext.Provider>
  )
}
