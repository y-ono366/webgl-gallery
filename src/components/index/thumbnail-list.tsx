import * as React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import {
  Mesh,
  Scene,
  BoxGeometry,
  WebGLRenderer,
  PerspectiveCamera,
  Vector2,
  Raycaster,
  TextureLoader,
  ShaderMaterial,
  Texture,
  Clock,
} from 'three'
import { RouteComponentProps, withRouter } from 'react-router'
import { render } from 'react-dom'
import { TweenMax } from 'gsap'
import vertexSource from '@/components/glsl/thumbnail.vert'
import fragmentSource from '@/components/glsl/thumbnail.frag'
import threeIf from '@/interfaces/three'

interface ItemsTypes extends RouteComponentProps {
  items: ItemType[]
}
interface ItemType {
  alt?: string
  thumbnail: string
  link: string
}
interface Panel extends THREE.Mesh {
  material: any
}

interface StateType {
  widthStyle: number
}
const ThumbnailList: React.FC<ItemsTypes> = ({ items, history }) => {
  const scene = new Scene()
  const canvas = React.createRef<HTMLCanvasElement>()
  const panels: Panel[] = []
  const thumbnailRef = React.createRef<HTMLDivElement>()
  const container = React.createRef<HTMLDivElement>()
  let animationFrameId = 0

  const [state, setState] = React.useState<StateType>({ widthStyle: 0 })

  React.useEffect(() => {
    const three = new threeIf(canvas.current, window.innerHeight, window.innerWidth)
    const renderer: WebGLRenderer = three.initRenderer()

    const camera: PerspectiveCamera = three.initPerCamera()

    const geometry = new BoxGeometry(290, 180, 10)
    const left = 170
    let start = -500
    items.map((item: ItemType, key: number) => {
      const texture: Texture = new TextureLoader().load(item.thumbnail)
      const material: ShaderMaterial = new ShaderMaterial({
        uniforms: {
          uTex: { value: texture },
          uTime: {
            value: 0.0,
            type: 'f',
          },
        },
        vertexShader: vertexSource,
        fragmentShader: fragmentSource,
      })

      const panel: Panel = new Mesh(geometry, material)
      canvas.current.height
      if (key % 2 == 0) {
        panel.position.set(start, 130, 0)
      } else {
        panel.position.set(start, -130, 0)
      }
      panels.push(panel)
      panel.userData = { path: item.link }
      scene.add(panel)
      material.dispose()
      texture.dispose()
      start = left + start
    })

    const mouse = new Vector2()
    container.current.addEventListener(
      'mousedown',
      (event) => {
        const element = document.getElementById('refcanvas')
        const x = event.clientX - element.offsetLeft
        const y = event.clientY - element.offsetTop
        const w = element.offsetWidth
        const h = element.offsetHeight

        mouse.x = (x / w) * 2 - 1
        mouse.y = -(y / h) * 2 + 1

        const raycaster = new Raycaster()
        raycaster.setFromCamera(mouse, camera)
        const intersects = raycaster.intersectObjects(scene.children)
        if (intersects.length > 0) {
          history.push(intersects[0].object.userData.path)
        }
      },
      false
    )

    container.current.addEventListener(
      'mousemove',
      (event) => {
        const element = document.getElementById('refcanvas')
        const x = event.clientX - element.offsetLeft
        const y = event.clientY - element.offsetTop
        const w = element.offsetWidth
        const h = element.offsetHeight

        mouse.x = (x / w) * 2 - 1
        mouse.y = -(y / h) * 2 + 1

        const raycaster = new Raycaster()
        raycaster.setFromCamera(mouse, camera)
        const intersects = raycaster.intersectObjects(scene.children)
        if (intersects.length > 0) {
          TweenMax.to(intersects[0].object.position, 0.5, {
            z: 25,
          })

          TweenMax.to(intersects[0].object.rotation, 0.5, {
            x: 0.15,
          })
        } else {
          panels.map((panel, key) => {
            TweenMax.to(panel.position, 0.8, {
              z: 0,
            })

            TweenMax.to(panel.rotation, 0.8, {
              x: 0,
            })
          })
        }
      },
      false
    )

    const centerObjId: number = 0
    const element = container.current

    const clock = new Clock()
    let parcent = 0
    container.current.addEventListener('scroll', (e) => {
      parcent = (element.scrollTop / (element.scrollHeight - element.offsetHeight)) * 100
      start = -500
      panels.map((panel, key) => {
        panel.position.x = -element.scrollTop + start
        start = left + start
      })
      setState({
        widthStyle: parcent,
      })
    })

    const animate = () => {
      const time = clock.getElapsedTime()
      animationFrameId = requestAnimationFrame(animate)
      renderer.render(scene, camera)
      panels.map((panel, key) => {
        panel.material.uniforms.uTime.value = time
      })
    }
    animate()
    return () => {
      cancelAnimationFrame(animationFrameId)
      panels.map((panel) => {
        scene.remove(panel)
      })
    }
  }, [])

  const InnerLine = styled.div`
    position: fixed;
    left: 0%;
    top: 50%;
    height: 1px;
    background-color: #f0f0f0;
    width: ${state.widthStyle}%;
  `
  return (
    <Wrapper>
      <Canvas id="refcanvas" ref={canvas} />
      <Line>
        <InnerLine />
      </Line>
      <Container ref={container}>
        <ContainerChild />
      </Container>
    </Wrapper>
  )
}
const Wrapper = styled.div``

const Canvas = styled.canvas`
  position: fixed;
  top: 0;
  left: 0;
`

const Container = styled.div`
  position: fixed;
  top: 0%;
  left: 0%;
  overflow: scroll;
  height: 100%;
  width: 100%;

  -ms-overflow-style: none; /* IE, Edge 対応 */
  scrollbar-width: none; /* Firefox 対応 */
  &::-webkit-scrollbar {
    /* Chrome, Safari 対応 */
    display: none;
  }
`
const ContainerChild = styled.div`
  margin: 0;
  width: 100%;
  height: 2000px;
`

const Line = styled.div`
  position: fixed;
  top: 50%;
  left: 0%;
  height: 1px;
  background-color: #333330;
  width: 100%;
`

export default withRouter(ThumbnailList)
