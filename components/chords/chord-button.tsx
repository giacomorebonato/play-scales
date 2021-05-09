import { Button } from '@chakra-ui/react'
import { Chord } from '@tonaljs/tonal'
import React from 'react'
import { useSynth } from '../../hooks'

type ChordButtonProps = {
  chordName: string
}

export const ChordButton: React.FC<ChordButtonProps> = ({
  children,
  chordName
}) => {
  const { attackChord, releaseChord } = useSynth()
  const notes = React.useMemo(() => {
    const { aliases, tonic } = Chord.get(chordName)
    const { notes } = Chord.getChord(aliases[0], tonic + 4)

    return notes
  }, [chordName])

  const handleRelease = React.useCallback(() => {
    releaseChord(notes)
  }, [chordName])

  const handleAttack = React.useCallback(() => {
    attackChord(notes)
  }, [chordName])

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
