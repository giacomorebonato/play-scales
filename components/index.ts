import dynamic from 'next/dynamic'
export { AltSelect } from './AltSelect'
export { Chords } from './Chords'
export { Header } from './Header'
export { MyLink } from './MyLink'
export { NoteSelect } from './NoteSelect'
export { PlayPause } from './PlayPause'
export { ScaleSelect } from './ScaleSelect'
export { SimplifiedNote } from './SimplifiedNote'
export const MusicSheet = dynamic(
  () => import('./MusicSheet').then((mod) => mod.MusicSheet),
  {
    ssr: false
  }
)
