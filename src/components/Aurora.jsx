import React from 'react';

// Northern lights on an ink-blue night sky: curtains of light hang from the top of the
// section, sway and lean like rays seen from below, with fine rays inside them and
// brightness streaming down to a soft ragged lower edge. Loops seamlessly.

const LOOP = 30;   // seconds
const FPS = 30;

const FRAG = `
precision mediump float;
uniform vec2 uRes;
uniform float uT;          // 0..1 around the loop
uniform float uLight;      // 1 = light variant: off-white sky, the curtains in the hero's blues and pinks
const float TAU = 6.2831853;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise(vec2 p){
  vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), f.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), f.x), f.y);
}
// looping noise: blend two passes so the end meets the start
float lnoise(vec2 p, float t){ return mix(vnoise(p + t * 3.0), vnoise(p + (t - 1.0) * 3.0), t); }

void main(){
  vec2 uv = gl_FragCoord.xy / uRes;                  // y is 1 at the top
  float a = TAU * uT;

  // curtains hang from the top and lean like rays seen from below: the lower you go,
  // the further they sway
  float lean = 1.0 - uv.y;
  float x = uv.x * 5.0
          + 0.65 * lean * sin(a + uv.y * 2.0)
          + 0.22 * sin(a * 2.0 + uv.y * 5.0 + 1.0)
          + 0.30 * (lnoise(vec2(uv.y * 2.0, 3.0), uT) - 0.5);

  // three curtains drifting across, each breathing on its own
  float band = 0.0;
  band += exp(-pow((x - 1.2 - 0.5 * sin(a + 0.3)) * 1.7, 2.0)) * (0.80 + 0.20 * sin(a * 2.0));
  band += exp(-pow((x - 2.6 - 0.6 * sin(a + 2.4)) * 1.3, 2.0)) * (0.70 + 0.30 * cos(a + 1.0));
  band += exp(-pow((x - 3.9 - 0.45 * cos(a + 4.6)) * 1.6, 2.0)) * (0.65 + 0.35 * sin(a * 3.0 + 0.5));

  // fine rays inside each curtain, brightness streaming down them, a ragged lower edge
  float rays = 0.6 + 0.4 * lnoise(vec2(x * 9.0, uv.y * 1.5), uT);
  float stream = 0.6 + 0.4 * lnoise(vec2(x * 2.0, uv.y * 3.0 + 4.0), uT);
  float top = smoothstep(0.25, 0.92, uv.y + 0.22 * (lnoise(vec2(x * 1.5, 7.0), uT) - 0.5));
  float glow = clamp(band * rays * stream * top, 0.0, 1.0);

  vec3 col;
  if (uLight > 0.5) {
    // the day sky: the site's off-white; the curtains are the hero's blues and pinks,
    // painted in (not added), deepening toward each ray's core
    vec3 BASE = vec3(0.969, 0.973, 0.980);
    vec3 BLUE = vec3(0.40, 0.62, 1.00);
    vec3 SKY  = vec3(0.66, 0.82, 1.00);
    vec3 PINK = vec3(0.96, 0.76, 0.94);
    vec3 c = mix(BLUE, SKY, smoothstep(0.3, 0.65, uv.y));
    c = mix(c, PINK, smoothstep(0.6, 0.97, uv.y));
    col = mix(BASE, c, glow * 0.85);
    col = mix(col, BLUE, pow(glow, 3.0) * 0.25);
  } else {
    // the night sky: ink blue, a touch lighter where the curtains hang
    vec3 INK   = vec3(0.004, 0.082, 0.129);           // #001521
    vec3 SKYUP = vec3(0.03, 0.14, 0.26);
    col = mix(INK, SKYUP, smoothstep(0.2, 1.0, uv.y) * 0.8);
    // the light: blue low in the curtain, white-lavender core, pink at the very top
    vec3 BLUE = vec3(0.36, 0.60, 1.00);
    vec3 CORE = vec3(0.90, 0.92, 1.00);
    vec3 PINK = vec3(1.00, 0.72, 0.92);
    vec3 c = mix(BLUE, CORE, smoothstep(0.35, 0.75, uv.y));
    c = mix(c, PINK, smoothstep(0.78, 1.0, uv.y) * 0.7);
    col += c * glow * 0.95;
    col += CORE * pow(glow, 3.0) * 0.5;                // hot cores on the brightest rays
  }

  gl_FragColor = vec4(col, 1.0);
}
`;

export default function Aurora({ className = '', light = false }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const canvas = ref.current;
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' });
    if (!gl) return;
    const sh = (type, src) => { const x = gl.createShader(type); gl.shaderSource(x, src); gl.compileShader(x); return x; };
    const vs = sh(gl.VERTEX_SHADER, 'attribute vec2 p;void main(){gl_Position=vec4(p,0.0,1.0);}');
    const fs = sh(gl.FRAGMENT_SHADER, FRAG);
    const prog = gl.createProgram();
    gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    const uRes = gl.getUniformLocation(prog, 'uRes');
    const uT = gl.getUniformLocation(prog, 'uT');
    gl.uniform1f(gl.getUniformLocation(prog, 'uLight'), light ? 1 : 0);

    const scale = Math.min(window.devicePixelRatio || 1, 1.5) * 0.6;   // it is all soft; render small
    const resize = () => {
      const w = Math.max(1, Math.round(canvas.clientWidth * scale));
      const h = Math.max(1, Math.round(canvas.clientHeight * scale));
      if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uRes, w, h);
    };
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const start = performance.now();
    let raf = 0, last = 0, visible = true;
    const draw = (now) => {
      gl.uniform1f(uT, reduce.matches ? 0.3 : (((now - start) / 1000) % LOOP) / LOOP);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    const tick = (now) => {
      raf = 0;
      if (!visible || document.hidden) return;
      if (now - last >= 1000 / FPS) { last = now; draw(now); }
      if (!reduce.matches) raf = requestAnimationFrame(tick);
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(tick); };
    const ro = new ResizeObserver(() => { resize(); draw(performance.now()); });
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) kick(); });
    io.observe(canvas);
    const onVis = () => { if (!document.hidden) kick(); };
    document.addEventListener('visibilitychange', onVis);
    resize(); draw(start); kick();
    return () => {
      cancelAnimationFrame(raf); ro.disconnect(); io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      gl.deleteBuffer(buf); gl.deleteProgram(prog); gl.deleteShader(vs); gl.deleteShader(fs);
    };
  }, [light]);
  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
