import { Box } from '@chakra-ui/layout'
import { AbcNotation, Midi } from '@tonaljs/tonal'
import abcjs from 'abcjs'
import 'abcjs/abcjs-audio.css'
import React, { useEffect } from 'react'
import { useMeasure } from 'react-use'
import { useSynth } from '../hooks'

type MusicSheetProps = {
  notes: string[]
  title: string
}

const ID = 'music-sheet'

if (process.browser) {
  // eslint-disable-next-line no-new
  new abcjs.synth.CreateSynth()
}

export const MusicSheet: React.FC<MusicSheetProps> = ({ notes, title }) => {
  const [ref, { width }] = useMeasure()
  const { playNote } = useSynth()

  useEffect(() => {
    if (width === 0) return
    const noteNames = notes.map((note) => note.slice(0, note.length - 1))
    const text = notes
      .map((note) => AbcNotation.scientificToAbcNotation(note))
      .join(' ')
    const abcText = `
M:
T: ${title}
C:  
R: "this is hidden"
L: 1/4
K: 
|${text}|
w: ${noteNames.join(' ')}
  `
    const visualObjs = abcjs.renderAbc(ID, abcText, {
      add_classes: true,
      responsive: 'resize',
      staffwidth: 300,
      wrap: 'maxSpacing',
      paddingbottom: 0,
      paddingTop: 0,
      clickListener: (abcElem) => {
        const lastClicked = abcElem.midiPitches
        if (!lastClicked) {
          return
        }

        const noteName = Midi.midiToNoteName(lastClicked[0].pitch)

        playNote(noteName)
      }
    })

    visualObjs[0].setUpAudio()
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
        .abcjs-lyric {
          font-size: 0.6em;
        }
        .abcjs-rhythm {
          visibility: hidden;
        }
        svg * {
          fill: black;
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
