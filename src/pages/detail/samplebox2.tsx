import * as React from 'react'
import DetailLayout from '@/components/common/detail-layout'
import * as THREE from 'three'

const SampleBox2: React.FC = () => {
  const scene = new THREE.Scene()
  const geometry = new THREE.OctahedronGeometry(1, 0)
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000)
  const stoneTexture = () => {
    const texture = THREE.ImageUtils.loadTexture(require('#/stone.jpg').default)
    texture.minFilter = THREE.LinearFilter
    return texture
  }
  const material = new THREE.MeshStandardMaterial({ map: stoneTexture() })
  const mesh = new THREE.Mesh(geometry, material)
  const directionalLight = new THREE.DirectionalLight(0xffffff)
  let animateFrameId = 0
  const canvas = React.createRef<HTMLCanvasElement>()

  React.useEffect(() => {
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: canvas.current,
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.position.set(0, 0, 4)
    scene.add(mesh)
    directionalLight.position.set(1, 1, 1)
    scene.add(directionalLight)

    const animate = () => {
      mesh.rotation.y += 0.02
      mesh.rotation.x += 0.01
      renderer.render(scene, camera)
      animateFrameId = requestAnimationFrame(animate)
    }
    animate()
    return () => {
      cancelAnimationFrame(animateFrameId)
      material.dispose()
      geometry.dispose()
      scene.remove(mesh)
      scene.remove(directionalLight)
    }
  }, [])

  return (
    <DetailLayout>
      <canvas ref={canvas} />
    </DetailLayout>
  )
}

export default SampleBox2
