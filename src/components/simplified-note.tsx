import { Alert, AlertIcon, Button } from '@chakra-ui/react'
import * as Tonal from '@tonaljs/tonal'
import React from 'react'
import { Alt, altToSymbol } from '../lib/alt-utils'

type SimplifiedNoteProps = {
  alt: Alt
  noteLetter: string
  onChange: ({ noteLetter: string, alt: Alt }) => void
}

export const SimplifiedNote: React.FC<SimplifiedNoteProps> = ({
  noteLetter,
  alt,
  onChange,
}) => {
  const [simpleNote, setSimpleNote] = React.useState<string>()
  const fullNote = `${noteLetter}${altToSymbol(alt)}`

  React.useEffect(() => {
    const simplified = Tonal.Note.simplify(fullNote)

    if (simplified !== simpleNote && simplified !== fullNote) {
      setSimpleNote(Tonal.Note.simplify(fullNote))
    } else {
      setSimpleNote(null)
    }
  }, [fullNote, noteLetter, simpleNote])

  if (!simpleNote) return null

  return (
    <Alert status='info' mb='2'>
      <AlertIcon />
      {fullNote} is better&nbsp;
      <Button
        color='pink.200'
        _hover={{
          color: 'pink.400',
        }}
        variant='unstyled'
        onClick={() => {
          setSimpleNote(null)
          const tonalNote = Tonal.Note.get(simpleNote)

          onChange({
            noteLetter: tonalNote.letter,
            alt: tonalNote.alt === 0 ? '' : (tonalNote.alt as Alt),
          })
        }}
      >
        known as {simpleNote}
      </Button>
      .
    </Alert>
  )
}
