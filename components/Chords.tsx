import { Box, Flex, Text } from '@chakra-ui/layout'
import * as Tonal from '@tonaljs/tonal'
import React from 'react'

type ChordsProps = {
  tonic: string
}

type ChordsBoxProps = {
  title: string
  chords: readonly string[]
}

const ChordsBox: React.FC<ChordsBoxProps> = ({ chords, title }) => (
  <Box mt='2' mb='2'>
    <Text fontWeight='bold' mb='1'>
      {title}
    </Text>
    <Flex direction='row'>
      {chords.map((chord) => (
        <Box flex='1' key={`${title}-${chord}`}>
          {chord}
        </Box>
      ))}
    </Flex>
  </Box>
)

export const Chords: React.FC<ChordsProps> = ({ tonic }) => {
  const majorKey = Tonal.Key.majorKey(tonic)
  const minorKey = Tonal.Key.minorKey(tonic)

  return (
    <Flex direction='column' mt='4'>
      <Text fontSize='large' fontWeight='bold'>
        Chords progressions
      </Text>
      <ChordsBox title='Major key' chords={majorKey.chords} />
      <ChordsBox title='Natural minor key' chords={minorKey.natural.chords} />
      <ChordsBox title='Harmonic minor key' chords={minorKey.harmonic.chords} />
      <ChordsBox title='Melodic minor key' chords={minorKey.melodic.chords} />
    </Flex>
  )
}
