import * as React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import * as THREE from 'three'
import { RouteComponentProps, withRouter } from 'react-router'
import { render } from 'react-dom'
// import { TweenMax } from 'gsap'

interface ItemsTypes extends RouteComponentProps {
  items: ItemType[]
}
interface ItemType {
  alt?: string
  thumbnail: string
  link: string
}
const Thumbnail2List: React.FC<ItemsTypes> = ({ items, history }) => {
  const scene = new THREE.Scene()
  const canvas = React.createRef<HTMLCanvasElement>()
  const panels: THREE.Mesh[] = []
  const thumbnailRef = React.createRef<HTMLDivElement>()
  let animationFrameId = 0
  const container = React.createRef<HTMLDivElement>()

  const initRenderer = (): THREE.WebGLRenderer => {
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: canvas.current,
    })
    renderer.setClearColor(0x101010, 1)
    return renderer
  }

  const initCamera = (): THREE.PerspectiveCamera => {
    const fov = 60
    const fovRad = (fov / 2) * (Math.PI / 180)
    const dist = window.innerHeight / 2 / Math.tan(fovRad)
    const cam = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, dist * 2)
    cam.position.z = dist
    return cam
  }

  React.useEffect(() => {
    const renderer: THREE.WebGLRenderer = initRenderer()

    const camera: THREE.PerspectiveCamera = initCamera()

    const geometry: THREE.BoxGeometry = new THREE.BoxGeometry(773, 480, 20)
    const left: number = 1045
    items.map((item: ItemType, key: number) => {
      const texture: THREE.Texture = new THREE.TextureLoader().load(item.thumbnail)
      const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, map: texture })
      const panel: THREE.Mesh = new THREE.Mesh(geometry, material)
      panel.position.set(left * key, 0, 0)
      panel.rotateY(0.01)
      panels.push(panel)
      // TweenMax.to(panel.rotation, 1, { x: 0.1, y: 0.1, repeat: -1, yoyo: true })
      panel.userData = { path: item.link }
      scene.add(panel)
      material.dispose()
      texture.dispose()

      const containerChild = document.createElement('div')
      containerChild.style.cssText = 'margin: 0; scroll-snap-align: start; height: 100%;'
      container.current && container.current.appendChild(containerChild)
    })

    window.addEventListener(
      'mousedown',
      (event) => {
        if (canvas.current) {
          const mouse = new THREE.Vector2()
          const element = document.getElementById('refcanvas')
          const x = event.clientX - element.offsetLeft
          const y = event.clientY - element.offsetTop
          const w = element.offsetWidth
          const h = element.offsetHeight

          mouse.x = (x / w) * 2 - 1
          mouse.y = -(y / h) * 2 + 1

          const raycaster = new THREE.Raycaster()
          raycaster.setFromCamera(mouse, camera)
          const intersects = raycaster.intersectObjects(scene.children)
          if (intersects.length > 0) {
            history.push(intersects[0].object.userData.path)
          }
        }
      },
      false
    )

    if (container.current) {
      const element = container.current
      container.current.addEventListener('scroll', (e) => {
        panels.map((panel, key) => {
          panel.position.x = -element.scrollTop + left * key
        })
      })
    }

    renderer.setSize(window.innerWidth, window.innerHeight)
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      renderer.render(scene, camera)
    }
    animate()
    return () => {
      cancelAnimationFrame(animationFrameId)
      panels.map((panel) => {
        scene.remove(panel)
      })
    }
  }, [])

  return (
    <Wrapper>
      <Canvas id="refcanvas" ref={canvas} />
      <Container ref={container}></Container>
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
  scroll-snap-type: y mandatory;
  height: 100vh; /* 任意 */
  width: 100%;
`

export default withRouter(Thumbnail2List)
