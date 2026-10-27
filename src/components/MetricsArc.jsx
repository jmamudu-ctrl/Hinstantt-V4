import React from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldCheck, GlobeHemisphereWest, Buildings, ArrowsLeftRight } from './icons.jsx';
import Aurora from './Aurora.jsx';
import FlutedBackground from './FlutedBackground.jsx';
import './MetricsArc.css';

gsap.registerPlugin(ScrollTrigger);

// The numbers as nested domes: four half-circles sharing one baseline and left edge,
// smallest to largest, each carrying its figure. The largest holds the hero's fluted
// glass and drifting glow; the smaller ones stack over it as frosted glass, so the
// glass grows quieter towards the smallest. Captions with icons sit below. On entry
// the domes rise from the baseline one after another while the figures count up.

const METRICS = [
  { v: '20+',  l: 'Licenses',          Icon: ShieldCheck,         w: 0.34, c: 0.17 },
  { v: '100+', l: 'Markets',           Icon: GlobeHemisphereWest, w: 0.53, c: 0.435 },
  { v: '15K+',  l: 'Businesses',        Icon: Buildings,           w: 0.75, c: 0.64 },
  { v: '$20B', l: 'Annualized volume', Icon: null,     w: 1, c: 0.875 },
];

// the background: faint glowing circles of different sizes, drawn in when the section
// enters; where two cross, a small dot of light now and then lets go and falls
const RINGS = [[250, 300, 220], [560, 170, 300], [1190, 250, 270], [980, 560, 340], [1330, 660, 210], [130, 700, 270], [700, 860, 390]];
const CROSS = (() => {
  const pts = [];
  for (let a = 0; a < RINGS.length; a++) for (let b = a + 1; b < RINGS.length; b++) {
    const [x1, y1, r1] = RINGS[a], [x2, y2, r2] = RINGS[b];
    const d = Math.hypot(x2 - x1, y2 - y1);
    if (d > r1 + r2 || d < Math.abs(r1 - r2) || d === 0) continue;
    const l = (r1 * r1 - r2 * r2 + d * d) / (2 * d), h = Math.sqrt(Math.max(0, r1 * r1 - l * l));
    const mx = x1 + (l * (x2 - x1)) / d, my = y1 + (l * (y2 - y1)) / d;
    [[mx + (h * (y2 - y1)) / d, my - (h * (x2 - x1)) / d], [mx - (h * (y2 - y1)) / d, my + (h * (x2 - x1)) / d]]
      .forEach(([x, y]) => { if (x > 0 && x < 1440 && y > 0 && y < 900) pts.push([x, y]); });
  }
  return pts;
})();

function Rings({ on }) {
  const [drops, setDrops] = React.useState([]);
  React.useEffect(() => {
    if (!on || window.matchMedia('(prefers-reduced-motion: reduce)').matches || !CROSS.length) return undefined;
    let n = 0;
    const t = setInterval(() => {
      const [x, y] = CROSS[Math.floor(Math.random() * CROSS.length)];
      const id = n++;
      setDrops((d) => [...d.slice(-6), { id, x, y, fall: 90 + Math.random() * 140 }]);
    }, 1100);
    return () => clearInterval(t);
  }, [on]);
  return (
    <svg className="ma-rings" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {RINGS.map(([cx, cy, r], k) => (
        <g key={k} style={{ '--k': k }}>
          <circle className="ma-ring-ghost" cx={cx} cy={cy} r={r} />
          <circle className="ma-ring" cx={cx} cy={cy} r={r} pathLength="100" />
          <circle className="ma-ring-glint" cx={cx} cy={cy} r={r} pathLength="100" />
        </g>
      ))}
      {CROSS.map(([x, y], k) => <circle key={`x${k}`} className="ma-node" cx={x} cy={y} r="1.6" />)}
      {drops.map((d) => <circle key={d.id} className="ma-drop" cx={d.x} cy={d.y} r="2.2" style={{ '--fall': `${d.fall}px` }} />)}
    </svg>
  );
}

export default function MetricsArc() {
  const ref = React.useRef(null);
  const [inView, setInView] = React.useState(false);

  React.useEffect(() => {
    const split = (v) => { const m = v.match(/^([^\d]*)([\d.]+)(.*)$/); return { pre: m[1], n: parseFloat(m[2]), post: m[3] }; };
    const ctx = gsap.context(() => {
      ScrollTrigger.create({ trigger: ref.current, start: 'top 65%', once: true, onEnter: () => setInView(true) });
      gsap.utils.toArray('.ma-n').forEach((el) => {
        const i = Number(el.dataset.i);   // the DOM runs largest first; read each figure's own index
        const { pre, n, post } = split(METRICS[i].v);
        const unit = post.replace('+', '');
        const o = { n: 0 };
        el.textContent = `${pre}0${unit}`;
        gsap.to(o, {
          n, duration: 1.8, ease: 'power3.out', delay: 0.6 + i * 0.16,   // in step with each figure arriving
          scrollTrigger: { trigger: ref.current, start: 'top 65%', once: true },
          onUpdate: () => { el.textContent = `${pre}${Math.round(o.n)}${unit}`; },
          onComplete: () => { el.textContent = `${pre}${n}${unit}`; },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className={`r-sec ma ${inView ? 'is-in' : ''}`} ref={ref}>
      <Aurora className="ma-aurora" light />
      <Rings on={inView} />
      <div className="wrap ma-inner">
        <span className="ma-kicker" data-enter-follow>Track record</span>
        <h2 className="ma-title" data-enter>The agents behind the money global businesses move every day</h2>

        <div className="ma-domes-wrap">
          {/* the figures, in one frosted bar across the domes, cells divided by glowing lines */}
          <div className="ma-figs">
            {METRICS.map((m, i) => (
              <div key={m.v} className="ma-fig" style={{ '--i': i }}>
                <span className="ma-num">{m.Icon && <span className="ma-fig-ic"><m.Icon size={26} weight="fill" /></span>}<span className="ma-n" data-i={i}>{m.v.replace('+', '')}</span>{m.v.endsWith('+') && <span className="ma-plus">+</span>}</span>
                <span className="ma-desc">{m.l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
