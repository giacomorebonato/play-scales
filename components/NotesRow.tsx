import { Flex, Text } from '@chakra-ui/react'
import { Note } from '@tonaljs/tonal'
import React from 'react'

type NotesRowProps = {
  currentNote: string
  notes: string[]
}

export const NotesRow: React.FC<NotesRowProps> = ({ currentNote, notes }) => (
  <Flex mt='2'>
    {notes.map((note) => {
      const tonalNote = Note.get(note)
      let alt = ''

      if (tonalNote.alt === 1) {
        alt = '#'
      } else if (tonalNote.alt === -1) {
        alt = 'b'
      }

      return (
        <Text
          padding='2'
          flex='1'
          key={note}
          textAlign='center'
          bg={currentNote === tonalNote.name ? 'pink.400' : null}
          borderRadius='md'
          fontWeight='bold'
        >
          {tonalNote.letter}
          {alt}
        </Text>
      )
    })}
  </Flex>
)
