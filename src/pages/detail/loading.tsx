import * as React from 'react'
import PIXI from '@/plugins/pixijs'
import DetailLayout from '@/components/common/detail-layout'
import styled from 'styled-components'
import { TweenMax } from 'gsap'
import FontFaceObserver from 'fontfaceobserver'
import { withRouter } from 'react-router-dom'

const Loading = withRouter((props) => {
  const pixisec = React.createRef<HTMLDivElement>()
  const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
  })
  const text: string[] = ['　LOADING　', '　ヨミコミチュウ　', '　スコシマッテ　', '　E　D　']
  let textId: number = 0

  const style = new PIXI.TextStyle({
    fill: '0x7fff00',
    fontFamily: 'zouver2',
    fontWeight: 'normal',
    fontSize: 200,
    align: 'center',
  })

  let loopIntervalid = 0
  const Text = new PIXI.Text(text[0])
  const NText = new PIXI.Graphics()
  const CText = new PIXI.Graphics()
  const CTextPosition: { [key: string]: number } = {
    x1: 0,
    y1: 0,
    x2: 70,
    y2: 185,
    x3: 125,
    y3: 185,
    x4: 55,
    y4: 0,
  }

  React.useEffect(() => {
    pixisec.current.appendChild(app.view)

    loadText()

    NText.beginFill(0x7fff00)
    NText.lineStyle(1, 0x7fff00, 1)
    NText.moveTo(0, 0)
    NText.lineTo(-45, 185)
    NText.lineTo(10, 185)
    NText.lineTo(55, 0)
    NText.closePath()

    NText.moveTo(175, 0)
    NText.lineTo(125, 185)
    NText.lineTo(70, 185)
    NText.lineTo(120, 0)
    NText.closePath()
    NText.endFill()

    NText.position.x = window.innerWidth / 2
    NText.position.y = window.innerHeight / 2
    NText.pivot.x = 80
    NText.pivot.y = 70

    CText.beginFill(0x7fff00)
    CText.lineStyle(1, 0x7fff00, 1)
    CText.moveTo(CTextPosition.x1, CTextPosition.y1)
    CText.lineTo(CTextPosition.x2, CTextPosition.y2)
    CText.lineTo(CTextPosition.x3, CTextPosition.y3)
    CText.lineTo(CTextPosition.x4, CTextPosition.y4)
    CText.closePath()
    CText.endFill()

    CText.position.x = window.innerWidth / 2
    CText.position.y = window.innerHeight / 2
    CText.pivot.x = 80
    CText.pivot.y = 70

    loopIntervalid = setInterval(loopText2, 300)

    return () => {
      app.destroy(true)
    }
  }, [])

  const loopText2 = () => {
    if (textId >= text.length - 1) {
      app.stage.addChild(NText)
      app.stage.addChild(CText)
      clearInterval(loopIntervalid)
      animate()
    }
    Text.text = text[textId]
    textId++
  }

  const loadText = async (): Promise<void> => {
    await new FontFaceObserver('zouver2').load()
    PIXI.TextMetrics.BASELINE_SYMBOL += 'E'
    Text.style = style
    Text.x = window.innerWidth / 2
    Text.y = window.innerHeight / 2
    Text.anchor.set(0.5)
    app.stage.addChild(Text)
  }

  const sleep = (time) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, time)
    })
  }

  let parcent: number = 0
  const animate = (): void => {
    TweenMax.to(CTextPosition, 1.5, {
      x1: -900,
      y1: -900,
      x2: -900,
      y2: 900,
      x3: 1000,
      y3: 900,
      x4: 1000,
      y4: -900,
      ease: 'power4.in',
    }).eventCallback('onComplete', endFunc)
    app.ticker.add(scale)
  }

  const scale = (): void => {
    CText.clear()
    CText.beginFill(0xffffff)
    CText.lineStyle(1, 0xffffff, 1)
    CText.moveTo(CTextPosition.x1, CTextPosition.y1)
    CText.lineTo(CTextPosition.x2, CTextPosition.y2)
    CText.lineTo(CTextPosition.x3, CTextPosition.y3)
    CText.lineTo(CTextPosition.x4, CTextPosition.y4)
    CText.closePath()
    CText.endFill()

    CText.position.x = window.innerWidth / 2
    CText.position.y = window.innerHeight / 2
    CText.pivot.x = 80
    CText.pivot.y = 70
  }

  const endFunc = (): void => {
    props.history.push('/')
  }

  return (
    <DetailLayout>
      <TextEl ref={pixisec} />
    </DetailLayout>
  )
})
const TextEl = styled.div`
  @font-face {
    font-family: 'zouver2';
    src: url('../../assets/zouver2.ttf');
  }
`

export default Loading
