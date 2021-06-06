import { Box, Flex, Text } from '@chakra-ui/layout'
import {
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack
} from '@chakra-ui/react'
import * as Tonal from '@tonaljs/tonal'
import React from 'react'
import { MdGraphicEq } from 'react-icons/md'
import { useSynth } from '../../hooks'
import { ChordsBox } from './chords-box'

type ChordsProps = {
  tonic: string
}

export const Chords: React.FC<ChordsProps> = ({ tonic }) => {
  const majorKey = Tonal.Key.majorKey(tonic)
  const minorKey = Tonal.Key.minorKey(tonic)
  const { polySynth } = useSynth()

  return (
    <Flex direction='column' mt='4'>
      <Text fontSize='large' fontWeight='bold' mb='2'>
        Chords progressions
      </Text>
      <ChordsBox title='Major key' chords={majorKey.chords} />
      <ChordsBox title='Natural minor key' chords={minorKey.natural.chords} />
      <ChordsBox title='Harmonic minor key' chords={minorKey.harmonic.chords} />
      <ChordsBox title='Melodic minor key' chords={minorKey.melodic.chords} />
      <Box p={4} mt={2}>
        <Text>Volume:</Text>
        <Slider
          aria-label='volume slider'
          defaultValue={-20}
          colorScheme='pink'
          min={-40}
          max={-10}
          step={0.05}
          onChangeEnd={(value) => {
            console.log(`volume: ${value}`)
            polySynth.volume.value = value
          }}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb boxSize={6}>
            <Box color='tomato' as={MdGraphicEq} />
          </SliderThumb>
        </Slider>
      </Box>
    </Flex>
  )
}
