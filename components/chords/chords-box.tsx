import {
  Box,
  ButtonGroup,
  Grid,
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
  Text,
  UnorderedList
} from '@chakra-ui/react'
import * as Tonal from '@tonaljs/tonal'
import React from 'react'
import { BsInfoCircle } from 'react-icons/bs'
import { ChordButton } from './chord-button'

type ChordsBoxProps = {
  title: string
  chords: readonly string[]
}

const InfoIcon = () => <Icon as={BsInfoCircle} />

export const ChordsBox: React.FC<ChordsBoxProps> = ({ chords, title }) => {
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
