import * as React from 'react'
import DetailLayout from '@/components/common/detail-layout'
import * as THREE from 'three'

const Slash: React.FC = () => {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 1000)
  const smokeParticles = []
  const light = new THREE.DirectionalLight(0xffffff, 0.5)
  const clock = new THREE.Clock()
  const flash = new THREE.PointLight(0x062d89, 30, 500, 1.7)
  let animateFrameId = 0
  const canvas = React.createRef<HTMLCanvasElement>()

  React.useEffect(() => {
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: canvas.current,
    })

    const stoneTexture = THREE.ImageUtils.loadTexture(require('#/stone.jpg').default)
    const faceMaterial = new THREE.MeshStandardMaterial({ color: 0x808080, map: stoneTexture })

    const geometry = new THREE.Geometry()
    geometry.vertices.push(
      new THREE.Vector3(3.189, 6.472, 0),
      new THREE.Vector3(4.811, 6.472, 0),
      new THREE.Vector3(-3.189, -6.472, 0),
      new THREE.Vector3(-4.811, -6.472, 0),
      new THREE.Vector3(3.189, 6.472, 0)
    )

    const smokeTexture = THREE.ImageUtils.loadTexture(require('#/Smoke-Element.png').default)
    const smokeMaterial = new THREE.MeshLambertMaterial({
      color: 0xffffff,
      map: smokeTexture,
      opacity: 0.25,
      transparent: true,
    })
    const smokeGeo = new THREE.PlaneGeometry(50, 50)
    const particle = new THREE.Mesh(smokeGeo, smokeMaterial)

    geometry.faces.push(new THREE.Face3(4, 3, 2), new THREE.Face3(0, 2, 1))
    const faceMesh = new THREE.Mesh(geometry, faceMaterial)
    const faceMesh2 = new THREE.Mesh(geometry, faceMaterial)
    const faceMesh3 = new THREE.Mesh(geometry, faceMaterial)
    const faceMesh4 = new THREE.Mesh(geometry, faceMaterial)
    geometry.computeFaceNormals()
    geometry.computeVertexNormals()
    scene.add(faceMesh)
    scene.add(faceMesh2)
    scene.add(faceMesh3)
    scene.add(faceMesh4)

    faceMesh.position.set(-10.5, 0, -5)
    faceMesh2.position.set(-3.5, 0, -5)
    faceMesh3.position.set(3.5, 0, -5)
    faceMesh4.position.set(10.5, 0, -5)
    flash.position.set(0, 0, 1)
    scene.add(flash)

    light.position.set(0, 0, 1)
    scene.add(light)

    camera.position.set(0, 0, 100)
    renderer.setSize(window.innerWidth, window.innerHeight)

    for (let p = 0; p < 150; p++) {
      particle.position.set(Math.random() * 200 - 100, Math.random() * 200 - 100, 0)
      particle.rotation.z = Math.random() * 36
      scene.add(particle)
      smokeParticles.push(particle)
    }
    const animate = () => {
      animateFrameId = requestAnimationFrame(animate)
      renderer.render(scene, camera)
      const delta = clock.getDelta()
      let sp = smokeParticles.length
      while (sp--) smokeParticles[sp].rotation.z += delta * 0.15
      if (Math.random() > 0.97 || flash.power > 100) {
        if (flash.power < 100) flash.position.set(Math.random() * 200 - 100, Math.random() * 200 - 100, 1)
        flash.power = 20 + Math.random() * 400
      }
    }
    animate()
    return () => {
      cancelAnimationFrame(animateFrameId)
      geometry.dispose()
      smokeMaterial.dispose()
      faceMaterial.dispose()
      scene.remove(particle)
      scene.remove(faceMesh)
      scene.remove(faceMesh2)
      scene.remove(faceMesh3)
      scene.remove(faceMesh4)
      scene.remove(flash)
      scene.remove(light)
      scene.remove(particle)
    }
  }, [])

  return (
    <DetailLayout>
      <canvas ref={canvas} />
    </DetailLayout>
  )
}

export default Slash
