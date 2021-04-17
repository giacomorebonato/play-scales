import { Button, Flex } from '@chakra-ui/react'
import { Note } from '@tonaljs/tonal'
import React from 'react'
import { useSynth } from '../hooks/useSynth'

type NotesRowProps = {
  currentNote: string
  notes: string[]
}

export const NotesRow: React.FC<NotesRowProps> = ({ currentNote, notes }) => {
  const { playNote } = useSynth()

  return (
    <Flex mt='2' mb='2'>
      {notes.map((note, i) => {
        const tonalNote = Note.get(note)
        let alt = ''

        if (tonalNote.alt === 1) {
          alt = '#'
        } else if (tonalNote.alt === -1) {
          alt = 'b'
        }

        return (
          <Button
            onClick={() => {
              playNote(note)
            }}
            padding='2'
            flex='1'
            key={note}
            textAlign='center'
            bg={currentNote === tonalNote.name ? 'pink.400' : null}
            borderRadius='md'
            fontWeight='bold'
            size='sm'
          >
            {tonalNote.letter}
            {alt}
          </Button>
        )
      })}
    </Flex>
  )
}
