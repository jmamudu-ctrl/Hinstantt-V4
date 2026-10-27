import React from 'react';

// Animated fluted-glass backdrop for the hero: a soft S-shaped ribbon of brand blues
// and lavender drifts behind narrow vertical glass ribs. Each rib shows a squeezed,
// sheared slice of the ribbon, so its edges step from rib to rib and the colour
// deepens towards each rib's edge before cutting off. Ribs are grouped into RIBS
// columns whose seams sit on the site grid (the header's logo and CTA edges).
// Every motion is a whole-number multiple of one cycle, so the loop is seamless.
// The static hero-bg-gradient.webp underneath stays as the fallback.

const LOOP_SECONDS = 22;
const FPS = 30;
const RIBS = 8;             // grid columns, aligned to the header's logo and CTA
const RIBS_PER_COLUMN = 1;  // glass ribs inside each column (1 = one rib per column)

const VERT = `
attribute vec2 p;
void main(){ gl_Position = vec4(p, 0.0, 1.0); }
`;

const FRAG = `
precision mediump float;
uniform vec2 uRes;
uniform float uPhase;   // 0..1 around the loop
uniform float uRib;     // grid column width in device px: content width / RIBS
uniform float uL;       // outer rib edges in device px (header content edges + grid inset)
uniform float uR;
uniform float uDark;    // 1 = dark variant: navy base, light seams, no calm area
uniform float uHue;     // hue rotation of the ribbon, radians
uniform float uOrient;  // 1 = rises left->right, -1 = falls; scales the S
uniform float uLift;    // where the ribbon sits vertically (0..1)

const float TAU = 6.2831853;
const float FINE = ${RIBS_PER_COLUMN}.0;
const vec3 BASE  = vec3(0.969, 0.973, 0.980);  // off-white, as the original hero
const vec3 AZURE = vec3(0.420, 0.800, 1.000);  // #6bccff
const vec3 BLUE  = vec3(0.330, 0.580, 1.000);  // #5494ff
const vec3 LAV   = vec3(0.610, 0.580, 0.980);  // #9c94fa
const vec3 INK   = vec3(0.000, 0.082, 0.129);  // #001521, logo navy

float hash(vec2 p){ return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
float tanh1(float t){ t = clamp(t, -4.0, 4.0); float e = exp(2.0 * t); return (e - 1.0) / (e + 1.0); }
vec3 hueRotate(vec3 c, float a){
  const vec3 k = vec3(0.57735);
  float cs = cos(a), sn = sin(a);
  return c * cs + cross(k, c) * sn + k * dot(k, c) * (1.0 - cs);
}

// the ribbon: colour (rgb) and coverage (a) at uv
vec4 ribbon(vec2 uv){
  float a = TAU * uPhase;
  // S-curve centre line rising from lower left to upper right, gently breathing
  float x0  = 0.50 + 0.07 * sin(a);
  float amp = (0.19 + 0.05 * sin(a * 2.0 + 1.0)) * uOrient;
  float yc  = uLift + amp * tanh1((uv.x - x0) / 0.13) + 0.035 * sin(a + uv.x * 4.0);
  float th  = 0.12 + 0.035 * sin(a + uv.x * 3.0 + 0.8);  // half-thickness
  float s   = (uv.y - yc) / th;                         // -1 bottom .. 1 top of band

  // fade out towards both ends so the ribbon floats in white space
  float env = exp(-pow((uv.x - 0.50) / 0.42, 4.0));
  float cov = exp(-s * s) * env;

  // azure underneath, blue core, lavender on top; hues slide along the ribbon
  float drift = 0.25 * sin(a + uv.x * 3.0);
  vec3 c = mix(AZURE, BLUE, smoothstep(-1.3, 0.0 + drift, s));
  c = mix(c, LAV, smoothstep(0.0 + drift, 1.3, s));
  c = clamp(hueRotate(c, uHue), 0.0, 1.0);
  return vec4(c, cov);
}

void main(){
  vec2 frag = gl_FragCoord.xy;
  vec3 base = mix(BASE, vec3(0.012, 0.051, 0.106), uDark);   // off-white or deep navy
  vec3 seam = mix(INK, vec3(1.0), uDark);                    // seams: navy shadow or light

  vec3 col;
  bool inGrid = frag.x >= uL && frag.x < uR;
  if (inGrid) {
    // equal ribs across the grid only
    float rw = uRib / FINE;
    float k  = (frag.x - uL) / rw;
    float i  = floor(k);
    float u  = fract(k);                       // 0 at a rib's left edge, 1 at its right

    // each rib squeezes its slice (vertical streaks) and shears it upward across its
    // width, so the ribbon's edges step from one rib to the next
    float sx = uL + (i + 0.5 + (u - 0.5) * 0.45) * rw;
    float sy = frag.y + (u - 0.5) * rw * 0.5;
    vec4 rb = ribbon(vec2(sx, sy) / uRes);

    // glow: colour builds towards the rib's right edge, soft and pale on the left,
    // then cuts off at the seam
    float build = 0.55 + 0.65 * pow(u, 1.6);
    vec3 c = mix(rb.rgb, vec3(1.0), 0.18 * (1.0 - u));
    col = mix(base, c, clamp(rb.a * build, 0.0, 1.0));

    // faint shadow (light on dark) into each grid seam
    float d = uRib - mod(frag.x - uL, uRib);   // px to the next seam on the right
    float halfRib = uRib * 0.5;
    if (d < halfRib) {
      float nx = 1.0 - d / halfRib;
      float rim = pow(1.0 - sqrt(max(0.0, 1.0 - nx * nx)), 3.0);
      col = mix(col, seam, (0.05 + 0.03 * uDark) * rim);
    }
  } else {
    // plain margin outside the grid: the ribbon unrefracted, no ribs
    vec4 rb = ribbon(frag / uRes);
    col = mix(base, rb.rgb, rb.a * 0.8);
  }
  // hairline on the outer rib edges
  float edge = min(abs(frag.x - uL), abs(frag.x - uR));
  // (no hairline on the outer rib edges)

  // keep the area behind the headline calm (top centre)
  vec2 q = frag / uRes;
  float calm = (1.0 - smoothstep(0.15, 0.38, abs(q.x - 0.5))) * smoothstep(0.50, 0.78, q.y);
  col = mix(col, base, 0.45 * calm * (1.0 - uDark));

  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl, type, src) {
  const s = gl.createShader(type);
  gl.shaderSource(s, src);
  gl.compileShader(s);
  return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
}

export default function FlutedBackground({ className = '', dark = false, hue = 0, orient = 1, lift = 0.56, ribs = RIBS }) {
  // targets for the eased controls (hue in degrees)
  const want = React.useRef({ hue, orient, lift });
  React.useEffect(() => { want.current = { hue, orient, lift }; }, [hue, orient, lift]);
  const canvasRef = React.useRef(null);
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas && canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' });
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'p');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, 'uRes');
    const uPhase = gl.getUniformLocation(prog, 'uPhase');
    const uRib = gl.getUniformLocation(prog, 'uRib');
    const uL = gl.getUniformLocation(prog, 'uL');
    const uR = gl.getUniformLocation(prog, 'uR');
    gl.uniform1f(gl.getUniformLocation(prog, 'uDark'), dark ? 1 : 0);
    const uHue = gl.getUniformLocation(prog, 'uHue'), uOrient = gl.getUniformLocation(prog, 'uOrient'), uLift = gl.getUniformLocation(prog, 'uLift');
    const cur = { ...want.current };

    // the image is soft, so render below device resolution to save battery
    const scale = Math.min(window.devicePixelRatio || 1, 1.5) * 0.75;
    const resize = () => {
      const w = Math.max(1, Math.round(canvas.clientWidth * scale));
      const h = Math.max(1, Math.round(canvas.clientHeight * scale));
      if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uRes, w, h);
      // the outer rib edges sit --grid-inset outside the header's content edges
      // (logo left, CTA right), so the ribs are the site grid at every width
      const box = canvas.getBoundingClientRect();
      const bar = ribs === RIBS ? document.querySelector('.nav-bar') : null;   // a custom rib count spans the canvas
      let left = 0, right = box.width;
      if (bar) {
        const r = bar.getBoundingClientRect(), cs = getComputedStyle(bar);
        const inset = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--grid-inset')) || 0;
        left = r.left + parseFloat(cs.paddingLeft) - inset - box.left;
        right = r.right - parseFloat(cs.paddingRight) + inset - box.left;
      }
      const k = w / box.width;
      gl.uniform1f(uL, left * k);
      gl.uniform1f(uR, right * k);
      gl.uniform1f(uRib, (right - left) * k / ribs);
    };

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const start = performance.now();
    let raf = 0, last = 0, visible = true, first = true;

    const draw = (now) => {
      const phase = reduce.matches ? 0.15 : (((now - start) / 1000) % LOOP_SECONDS) / LOOP_SECONDS;
      gl.uniform1f(uPhase, phase);
      for (const k of ['hue', 'orient', 'lift']) cur[k] += (want.current[k] - cur[k]) * 0.06;   // ease to the new look
      gl.uniform1f(uHue, cur.hue * Math.PI / 180); gl.uniform1f(uOrient, cur.orient); gl.uniform1f(uLift, cur.lift);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (first) { first = false; setReady(true); }
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
    reduce.addEventListener('change', kick);

    resize();
    draw(start);
    kick();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      reduce.removeEventListener('change', kick);
      // free our objects but keep the context: StrictMode remounts on the same canvas
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, [dark]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`hg-fluted ${ready ? 'is-ready' : ''} ${className}`}
    />
  );
}
