import * as React from 'react'
import DetailLayout from '@/components/common/detail-layout'
import * as THREE from 'three'
import { TweenMax } from 'gsap'

const SampleBox: React.FC = () => {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  const light = new THREE.DirectionalLight(0xffffff)
  const canvas = React.createRef<HTMLCanvasElement>()
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshNormalMaterial()
  const mesh = new THREE.Mesh(geometry, material)
  let animateFrameId = 0

  React.useEffect(() => {
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: canvas.current,
    })

    camera.position.set(0, 0, 2)
    light.position.set(0, 0, 10)
    scene.add(mesh)
    scene.add(light)
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.render(scene, camera)

    const mouse = new THREE.Vector2()
    window.addEventListener(
      'mousemove',
      (event) => {
        const element = canvas.current
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
          TweenMax.to(mesh.scale, 1, {
            x: 2,
          })
        } else {
          TweenMax.to(mesh.scale, 1, {
            x: 0.4,
          })
        }
      },
      false
    )
    const animate = () => {
      animateFrameId = requestAnimationFrame(animate)

      mesh.rotation.x += 0.02
      mesh.rotation.y += 0.02

      renderer.render(scene, camera)
    }
    animate()
    return () => {
      cancelAnimationFrame(animateFrameId)
      material.dispose()
      geometry.dispose()
      scene.remove(mesh)
      scene.remove(light)
    }
  }, [])

  return (
    <DetailLayout>
      <canvas ref={canvas} />
    </DetailLayout>
  )
}

export default SampleBox
