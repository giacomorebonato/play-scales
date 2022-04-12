import { Box } from '@chakra-ui/layout'
import { Midi } from '@tonaljs/tonal'
import { Midi as ToneMidi } from '@tonejs/midi'
import ABCJS from 'abcjs'
import 'abcjs/abcjs-audio.css'
import React, { useEffect } from 'react'
import { useMeasure } from 'react-use'
import { useSynth } from '../../hooks'
import { getAbcText } from './getAbcText'

type MusicSheetProps = {
  notes: string[]
  title: string
  onMidiCreated: (midi: ToneMidi) => void
}

const ID = 'music-sheet'

if (process.browser) {
  // eslint-disable-next-line no-new
  new ABCJS.synth.CreateSynth()
}

export const MusicSheet: React.FC<MusicSheetProps> = ({
  notes,
  onMidiCreated,
  title,
}) => {
  const [ref, { width }] = useMeasure()
  const { playNote } = useSynth()

  useEffect(() => {
    if (width === 0) return

    const abcText = getAbcText({ title, notes })
    const visualObjs = ABCJS.renderAbc(ID, abcText, {
      add_classes: true,
      responsive: 'resize',
      staffwidth: 300,
      wrap: 'maxSpacing',
      paddingbottom: 10,
      paddingtop: 0,
      clickListener: (abcElem) => {
        const lastClicked = abcElem.midiPitches
        if (!lastClicked) {
          return
        }

        const noteName = Midi.midiToNoteName(lastClicked[0].pitch)

        playNote(noteName)
      },
    })

    const encoded = ABCJS.synth.getMidiFile(visualObjs[0], {
      midiOutputType: 'binary',
    })

    onMidiCreated(new ToneMidi(encoded))

    visualObjs[0].setUpAudio()
  }, [notes, onMidiCreated, playNote, title, width])

  return (
    <Box
      ref={ref}
      w='100%'
      minH={{
        sm: '136px',
        md: '400px',
      }}
    >
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
    </Box>
  )
}
