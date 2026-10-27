import React from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

// A minted metal coin with the Hinstantt logomark struck on both faces and a reeded edge,
// rendered in three.js. It spins in fast, eases to a slow turn and catches the light as it goes.
// `tone` picks the alloy. Loaded lazily (three is large) and only while a page peek is open.

const ALLOYS = {
  gold: { color: '#f2c46e', rough: 0.17 },
  rose: { color: '#eaa58c', rough: 0.19 },
  copper: { color: '#d27a4c', rough: 0.21 },
  silver: { color: '#dcdce2', rough: 0.15 },
};

// the logomark as two shapes, centred and normalised to unit height (SVG y runs down, so flip)
const markShapes = () => {
  const W = 205.427, H = 177.033;
  const pt = (x, y) => new THREE.Vector2((x - W / 2) / H, (H / 2 - y) / H);
  const shape = (pts) => { const s = new THREE.Shape(); pts.forEach((p, i) => (i ? s.lineTo(p.x, p.y) : s.moveTo(p.x, p.y))); return s; };
  return [
    shape([pt(177.5, 0), pt(133.478, 0), pt(133.478, H), pt(177.5, H), pt(205.427, 88.5184)]),
    shape([pt(0, 0), pt(0, H), pt(44.0219, H), pt(133.477, 88.5184), pt(44.0219, 0)]),
  ];
};

function buildCoin(alloy) {
  const group = new THREE.Group();
  const mat = new THREE.MeshPhysicalMaterial({ color: alloy.color, metalness: 1, roughness: alloy.rough, clearcoat: 0.35, clearcoatRoughness: 0.3 });
  const field = mat.clone(); field.roughness = alloy.rough + 0.22;   // the struck field is a touch duller than the relief

  const R = 1, T = 0.16;
  // body with a reeded edge: push side vertices in and out around the rim
  const body = new THREE.CylinderGeometry(R, R, T, 360, 1, false);
  const p = body.attributes.position, v = new THREE.Vector3();
  for (let i = 0; i < p.count; i++) {
    v.fromBufferAttribute(p, i);
    const r = Math.hypot(v.x, v.z);
    if (r > R * 0.999 && Math.abs(v.y) < T / 2 + 1e-4) {
      const a = Math.atan2(v.z, v.x), k = 1 + 0.012 * Math.sign(Math.sin(a * 120));
      p.setXYZ(i, v.x * k, v.y, v.z * k);
    }
  }
  body.computeVertexNormals();
  body.rotateX(Math.PI / 2);
  group.add(new THREE.Mesh(body, field));

  // raised rim and the logomark in relief, on both faces
  const rim = new THREE.TorusGeometry(R * 0.9, 0.035, 16, 160);
  const markGeo = new THREE.ExtrudeGeometry(markShapes(), { depth: 0.035, bevelEnabled: true, bevelThickness: 0.012, bevelSize: 0.01, bevelSegments: 3 });
  markGeo.scale(0.82, 0.82, 1);
  [1, -1].forEach((side) => {
    const r = new THREE.Mesh(rim, mat); r.position.z = side * T / 2; group.add(r);
    const m = new THREE.Mesh(markGeo, mat);
    m.position.z = side * (T / 2 - 0.002);
    if (side < 0) m.rotation.y = Math.PI;
    group.add(m);
  });
  return group;
}

// ── one object per product, all in the same minted metal ──────────────────────────────────
const metal = (alloy, dull = 0) => new THREE.MeshPhysicalMaterial({ color: alloy.color, metalness: 1, roughness: alloy.rough + dull, clearcoat: 0.35, clearcoatRoughness: 0.3 });
const rounded = (w, h, r) => {
  const s = new THREE.Shape(), x = -w / 2, y = -h / 2;
  s.moveTo(x + r, y); s.lineTo(x + w - r, y); s.quadraticCurveTo(x + w, y, x + w, y + r); s.lineTo(x + w, y + h - r);
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h); s.lineTo(x + r, y + h); s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y); return s;
};
const slab = (shape, depth, bevel = 0.02) => {
  const g = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: true, bevelThickness: bevel, bevelSize: bevel, bevelSegments: 3, curveSegments: 24 });
  g.translate(0, 0, -depth / 2); return g;
};
const mark = (scale, depth = 0.03) => {
  const g = new THREE.ExtrudeGeometry(markShapes(), { depth, bevelEnabled: true, bevelThickness: 0.01, bevelSize: 0.008, bevelSegments: 2 });
  g.scale(scale, scale, 1); return g;
};
const box = (w, h, d, m) => new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m);
const lines = (group, m, x0, y0, widths, gap, z) => widths.forEach((w, i) => { const b = box(w, 0.045, 0.02, m); b.position.set(x0 + w / 2, y0 - i * gap, z); group.add(b); });

