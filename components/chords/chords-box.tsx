import { Box, ButtonGroup, Grid, Text } from '@chakra-ui/react'
import * as Tonal from '@tonaljs/tonal'
import React from 'react'
import { ChordButton } from './chord-button'
import { ChordPopover } from './chord-popover'

type ChordsBoxProps = {
  title: string
  chords: readonly string[]
}

export const ChordsBox: React.FC<ChordsBoxProps> = ({ chords, title }) => {
  return (
    <Box mt='2' mb='2'>
      <Text fontWeight='bold' mb='2' userSelect='none'>
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
        {chords.map((chord, i) => {
          const data = Tonal.Chord.get(chord)
          return (
            <ButtonGroup
              size='sm'
              isAttached
              variant='outline'
              key={`${title}-${chord}`}
            >
              <ChordButton chordName={chord}>{chord}</ChordButton>
              <ChordPopover chord={data} />
            </ButtonGroup>
          )
        })}
      </Grid>
    </Box>
  )
}
