import { Box } from '@chakra-ui/layout'
import AbcNotation from '@tonaljs/abc-notation'
import abcjs from 'abcjs'
import { useEffect } from 'react'
import { useMeasure } from 'react-use'

type MusicSheetProps = {
  notes: string[]
}

const ID = 'music-sheet'

export const MusicSheet: React.FC<MusicSheetProps> = ({ notes }) => {
  const [ref, { width }] = useMeasure()

  useEffect(() => {
    if (width === 0) return
    const text = notes.map(AbcNotation.scientificToAbcNotation).join(' ')
    const abcText = `
M:
L: 1/4
K: 
|${text}|
  `
    console.log(abcText)
    abcjs.renderAbc(ID, abcText, {
      add_classes: true,
      responsive: 'resize',
      staffwidth: 300,
    })
  }, [notes, width])

  return (
    <div ref={ref}>
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
