import * as React from 'react'
import DetailLayout from '@/components/common/detail-layout'
import {
  Scene,
  PerspectiveCamera,
  DirectionalLight,
  BoxGeometry,
  MeshNormalMaterial,
  WebGLRenderer,
  Vector2,
  Group,
  Object3D,
} from 'three'
import { TweenMax } from 'gsap'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const scene = new Scene()
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const light = new DirectionalLight(0xffffff)
const canvas = React.createRef<HTMLCanvasElement>()
const geometry = new BoxGeometry(1, 1, 1)
const material = new MeshNormalMaterial()
let animateFrameId = 0
let model: Object3D = null

const Twelve: React.FC = () => {
  React.useEffect(() => {
    const renderer = new WebGLRenderer({
      antialias: true,
      canvas: canvas.current,
    })
    const loader = new GLTFLoader()
    loader.load(
      'http://localhost:8080/assets/human.glb',
      function (gltf) {
        model = gltf.scene.children[2] as Object3D
        model.position.y = -3
        scene.add(model)
        animate()
      },
      function (onprogress) {
        console.log('progress ')
        console.log(onprogress)
      },
      function (error) {
        console.log('error')
        console.log(error)
      }
    )

    camera.position.set(0, 0, 10)
    light.position.set(0, 0, 10)
    scene.add(light)
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.render(scene, camera)
    const mouse = new Vector2()
    renderer.render(scene, camera)
    const animate = () => {
      animateFrameId = requestAnimationFrame(animate)

      // model.rotation.x += 0.02
      model.rotation.z += 0.01

      renderer.render(scene, camera)
    }
    return () => {
      material.dispose()
      geometry.dispose()
      scene.remove(model)
      scene.remove(light)
    }
  }, [])

  return (
    <DetailLayout>
      <canvas ref={canvas} id="canvasref" />
    </DetailLayout>
  )
}

export default Twelve
