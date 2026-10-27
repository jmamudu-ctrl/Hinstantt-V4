import React from 'react';
import { DOTS } from '../pages/About.jsx';

// An oversized dotted globe for the track record: it rises from below the section so only its
// upper curve shows, turns slowly, and money moves between hubs as arcs lifting off the surface
// with a bright pulse running along each. Canvas; pauses off screen; one still frame under
// reduced motion.

// the About map is equirectangular: these fit its pixel grid to longitude / latitude
const toLL = ([x, y]) => [(x - 465.5) / 2.74 - 0.1, 51.5 - (y - 78.5) / 2.753];

// land dots, densified with midpoints between neighbouring map dots so the land reads up close
const LAND = (() => {
  const key = (x, y) => `${x.toFixed(1)},${y.toFixed(1)}`;
  const set = new Set(DOTS.map(([x, y]) => key(x, y)));
  const out = DOTS.map(toLL);
  DOTS.forEach(([x, y]) => {
    if (set.has(key(x + 10.4, y))) out.push(toLL([x + 5.2, y]));
    const below = DOTS.find(([bx, by]) => Math.abs(bx - x) < 0.2 && Math.abs(by - (y + 10.45)) < 0.6);
    if (below) out.push(toLL([x, y + 5.2]));
  });
  return out;
})();

const HUBS = {
  ny: [-74, 40.7], tor: [-79.4, 43.7], mex: [-99.1, 19.4], sao: [-46.6, -23.5],
  lon: [-0.1, 51.5], fra: [8.7, 50.1], rig: [24.1, 56.9], lag: [3.4, 6.5], acc: [-0.2, 5.6],
  nbo: [36.8, -1.3], jnb: [28, -26.2], cai: [31.2, 30], dxb: [55.3, 25.2], bom: [72.9, 19.1], sin: [103.8, 1.35],
};
const ROUTES = [['ny', 'lon'], ['lon', 'lag'], ['tor', 'lon'], ['lon', 'rig'], ['ny', 'lag'], ['lag', 'nbo'], ['lon', 'dxb'], ['dxb', 'bom'],
  ['fra', 'jnb'], ['acc', 'sao'], ['mex', 'ny'], ['dxb', 'sin'], ['cai', 'nbo'], ['jnb', 'lon'], ['sao', 'ny'], ['lag', 'dxb']];

const rad = (d) => (d * Math.PI) / 180;
const vec = ([lon, lat]) => [Math.cos(rad(lat)) * Math.sin(rad(lon)), Math.sin(rad(lat)), Math.cos(rad(lat)) * Math.cos(rad(lon))];

// points along the great circle from a to b, lifted towards the middle
const arc = (a, b, n = 48) => {
  const A = vec(a), B = vec(b);
  const dot = Math.max(-1, Math.min(1, A[0] * B[0] + A[1] * B[1] + A[2] * B[2]));
  const w = Math.acos(dot), s = Math.sin(w) || 1;
  const lift = 0.06 + w * 0.12;
  return Array.from({ length: n + 1 }, (_, i) => {
    const t = i / n, k1 = Math.sin((1 - t) * w) / s, k2 = Math.sin(t * w) / s, h = 1 + lift * Math.sin(Math.PI * t);
    return [(A[0] * k1 + B[0] * k2) * h, (A[1] * k1 + B[1] * k2) * h, (A[2] * k1 + B[2] * k2) * h];
  });
};
const LAND_V = LAND.map(vec);
const ARCS = ROUTES.map(([a, b], i) => ({ pts: arc(HUBS[a], HUBS[b]), off: i * 0.37 }));
const HUB_V = Object.values(HUBS).map(vec);

