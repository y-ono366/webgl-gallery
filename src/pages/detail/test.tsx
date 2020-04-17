import * as React from 'react'
import * as THREE from 'three'
import styled from 'styled-components'
import vertexSource from '@/components/glsl/test.vert'
import fragmentSource from '@/components/glsl/test.frag'

const Test: React.FC = () => {
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

    const geometry = new THREE.BoxGeometry(773, 480, 20)
    const texture: THREE.Texture = new THREE.TextureLoader().load(require('#/thumbnails/image/circle.png').default)
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTex: { value: texture },
        uFixAspect: {
          value: window.innerHeight / window.innerWidth,
        },
        uTime: {
          value: 0.0,
          type: 'f',
        },
      },
      vertexShader: vertexSource,
      fragmentShader: fragmentSource,
      // wireframe: true,
    })

    const box = new THREE.Mesh(geometry, material)

    scene.add(box)

    renderer.setSize(window.innerWidth, window.innerHeight)

    const clock = new THREE.Clock()
    const animate = () => {
      animateFrameId = requestAnimationFrame(animate)

      const time = clock.getElapsedTime()
      material.uniforms.uTime.value = time

      renderer.render(scene, camera)
    }
    renderer.render(scene, camera)
    animate()
    return () => {
      cancelAnimationFrame(animateFrameId)
      material.dispose()
      geometry.dispose()
      scene.remove(box)
    }
  }, [])
  return (
    <div>
      <Canvas ref={canvas} />
    </div>
  )
}
const Canvas = styled.canvas`
  position: fixed;
  top: 0;
  left: 0;
`
export default Test
