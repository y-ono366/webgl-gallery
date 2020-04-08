import * as React from 'react'
import DetailLayout from '@/components/common/detail-layout'
import * as THREE from 'three'
import * as OrbitControls from 'three-orbitcontrols'

const FragmentShader: React.FC = () => {
  const container = React.createRef<HTMLDivElement>()
  const scene = new THREE.Scene()
  const group = new THREE.Group()
  const r = 800
  const helper = new THREE.BoxHelper(new THREE.Mesh(new THREE.BoxBufferGeometry(r, r, r)), '0x111111')
  let pointCloud = null
  let animateframe = 0
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 4000)
  const rHalf = 800 / 2
  const maxParticleCount = 1000
  let particlesData = []
  const particleCount = 300
  const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({ antialias: true })
  const particlePositions = new Float32Array(maxParticleCount * 3)
  const effectController = {
    showDots: true,
    showLines: true,
    minDistance: 150,
    limitConnections: false,
    maxConnections: 20,
    particleCount: 500,
  }
  const positions = null
  const colors = null

  React.useEffect(() => {
    camera.position.z = 1750
    scene.add(group)
    group.add(helper)

    setControls()
    const segments = maxParticleCount * maxParticleCount

    const positions = new Float32Array(segments * 3)
    const colors = new Float32Array(segments * 3)

    const pMaterial = new THREE.PointsMaterial({
      color: 0xffff00,
      size: 1,
      blending: THREE.NoBlending,
      transparent: true,
      sizeAttenuation: false,
    })

    const particles = new THREE.BufferGeometry()
    const velocity = new THREE.Vector3(-1 + Math.random() * 2, -1 + Math.random() * 2, -1 + Math.random() * 2)
    for (let i = 0; i < maxParticleCount; i++) {
      const x = Math.random() * r - r / 2
      const y = Math.random() * r - r / 2
      const z = Math.random() * r - r / 2

      particlePositions[i * 3] = x
      particlePositions[i * 3 + 1] = y
      particlePositions[i * 3 + 2] = z

      // add it to the geometry
      particlesData.push({
        velocity,
        numConnections: 0,
      })
    }
    particles.setDrawRange(0, particleCount)
    particles.setAttribute('position', new THREE.BufferAttribute(particlePositions, 4).setUsage(THREE.DynamicDrawUsage))

    const geometry = new THREE.BufferGeometry()

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3).setUsage(THREE.DynamicDrawUsage))

    geometry.computeBoundingSphere()

    geometry.setDrawRange(0, 0)

    const material = new THREE.LineBasicMaterial({
      // vertexColors: THREE.VertexColors,
      blending: THREE.AdditiveBlending,
      transparent: true,
    })

    const linesMesh = new THREE.LineSegments(geometry, material)
    group.add(linesMesh)

    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.outputEncoding = THREE.sRGBEncoding

    container.current.appendChild(renderer.domElement)

    window.addEventListener('resize', onWindowResize, false)

    const animate = () => {
      let vertexpos = 0
      let numConnected = 0
      let colorpos = 0

      for (let i = 0; i < particleCount; i++) {
        // get the particle
        const particleData = particlesData[i]

        particlePositions[i * 3] += particleData.velocity.x
        particlePositions[i * 3 + 1] += particleData.velocity.y
        particlePositions[i * 3 + 2] += particleData.velocity.z

        if (particlePositions[i * 3] < -rHalf || particlePositions[i * 3] > rHalf)
          particleData.velocity.x = -particleData.velocity.x

        if (particlePositions[i * 3 + 1] < -rHalf || particlePositions[i * 3 + 1] > rHalf)
          particleData.velocity.y = -particleData.velocity.y

        if (particlePositions[i * 3 + 2] < -rHalf || particlePositions[i * 3 + 2] > rHalf)
          particleData.velocity.z = -particleData.velocity.z

        // Check collision
        for (let j = i + 1; j < particleCount; j++) {
          const particleDataB = particlesData[j]
          const dx = particlePositions[i * 3] - particlePositions[j * 3]
          const dy = particlePositions[i * 3 + 1] - particlePositions[j * 3 + 1]
          const dz = particlePositions[i * 3 + 2] - particlePositions[j * 3 + 2]
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)
          if (dist < effectController.minDistance) {
            particleData.numConnections++
            particleDataB.numConnections++

            const alpha = 2 - dist / effectController.minDistance

            positions[vertexpos++] = particlePositions[i * 3]
            positions[vertexpos++] = particlePositions[i * 3 + 1]
            positions[vertexpos++] = particlePositions[i * 3 + 2]

            positions[vertexpos++] = particlePositions[j * 3]
            positions[vertexpos++] = particlePositions[j * 3 + 1]
            positions[vertexpos++] = particlePositions[j * 3 + 2]

            colors[colorpos++] = alpha
            colors[colorpos++] = alpha
            colors[colorpos++] = alpha

            colors[colorpos++] = alpha
            colors[colorpos++] = alpha
            colors[colorpos++] = alpha
            numConnected++
          }
        }
      }

      geometry.setDrawRange(0, numConnected * 3)

      const pos = geometry.getAttribute('position') as THREE.BufferAttribute
      pos.needsUpdate = true

      animateframe = requestAnimationFrame(animate)

      const time = Date.now() * 0.001
      group.rotation.y = time * 0.1
      group.rotation.x = time * 0.2
      renderer.render(scene, camera)
    }
    animate()
    return () => {
      cancelAnimationFrame(animateframe)
      pMaterial.dispose()
      scene.remove(group)
      scene.remove(helper)
      particlesData = []
    }
  }, [])

  const setControls = () => {
    const controls = new OrbitControls(camera, container.current)
    controls.enableDamping = true
    controls.dampingFactor = 0.25
  }
  const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }

  return (
    <DetailLayout>
      <div ref={container}></div>
    </DetailLayout>
  )
}

export default FragmentShader
