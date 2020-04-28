import * as THREE from 'three'
class ThreeWrap {
  canvas: HTMLCanvasElement
  innerHeight: number
  innerWidth: number

  constructor({ canvas, innerHeight, innerWidth }) {
    this.canvas = canvas
    this.innerHeight = innerHeight
    this.innerWidth = innerWidth
  }

  initPerCamera(): THREE.PerspectiveCamera {
    const fov = 60
    const fovRad = (fov / 2) * (Math.PI / 180)
    const dist = this.innerHeight / 2 / Math.tan(fovRad)
    const cam = new THREE.PerspectiveCamera(60, this.innerWidth / this.innerHeight, 1, dist * 2)
    cam.position.z = dist
    return cam
  }

  initRenderer(): THREE.WebGLRenderer {
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: this.canvas,
    })
    renderer.setClearColor(0x101010, 1)
    return renderer
  }
}
export default ThreeWrap
