import { Box } from '@chakra-ui/layout'
import AbcNotation from '@tonaljs/abc-notation'
import abcjs from 'abcjs'
import React, { useEffect } from 'react'
import { useMeasure } from 'react-use'

type MusicSheetProps = {
  notes: string[]
  title: string
}

const ID = 'music-sheet'

export const MusicSheet: React.FC<MusicSheetProps> = ({ notes, title }) => {
  const [ref, { width }] = useMeasure()

  useEffect(() => {
    if (width === 0) return
    const text = notes.map(AbcNotation.scientificToAbcNotation).join(' ')
    const abcText = `
M:
T: ${title}
L: 1/4
K: 
|${text}|
  `
    abcjs.renderAbc(ID, abcText, {
      add_classes: true,
      responsive: 'resize',
      staffwidth: 500
    })
  }, [notes, width])

  return (
    <div ref={ref}>
      <style jsx global>{`
        .abcjs-note_selected {
          fill: var(--chakra-colors-pink-300);
        }
        .abcjs-title {
          font-size: 1em;
        }
        .abcjs-css-warning {
          display: none;
        }
      `}</style>
      <Box
        id={ID}
        display='flex'
        justifyContent='center'
        bg='white'
        borderRadius='md'
        mt='2'
      />
    </div>
  )
}
