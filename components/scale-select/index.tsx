/* eslint-disable multiline-ternary */
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Select,
  Spinner,
  useBoolean
} from '@chakra-ui/react'
import React from 'react'
import { useSynth } from '../../hooks'
import { mainScalesMap, scalesMap } from '../../lib/scales'

type ScaleSelectProps = {
  onChange: ({ scaleId: number, scaleName: string }) => void
  scaleId: number
}

export const ScaleSelect: React.FC<ScaleSelectProps> = ({
  onChange,
  scaleId
}) => {
  const { isPlaying } = useSynth()
  const [isLoading, setIsLoading] = useBoolean(false)
  const [showAllScales, setShowAllScales] = useBoolean(false)
  const currentMap = showAllScales ? scalesMap : mainScalesMap

  return (
    <FormControl as='fieldset' mb='4'>
      <FormLabel>Which music scale are you looking for?</FormLabel>
      <Flex>
        {isLoading ? (
          <Spinner />
        ) : (
          <Select
            data-testid='scale-select'
            flex={2}
            disabled={isPlaying}
            onChange={(e) => {
              const scaleId = +e.target.value
              const scaleName = currentMap.get(scaleId)

              onChange({
                scaleId,
                scaleName
              })
            }}
            mr={4}
            value={scaleId}
          >
            {[...currentMap.entries()].map(([id, name]) => (
              <option key={`scale-${id}`} value={id}>
                {name}
              </option>
            ))}
          </Select>
        )}

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
