#pragma glslify: snoise = require('glsl-noise/simplex/2d')
varying vec2 vUv;
uniform sampler2D uTex;
uniform float  uTime;

void main() {
  float shift = tan(uTime * 3.0 + sin(uTime * 4.0)) * 0.001;

  float y = gl_FragCoord.y + cos(uTime * 2.0);
  float noize = snoise(vec2(y * 50.0,0.0));

  float r = texture2D( uTex, vUv + vec2(shift * noize - 0.003,0.003 * noize)).r;
  float g = texture2D( uTex, vUv + vec2(0.0,0.001 * noize)).g;
  float b = texture2D( uTex, vUv + vec2(shift * noize + 0.003, -0.003 * noize)).b;

  vec3 color = vec3( r , g, b );
  gl_FragColor = vec4(color, 1.0);
}
