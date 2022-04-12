import * as Tonal from '@tonaljs/tonal'
import { useRouter } from 'next/router'
import queryString from 'query-string'
import React from 'react'
import { useImmer } from 'use-immer'
import { Alt, altToSymbol, parseAlt } from '../lib/alt-utils'
import { isShallowEqual } from '../lib/isShallowEqual'
import { allScales, Scale } from '../lib/scales'

type ScaleState = {
  alt: Alt
  noteLetter: string
  scale: Scale
}

const INITIAL_STATE: ScaleState = {
  alt: '',
  noteLetter: 'C',
  scale: 'major',
} as const

const getInitialState = (): ScaleState => {
  if (!process.browser) {
    return INITIAL_STATE
  }

  const query = queryString.parse(location.search, {
    decode: true,
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

  if (query.scale) {
    const scale: any = Array.isArray(query.scale)
      ? decodeURIComponent(query.scale[0])
      : decodeURIComponent(query.scale)

    if (allScales.includes(scale)) {
      queryState.scale = scale
    } else {
      console.warn('Invalid scale in querystring')
      queryState.scale = 'major'
    }
  }

  return { ...INITIAL_STATE, ...queryState }
}

export const useScale = () => {
  const router = useRouter()
  const [state, updateState] = useImmer<ScaleState>(getInitialState())
  const { scale, noteLetter, alt } = state

  React.useEffect(() => {
    if (
      isShallowEqual(state, INITIAL_STATE) ||
      Object.keys(state).length === 0
    ) {
      return
    }
    const params = new URLSearchParams({
      scale,
      noteLetter,
      alt: alt?.toString(),
    })
    router.push(`/?${params}`, undefined, { shallow: true })
  }, [state])

  const noteFull = `${noteLetter}${altToSymbol(alt)}`
  const tonalScale = Tonal.Scale.get(`${noteFull}4 ${scale}`)
  const scaleNotes = [
    ...tonalScale.notes,
    Tonal.Note.transpose(tonalScale.notes[0], '8M'),
  ]

  return {
    state: { alt, noteLetter, noteFull, scale, scaleNotes },
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
    setScale(scale: Scale) {
      updateState((draft) => {
        draft.scale = scale
      })
    },
  }
}
