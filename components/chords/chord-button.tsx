import { Button } from '@chakra-ui/react'
import React from 'react'
import { useSynth } from '../../hooks'

type ChordButtonProps = {
  notes: string[]
}

export const ChordButton: React.FC<ChordButtonProps> = ({
  children,
  notes
}) => {
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
