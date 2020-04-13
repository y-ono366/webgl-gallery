import * as React from 'react'
import * as THREE from 'three'
import styled from 'styled-components'

const Intaract: React.FC = () => {
  const scene = new THREE.Scene()
  const canvas = React.createRef<HTMLCanvasElement>()
  const container = React.createRef<HTMLDivElement>()
  let animateFrameId = 0

  React.useEffect(() => {
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: canvas.current,
    })
    renderer.setClearColor(0x101010, 1)

    const fov = 60
    const fovRad = (fov / 2) * (Math.PI / 180)
    const dist = window.innerHeight / 2 / Math.tan(fovRad)

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, dist * 2)
    camera.position.z = dist

    const light = new THREE.DirectionalLight(0xffffff)
    light.position.set(0, 0, 1000)

    //

    const geometry = new THREE.BoxGeometry(300, 300, 300)
    const material = new THREE.MeshLambertMaterial({ color: 0x468499 })
    const box = new THREE.Mesh(geometry, material)

    scene.add(box)
    window.addEventListener('mousemove', (e) => {
      light.position.x = e.clientX - window.innerWidth / 2
      light.position.y = -e.clientY + window.innerWidth / 2
    })

    container.current.addEventListener('scroll', (e) => {
      box.position.x = container.current.scrollTop
    })
    scene.add(light)

    renderer.setSize(window.innerWidth, window.innerHeight)

    const animate = () => {
      animateFrameId = requestAnimationFrame(animate)

      box.rotation.x += 0.01
      box.rotation.y += 0.01

      renderer.render(scene, camera)
    }
    animate()
    return () => {
      cancelAnimationFrame(animateFrameId)
      material.dispose()
      geometry.dispose()
      scene.remove(box)
      scene.remove(light)
    }
  }, [])
  return (
    <div>
      <Canvas ref={canvas} />
      <Container ref={container}>
        <ContainerTitle>VVVVVVVVVVV</ContainerTitle>
        <ContainerTitle>22222222222</ContainerTitle>
        <ContainerTitle>33333333333</ContainerTitle>
        <ContainerTitle>44444444444</ContainerTitle>
        <ContainerTitle>55555555555</ContainerTitle>
      </Container>
    </div>
  )
}
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
  border: 2px solid #000000;
  scroll-snap-align: start;
  height: 100%;

  color: red;
  font-size: 7em;
  letter-spacing: 0.05em;
  font-family: sans-serif;
  font-style: italic;
  font-weight: bold;
`
export default Intaract