export default function Globe() {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const cv = ref.current, ctx = cv.getContext('2d');
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let W = 0, H = 0, dpr = 1, raf = 0, on = false, t0 = performance.now();
    const size = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      W = cv.clientWidth; H = cv.clientHeight;
      cv.width = W * dpr; cv.height = H * dpr;
    };
    const draw = (now) => {
      const t = (now - t0) / 1000;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      // phones: the stacked section is tall and narrow, so size from the width or it dwarfs the screen
      const narrow = W < 760;
      const R = narrow ? W * 1.05 : Math.max(W * 0.62, H * 0.95), cx = W * 0.5, cy = H + R * (narrow ? 0.25 : 0.42);
      const yaw = rad(-20 + t * 3.2), tilt = rad(-18);   // turn east, tip the north pole towards us
      const cy1 = Math.cos(yaw), sy1 = Math.sin(yaw), ct = Math.cos(tilt), st = Math.sin(tilt);
      const proj = ([x, y, z]) => {
        const x1 = x * cy1 + z * sy1, z1 = -x * sy1 + z * cy1;
        const y2 = y * ct - z1 * st, z2 = y * st + z1 * ct;
        return [cx + x1 * R, cy - y2 * R, z2];
      };
      // rim light
      const g = ctx.createRadialGradient(cx, cy, R * 0.9, cx, cy, R * 1.08);
      g.addColorStop(0, 'rgba(120,140,220,0)'); g.addColorStop(0.75, 'rgba(140,150,230,.10)'); g.addColorStop(1, 'rgba(140,150,230,0)');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, R * 1.08, 0, Math.PI * 2); ctx.fill();
      // land
      const ds = Math.max(1.6, R / 360);
      for (const v of LAND_V) {
        const [px, py, z] = proj(v);
        if (z <= 0 || py < -4 || py > H + 4) continue;
        ctx.fillStyle = `rgba(214,222,255,${(0.12 + z * 0.5).toFixed(3)})`;
        ctx.beginPath(); ctx.arc(px, py, ds / 2, 0, Math.PI * 2); ctx.fill();
      }
      // routes: a faint track, and a bright pulse travelling along it
      ctx.lineCap = 'round';
      for (const { pts, off } of ARCS) {
        const P = pts.map(proj);
        if (P[0][2] < -0.05 && P[P.length - 1][2] < -0.05) continue;
        ctx.strokeStyle = 'rgba(254,220,176,.16)'; ctx.lineWidth = 1;
        ctx.beginPath();
        let pen = false;
        for (const [x, y, z] of P) { if (z > -0.05) { pen ? ctx.lineTo(x, y) : ctx.moveTo(x, y); pen = true; } else pen = false; }
        ctx.stroke();
        const head = ((t * 0.28 + off) % 1.4);          // 0..1 travelling, then a short rest
        if (head > 1.15) continue;
        const n = P.length - 1, a = Math.max(0, Math.floor((head - 0.22) * n)), b = Math.min(n, Math.floor(head * n));
        for (let i = a; i < b; i++) {
          const [x0, y0, z0] = P[i], [x1, y1] = P[i + 1];
          if (z0 <= -0.05) continue;
          ctx.strokeStyle = `rgba(254,220,176,${(0.15 + 0.85 * (i - a) / Math.max(1, b - a)).toFixed(3)})`;
          ctx.lineWidth = 1.8;
          ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke();
        }
      }
      // hubs
      for (const v of HUB_V) {
        const [px, py, z] = proj(v);
        if (z <= 0.02) continue;
        ctx.fillStyle = 'rgba(254,220,176,.9)';
        ctx.beginPath(); ctx.arc(px, py, 2.2, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = 'rgba(254,220,176,.14)';
        ctx.beginPath(); ctx.arc(px, py, 7, 0, Math.PI * 2); ctx.fill();
      }
      if (on && !still) raf = requestAnimationFrame(draw);
    };
    size();
    draw(t0 + 4000);
    const ro = new ResizeObserver(() => { size(); draw(performance.now()); });
    ro.observe(cv);
    const io = new IntersectionObserver(([e]) => {
      on = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (on && !still) raf = requestAnimationFrame(draw);
    });
    io.observe(cv);
    return () => { ro.disconnect(); io.disconnect(); cancelAnimationFrame(raf); };
  }, []);
  return <canvas className="x-globe" ref={ref} aria-hidden="true" />;
}
