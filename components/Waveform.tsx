import p5Types from 'p5'
import React from 'react'
import Sketch from 'react-p5'
import { useMeasure } from 'react-use'
import * as Tone from 'tone'
import { useSynth } from '../hooks'

export const Waveform: React.FC = () => {
  const { polySynth } = useSynth()
  const [doRender, setDoRender] = React.useState(false)
  const [canvasRef, { x, y, width, height, top, right, bottom, left }] =
    useMeasure()

  const [utils, setUtils] =
    React.useState<{
      toneMeter: Tone.Meter
      toneFFT: Tone.FFT
      toneAnalyser: Tone.Analyser
      toneWaveform: Tone.Waveform
    }>()

  React.useEffect(() => {
    setUtils({
      toneFFT: new Tone.FFT(),
      toneAnalyser: new Tone.Analyser(),
      toneWaveform: new Tone.Waveform(),
      toneMeter: new Tone.Meter()
    })
  }, [polySynth])

  React.useEffect(() => {
    if (!utils) return
    polySynth.connect(utils.toneFFT)
    polySynth.connect(utils.toneAnalyser)
    polySynth.connect(utils.toneWaveform)
    polySynth.connect(utils.toneMeter)
  }, [utils])

  React.useEffect(() => {
    if (width === 0) return
    setDoRender(false)
    setTimeout(() => {
      setDoRender(true)
    }, 500)
  }, [width])

  const setup = (p5, canvasParentRef) => {
    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)

    p5.createCanvas(width, 300).parent(canvasParentRef)
  }

  const draw = (p5: p5Types) => {
    p5.background(220)

    const spectrum = utils.toneFFT.getValue()
    const wave = utils.toneWaveform.getValue()

    // for (let i = 0; i < spectrum.length; i++) {
    //   const x = p5.map(i, 0, spectrum.length, 0, p5.width)
    //   const h = -p5.height + p5.map(spectrum[i], 0, 255, p5.height, 0)
    //   p5.rect(x, p5.height, p5.width / spectrum.length, h)
    // }

    p5.noFill()
    p5.beginShape()
    p5.stroke(20)

    for (let i = 0; i < wave.length; i++) {
      const x = p5.map(i, 0, wave.length, 0, p5.width)
      const y = p5.map(wave[i], -1, 1, 0, p5.height)
      p5.vertex(x, y)
    }
    p5.endShape()

    p5.text('Work in progress!', 20, 20)
  }

  return (
    <div ref={canvasRef}>
      {doRender && <Sketch setup={setup} draw={draw} />}
    </div>
  )
}
