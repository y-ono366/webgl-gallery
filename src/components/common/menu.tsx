import * as React from 'react'
import styled from 'styled-components'
import * as THREE from 'three'
import threeIf from '@/interfaces/three'

const Menu: React.FC = () => {
  let animateFrameId = 0

  const scene = new THREE.Scene()
  const canvas = React.createRef<HTMLCanvasElement>()

  React.useEffect(() => {
    const three = new threeIf(canvas.current, window.innerHeight, window.innerWidth)
    const renderer: THREE.WebGLRenderer = three.initRenderer()
    const camera = three.initOrthCamera()

    // const geometry = new THREE.BoxGeometry(370, 230, 300)
    // const material = new THREE.MeshNormalMaterial()
    // const box = new THREE.Mesh(geometry, material)
    // box.position.set(0, 0, -400)
    // scene.add(box)
    const material = new THREE.MeshBasicMaterial({
      color: 0x0000ff,
    })

    const points = []
    points.push(new THREE.Vector3(-200, 0, 0))
    points.push(new THREE.Vector3(0, 200, 0))
    points.push(new THREE.Vector3(200, 0, 0))

    const geometry = new THREE.BufferGeometry().setFromPoints(points)

    const line = new THREE.Line(geometry, material)
    line.position.set(0, 0, -5)
    scene.add(line)

    renderer.render(scene, camera)
    const animate = () => {
      animateFrameId = requestAnimationFrame(animate)
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(animateFrameId)
    }
  }, [])
  return <Canvas ref={canvas} />
}
const Canvas = styled.canvas`
  position: fixed;
  top: 0px;
  right: 0px;
  width: 100%;
  height: 100%;
  z-index: 100;
`
export default Menu
