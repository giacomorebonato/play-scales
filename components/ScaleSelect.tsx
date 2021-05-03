import { FormControl, FormLabel, Select } from '@chakra-ui/react'
import { Scale } from '@tonaljs/tonal'
import React from 'react'
import { useSynth } from '../hooks'

type ScaleSelectProps = {
  onChange: (scaleName: string) => void
  value: string
}

const scales = Scale.names().sort()

export const ScaleSelect: React.FC<ScaleSelectProps> = ({
  onChange,
  value
}) => {
  const { isPlaying } = useSynth()

  return (
    <FormControl as='fieldset' mb='4'>
      <FormLabel>Scale name</FormLabel>
      <Select
        disabled={isPlaying}
        onChange={(e) => {
          onChange(e.target.value)
        }}
        value={value}
      >
        {scales.map((scale) => (
          <option key={scale} value={scale}>
            {scale}
          </option>
        ))}
      </Select>
    </FormControl>
  )
}
