import { Button, Flex } from '@chakra-ui/react'
import { Note } from '@tonaljs/tonal'
import React from 'react'
import { useSynth } from '../hooks/useSynth'
import { Alt, altToSymbol } from '../lib/altToSymbol'

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
        const alt = altToSymbol(tonalNote.alt as Alt)

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
