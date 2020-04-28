#pragma glslify: noise = require('glsl-noise/simplex/2d')
varying vec2 vUv;
uniform sampler2D uTex;
uniform float  uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;

/* float rand(vec2 co){ */
/*     return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453); */
/* } */
float rnd(vec2 p){
  return fract(sin(dot(p ,vec2(12.9898,78.233))) * 43758.5453);
}

void main( void ) {

    float t = tan(uTime * 2.0);
    vec2  vuv =  vUv;
    /* float l = rnd(vUv * abs(sin(uTime))); */
    /* float l = rnd(vec2(0.1 *t,0.2 * t)); */
    /* float up = sin(gl_FragCoord.y * 0.2 + uTime * 2.0 + uMouse.x) * 0.02; */
    /* vuv.x = uMouse.x; */
    /* vuv.y = uMouse.y; */
    /* float l = noise(gl_FragCoord.x * t); */
    /* float l = noise(gl_FragCoord.x * vUv * sin(uTime)); */
    /* vec4 color = texture2D(uTex, vec2(abs(vUv.x * l),abs(vUv.y + l))); */
    /* float r = gl_FragCoord.x * vUv.r */
    /* vec3 color = vec3(1.0); */
  /* vec3 color = texture2D( uTex, vUv ).rgb;// texture2D() でテクスチャのuv座標地点の色 rgba を取得 */
  vec3 color = vec3(0.62);

  gl_FragColor = vec4(color,1.0);
}
