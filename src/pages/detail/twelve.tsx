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
  Raycaster,
  AnimationClip,
  LoopOnce,
} from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const scene = new Scene()
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(0, 0, 10)
const light = new DirectionalLight(0xffffff)
light.position.set(0, 0, 10)
const canvas = React.createRef<HTMLCanvasElement>()
let animateFrameId = 0
let model: Object3D = null
let mixers: AnimationMixer = null
let animations: AnimationClip[] = []

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

const Twelve: React.FC = () => {
  React.useEffect(() => {
    const renderer = new WebGLRenderer({
      antialias: true,
      canvas: canvas.current,
    })

    new GLTFLoader().load(
      'http://localhost:8080/assets/human_animation2.glb',
      function (gltf) {
        model = gltf.scene as Object3D
        model.position.y = -3
        scene.add(model)

        animations = gltf.animations

        if (animations && animations.length) {
          const meshes = getMesh(model)
          const mixer = new AnimationMixer(meshes)
          mixers = mixer
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

    scene.add(light)
    renderer.setSize(window.innerWidth, window.innerHeight)

    canvas.current.addEventListener('click', (event) => {
      mixers.stopAllAction()
      const anim = mixers.clipAction(animations[0])
      anim.setLoop(LoopOnce, 0).play()
    })

    canvas.current.addEventListener('dblclick', (event) => {
      mixers.stopAllAction()
      const anim = mixers.clipAction(animations[3])
      anim.setLoop(LoopOnce, 0).play()
    })

    const clock = new Clock()
    const animate = () => {
      animateFrameId = requestAnimationFrame(animate)

      model.rotation.y += 0.01

      mixers.update(clock.getDelta())

      renderer.render(scene, camera)
    }
    return () => {
      cancelAnimationFrame(animateFrameId)
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
