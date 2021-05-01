import { AbcNotation } from '@tonaljs/tonal'

/**
 * Returns the formatted string to be rendered by ABC JS
 * @param {Object} data
 * @param {string} data.title Title of the partiture
 * @param {string[]} data.notes List of notes to render
 * @returns {string} String to be used by ABC js
 */
export const getAbcText = ({
  title,
  notes
}: {
  title: string
  notes: string[]
}): string => {
  const noteNames: string[] = []
  const abcNotes: string[] = []

  for (const note of notes) {
    noteNames.push(note.slice(0, note.length - 1))
    abcNotes.push(AbcNotation.scientificToAbcNotation(note))
  }

  return `
M:
T: ${title}
C:
R: "this is hidden"
L: 1/4
K:
|${abcNotes.join(' ')}|
w: ${noteNames.join(' ')}
`
}
