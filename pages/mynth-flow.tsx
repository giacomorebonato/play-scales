import { Box } from '@chakra-ui/react'
import { Amplify } from 'aws-amplify'
import Head from 'next/head'
import React from 'react'
import { Header } from '../components'
import { MynthFlow as MynthFlowSynth } from '../components/mynth-flow'
import { PageView } from '../components/page-view'
import { createSynths, SynthContext } from '../contexts/synth-context'
import awsExports from '../lib/aws-exports'

Amplify.configure({ ...awsExports, ssr: true })

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
        <Box w='100%' h='500'>
          <MynthFlowSynth />
        </Box>
      </PageView>
    </SynthContext.Provider>
  )
}
