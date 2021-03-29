export const altToSymbol = (alt: '' | -1 | 1) => {
  switch (alt) {
    case '':
      return ''
    case 1:
      return '#'
    case -1:
      return 'b'
  }
}
