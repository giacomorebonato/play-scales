export type Alt = '' | -1 | 1
export const altToSymbol = (alt: Alt) => {
  switch (alt) {
    case '':
      return ''
    case 1:
      return '#'
    case -1:
      return 'b'
  }
}
