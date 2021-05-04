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
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  UnorderedList
} from '@chakra-ui/react'
import * as Tonal from '@tonaljs/tonal'
import React from 'react'
import { BsInfoCircle } from 'react-icons/bs'
import { MdGraphicEq } from 'react-icons/md'
import { useSynth } from '../hooks'

type ChordsProps = {
  tonic: string
}

type ChordsBoxProps = {
  title: string
  chords: readonly string[]
}

type ChordButtonProps = {
  notes: string[]
}

const InfoIcon = () => <Icon as={BsInfoCircle} />

const ChordButton: React.FC<ChordButtonProps> = ({ children, notes }) => {
  const { attackChord, releaseChord } = useSynth()
  const handleRelease = React.useCallback(
    (e) => {
      e.preventDefault()
      releaseChord(notes)
    },
    [notes]
  )

  const handleAttack = React.useCallback(
    (e) => {
      e.preventDefault()
      attackChord(notes)
    },
    [notes]
  )

  return (
    <Button
      flex={2}
      colorScheme='pink'
      variant='solid'
      onTouchStart={handleAttack}
      onTouchEnd={handleRelease}
      onMouseUp={handleRelease}
      onMouseDown={handleAttack}
      fontSize='xs'
      pl='0'
      pr='0'
      textOverflow='ellipsis'
    >
      {children}
    </Button>
  )
}

const ChordsBox: React.FC<ChordsBoxProps> = ({ chords, title }) => {
  return (
    <Box mt='2' mb='2'>
      <Text fontWeight='bold' mb='2' unselectable='on'>
        {title}
      </Text>
      <Grid
        templateColumns={{
          base: 'repeat(3, 1fr)',
          sm: 'repeat(4, 1fr)',
          md: 'repeat(7, 1fr)'
        }}
        gap={2}
      >
        {chords.map((chord) => {
          const data = Tonal.Chord.get(chord)
          const notes = data.notes.map((note) => `${note}4`)

          return (
            <ButtonGroup
              size='sm'
              isAttached
              variant='outline'
              w='100%'
              key={`${title}-${chord}`}
              unselectable='on'
            >
              <ChordButton notes={notes}>{chord}</ChordButton>
              <Popover>
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
        <Slider
          aria-label='volume slider'
          defaultValue={0}
          colorScheme='pink'
          min={-7}
          max={10}
          step={0.1}
          onChangeEnd={(value) => {
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
