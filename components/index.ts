import dynamic from 'next/dynamic'
export { AltSelect } from './alt-select'
export { Chords } from './chords'
export { Header } from './header'
export { MyLink } from './my-link'
export { NoteSelect } from './note-select'
export { PlayPause } from './play-pause'
export { ScaleSelect } from './scale-select'
export { SimplifiedNote } from './simplified-note'
export const MusicSheet = dynamic(
  () => import('./music-sheet/music-sheet').then((mod) => mod.MusicSheet),
  {
    ssr: false
  }
)
