import { FormControl, FormLabel, Select } from '@chakra-ui/react'
import * as Tonal from '@tonaljs/tonal'
import React from 'react'

type NoteSelectProps = {
  isDisabled: boolean
  note: string
  onChange: (note: string) => void
}

const notes = Tonal.Note.names()

export const NoteSelect: React.FC<NoteSelectProps> = ({
  isDisabled,
  note,
  onChange,
}) => (
  <FormControl as='fieldset' mb='4'>
    <FormLabel>Root note</FormLabel>
    <Select
      disabled={isDisabled}
      onChange={(e) => {
        onChange(e.target.value)
      }}
      value={note}
    >
      {notes.map((note) => (
        <option key={note} value={note}>
          {note}
        </option>
      ))}
    </Select>
  </FormControl>
)
