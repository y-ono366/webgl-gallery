varying vec2 vUv;
uniform sampler2D uTex;
uniform float  uTime;

void main() {
  float shift = tan(uTime * sin(uTime) * cos(uTime)) * 0.0003;
  float r = texture2D( uTex, vUv + vec2( shift, 0.01 ) ).r;
  float g = texture2D( uTex, vUv + vec2(0.001,0.0) ).g;
  float b = texture2D( uTex, vUv - vec2( shift, 0.0 ) ).b;

  vec3 color = vec3( r, g, b );
  gl_FragColor = vec4(color, 1.0);
}
