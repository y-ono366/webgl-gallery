import * as React from 'react'
import DetailLayout from '@/components/common/detail-layout'
import * as THREE from 'three'

const Lines: React.FC = () => {
  const canvas = React.createRef<HTMLCanvasElement>()
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000)
  let animateFrameId = 0
  const boxGeometry = new THREE.BoxGeometry(9, 9, 1400)
  const boxMaterial = new THREE.MeshPhongMaterial({ color: 0xaaaa34 })
  const box = new THREE.Mesh(boxGeometry, boxMaterial)
  const lineMaterial = new THREE.LineBasicMaterial({ color: 0xaaaa34 })
  const lineGeometry = new THREE.Geometry()
  const line = new THREE.Line(lineGeometry, lineMaterial)
  const directionalLight = new THREE.DirectionalLight('0xffffff')

  React.useEffect(() => {
    lineGeometry.vertices.push(
      new THREE.Vector3(-100, 0, 0),
      new THREE.Vector3(0, 100, 0),
      new THREE.Vector3(100, 0, 0),
      new THREE.Vector3(0, -100, 0)
    )

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: canvas.current,
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.position.set(0, 0, +2000)

    scene.add(line)
    scene.add(box)
    scene.add(directionalLight)

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.render(scene, camera)

    const animate = () => {
      animateFrameId = requestAnimationFrame(animate)
      box.rotation.x += 3
      box.rotation.y += 0.02
      renderer.render(scene, camera)
    }
    animate()
    return () => {
      cancelAnimationFrame(animateFrameId)
      scene.remove(line)
      scene.remove(box)
      scene.remove(directionalLight)
    }
  }, [])

  return (
    <DetailLayout>
      <canvas ref={canvas} />
    </DetailLayout>
  )
}

export default Lines
