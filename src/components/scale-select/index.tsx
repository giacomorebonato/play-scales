/* eslint-disable multiline-ternary */
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Select,
  useBoolean,
} from '@chakra-ui/react'
import React from 'react'
import { useSynth } from '../../hooks'
import { allScales, mainScales, Scale } from '../../lib/scales'

type ScaleSelectProps = {
  onChange: (scale: Scale) => void
  scale: Scale
}

export const ScaleSelect: React.FC<ScaleSelectProps> = ({
  onChange,
  scale,
}) => {
  const { isPlaying } = useSynth()
  const [showAllScales, setShowAllScales] = useBoolean(
    !mainScales.includes(scale as any) ? true : false,
  )
  const scales = showAllScales ? allScales : mainScales

  return (
    <FormControl as='fieldset' mb='4'>
      <FormLabel>Which music scale are you looking for?</FormLabel>
      <Flex>
        <Select
          data-testid='scale-select'
          flex={2}
          disabled={isPlaying}
          onChange={(e) => {
            onChange(e.target.value as any)
          }}
          mr={4}
          value={scale}
        >
          {scales.map((scale) => (
            <option key={`scale-${scale}`} value={scale}>
              {scale}
            </option>
          ))}
        </Select>

        <Button
          onClick={setShowAllScales.toggle}
          data-testid='scale-select-toggle'
        >
          {showAllScales ? 'Main scales' : 'All scales'}
        </Button>
      </Flex>
    </FormControl>
  )
}
