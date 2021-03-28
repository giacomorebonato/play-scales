import { FormControl, FormLabel, Select } from '@chakra-ui/react'
import { Scale } from '@tonaljs/tonal'
import React from 'react'

type ScaleSelectProps = {
  disabled: boolean
  onChange: (scaleName: string) => void
  value: string
}

const scales = Scale.names().sort()

export const ScaleSelect: React.FC<ScaleSelectProps> = ({
  disabled,
  onChange,
  value,
}) => (
  <FormControl as='fieldset' mb='4'>
    <FormLabel>Scale name</FormLabel>
    <Select
      disabled={disabled}
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
