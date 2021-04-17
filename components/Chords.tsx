import { Box, Flex, Grid, Text } from '@chakra-ui/layout'
import {
  Button,
  ListItem,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  UnorderedList
} from '@chakra-ui/react'
import * as Tonal from '@tonaljs/tonal'
import React from 'react'
import { useSynth } from '../hooks'

type ChordsProps = {
  tonic: string
}

type ChordsBoxProps = {
  title: string
  chords: readonly string[]
}

const ChordsBox: React.FC<ChordsBoxProps> = ({ chords, title }) => {
  const { playChord } = useSynth()

  return (
    <Box mt='2' mb='2'>
      <Text fontWeight='bold' mb='2'>
        {title}
      </Text>
      <Grid
        templateColumns={{
          base: 'repeat(4, 1fr)',
          md: 'repeat(7, 1fr)'
        }}
        gap={2}
      >
        {chords.map((chord) => {
          const data = Tonal.Chord.get(chord)

          return (
            <Popover key={`${title}-${chord}`}>
              <PopoverTrigger>
                <Button
                  colorScheme='pink'
                  variant='outline'
                  flex='1'
                  textAlign='center'
                  padding='1'
                  fontSize='sm'
                >
                  {chord}
                </Button>
              </PopoverTrigger>
              <PopoverContent ml='1' mr='2'>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader fontWeight='bold'>{data.name}</PopoverHeader>
                <PopoverBody>
                  <UnorderedList styleType='none' ml='0'>
                    <ListItem>
                      <Text fontWeight='bold' display='inline'>
                        Notes:{' '}
                      </Text>{' '}
                      {data.notes.join(' - ')}
                    </ListItem>
                    <ListItem>
                      <Text fontWeight='bold' display='inline'>
                        Aliases:
                      </Text>{' '}
                      {data.aliases.filter((a) => !!a).join(' - ')}
                    </ListItem>
                  </UnorderedList>
                </PopoverBody>
                <PopoverFooter>
                  <Button
                    onClick={() => {
                      playChord(data.notes)
                    }}
                  >
                    Play
                  </Button>
                </PopoverFooter>
              </PopoverContent>
            </Popover>
          )
        })}
      </Grid>
    </Box>
  )
}

export const Chords: React.FC<ChordsProps> = ({ tonic }) => {
  const majorKey = Tonal.Key.majorKey(tonic)
  const minorKey = Tonal.Key.minorKey(tonic)

  return (
    <Flex direction='column' mt='4'>
      <Text fontSize='large' fontWeight='bold' mb='2'>
        Chords progressions
      </Text>
      <ChordsBox title='Major key' chords={majorKey.chords} />
      <ChordsBox title='Natural minor key' chords={minorKey.natural.chords} />
      <ChordsBox title='Harmonic minor key' chords={minorKey.harmonic.chords} />
      <ChordsBox title='Melodic minor key' chords={minorKey.melodic.chords} />
    </Flex>
  )
}
