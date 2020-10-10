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
  AnimationMixer,
  Clock,
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
const mixers = []

const Twelve: React.FC = () => {
  const getMesh = (_o: Object3D) => {
    let refO = null

    if (_o.type.toLowerCase().indexOf('skinnedmesh') > -1) {
      return _o
    }

    for (let i = 0; i < _o.children.length; i++) {
      refO = getMesh(_o.children[i])
      if (refO) {
        break
      }
    }
    return refO
  }
  React.useEffect(() => {
    const renderer = new WebGLRenderer({
      antialias: true,
      canvas: canvas.current,
    })
    const loader = new GLTFLoader()
    loader.load(
      'http://localhost:8080/assets/human_animation.glb',
      function (gltf) {
        model = gltf.scene as Object3D
        model.position.y = -3
        scene.add(model)

        const animations = gltf.animations

        if (animations && animations.length) {
          const meshes = getMesh(model)

          let mixer = new AnimationMixer(meshes)
          for (let m = 0; m < animations.length; m++) {
            mixer.clipAction(animations[m]).play()
          }
          mixers.push(mixer)
          if (mixers) {
            mixer = mixers[0]
          }
        }
        animate()
      },
      function (onprogress) {
        console.log('progress')
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

    const clock = new Clock()
    const animate = () => {
      animateFrameId = requestAnimationFrame(animate)

      model.rotation.y += 0.01

      if (mixers) {
        for (let i = 0; i < mixers.length; i++) {
          mixers[i].update(clock.getDelta())
        }
      }

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
