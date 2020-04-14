import * as React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import * as THREE from 'three'
import { RouteComponentProps, withRouter } from 'react-router'

type ItemsTypes = {
  items: ItemType[]
  // hi: RouteComponentProps
}
interface ItemType {
  alt?: string
  thumbnail: string
  link: string
}
const isImage = (thumbnail: string): boolean => /(png|jpg)+$/.test(thumbnail)
const thumbnailRef = React.createRef<HTMLDivElement>()
const Thumbnail2List: React.FC<ItemsTypes> = ({ items }) => {
  const scene = new THREE.Scene()
  const canvas = React.createRef<HTMLCanvasElement>()
  const container = React.createRef<HTMLDivElement>()
  const panels: THREE.Mesh[] = []

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

  const onScroll = () => {
    const Yscroll: number = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop)
    thumbnailRef.current.scrollLeft = Yscroll
  }

  const isImage = (thumbnail: string): boolean => /(png|jpg)+$/.test(thumbnail)

  React.useEffect(() => {
    const renderer: THREE.WebGLRenderer = initRenderer()

    const camera: THREE.PerspectiveCamera = initCamera()

    const geometry = new THREE.PlaneGeometry(773, 480)
    items.map((item, key) => {
      const texture = new THREE.TextureLoader().load(item.thumbnail)
      const material = new THREE.MeshBasicMaterial({ color: 0xffffff, map: texture })
      const panel = new THREE.Mesh(geometry, material)
      panels.push(panel)
      scene.add(panel)
      material.dispose()
      texture.dispose()

      const containerChild = document.createElement('h2')
      containerChild.style.cssText = 'margin: 0; scroll-snap-align: start; height: 100%;'
      container.current.appendChild(containerChild)
    })

    // document.addEventListener(
    //   'mousedown',
    //   (e) => {
    //     console.log(e.clientX - window.innerWidth / 2)
    //     console.log(-e.clientY + window.innerWidth / 2)
    //     props.history.push('/')
    //   },
    //   false
    // )

    const left: number = 1045
    container.current.addEventListener('scroll', (e) => {
      panels.map((panel, key) => {
        panel.position.x = -container.current.scrollTop + left * key
      })
    })

    renderer.setSize(window.innerWidth, window.innerHeight)
    const animate = () => {
      requestAnimationFrame(animate)
      renderer.render(scene, camera)
    }
    animate()
  }, [])

  return (
    <Wrapper>
      <Canvas ref={canvas} />
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
const ContainerTitle = styled.h2`
  margin: 0;
  scroll-snap-align: start;
  height: 100%;

  color: red;
  font-size: 7em;
  letter-spacing: 0.05em;
  font-family: sans-serif;
  font-style: italic;
  font-weight: bold;
`

// export default withRouter(Thumbnail2List)
export default Thumbnail2List
