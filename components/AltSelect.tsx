import { FormControl, FormLabel, Select } from '@chakra-ui/react'
import React from 'react'
import { Alt } from '../lib/altToSymbol'

type AltSelectProps = {
  isDisabled: boolean
  alt: Alt
  onChange(alt: Alt): void
}

export const AltSelect: React.FC<AltSelectProps> = ({
  isDisabled,
  alt,
  onChange
}) => {
  return (
    <FormControl as='fieldset' mb='4'>
      <FormLabel>Alteration</FormLabel>
      <Select
        disabled={isDisabled}
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
