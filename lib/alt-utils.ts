export type Alt = '' | -1 | 1 | 2 | -2
export const altToSymbol = (alt: Alt) => {
  switch (alt) {
    case '':
      return ''
    case 1:
      return '#'
    case 2:
      return '##'
    case -2:
      return 'bb'
    case -1:
      return 'b'
  }
}

export const parseAlt = (altText: string | string[]): Alt => {
  const text = Array.isArray(altText) ? altText[0] : altText

  if (text === '') return ''

  return +text as Alt
}
