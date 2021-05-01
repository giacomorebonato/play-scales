import * as Tonal from '@tonaljs/tonal'
import { useRouter } from 'next/router'
import queryString from 'query-string'
import React from 'react'
import { useImmer } from 'use-immer'
import { Alt, altToSymbol } from '../lib/altToSymbol'
import { decrypt, encrypt } from '../lib/crypto'

type ScaleState = {
  alt: Alt
  noteLetter: string
  scaleName: string
}

const INITIAL_STATE = {
  alt: '',
  noteLetter: 'C',
  scaleName: 'major'
} as const

export const useScale = () => {
  const router = useRouter()
  const [state, updateState] = useImmer<ScaleState>(INITIAL_STATE)

  React.useEffect(() => {
    const encoded = encodeURIComponent(encrypt(state))
    router.push(`/?data=${encoded}`, undefined, { shallow: true })
  }, [state])

  React.useEffect(() => {
    const query = queryString.parse(location.search, {
      decode: true
    })

    if (query.data) {
      const data = decrypt(query.data as string, INITIAL_STATE)

      updateState(data as ScaleState)
    }
  }, [])

  const { alt, noteLetter, scaleName } = state
  const noteFull = `${noteLetter}${altToSymbol(alt)}`
  const scale = Tonal.Scale.get(`${noteFull}4 ${scaleName}`)
  const scaleNotes = [
    ...scale.notes,
    Tonal.Note.transpose(scale.notes[0], '8M')
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
    }
  }
}
