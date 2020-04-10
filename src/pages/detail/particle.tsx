import * as React from 'react'
import PIXI from '@/plugins/pixijs'
import DetailLayout from '@/components/common/detail-layout'

interface SpriteWrap extends PIXI.Sprite {
  speed: number
}

const Particle: React.FC = () => {
  const app: PIXI.Application = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
  })
  const particles: SpriteWrap[] = []
  const pixisec = React.createRef<HTMLDivElement>()
  const container = new PIXI.ParticleContainer()

  React.useEffect(() => {
    pixisec.current.appendChild(app.view)
    app.renderer.autoDensity = true
    app.stage.interactive = true
    app.stage.addChild(container)

    const texture = app.renderer.generateTexture(graphic(), 1, 1)

    for (let i: number = 0; i < 100; i++) {
      const spriteParticle = new PIXI.Sprite(texture) as SpriteWrap
      spriteParticle.x = Math.abs(Math.random() * window.innerWidth - 100)
      spriteParticle.y = Math.random() * window.innerHeight
      spriteParticle.speed = Math.random() * 20 + 10
      particles.push(spriteParticle)
      container.addChild(spriteParticle)
    }
    app.ticker.add(tick)
    return () => app.destroy(true)
  }, [])

  const tick = () => {
    particles.forEach((particle) => {
      particle.x -= particle.speed
      if (particle.x > window.innerWidth + 250) {
        particle.x = -5
      } else if (particle.x < 0 - 250) {
        particle.x = window.innerWidth + 5
      }
    })
  }

  const graphic = (): PIXI.Graphics => {
    const graphics = new PIXI.Graphics()
    graphics.lineStyle(2, 0x90d911, 0.5)
    graphics.beginFill(0x650a5a)
    graphics.drawRoundedRect(50, 440, 250, 1, 1)
    graphics.endFill()
    return graphics
  }

  return (
    <DetailLayout>
      <div ref={pixisec} />
    </DetailLayout>
  )
}

export default Particle
