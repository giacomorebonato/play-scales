import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Select,
  useBoolean
} from '@chakra-ui/react'
import { Scale } from '@tonaljs/tonal'
import React from 'react'
import { useSynth } from '../hooks'

type ScaleSelectProps = {
  onChange: (scaleName: string) => void
  value: string
}

const scales = Scale.names().sort()
const mainScales = scales.filter((scale) =>
  [
    'major',
    'harmonic minor',
    'melodic minor',
    'major pentatonic',
    'minor pentatonic'
  ].includes(scale)
)

export const ScaleSelect: React.FC<ScaleSelectProps> = ({
  onChange,
  value
}) => {
  const { isPlaying } = useSynth()
  const [showAllScales, setShowAllScales] = useBoolean(false)

  return (
    <FormControl as='fieldset' mb='4'>
      <FormLabel>Scale name</FormLabel>
      <Flex dir='row'>
        <Select
          flex={2}
          disabled={isPlaying}
          onChange={(e) => {
            onChange(e.target.value)
          }}
          mr={4}
          value={value}
        >
          {(showAllScales ? scales : mainScales).map((scale) => (
            <option key={scale} value={scale}>
              {scale}
            </option>
          ))}
        </Select>
        <Button onClick={setShowAllScales.toggle} flex={1} fontSize='sm'>
          {showAllScales ? 'Basic' : 'Advanced'}
        </Button>
      </Flex>
    </FormControl>
  )
}
