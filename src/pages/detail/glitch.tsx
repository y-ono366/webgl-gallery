import * as React from 'react'
import DetailLayout from '@/components/common/detail-layout'
import PIXI from '@/plugins/pixijs'
import styled from 'styled-components'
import FontFaceObserver from 'fontfaceobserver'

const Glitch: React.FC = () => {
  const canvas = React.createRef<HTMLDivElement>()
  const app: PIXI.Application = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
  })
  const style = new PIXI.TextStyle({
    fontFamily: 'ultimatemetal',
    fill: '0x7fff00',
    fontSize: 220,
    letterSpacing: 8,
    align: 'center',
  })

  React.useEffect(() => {
    canvas.current.appendChild(app.view)
    loadText()
    return () => app.destroy(true)
  }, [])

  const loadText = async () => {
    await new FontFaceObserver('ultimatemetal').load()
    PIXI.TextMetrics.BASELINE_SYMBOL += ' U T'
    const Text = new PIXI.Text(' USESTRICT ', style)
    Text.x = window.innerWidth / 2
    Text.y = window.innerHeight / 2
    Text.anchor.set(0.5)
    Text.interactive = true

    const fragmentSrc = `
            precision mediump float;
            varying vec2 vTextureCoord; // 座標
            uniform sampler2D uSampler; // フィルターを適用したテクスチャ

            void main(void) {
                vec2 texture = vec2(vTextureCoord.x,vTextureCoord.y);
                vec4 color = texture2D(uSampler,texture);
                gl_FragColor = color;
            }
            `
    const myFilter = new PIXI.Filter(null, fragmentSrc)
    Text.filters = [myFilter]

    app.stage.addChild(Text)
  }

  return (
    <DetailLayout>
      <Text ref={canvas} />
    </DetailLayout>
  )
}

const Text = styled.div`
  @font-face {
    font-family: 'ultimatemetal';
    src: url('../../assets/ultimate-black.ttf');
  }
`
export default Glitch
