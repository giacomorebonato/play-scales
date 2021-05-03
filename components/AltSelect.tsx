import { FormControl, FormLabel, Select } from '@chakra-ui/react'
import React from 'react'
import { useSynth } from '../hooks'
import { Alt } from '../lib/altToSymbol'

type AltSelectProps = {
  alt: Alt
  onChange(alt: Alt): void
}

export const AltSelect: React.FC<AltSelectProps> = ({ alt, onChange }) => {
  const { isPlaying } = useSynth()
  return (
    <FormControl as='fieldset' mb='4'>
      <FormLabel>Alteration</FormLabel>
      <Select
        disabled={isPlaying}
        onChange={(e) => {
          const alt =
            e.target.value === 'natural'
              ? ''
              : (parseInt(e.target.value) as any)

          onChange(alt)
        }}
        value={alt || 'natural'}
      >
        <option value='natural'>Natural</option>
        <option value='1'>Sharp - #</option>
        <option value='-1'>Flat - b</option>
      </Select>
    </FormControl>
  )
}
