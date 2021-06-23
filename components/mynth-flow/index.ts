import dynamic from 'next/dynamic'

export const MynthFlow = dynamic(
  () => import('./mynth-flow').then((mod) => mod.MynthFlow),
  {
    ssr: false
  }
)