// corporate cards: a metal card with a chip and the mark
function buildCard(alloy) {
  const g = new THREE.Group(), m = metal(alloy), f = metal(alloy, 0.2);
  g.add(new THREE.Mesh(slab(rounded(1.9, 1.2, 0.12), 0.05), f));
  const chip = new THREE.Mesh(slab(rounded(0.32, 0.24, 0.05), 0.02, 0.008), metal(ALLOYS.gold, 0.05));
  chip.position.set(-0.55, 0.08, 0.04); g.add(chip);
  const mk = new THREE.Mesh(mark(0.34), m); mk.position.set(0.62, 0.32, 0.03); g.add(mk);
  lines(g, m, -0.75, -0.3, [0.28, 0.28, 0.28, 0.28].map(() => 0.24), 0, 0.04);
  [0, 1, 2, 3].forEach((i) => { const b = box(0.24, 0.05, 0.02, m); b.position.set(-0.7 + i * 0.3, -0.32, 0.04); g.add(b); });
  return g;
}

// travel: a plane
function buildPlane(alloy) {
  const g = new THREE.Group(), m = metal(alloy), f = metal(alloy, 0.12);
  const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.16, 1.5, 8, 32), m); body.rotation.z = Math.PI / 2; g.add(body);
  const wing = new THREE.Shape(); wing.moveTo(-0.15, 0); wing.lineTo(0.2, 0); wing.lineTo(-0.15, 0.95); wing.lineTo(-0.35, 0.95); wing.closePath();
  const wg = slab(wing, 0.04, 0.012);
  [1, -1].forEach((sd) => { const w = new THREE.Mesh(wg, f); w.rotation.x = -Math.PI / 2; w.scale.y = sd; w.position.set(0.05, -0.02, 0); g.add(w); });
  const tail = new THREE.Shape(); tail.moveTo(0, 0); tail.lineTo(0.3, 0); tail.lineTo(0.05, 0.42); tail.lineTo(-0.08, 0.42); tail.closePath();
  const fin = new THREE.Mesh(slab(tail, 0.03, 0.01), f); fin.position.set(-0.86, 0.08, 0); g.add(fin);
  const st = new THREE.Shape(); st.moveTo(0, 0); st.lineTo(0.2, 0); st.lineTo(0, 0.36); st.lineTo(-0.1, 0.36); st.closePath();
  const sg = slab(st, 0.025, 0.008);
  [1, -1].forEach((sd) => { const w = new THREE.Mesh(sg, f); w.rotation.x = -Math.PI / 2; w.scale.y = sd; w.position.set(-0.8, 0.02, 0); g.add(w); });
  g.rotation.set(0.5, 0, 0.12); g.scale.setScalar(1.1);
  const wrap = new THREE.Group(); wrap.add(g); return wrap;
}

// expense: a receipt with a torn, zigzag foot
function buildReceipt(alloy) {
  const g = new THREE.Group(), m = metal(alloy), f = metal(alloy, 0.18);
  const s = new THREE.Shape(), w = 1.1, h = 1.7;
  s.moveTo(-w / 2, h / 2); s.lineTo(w / 2, h / 2); s.lineTo(w / 2, -h / 2);
  for (let i = 0; i < 8; i++) { const x = w / 2 - (i + 0.5) * (w / 8); s.lineTo(x, -h / 2 + 0.08); s.lineTo(x - w / 16, -h / 2); }
  s.closePath();
  g.add(new THREE.Mesh(slab(s, 0.04, 0.01), f));
  const mk = new THREE.Mesh(mark(0.26), m); mk.position.set(0, 0.55, 0.03); g.add(mk);
  lines(g, m, -0.38, 0.22, [0.76, 0.5, 0.64, 0.42], 0.17, 0.035);
  const tot = box(0.76, 0.08, 0.02, m); tot.position.set(0, -0.52, 0.035); g.add(tot);
  return g;
}

