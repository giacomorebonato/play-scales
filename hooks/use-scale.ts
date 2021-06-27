import * as Tonal from '@tonaljs/tonal'
import { useRouter } from 'next/router'
import queryString from 'query-string'
import React from 'react'
import { useImmer } from 'use-immer'
import { Alt, altToSymbol, parseAlt } from '../lib/alt-utils'
import { isShallowEqual } from '../lib/isShallowEqual'
import { scalesMap } from '../lib/scales'

type ScaleState = {
  alt: Alt
  noteLetter: string
  scaleId: number
}

const INITIAL_STATE: ScaleState = {
  alt: '',
  noteLetter: 'C',
  scaleId: 49
} as const

const getInitialState = (): ScaleState => {
  if (!process.browser) {
    return INITIAL_STATE
  }

  const query = queryString.parse(location.search, {
    decode: true
  })

  const queryState: Partial<ScaleState> = {}

  if (query.alt) {
    queryState.alt = parseAlt(query.alt)
  }

  if (query.noteLetter) {
    queryState.noteLetter = Array.isArray(query.noteLetter)
      ? query.noteLetter[0]
      : query.noteLetter
  }

  if (query.scaleId) {
    queryState.scaleId = +query.scaleId
  }

  return { ...INITIAL_STATE, ...queryState }
}

export const useScale = () => {
  const router = useRouter()
  const [state, updateState] = useImmer<ScaleState>(getInitialState())
  const { scaleId, noteLetter, alt } = state

  React.useEffect(() => {
    if (
      isShallowEqual(state, INITIAL_STATE) ||
      Object.keys(state).length === 0
    ) {
      return
    }
    const params = new URLSearchParams({
      scaleId: scaleId?.toString(),
      noteLetter,
      alt: alt?.toString()
    })
    router.push(`/?${params}`, undefined, { shallow: true })
  }, [state])

  const scaleName = scalesMap.get(scaleId)
  const noteFull = `${noteLetter}${altToSymbol(alt)}`
  const scale = Tonal.Scale.get(`${noteFull}4 ${scaleName}`)
  const scaleNotes = [
    ...scale.notes,
    Tonal.Note.transpose(scale.notes[0], '8M')
  ]

  return {
    state: { alt, noteLetter, noteFull, scale, scaleId, scaleName, scaleNotes },
    setSimplified({ alt, noteLetter }: { alt: Alt; noteLetter: string }) {
      updateState((draft) => {
        Object.assign(draft, { alt, noteLetter })
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
    setScale({ scaleId, scaleName }) {
      updateState((draft) => {
        Object.assign(draft, { scaleId, scaleName })
      })
    }
  }
}
