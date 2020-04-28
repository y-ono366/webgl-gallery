#pragma glslify: snoise = require('glsl-noise/simplex/2d')
varying vec2 vUv;
uniform float uTime;
uniform float uFixAspect;
uniform vec2 uMouse;
uniform float uMix;

float rnd(vec2 p){
    return fract(sin(dot(p ,vec2(12.9898,78.233))) * 43758.5453);
}

float rand(float n){
    return fract(sin(n) * 43758.5453123);
}

void main() {
    /* vUv = uv - .5; */
    /* vUv.y *= uFixAspect; */
    /* vUv += .5; */
    /* float nm = sin(uTime * 2.0); */

    // ランダム * l
    /* float l = rnd(vec2(position * nm)); */

    // ゆれ + l
    /* float l = position.y * nm; */
    /* l = l * 50.0; */
    float y = position.y + cos(uTime * 2.0) *0.1;
    float noize = snoise(vec2(50.0 * position.y + cos(uTime),1.0));
    /* gl_Position = vec4(position,1.0); */
    if(uMix == 0.1) {
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position.x + noize,position.y,position.z, 1.0 );
    } else {
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position.x * noize,position.y,position.z, 1.0 );
    }
}
