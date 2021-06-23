import { Box } from '@chakra-ui/layout'
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

  const [utils, setUtils] = React.useState<{
    toneMeter: Tone.Meter
    toneFFT: Tone.FFT
    toneAnalyser: Tone.Analyser
    toneWaveform: Tone.Waveform
  }>()

  React.useEffect(() => {
    setUtils({
      toneFFT: new Tone.FFT(),
      toneAnalyser: new Tone.Analyser(),
      toneWaveform: new Tone.Waveform(1024),
      toneMeter: new Tone.Meter()
    })
  }, [polySynth])

  React.useEffect(() => {
    if (!utils) return
    polySynth.connect(utils.toneFFT)
    polySynth.connect(utils.toneAnalyser)
    polySynth.connect(utils.toneWaveform)
    polySynth.connect(utils.toneMeter)
  }, [polySynth, utils])

  React.useEffect(() => {
    if (width === 0) return
    setDoRender(false)
    setTimeout(() => {
      setDoRender(true)
    }, 500)
  }, [width])

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(width, 300).parent(canvasParentRef)
  }

  const draw = (p5: p5Types) => {
    p5.background(220)

    const spectrum = utils.toneFFT.getValue()
    const wave = utils.toneWaveform.getValue()

    p5.noStroke()
    p5.fill(255, 0, 255)

    for (let i = 0; i < spectrum.length; i++) {
      const value = spectrum[i]
      const x = p5.map(i, 0, spectrum.length, 0, p5.width)
      const h = -p5.height + p5.map(value, -200, 0, p5.height, 0)

      p5.rect(x, p5.height, p5.width / spectrum.length, h)
    }

    p5.noFill()
    p5.beginShape()
    p5.stroke(20)

    for (let i = 0; i < wave.length; i++) {
      const x = p5.map(i, 0, wave.length, 0, p5.width)
      const y = p5.map(wave[i], -1, 1, 0, p5.height)
      p5.vertex(x, y)
    }
    p5.endShape()
  }

  return (
    <Box ref={canvasRef} border='5px solid' borderColor='pink.300'>
      {doRender && <Sketch setup={setup} draw={draw} />}
    </Box>
  )
}
