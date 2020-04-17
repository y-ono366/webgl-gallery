varying vec2 vUv;
uniform sampler2D uTex;
uniform float  uTime;


float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

void main() {
  // float shift = tan(uTime) * 0.0003;

  float shift = rand(gl_FragCoord.xy * uTime)  * 0.01;
  float r = texture2D( uTex, vUv + vec2( shift, 0.01 ) ).r;
  float g = texture2D( uTex, vUv + vec2(0.001,0.0) ).g;
  float b = texture2D( uTex, vUv - vec2( shift, 0.0 ) ).b;

  vec3 color = vec3( r, g, b );
  gl_FragColor = vec4(color, 1.0);
}