// accounts: a vault door
function buildVault(alloy) {
  const g = new THREE.Group(), m = metal(alloy), f = metal(alloy, 0.2);
  const door = new THREE.CylinderGeometry(1, 1, 0.22, 96); door.rotateX(Math.PI / 2); g.add(new THREE.Mesh(door, f));
  [0.93, 0.62].forEach((r) => { const t = new THREE.Mesh(new THREE.TorusGeometry(r, 0.035, 16, 120), m); t.position.z = 0.11; g.add(t); });
  const hub = new THREE.CylinderGeometry(0.17, 0.17, 0.14, 48); hub.rotateX(Math.PI / 2);
  const h = new THREE.Mesh(hub, m); h.position.z = 0.16; g.add(h);
  for (let i = 0; i < 3; i++) { const sp = box(0.9, 0.07, 0.07, m); sp.rotation.z = (i * Math.PI) / 3; sp.position.z = 0.2; g.add(sp); }
  for (let i = 0; i < 12; i++) { const a = (i / 12) * Math.PI * 2; const b = new THREE.Mesh(new THREE.SphereGeometry(0.04, 16, 16), m); b.position.set(Math.cos(a) * 0.78, Math.sin(a) * 0.78, 0.12); g.add(b); }
  const back = new THREE.Mesh(mark(0.6), m); back.position.z = -0.12; back.rotation.y = Math.PI; g.add(back);
  return g;
}

// treasury: stacked bullion bars
function buildBars(alloy) {
  const g = new THREE.Group(), m = metal(alloy);
  const bar = new THREE.CylinderGeometry(0.42 * Math.SQRT1_2, 0.56 * Math.SQRT1_2, 0.3, 4, 1); bar.rotateY(Math.PI / 4); bar.scale(1.7, 1, 1);
  [[-0.5, -0.32], [0.5, -0.32], [0, 0]].forEach(([x, y]) => {
    const b = new THREE.Mesh(bar, m); b.position.set(x, y, 0); g.add(b);
    const mk = new THREE.Mesh(mark(0.2, 0.02), m); mk.rotation.x = -Math.PI / 2; mk.position.set(x, y + 0.15, 0); g.add(mk);
  });
  g.position.y = 0.12; g.rotation.x = 0.35; g.scale.setScalar(1.25);
  const wrap = new THREE.Group(); wrap.add(g); return wrap;
}

// stablecoin: a short stack of coins
function buildStack(alloy) {
  const g = new THREE.Group();
  [[0, -0.36, 0.2], [0.05, -0.18, -0.4], [-0.03, 0, 1]].forEach(([x, y, r]) => {
    const c = buildCoin(alloy); c.scale.setScalar(0.72); c.rotation.x = Math.PI / 2; c.rotation.z = r; c.position.set(x, y, 0); g.add(c);
  });
  g.rotation.x = 0.55; g.position.y = 0.1;
  const wrap = new THREE.Group(); wrap.add(g); return wrap;
}

// accounting: a closed ledger
function buildLedger(alloy) {
  const g = new THREE.Group(), m = metal(alloy), f = metal(alloy, 0.2), pages = metal(ALLOYS.silver, 0.25);
  const cover = slab(rounded(1.3, 1.65, 0.06), 0.05, 0.01);
  const c1 = new THREE.Mesh(cover, f); c1.position.z = 0.17; g.add(c1);
  const c2 = new THREE.Mesh(cover, f); c2.position.z = -0.17; g.add(c2);
  const pg = box(1.22, 1.56, 0.29, pages); pg.position.x = 0.03; g.add(pg);
  const spine = new THREE.CylinderGeometry(0.2, 0.2, 1.65, 32, 1, false, Math.PI, Math.PI); 
  const sp = new THREE.Mesh(spine, f); sp.position.x = -0.62; g.add(sp);
  const mk = new THREE.Mesh(mark(0.42), m); mk.position.set(0.05, 0.2, 0.2); g.add(mk);
  [0.55, -0.55].forEach((y) => { const b = box(1.1, 0.06, 0.02, m); b.position.set(0.04, y, 0.205); g.add(b); });
  return g;
}

// procurement: a parcel, taped
function buildParcel(alloy) {
  const g = new THREE.Group(), m = metal(alloy), f = metal(alloy, 0.22);
  g.add(box(1.25, 1, 1.0, f));
  g.add(box(1.27, 1.02, 0.22, m)); g.add(box(0.22, 1.02, 1.02, m));
  const mk = new THREE.Mesh(mark(0.3), m); mk.position.set(0.32, 0.22, 0.5); g.add(mk);
  g.rotation.x = 0.3;
  const wrap = new THREE.Group(); wrap.add(g); return wrap;
}

