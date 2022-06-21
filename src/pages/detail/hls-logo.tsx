import * as React from 'react'
import DetailLayout from '@/components/common/detail-layout'
import * as THREE from 'three'

const WebGLContent: React.FC = () => {
  const scene = new THREE.Scene()
  const container = React.createRef<HTMLDivElement>()

  const camera = new THREE.PerspectiveCamera(27, window.innerWidth / window.innerHeight, 1, 3500)
  camera.position.z = 2750
  const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({
    antialias: true,
  })

  React.useEffect(() => {
    if (!container.current) return
    scene.background = new THREE.Color('#FFFFFF')
    scene.fog = new THREE.Fog(0x050505, 2000, 3500)

    scene.add(new THREE.AmbientLight(0x444444))

    const light1 = new THREE.DirectionalLight(0xffffff, 0.5)
    light1.position.set(1, 1, 1)
    scene.add(light1)

    const light2 = new THREE.DirectionalLight(0xffffff, 1.5)
    light2.position.set(0, -1, 0)
    scene.add(light2)

    //

    const triangles = 800

    const geometry = new THREE.BufferGeometry()

    const positions = []
    const normals = []
    const colors = []

    const color = new THREE.Color()

    const framemaxheight = 1050
    const maxheight = 800
    const tan = 1.5017068700571 //56.34℃
    const n = maxheight / tan,
      n2 = n / 2 // triangles spread in the cube
    const d = 70,
      d2 = d / 2 // individual triangle size

    const pA = new THREE.Vector3()
    const pB = new THREE.Vector3()
    const pC = new THREE.Vector3()

    const cb = new THREE.Vector3()
    const ab = new THREE.Vector3()

    for (let i = 0; i < triangles; i++) {
      const v = Math.random() * n2
      const x = v + n / Math.PI / 2
      const y = i % 2 === 0 ? v * tan : -(v * tan)
      const z = Math.random() * 70 - 35

      const ax = x + Math.random() * d - d2
      const ay = y + Math.random() * d - d2
      const az = z + Math.random() * d - d2

      const bx = x + Math.random() * d - d2
      const by = y + Math.random() * d - d2
      const bz = z + Math.random() * d - d2

      const cx = x + Math.random() * d - d2
      const cy = y + Math.random() * d - d2
      const cz = z + Math.random() * d - d2

      positions.push(ax, ay, az)
      positions.push(bx, by, bz)
      positions.push(cx, cy, cz)

      // flat face normals

      pA.set(ax, ay, az)
      pB.set(bx, by, bz)
      pC.set(cx, cy, cz)

      cb.subVectors(pC, pB)
      ab.subVectors(pA, pB)
      cb.cross(ab)

      cb.normalize()

      const nx = cb.x
      const ny = cb.y
      const nz = cb.z

      normals.push(nx, ny, nz)
      normals.push(nx, ny, nz)
      normals.push(nx, ny, nz)

      // colors

      const vx = x / n + 0.5
      const vy = y / n + 0.5
      const vz = z / n + 0.5

      color.setRGB(vx, vy, vz)

      const alpha = Math.random()

      colors.push(color.r, color.g, color.b, alpha)
      colors.push(color.r, color.g, color.b, alpha)
      colors.push(color.r, color.g, color.b, alpha)
    }

    for (let i = 0; i < triangles; i++) {
      const v = -Math.random() * n2
      const x = v - n / Math.PI / 2
      const y = i % 2 === 0 ? v * tan : -(v * tan)
      const z = Math.random() * 70 - 35

      const ax = x + Math.random() * d - d2
      const ay = y + Math.random() * d - d2
      const az = z + Math.random() * d - d2

      const bx = x + Math.random() * d - d2
      const by = y + Math.random() * d - d2
      const bz = z + Math.random() * d - d2

      const cx = x + Math.random() * d - d2
      const cy = y + Math.random() * d - d2
      const cz = z + Math.random() * d - d2

      positions.push(ax, ay, az)
      positions.push(bx, by, bz)
      positions.push(cx, cy, cz)

      // flat face normals

      pA.set(ax, ay, az)
      pB.set(bx, by, bz)
      pC.set(cx, cy, cz)

      cb.subVectors(pC, pB)
      ab.subVectors(pA, pB)
      cb.cross(ab)

      cb.normalize()

      const nx = cb.x
      const ny = cb.y
      const nz = cb.z

      normals.push(nx, ny, nz)
      normals.push(nx, ny, nz)
      normals.push(nx, ny, nz)

      // colors

      const vx = x / n + 0.5
      const vy = y / n + 0.5
      const vz = z / n + 0.5

      color.setRGB(vx, vy, vz)

      const alpha = Math.random()

      colors.push(color.r, color.g, color.b, alpha)
      colors.push(color.r, color.g, color.b, alpha)
      colors.push(color.r, color.g, color.b, alpha)
    }

    for (let i = 0; i < 500; i++) {
      const length = n / Math.PI
      const x = Math.random() * length - length / 2
      const y = Math.random() * 20 - 10
      const z = Math.random() * 70 - 35

      const ax = x + Math.random() * d - d2
      const ay = y + Math.random() * d - d2
      const az = z + Math.random() * d - d2

      const bx = x + Math.random() * d - d2
      const by = y + Math.random() * d - d2
      const bz = z + Math.random() * d - d2

      const cx = x + Math.random() * d - d2
      const cy = y + Math.random() * d - d2
      const cz = z + Math.random() * d - d2

      positions.push(ax, ay, az)
      positions.push(bx, by, bz)
      positions.push(cx, cy, cz)

      // flat face normals

      pA.set(ax, ay, az)
      pB.set(bx, by, bz)
      pC.set(cx, cy, cz)

      cb.subVectors(pC, pB)
      ab.subVectors(pA, pB)
      cb.cross(ab)

      cb.normalize()

      const nx = cb.x
      const ny = cb.y
      const nz = cb.z

      normals.push(nx, ny, nz)
      normals.push(nx, ny, nz)
      normals.push(nx, ny, nz)

      // colors

      const vx = x / n + 0.5
      const vy = y / n + 0.5
      const vz = z / n + 0.5

      color.setRGB(vx, vy, vz)

      const alpha = Math.random()

      colors.push(color.r, color.g, color.b, alpha)
      colors.push(color.r, color.g, color.b, alpha)
      colors.push(color.r, color.g, color.b, alpha)
    }

    for (let i = 0; i < 1000; i++) {
      const x = i % 2 === 0 ? framemaxheight - framemaxheight / 2 : -framemaxheight / 2
      const y = Math.random() * framemaxheight - framemaxheight / 2
      const z = Math.random() * 70 - 35

      const ax = x + Math.random() * d - d2
      const ay = y + Math.random() * d - d2
      const az = z + Math.random() * d - d2

      const bx = x + Math.random() * d - d2
      const by = y + Math.random() * d - d2
      const bz = z + Math.random() * d - d2

      const cx = x + Math.random() * d - d2
      const cy = y + Math.random() * d - d2
      const cz = z + Math.random() * d - d2

      positions.push(ax, ay, az)
      positions.push(bx, by, bz)
      positions.push(cx, cy, cz)

      // flat face normals

      pA.set(ax, ay, az)
      pB.set(bx, by, bz)
      pC.set(cx, cy, cz)

      cb.subVectors(pC, pB)
      ab.subVectors(pA, pB)
      cb.cross(ab)

      cb.normalize()

      const nx = cb.x
      const ny = cb.y
      const nz = cb.z

      normals.push(nx, ny, nz)
      normals.push(nx, ny, nz)
      normals.push(nx, ny, nz)

      // colors

      const vx = x / n + 0.5
      const vy = y / n + 0.5
      const vz = z / n + 0.5

      color.setRGB(vx, vy, vz)

      const alpha = Math.random()

      colors.push(color.r, color.g, color.b, alpha)
      colors.push(color.r, color.g, color.b, alpha)
      colors.push(color.r, color.g, color.b, alpha)
    }

    for (let i = 0; i < 1000; i++) {
      const x = Math.random() * framemaxheight - framemaxheight / 2
      const y = i % 2 === 0 ? framemaxheight - framemaxheight / 2 : -framemaxheight / 2
      const z = Math.random() * 70 - 35

      const ax = x + Math.random() * d - d2
      const ay = y + Math.random() * d - d2
      const az = z + Math.random() * d - d2

      const bx = x + Math.random() * d - d2
      const by = y + Math.random() * d - d2
      const bz = z + Math.random() * d - d2

      const cx = x + Math.random() * d - d2
      const cy = y + Math.random() * d - d2
      const cz = z + Math.random() * d - d2

      positions.push(ax, ay, az)
      positions.push(bx, by, bz)
      positions.push(cx, cy, cz)

      // flat face normals

      pA.set(ax, ay, az)
      pB.set(bx, by, bz)
      pC.set(cx, cy, cz)

      cb.subVectors(pC, pB)
      ab.subVectors(pA, pB)
      cb.cross(ab)

      cb.normalize()

      const nx = cb.x
      const ny = cb.y
      const nz = cb.z

      normals.push(nx, ny, nz)
      normals.push(nx, ny, nz)
      normals.push(nx, ny, nz)

      // colors

      const vx = x / n + 0.5
      const vy = y / n + 0.5
      const vz = z / n + 0.5

      color.setRGB(vx, vy, vz)

      const alpha = Math.random()

      colors.push(color.r, color.g, color.b, alpha)
      colors.push(color.r, color.g, color.b, alpha)
      colors.push(color.r, color.g, color.b, alpha)
    }

    const disposeArray = () => {}
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3).onUpload(disposeArray))
    geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3).onUpload(disposeArray))
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 4).onUpload(disposeArray))

    geometry.computeBoundingSphere()

    const material = new THREE.MeshPhongMaterial({
      color: 0xaaaaaa,
      specular: 0xffffff,
      shininess: 250,
      side: THREE.DoubleSide,
      vertexColors: true,
      transparent: true,
    })

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    const animate = () => {
      requestAnimationFrame(animate)
      const time = Date.now() * 0.001

      mesh.rotation.x = time * 0.125
      mesh.rotation.y = time * 0.05

      renderer.render(scene, camera)
    }

    animate()
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.outputEncoding = THREE.sRGBEncoding

    container.current.appendChild(renderer.domElement)
    renderer.render(scene, camera)
  }, [])

  return (
    <DetailLayout>
      <div ref={container}></div>
    </DetailLayout>
  )
}

export default WebGLContent
