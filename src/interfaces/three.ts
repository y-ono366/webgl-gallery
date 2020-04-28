import * as THREE from 'three'

class ThreeInterface {
  private canvas: HTMLCanvasElement
  private innerHeight: number
  private innerWidth: number

  constructor(canvas: HTMLCanvasElement, innerHeight: number, innerWidth: number) {
    this.innerHeight = innerHeight
    this.innerWidth = innerWidth
    this.canvas = canvas
  }

  initPerCamera(): THREE.PerspectiveCamera {
    const fov = 60
    const fovRad = (fov / 2) * (Math.PI / 180)
    const dist = this.innerHeight / 2 / Math.tan(fovRad)
    const cam = new THREE.PerspectiveCamera(fov, this.innerWidth / this.innerHeight, 1, dist * 2)
    cam.position.z = dist
    return cam
  }

  initOrthCamera(): THREE.OrthographicCamera {
    const cam = new THREE.OrthographicCamera(
      this.innerWidth / -2,
      this.innerWidth / 2,
      this.innerHeight / 2,
      this.innerHeight / -2,
      1,
      1000
    )
    return cam
  }

  initRenderer(): THREE.WebGLRenderer {
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: this.canvas,
    })
    renderer.setSize(this.innerWidth, this.innerHeight)
    renderer.setClearColor(0x101010, 1)
    return renderer
  }
}
export default ThreeInterface
