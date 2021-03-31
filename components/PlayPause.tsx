import { Button, ButtonGroup } from '@chakra-ui/react'
import React from 'react'

type PlayPauseProps = {
  isPlaying: boolean
  onPlay(): void
  onPause(): void
}

export const PlayPause: React.FC<PlayPauseProps> = ({
  isPlaying,
  onPlay,
  onPause
}) => {
  return (
    <ButtonGroup spacing='6' pb='2' display='flex'>
      <Button
        flex='1'
        onClick={onPlay}
        colorScheme='pink'
        variant='solid'
        disabled={isPlaying}
      >
        Play
      </Button>

      <Button
        flex='1'
        colorScheme='pink'
        variant='outline'
        disabled={!isPlaying}
        onClick={onPause}
      >
        Stop
      </Button>
    </ButtonGroup>
  )
}
