import React from 'react';
import { Scene } from './scenes.jsx';
import { STATS, VALUES, OFFICES, MAP_W, MAP_H, DOTS, PINS, ARCS, arcPath, LOGOS } from '../pages/About.jsx';
import { pad, Ph, useReveal, Closing, PageHero } from './kit.jsx';

// v3 about page. Copy and data come from pages/About.jsx unchanged.

const FLAGS = import.meta.glob('../assets/flags/*.svg', { eager: true, query: '?url', import: 'default' });
const flag = (c) => FLAGS[`../assets/flags/${c}.svg`];

// counts a figure up from zero the first time it scrolls into view
function Stat({ value, fmt }) {
  const ref = React.useRef(null);
  const [n, setN] = React.useState(value);
  React.useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    let raf = 0;
    setN(0);
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const step = (t) => { const p = Math.min(1, (t - t0) / 1500); setN(value * (1 - Math.pow(1 - p, 3))); if (p < 1) raf = requestAnimationFrame(step); else setN(value); };
      raf = requestAnimationFrame(step);
    }, { threshold: 0.6 });
    io.observe(ref.current);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [value]);
  return <span ref={ref}>{fmt(n)}</span>;
}

export default function About3() {
  useReveal();
  return (
    <main>
      <PageHero
        eyebrow="About Hinstantt"
        title={<>Building the operating system for <em>global money</em>.</>}
        sub="Cards, payments, treasury and accounting on one platform, run by agents that work 24/7 across 100+ markets."
        actions={<><a className="x-btn x-btn--dark" href="/contact">Get in touch</a><a className="x-btn x-btn--line" href="#believe">What we believe</a></>}
        media={<div className="x-pg-media x-rv"><Scene kind="feed" big /></div>}
      />

      {/* why we exist */}
      <section className="x-sec">
        <div className="x-wrap x-story">
          <div className="x-rv">
            <h2 className="x-h2">Why we exist.</h2>
          </div>
          <div className="x-story-body x-rv">
            <p>Finance is the one function still built for a single country. Most global teams run a different stack in every market: a bank here, a card program there, a spreadsheet holding it together, and a month-end scramble to make the numbers agree.</p>
            <p>Hinstantt collapses that into one platform. Cards, payments, treasury and accounting run across every market a business operates in, and AI agents handle the work that used to live in inboxes and reconciliations.</p>
            <p>We build for operators who are already global, because that is where money is hardest and the tools are weakest.</p>
            <blockquote className="x-pull"><span className="x-quote" aria-hidden="true">“</span>Finance should move at the speed of the business, not the other way around.</blockquote>
          </div>
        </div>
      </section>

      {/* numbers */}
      <section className="x-sec">
        <div className="x-wrap">
          <div className="x-metrics-grid x-rv">
            {STATS.map((st, i) => (
              <div key={st.label} className="x-metric">
                <span className="x-mono x-metric-i">{pad(i + 1)}</span>
                <b className="x-metric-v"><Stat value={st.value} fmt={st.fmt} /></b>
                <div><span className="x-metric-l">{st.label}</span><p className="x-metric-c">{st.ctx}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* values */}
      <section className="x-sec" id="believe">
        <div className="x-wrap">
          <div className="x-head x-rv">
            <div>
              <h2 className="x-h2">What we believe.</h2>
            </div>
          </div>
          <ol className="x-values x-rv">
            {VALUES.map((v, i) => (
              <li key={v.t}>
                <span className="x-mono x-values-n">{pad(i + 1)}</span>
                <h3>{v.t}</h3>
                <div>
                  <p>{v.d}</p>
                  <p className="x-values-p"><span className="x-mono">In practice</span>{v.p}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* coverage map */}
      <section className="x-sec">
        <div className="x-wrap">
          <div className="x-band x-map x-rv">
            <div className="x-band-in">
              <div className="x-head x-head--dark">
                <div>
                  <h2 className="x-band-h">Live in 100+ markets.</h2>
                </div>
                <p className="x-agent-line">Teams in five cities, money moving across Africa, Europe, the Americas and the Middle East.</p>
              </div>
              <svg className="x-map-svg" viewBox={`0 0 ${MAP_W} ${MAP_H}`} role="img" aria-label="Global coverage map">
                <g fill="rgba(255,255,255,.22)">{DOTS.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="1.7" />)}</g>
                <g fill="none" stroke="#00a9e0" strokeWidth="1" strokeLinecap="round" opacity=".8">
                  {ARCS.map(([a, b], i) => <path key={i} className="x-arc" d={arcPath(PINS[a], PINS[b])} pathLength="100" style={{ '--i': i }} />)}
                </g>
                {PINS.map((pin) => (
                  <g key={pin.c}>
                    <circle cx={pin.x} cy={pin.y} r="4" fill="#00a9e0" />
                    <circle cx={pin.x} cy={pin.y} r="1.6" fill="#fff" />
                    <text x={pin.x + pin.dx} y={pin.y + pin.dy} textAnchor={pin.la} fontFamily="'Geist Mono',monospace" fontSize="11" fill="#fff" style={{ textTransform: 'uppercase', letterSpacing: '.04em' }}>{pin.c}</text>
                  </g>
                ))}
              </svg>
              <div className="x-offices">
                {OFFICES.map((o) => (
                  <span key={o.city}><img src={flag(o.iso)} alt="" /><b>{o.city}</b><small className="x-mono">{o.region}</small></span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* investors */}
      <section className="x-sec">
        <div className="x-wrap">
          <div className="x-head x-rv">
            <div>
              <h2 className="x-h2">Backed by leading investors.</h2>
            </div>
            <p className="x-lead">We are building the infrastructure for global money, with investors who back category-defining companies.</p>
          </div>
          <div className="x-logos x-rv">
            {LOGOS.map((src, i) => <span key={i} className="x-logo"><img src={src} alt="" loading="lazy" /></span>)}
          </div>
        </div>
      </section>

      <Closing title="Come build with us." sub="We are growing the team behind the Finance OS for global operators." />
    </main>
  );
}
