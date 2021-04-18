import { Button, ButtonGroup, Icon } from '@chakra-ui/react'
import React from 'react'
import { BsPlayFill, BsStopFill } from 'react-icons/bs'

type PlayPauseProps = {
  isPlaying: boolean
  onPlay(): void
  onPause(): void
}

const PlayIcon = () => <Icon as={BsPlayFill} />
const StopIcon = () => <Icon as={BsStopFill} textColor='green.200' />

export const PlayPause: React.FC<PlayPauseProps> = ({
  isPlaying,
  onPlay,
  onPause
}) => {
  return (
    <ButtonGroup spacing='6' pb='2' display='flex'>
      <Button
        leftIcon={<PlayIcon />}
        flex='1'
        onClick={onPlay}
        colorScheme='pink'
        variant='solid'
        disabled={isPlaying}
      >
        Play
      </Button>
      <Button
        leftIcon={<StopIcon />}
        flex='1'
        colorScheme='teal'
        disabled={!isPlaying}
        onClick={onPause}
      >
        Stop
      </Button>
    </ButtonGroup>
  )
}
