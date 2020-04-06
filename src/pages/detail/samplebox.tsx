import * as React from 'react'
// import * as THREE from 'three'

const THREE = require('three')
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshNormalMaterial()

export default class SampleBox extends React.Component<{}> {
  scene = new THREE.Scene()
  renderer = null
  camera = null
  light = new THREE.DirectionalLight(0xffffff)
  cube = new THREE.Mesh(geometry, material)
  animateFrameId = 0

  render(): JSX.Element {
    return <div />
  }
}
