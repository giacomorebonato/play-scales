import { FormControl, FormLabel, Select } from '@chakra-ui/react'
import * as Tonal from '@tonaljs/tonal'
import React from 'react'
import { useSynth } from '../hooks'

type NoteSelectProps = {
  note: string
  onChange: (note: string) => void
}

const notes = Tonal.Note.names()

export const NoteSelect: React.FC<NoteSelectProps> = ({ note, onChange }) => {
  const { isPlaying } = useSynth()

  return (
    <FormControl as='fieldset' mb='4'>
      <FormLabel>Pick your reference note</FormLabel>
      <Select
        disabled={isPlaying}
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
}
