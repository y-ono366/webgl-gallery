import * as React from 'react'
import DetailLayout from '@/components/common/detail-layout'
import * as THREE from 'three'

const SampleBox: React.FC = () => {
  // const onCanvasLoaded = (canvas: HTMLCanvasElement) => {
  //   if (!canvas) return
  //   const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  //   renderer.render(scene, camera)
  // }
  // const scene = new THREE.Scene()
  // const light = new THREE.DirectionalLight(0xffffff)
  // const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  const canvas = React.createRef<HTMLCanvasElement>()
  // let animateFrameId = 0
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: canvas.current,
  })
  //
  // const geometry = new THREE.BoxGeometry(1, 1, 1)
  // const material = new THREE.MeshNormalMaterial()
  // const mesh = new THREE.Mesh(geometry, material)
  //
  React.useEffect(() => {
    //   camera.position.set(0, 0, 2)
    //   light.position.set(0, 0, 10)
    //   scene.add(mesh)
    //   scene.add(light)
    //   renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.render(scene, camera)
    //
    //   // animate()
  }, [])

  // const cube = () => {
  //   const geometry = new THREE.BoxGeometry(1, 1, 1)
  //   const material = new THREE.MeshNormalMaterial()
  //   const mesh = new THREE.Mesh(geometry, material)
  //   return mesh
  // }

  // const animate = () => {
  //   animateFrameId = requestAnimationFrame(animate)
  //
  //   mesh.rotation.x += 0.02
  //   mesh.rotation.y += 0.02
  //
  //   renderer.render(scene, camera)
  // }

  return (
    <DetailLayout>
      <canvas ref={canvas} />
    </DetailLayout>
  )
}

export default SampleBox
