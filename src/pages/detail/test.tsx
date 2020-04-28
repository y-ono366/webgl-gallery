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

    const frustumSize = 1000
    const aspect = canvas.current.offsetWidth / canvas.current.offsetHeight
    const camera = new THREE.OrthographicCamera(
      (frustumSize * aspect) / -2,
      (frustumSize * aspect) / 2,
      frustumSize / 2,
      frustumSize / -2,
      1,
      1000
    )

    let box: THREE.Mesh
    let material: THREE.ShaderMaterial
    let geometry: THREE.TextGeometry

    const loader = new THREE.FontLoader()
    loader.load('@/../assets/zouver_regular.json', function (font) {
      geometry = new THREE.TextGeometry('webglgallery', {
        font: font,
        size: 250,
        height: 5,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 10,
        bevelSize: 8,
        bevelOffset: 0,
        bevelSegments: 5,
      })
      geometry.center()

      material = new THREE.ShaderMaterial({
        uniforms: {
          uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
          uMouse: {
            value: new THREE.Vector2(0.5, 0.5),
          },
          uTime: {
            value: 0.0,
            type: 'f',
          },
          uMix: {
            value: 0.1,
            type: 'f',
          },
        },
        vertexShader: vertexSource,
        fragmentShader: fragmentSource,
        wireframe: true,
      })
      box = new THREE.Mesh(geometry, material)

      scene.add(box)

      renderer.setSize(canvas.current.offsetWidth, canvas.current.offsetHeight)

      const clock = new THREE.Clock()
      const animate = () => {
        animateFrameId = requestAnimationFrame(animate)

        const time = clock.getElapsedTime()
        material.uniforms.uTime.value = time

        renderer.render(scene, camera)
      }

      animate()

      const mouse = new THREE.Vector2()

      const theta = 0.1
      const radius = 500

      camera.position.x = radius * Math.sin(THREE.MathUtils.degToRad(theta))
      camera.position.y = radius * Math.sin(THREE.MathUtils.degToRad(theta))
      camera.position.z = radius * Math.cos(THREE.MathUtils.degToRad(theta))
      camera.lookAt(scene.position)
      camera.updateMatrixWorld()

      canvas.current.addEventListener('mousemove', (event) => {
        const element = canvas.current
        mouse.x = (event.clientX / element.offsetWidth) * 2 - 1
        mouse.y = -(event.clientY / element.offsetHeight) * 2 + 1

        const raycaster = new THREE.Raycaster()
        raycaster.setFromCamera(mouse, camera)

        const intersects = raycaster.intersectObjects(scene.children)
        if (intersects.length > 0) {
          material.uniforms.uMouse.value.x = event.clientX / window.innerWidth
          material.uniforms.uMouse.value.y = 1.0 - event.clientY / window.innerHeight
          material.uniforms.uMix.value = 20.0
        } else {
          material.uniforms.uMix.value = 0.1
        }
      })
    })
    renderer.render(scene, camera)
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
  left: 50px;
  top: 20px;
  width: 400px;
  height: 90px;
`
export default Test