// invoicing: an invoice page with a folded corner
function buildInvoice(alloy) {
  const g = new THREE.Group(), m = metal(alloy), f = metal(alloy, 0.18);
  const s = new THREE.Shape(), w = 1.2, h = 1.6, k = 0.32;
  s.moveTo(-w / 2, -h / 2); s.lineTo(w / 2, -h / 2); s.lineTo(w / 2, h / 2 - k); s.lineTo(w / 2 - k, h / 2); s.lineTo(-w / 2, h / 2); s.closePath();
  g.add(new THREE.Mesh(slab(s, 0.04, 0.01), f));
  const fold = new THREE.Shape(); fold.moveTo(w / 2 - k, h / 2); fold.lineTo(w / 2 - k, h / 2 - k); fold.lineTo(w / 2, h / 2 - k); fold.closePath();
  const fm = new THREE.Mesh(slab(fold, 0.02, 0.006), m); fm.position.z = 0.035; g.add(fm);
  const mk = new THREE.Mesh(mark(0.24), m); mk.position.set(-0.3, 0.52, 0.03); g.add(mk);
  lines(g, m, -0.42, 0.12, [0.84, 0.6, 0.84, 0.5], 0.17, 0.035);
  const due = box(0.4, 0.12, 0.02, m); due.position.set(0.22, -0.6, 0.035); g.add(due);
  return g;
}

// reporting: a rising bar chart on a plinth
function buildChart(alloy) {
  const g = new THREE.Group(), m = metal(alloy), f = metal(alloy, 0.2);
  const base = box(1.7, 0.1, 0.6, f); base.position.y = -0.7; g.add(base); g.scale.setScalar(0.9);
  [0.45, 0.7, 0.6, 1.0, 1.35].forEach((h, i) => {
    const b = new THREE.Mesh(new THREE.BoxGeometry(0.24, h, 0.3), m); b.position.set(-0.64 + i * 0.32, -0.65 + h / 2, 0); g.add(b);
  });
  g.rotation.x = 0.22;
  const wrap = new THREE.Group(); wrap.add(g); return wrap;
}

// ai: a faceted gem
function buildGem(alloy) {
  const g = new THREE.Group();
  const m = metal(alloy); m.flatShading = true; m.roughness = Math.max(0.08, alloy.rough - 0.06);
  g.add(new THREE.Mesh(new THREE.IcosahedronGeometry(0.95, 1), m));
  return g;
}

const BUILD = { payments: buildCoin, 'corporate-cards': buildCard, travel: buildPlane, expense: buildReceipt, accounts: buildVault, treasury: buildBars,
  'stablecoin-ramp': buildStack, accounting: buildLedger, procurement: buildParcel, 'invoicing-billing': buildInvoice, reporting: buildChart, 'ai-financial-management': buildGem };

export default function Coin({ kind = 'payments', tone = 'gold', size = 180 }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const host = ref.current;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
    renderer.setSize(size, size);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.95;
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environmentIntensity = 0.55;   // a darker room, so the metal shows deep reflections as well as bright ones
    const key = new THREE.DirectionalLight('#fff1d8', 2.2); key.position.set(4, 4, 1.2); scene.add(key);
    const rimL = new THREE.DirectionalLight('#ff9a5c', 2.6); rimL.position.set(-3, -1, -2); scene.add(rimL);

    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 50);
    camera.position.set(0, 0, 4.6);
    const coin = (BUILD[kind] || buildCoin)(ALLOYS[tone] || ALLOYS.gold);
    coin.rotation.x = -0.18;
    scene.add(coin);

    let raf = 0;
    const t0 = performance.now();
    const frame = (now) => {
      const t = (now - t0) / 1000;
      // spins in fast and eases down to a slow, steady turn, with a gentle bob
      coin.rotation.y = still ? 0.55 : t * 1.1 + 5.5 * (1 - Math.exp(-t * 2.2));
      coin.rotation.z = still ? 0.12 : Math.sin(t * 1.3) * 0.08;
      coin.position.y = still ? 0 : Math.sin(t * 1.6) * 0.04;
      renderer.render(scene, camera);
      if (!still) raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      scene.traverse((o) => { o.geometry?.dispose(); o.material?.dispose?.(); });
      pmrem.dispose(); renderer.dispose();
      renderer.domElement.remove();
    };
  }, [kind, tone, size]);
  return <div className="x-coin" ref={ref} style={{ width: size, height: size }} aria-hidden="true" />;
}
