import * as React from 'react'
import DetailLayout from '@/components/common/detail-layout'
import * as THREE from 'three'
import threeIf from '@/interfaces/three'
import { TweenMax } from 'gsap'

const Cylinder: React.FC = () => {
  const scene = new THREE.Scene()
  const canvas = React.createRef<HTMLCanvasElement>()
  const group = new THREE.Group()

  const cygeometry = new THREE.CylinderBufferGeometry(20, 20, 40, 5, 1)
  let animateFrameId: number

  let isClick: boolean = false

  const mouse = new THREE.Vector2()
  const mouseMove = (event) => {}
  React.useEffect(() => {
    scene.fog = new THREE.Fog(0x000000, 50, 4000)
    const three = new threeIf(canvas.current, window.innerHeight, window.innerWidth)
    const renderer: THREE.WebGLRenderer = three.initRenderer()

    let camera: THREE.PerspectiveCamera
    camera = three.initPerCamera()
    camera.far = 400

    const directionalLight = new THREE.DirectionalLight(0xffffff)
    directionalLight.position.set(1, -2000, 0)
    scene.add(directionalLight)
    for (let i = 0; i < 1000; i++) {
      const material = new THREE.MeshPhongMaterial({
        color: 0x156289,
        specular: 0x2dcef4,
        side: THREE.DoubleSide,
        wireframe: true,
      })
      const mesh = new THREE.Mesh(cygeometry, material)
      mesh.position.x = (Math.random() - 0.5) * 2000
      mesh.position.y = (Math.random() - 0.5) * 2000
      mesh.position.z = (Math.random() - 0.5) * 2000
      mesh.rotation.x = Math.random() * 2 * Math.PI
      mesh.rotation.y = Math.random() * 2 * Math.PI
      mesh.rotation.z = Math.random() * 2 * Math.PI
      group.add(mesh)
      material.dispose()
    }
    scene.add(group)
    group.position.z = -500

    canvas.current.addEventListener('mousedown', (event) => {
      isClick = !isClick
      if (isClick) {
        group.children.forEach((item) => {
          TweenMax.to(item.position, 0.9, {
            z: 20,
            y: Math.random() * 800 - 400,
            ease: 'expo',
          })

          TweenMax.to(item.scale, 0.5, {
            y: 20,
          })
        })
        group.rotation.y = 0
      } else {
        group.children.forEach((item) => {
          TweenMax.to(item.position, 0.5, {
            z: (Math.random() - 0.5) * 2000,
            y: (Math.random() - 0.5) * 2000,
          })

          TweenMax.to(item.scale, 0.5, {
            y: 1,
          })
        })
      }
    })

    canvas.current.addEventListener('mousemove', (event) => {
      if (isClick) return
      const element = document.getElementById('canvasref')
      const x = event.clientX - element.offsetLeft
      const y = event.clientY - element.offsetTop
      const w = element.offsetWidth
      const h = element.offsetHeight

      mouse.x = (x / w) * 2 - 1
      mouse.y = -(y / h) * 2 + 1

      const raycaster = new THREE.Raycaster()
      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects(group.children)
      if (intersects.length > 0) {
        TweenMax.to(intersects[0].object.rotation, 0.5, {
          z: intersects[0].object.rotation.z + 1,
          y: intersects[0].object.rotation.y + 1,
        })
      }
    })

    const animate = () => {
      if (!isClick) group.rotateY(0.001)
      animateFrameId = requestAnimationFrame(animate)

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(animateFrameId)
      scene.remove(group)
      scene.remove(directionalLight)
    }
  }, [])

  return (
    <DetailLayout>
      <canvas ref={canvas} id="canvasref" />
    </DetailLayout>
  )
}

export default Cylinder
