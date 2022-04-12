import { Button, ButtonGroup, Icon } from '@chakra-ui/react'
import React from 'react'
import { BsPlayFill, BsStopFill } from 'react-icons/bs'
import { useSynth } from '../hooks'

type PlayPauseProps = {
  notes: string[]
}

const PlayIcon = () => <Icon as={BsPlayFill} />
const StopIcon = () => <Icon as={BsStopFill} textColor='green.200' />

export const PlayPause: React.FC<PlayPauseProps> = ({ notes }) => {
  const { isPlaying, playSequence, stopSequence } = useSynth()

  return (
    <ButtonGroup spacing='6' pb='2' display='flex'>
      <Button
        leftIcon={<PlayIcon />}
        flex='1'
        onClick={() => playSequence(notes)}
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
        onClick={stopSequence}
      >
        Stop
      </Button>
    </ButtonGroup>
  )
}
