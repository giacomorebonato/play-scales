import { Box } from '@chakra-ui/layout'
import { useEffect } from 'react'
import Vex from 'vexflow'

type MusicSheetProps = {
  notes: string[]
}

const ID = 'music-sheet'

export const MusicSheet: React.FC<MusicSheetProps> = ({ notes }) => {
  useEffect(() => {
    document.getElementById(ID).innerHTML = ''
    const vf = new Vex.Flow.Factory({
      renderer: { elementId: ID, height: '120px' },
    })

    const score = vf.EasyScore()
    const system = vf.System()

    if (notes.length === 0) return null

    const joinedNotes = notes.join(', ')
    const stavedNotes = score.notes(joinedNotes, {
      clef: 'treble',
      duration: 'q',
    })

    system
      .addStave({
        voices: [score.voice(stavedNotes, null).setMode('soft')],
      })
      .addClef('treble')
      .addTimeSignature('4/4')

    vf.draw()
  }, [notes])

  return (
    <Box
      id={ID}
      display='flex'
      justifyContent='center'
      bg='white'
      borderRadius='md'
      mt='2'
    />
  )
}
