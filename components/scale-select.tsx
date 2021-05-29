import { FormControl, FormLabel, Select } from '@chakra-ui/react'
import React from 'react'
import { useSynth } from '../hooks'
import { scalesMap } from '../lib/scales'

type ScaleSelectProps = {
  onChange: ({ scaleId: number, scaleName: string }) => void
  scaleId: number
}

export const ScaleSelect: React.FC<ScaleSelectProps> = ({
  onChange,
  scaleId
}) => {
  const { isPlaying } = useSynth()

  return (
    <FormControl as='fieldset' mb='4'>
      <FormLabel>Which music scale are you looking for?</FormLabel>
      <Select
        flex={2}
        disabled={isPlaying}
        onChange={(e) => {
          onChange({
            scaleId: e.target.value,
            scaleName: scalesMap[e.target.value]
          })
        }}
        mr={4}
        value={scaleId}
      >
        {[...scalesMap.entries()].map(([id, name]) => (
          <option key={`scale-${id}`} value={id}>
            {name}
          </option>
        ))}
      </Select>
    </FormControl>
  )
}
