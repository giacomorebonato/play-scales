import * as Tonal from '@tonaljs/tonal'
import { useImmer } from 'use-immer'
import { Alt, altToSymbol } from '../lib/altToSymbol'

type ScaleState = {
  alt: 1 | -1 | ''
  noteLetter: string
  scaleName: string
}

export const useScale = () => {
  const [state, updateState] = useImmer<ScaleState>({
    alt: '',
    noteLetter: 'C',
    scaleName: 'major',
  })
  const { alt, noteLetter, scaleName } = state
  const noteFull = `${noteLetter}${altToSymbol(alt)}`
  const scale = Tonal.Scale.get(`${noteFull}4 ${scaleName}`)
  const scaleNotes = [
    ...scale.notes,
    Tonal.Note.transpose(scale.notes[0], '8M'),
  ]

  return {
    state: { alt, noteLetter, noteFull, scale, scaleName, scaleNotes },
    setSimplified({ alt, noteLetter }: { alt: Alt; noteLetter: string }) {
      updateState((draft) => {
        draft.alt = alt
        draft.noteLetter = noteLetter
      })
    },
    setAlt(alt: Alt) {
      updateState((draft) => {
        draft.alt = alt
      })
    },
    setNoteLetter(noteLetter: string) {
      updateState((draft) => {
        draft.noteLetter = noteLetter
      })
    },
    setScaleName(scaleName: string) {
      updateState((draft) => {
        draft.scaleName = scaleName
      })
    },
  }
}
