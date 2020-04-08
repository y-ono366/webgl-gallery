import * as React from 'react'
import PIXI from '@/plugins/pixijs'
import DetailLayout from '@/components/common/detail-layout'
import styled from 'styled-components'
import FontFaceObserver from 'fontfaceobserver'

const Usestrict2: React.FC = () => {
  let fill: string[] = ['#272727', '#373737', '#484848', '#545454', '#636363']
  const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
  })
  const pixisec = React.createRef<HTMLDivElement>()
  const style = new PIXI.TextStyle({
    fontFamily: 'ultimatemetal',
    fill: fill,
    fontSize: 330,
    letterSpacing: 8,
    dropShadow: true,
    dropShadowColor: '#272727',
    dropShadowBlur: 5,
    dropShadowAngle: Math.PI / 4,
    dropShadowDistance: 16,
    align: 'center',
  })

  React.useEffect(() => {
    pixisec.current.appendChild(app.view)
    app.renderer.autoDensity = true
    app.stage.interactive = true

    new FontFaceObserver('ultimatemetal').load().then(() => {
      PIXI.TextMetrics.BASELINE_SYMBOL += ' U T'
      const richText = new PIXI.Text(' USESTRICT ', style)
      richText.x = window.innerWidth / 2
      richText.y = window.innerHeight / 2
      richText.anchor.set(0.5)
      app.stage.addChild(richText)
      app.ticker.maxFPS = 15
      app.ticker.add(tick)
    })

    return () => app.destroy(true)
  }, [])
  const tick = () => {
    let arr: string[] = []
    const last = fill.pop() as string
    arr = fill.slice()
    arr.unshift(last)
    fill = arr
    style.fill = fill
  }

  return (
    <DetailLayout>
      <Text ref={pixisec} />
    </DetailLayout>
  )
}

const Text = styled.div`
  @font-face {
    font-family: 'ultimatemetal';
    src: url('../../assets/ultimate-black.ttf');
  }
`
export default Usestrict2
