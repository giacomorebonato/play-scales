import { Box, Flex, Grid, Text } from '@chakra-ui/layout'
import {
  Button,
  ButtonGroup,
  Icon,
  IconButton,
  ListItem,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  UnorderedList
} from '@chakra-ui/react'
import * as Tonal from '@tonaljs/tonal'
import React from 'react'
import { BsInfoCircle } from 'react-icons/bs'
import { useSynth } from '../hooks'

type ChordsProps = {
  tonic: string
}

type ChordsBoxProps = {
  title: string
  chords: readonly string[]
}

const InfoIcon = () => <Icon as={BsInfoCircle} />

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
            // eslint-disable-next-line react/jsx-key
            <ButtonGroup size='sm' isAttached variant='outline' w='100%'>
              <Button
                flex={2}
                colorScheme='pink'
                variant='solid'
                mr='-px'
                onClick={() => {
                  playChord(data.notes)
                }}
                fontSize='xs'
              >
                {chord}
              </Button>
              <Popover key={`${title}-${chord}`}>
                <PopoverTrigger>
                  <IconButton
                    flex={1}
                    variant='solid'
                    aria-label={`Information for chord ${chord}`}
                    icon={<InfoIcon />}
                    colorScheme='teal'
                  />
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
                </PopoverContent>
              </Popover>
            </ButtonGroup>
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
