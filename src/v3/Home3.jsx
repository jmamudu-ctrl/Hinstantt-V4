import React from 'react';
import { PRODUCTS, PRODUCT_ORDER, productHref } from '../data/products.js';
import inv1 from '../assets/investors/inv1.png';
import inv2 from '../assets/investors/inv2.png';
import inv3 from '../assets/investors/inv3.png';
import inv4 from '../assets/investors/inv4.png';
import inv5 from '../assets/investors/inv5.png';
import inv6 from '../assets/investors/inv6.png';
import inv7 from '../assets/investors/inv7.png';
import hero1080 from '../assets/hero/hero-1080.mp4';
import hero720 from '../assets/hero/hero-720.mp4';
import heroPoster from '../assets/hero/hero-poster.jpg';
import { SIGNUP, SALES, pad, Ph, Shot, Tile, Logomark, Arrow, Check, useReveal, Closing } from './kit.jsx';
import { Scene } from './scenes.jsx';
import { usePeek } from './peek.jsx';
import Globe from './globe.jsx';

// v3 homepage: a light, engineered layout (sage-grey neutrals, Geist + Geist Mono, hairline
// rules, numbered indexes, tile grids). All copy is carried over from the v2 homepage
// unchanged. Photos and films are grey placeholder blocks until the real assets land.

/* ── Hero ────────────────────────────────────────────────────────────────── */
// the brand film, muted and looping; phones get the 720p cut, reduced motion holds the
// first frame. Safari needs muted set on the element and an explicit play() to autoplay.
// It opens framed under the headline and, as the page scrolls toward it, grows to fill the
// screen: the film always renders full screen inside a pinned stage, and a clip-path inset
// shrinks from the framed box to nothing. Full screen lands just as the stage pins, holds
// for a beat, then the page scrolls on. Reduced motion keeps it framed.
const ease = (t) => t * t * (3 - 2 * t);

// once the film is full screen, a line along its foot cycles through each module's headline
const TICKER = PRODUCT_ORDER.map((slug) => [PRODUCTS[slug].name, PRODUCTS[slug].headline]);

function FilmTicker({ track }) {
  const [i, setI] = React.useState(0);
  React.useEffect(() => {
    let t = 0;
    const io = new IntersectionObserver(([en]) => {
      clearInterval(t);
      if (en.isIntersecting) t = setInterval(() => setI((k) => (k + 1) % TICKER.length), 2800);
    });
    io.observe(track.current);
    return () => { io.disconnect(); clearInterval(t); };
  }, [track]);
  return (
    <div className="x-ticker" aria-hidden="true">
      <span className="x-ticker-l x-mono">{pad(i + 1)} / {pad(TICKER.length)} · {TICKER[i][0]}</span>
      <div className="x-ticker-lines">
        {TICKER.map(([name, line], k) => (
          <p key={name} className={`x-ticker-line ${k === i ? 'is-on' : ''} ${k === (i - 1 + TICKER.length) % TICKER.length ? 'is-past' : ''}`}>{line}</p>
        ))}
      </div>
    </div>
  );
}

function HeroFilm() {
  const [small] = React.useState(() => window.matchMedia('(max-width: 900px)').matches);
  const [still] = React.useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const ref = React.useRef(null);
  const trackRef = React.useRef(null);
  const stageRef = React.useRef(null);

  React.useLayoutEffect(() => {
    if (still) return undefined;
    const track = trackRef.current, stage = stageRef.current;
    const update = () => {
      const vw = stage.clientWidth, vh = stage.clientHeight;
      // the framed box matches the page's content width and the hero's 16:7 (4:5 on phones)
      const g = Math.min(48, Math.max(16, vw * 0.04));
      const w = Math.min(vw, 1440) - 2 * g;
      const h = Math.min(vh, w * (vw <= 760 ? 5 / 4 : 7 / 16));
      const start = track.getBoundingClientRect().top + window.scrollY;
      const e = ease(start > 0 ? Math.min(1, Math.max(0, window.scrollY / start)) : 1);
      stage.style.setProperty('--x', `${((vw - w) / 2) * (1 - e)}px`);
      stage.style.setProperty('--b', `${(vh - h) * (1 - e)}px`);
      stage.style.setProperty('--rad', `${14 * (1 - e)}px`);
      stage.style.setProperty('--e', e.toFixed(3));
      // while the full-screen film sits under the nav, the nav turns white
      const r = track.getBoundingClientRect();
      document.documentElement.classList.toggle('x-on-film', e > 0.85 && r.top <= 0 && r.bottom > 68);
    };
    update();
    const onScroll = update;   // scroll events already arrive at most once a frame
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    // while on screen also check each frame: smooth scroll doesn't always fire a last event
    let loop = 0, lastY = -1;
    const tick = () => { if (window.scrollY !== lastY) { lastY = window.scrollY; update(); } loop = requestAnimationFrame(tick); };
    const io = new IntersectionObserver(([en]) => { cancelAnimationFrame(loop); if (en.isIntersecting) loop = requestAnimationFrame(tick); });
    io.observe(track);
    return () => {
      window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll);
      io.disconnect(); cancelAnimationFrame(loop);
      document.documentElement.classList.remove('x-on-film');
    };
  }, [still]);

  React.useEffect(() => {
    const v = ref.current;
    if (!v) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { v.pause(); return undefined; }
    v.muted = true; v.defaultMuted = true; v.setAttribute('muted', '');
    const tryPlay = () => { const p = v.play(); if (p && p.catch) p.catch(() => {}); };
    tryPlay();
    v.addEventListener('canplay', tryPlay, { once: true });
    return () => v.removeEventListener('canplay', tryPlay);
  }, []);
  return (
    <div className={`x-film-track ${still ? 'is-still' : ''}`} ref={trackRef}>
      <div className="x-film-stage" ref={stageRef}>
        <div className="x-film-clip">
          <video ref={ref} src={small ? hero720 : hero1080} poster={heroPoster} autoPlay muted loop playsInline preload="auto" aria-hidden="true" />
          {!still && <div className="x-film-scrim" />}
        </div>
        {!still && <FilmTicker track={trackRef} />}
        <span className="x-ph-tag x-mono">100+ Markets</span>
        <span className="x-ph-tag x-ph-tag--r x-mono">24/7</span>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="x-hero">
      <div className="x-wrap">
        <div className="x-hero-grid x-hero-grid--stack">
          <h1 className="x-hero-h x-rv">The finance <span className="x-os" data-text="OS">OS</span> that moves at the speed of decision</h1>
          <div className="x-hero-side x-rv">
            <p className="x-hero-sub">
              Cards, payments, treasury and accounting on one platform, with AI agents doing the
              work across 100+ markets. Built for global teams who refuse to wait for their own money.
            </p>
            <div className="x-actions">
              <a className="x-btn x-btn--dark" href={SIGNUP}>Get started</a>
              <a className="x-btn x-btn--line" href={SALES}>Talk to sales</a>
            </div>
          </div>
        </div>
      </div>
      {/* outside .x-wrap, so the film can grow to the screen's edges */}
      <HeroFilm />
    </section>
  );
}

/* ── Agents: a horizontal scroll. The section pins and the page's vertical scroll slides a
   row of panels sideways, one pixel for one pixel: the headline, a panel per step (a tall
   image with a slow parallax, then its number, title and line), and the agents. Panels sit
   alternately high and low. The track's height is set from the row's width. On phones the
   row stacks into a plain vertical column and nothing pins (see MOBILE_HS). ───────────── */
const MOBILE_HS = '(max-width: 760px)';
const STEPS = [
  ['A signal from a module', 'A card swipe, an invoice, a payment due, a balance that dips. Every module hands it to its agent the moment it happens.'],
  ['The agent reads it against your rules', 'Policy, limits and history. The same check every time, in milliseconds, with no inbox in the way.'],
  ['Within policy it acts. Outside, it asks you', 'In bounds, the agent pays, codes, reconciles or moves the funds. Out of bounds, you get a one-tap approval.'],
  ['Everything lands in your cockpit', 'Every action is logged in one live picture of the business. You keep the approvals, the limits and full visibility.'],
];
const STEP_SCENES = ['events', 'cards', 'approve', 'feed'];
const AGENTS = ['Policy agent', 'Payments agent', 'Expense agent', 'Travel agent', 'Treasury agent', 'Ramp agent', 'Close agent', 'Procurement agent', 'Billing agent', 'Insight agent'];

function Agents() {
  const track = React.useRef(null);
  const row = React.useRef(null);

  React.useLayoutEffect(() => {
    const t = track.current, r = row.current;
    let dist = 0;
    const update = () => {
      const box = t.getBoundingClientRect();
      const span = box.height - window.innerHeight;
      const x = span > 0 ? Math.min(1, Math.max(0, -box.top / span)) * dist : 0;
      r.style.transform = `translate3d(${-x}px, 0, 0)`;
      // each image drifts against the row by how far its panel sits from the screen's centre
      const vw = window.innerWidth;
      r.querySelectorAll('.x-hs-img').forEach((el) => {
        const b = el.getBoundingClientRect();
        el.style.setProperty('--d', ((b.left + b.width / 2 - vw / 2) / vw).toFixed(3));
      });
    };
    const size = () => {
      const stacked = window.matchMedia(MOBILE_HS).matches;
      dist = stacked ? 0 : Math.max(0, r.scrollWidth - window.innerWidth);
      t.style.height = stacked ? '' : `${dist + window.innerHeight}px`;
      update();
    };
    size();
    window.addEventListener('scroll', update, { passive: true });   // scroll events already arrive at most once a frame
    window.addEventListener('resize', size);
    const ro = new ResizeObserver(size); ro.observe(r);
    // while on screen also check each frame: smooth scroll doesn't always fire a last event
    let loop = 0, lastY = -1;
    const tick = () => { if (window.scrollY !== lastY) { lastY = window.scrollY; update(); } loop = requestAnimationFrame(tick); };
    const io = new IntersectionObserver(([en]) => { cancelAnimationFrame(loop); if (en.isIntersecting) loop = requestAnimationFrame(tick); });
    io.observe(t);
    return () => { window.removeEventListener('scroll', update); window.removeEventListener('resize', size); ro.disconnect(); io.disconnect(); cancelAnimationFrame(loop); };
  }, []);

  return (
    <section className="x-hs">
      <div className="x-hs-track" ref={track}>
        <div className="x-hs-stage">
          <div className="x-hs-row" ref={row}>
            <div className="x-hs-intro">
              <h2 className="x-h2">A finance team that <em className="x-os" data-text="never">never</em> sleeps.</h2>
              <p className="x-lead">Agents handle spend, payments and reconciliation around the clock. You keep the approvals, the limits and full visibility.</p>
              <a className="x-tlink" href="/products/ai-financial-management">See how the agents work <Arrow /></a>
            </div>
            {STEPS.map(([t, d], k) => (
              <article key={t} className={`x-hs-panel ${k % 2 ? 'is-low' : ''}`}>
                <div className="x-hs-img"><Scene kind={STEP_SCENES[k]} tone={k % 2 ? 'light' : undefined} /></div>
                <span className="x-mono x-hs-n">{pad(k + 1)}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </article>
            ))}
            <div className="x-hs-end">
              <span className="x-mono">An agent in every module</span>
              <ul>{AGENTS.map((a) => <li key={a}>{a}</li>)}</ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Metrics: four figures in a ruled grid, counting up on entry ─────────── */
const METRICS = [['20+', 'licenses and registrations across our markets'], ['100+', 'markets to pay into and out of'], ['15K+', 'businesses running their finance on Hinstantt'], ['$20B', 'in annualized payment volume']];


// counts a figure like "$20B" up from zero the first time it is well in view
function CountUp({ v }) {
  const ref = React.useRef(null);
  const m = v.match(/^([^\d]*)([\d.]+)(.*)$/);
  const end = Number(m[2]);
  const [n, setN] = React.useState(end);
  React.useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    let raf = 0;
    setN(0);
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const step = (t) => { const p = Math.max(0, Math.min(1, (t - t0) / 1800)); setN(Math.round(end * (1 - Math.pow(1 - p, 3)))); if (p < 1) raf = requestAnimationFrame(step); };
      raf = requestAnimationFrame(step);
    }, { threshold: 0.5 });
    io.observe(ref.current);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, []);   // eslint-disable-line react-hooks/exhaustive-deps
  return <span ref={ref}>{m[1]}{n}{m[3]}</span>;
}

// the four proof points, the way the leaders set them: headline top left, figures along the
// foot on a hairline grid, each a clean sans number with a short descriptive line
function Metrics() {
  return (
    <section className="x-sec x-metrics">
      <div className="x-mglow x-trk">
        <Globe />
        <div className="x-wrap x-proof-in">
          <div className="x-proof-head x-rv">
            <h2 className="x-h2">The agents behind the money global businesses move every day</h2>
            <p className="x-lead">Licensed, live and moving money for businesses across Africa, Europe, the Americas and the Middle East.</p>
          </div>
          <div className="x-proof-row x-rv">
            {METRICS.map(([v, l]) => (
              <div key={l} className={`x-proof-fig ${v.startsWith('$') ? 'is-gold' : ''}`}><b><CountUp v={v} /></b><span>{l}</span></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Modules: numbered tabs, one module at a time ─────────────────────────── */
const MODULES = [['payments'], ['corporate-cards', 'Cards'], ['expense'], ['treasury'], ['accounting']];

function Modules() {
  const [i, setI] = React.useState(0);
  const [slug] = MODULES[i];
  const p = PRODUCTS[slug];
  return (
    <section className="x-sec x-modules">
      <div className="x-wrap">
        <div className="x-head x-head--row x-rv">
          <h2 className="x-h2">One back office. An agent in every module.</h2>
          <a className="x-btn x-btn--dark" href={SIGNUP}>Get started</a>
        </div>
        <div className="x-tabs x-rv" role="tablist" aria-label="Modules">
          {MODULES.map(([s, short], k) => (
            <button key={s} type="button" role="tab" aria-selected={k === i} className={k === i ? 'is-on' : ''} onClick={() => setI(k)}>
              <span className="x-mono">{pad(k + 1)}</span>{short || PRODUCTS[s].name}
            </button>
          ))}
        </div>
        {/* keyed so each switch replays the fade; not .x-rv, which would hide it again */}
        <div className="x-module" key={slug} role="tabpanel">
          <Shot slug={slug} label={`Image · ${p.name}`} ratio="4 / 3" />
          <div className="x-module-copy">
            <span className="x-tag x-mono">{p.name} <Logomark /> {p.agent.name} · 24/7</span>
            <h3 className="x-h3">{p.headline}</h3>
            <p className="x-lead">{p.sub}</p>
            <a className="x-tlink" href={`/products/${slug}`}>Explore {p.name} <Arrow /></a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Workflows: six product cards ─────────────────────────────────────────── */
const TILES = [
  ['Payments that route themselves to 100+ markets', 'Payments', 'routes'],
  ['Cards with policy enforced at the swipe', 'Corporate Cards', 'cards'],
  ['Transactions that code and post themselves', 'Accounting', 'ledger'],
  ['Spend sorted by team and category, as it happens', 'Reporting', 'bars'],
  ['Live numbers, with agents flagging what needs you', 'Reporting', 'signal'],
  ['Wallets in any currency, opened in seconds', 'Treasury', 'stacks'],
];

function Workflows() {
  const [peek, peekNode] = usePeek();
  return (
    <section className="x-sec x-flows">
      <div className="x-wrap">
        <div className="x-head x-rv">
          <h2 className="x-h2">Every financial workflow, run by agents.</h2>
          <div>
            <p className="x-lead">Accounting, payments, cards and reporting share one foundation, and an agent works every step from first invoice to final close.</p>
            <div className="x-actions">
              <a className="x-btn x-btn--dark" href={SIGNUP}>Make the switch</a>
              <a className="x-btn x-btn--line" href="/contact">Talk to sales</a>
            </div>
          </div>
        </div>
        {/* mirrored bento: dark large tiles top-left and bottom-right, light tiles stacked beside
            each. Headline on top, the product moment rising from the bottom edge. */}
        <div className="x-bento x-rv">
          {TILES.map(([h, to, scene], k) => {
            const big = k === 0 || k === 5;
            return (
              <a key={h} className={`x-bento-cell x-bento-cell--${k + 1}`} href={productHref(to)} onClick={(e) => peek(e, productHref(to))}>
                <Scene kind={scene} big={big} tone={big ? undefined : 'light'}
                  head={<div className="x-bento-h"><h3>{h}</h3><span className="x-card-go"><Arrow /></span></div>} />
              </a>
            );
          })}
        </div>
      </div>
      {peekNode}
    </section>
  );
}


/* ── Proof: the platform statement, the 15,000+ figure, investors ─────────── */
const LOGOS = [inv1, inv2, inv3, inv4, inv5, inv6, inv7];

// counts up to `to` (with thousands separators) the first time it scrolls into view
function BigCount({ to }) {
  const ref = React.useRef(null);
  const [n, setN] = React.useState(to);
  React.useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    let raf = 0;
    setN(0);
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const step = (t) => { const p = Math.min(1, (t - t0) / 2000); setN(Math.round(to * (1 - Math.pow(1 - p, 4)))); if (p < 1) raf = requestAnimationFrame(step); };
      raf = requestAnimationFrame(step);
    }, { threshold: 0.5 });
    io.observe(ref.current);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to]);
  return <span ref={ref}>{n.toLocaleString('en-US')}</span>;
}

/* ── Growth: the platform statement and the 15,000+ figure on the dark base, with a growth curve
   sweeping from the bottom-left corner to the top-right. The curve draws itself as the
   section scrolls in, with a glowing point at its head. Move the pointer across the section
   and the point rides the curve beneath it, a guide dropping from it and the hatching
   lighting up around it; leave and it returns to the head. ───────────────────────────── */
// the growth shape: an accelerating rise across the width, as a fraction of the graph height
const riseAt = (u) => 0.05 + 0.93 * Math.pow(u, 2.4);

// vertical threads whose resting heights trace the growth shape. They grow in left to right as
// the section scrolls in; near the pointer they rise and sway like plucked thread, each on its
// own spring, and settle back when it moves away.
function Growth() {
  const sec = React.useRef(null), cv = React.useRef(null);

  React.useEffect(() => {
    const el = sec.current, c = cv.current, ctx = c.getContext('2d');
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const GAP = 7;
    let W = 0, H = 0, dpr = 1, n = 0, lift = [], vel = [], sway = [], svel = [];
    let reveal = still ? 1 : 0, px = null, prevPx = null, raf = 0, on = false;

    const size = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      W = c.clientWidth; H = c.clientHeight;
      c.width = W * dpr; c.height = H * dpr;
      n = Math.floor(W / GAP) + 1;
      lift = new Array(n).fill(0); vel = new Array(n).fill(0); sway = new Array(n).fill(0); svel = new Array(n).fill(0);
    };
    const onScroll = () => {
      if (still) return;
      const r = el.getBoundingClientRect(), vh = window.innerHeight;
      reveal = Math.min(1, Math.max(0, (vh - r.top) / (vh * 0.7)));
      wake();
    };
    const onMove = (e) => {
      const r = c.getBoundingClientRect();
      px = e.clientX - r.left;
      wake();
    };
    const onLeave = () => { px = null; prevPx = null; wake(); };

    const frame = () => {
      const pull = px == null ? 0 : 1;
      const dx = px != null && prevPx != null ? px - prevPx : 0;   // pointer speed plucks the threads
      prevPx = px;
      let energy = 0;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      ctx.lineWidth = 1.3;
      for (let i = 0; i < n; i++) {
        const x = i * GAP + 0.5, u = x / W;
        if (u > reveal) break;
        const d = px == null ? 1e9 : Math.abs(x - px);
        const near = pull * Math.exp(-(d * d) / (2 * 70 * 70));           // soft falloff around the pointer
        // springs: height eases towards its lifted target, sway is nudged by the pointer and damped
        vel[i] = (vel[i] + (near * 0.3 - lift[i]) * 0.09) * 0.82;
        lift[i] += vel[i];
        svel[i] = (svel[i] + dx * near * 0.02 - sway[i] * 0.06) * 0.9;
        sway[i] += svel[i];
        energy += Math.abs(vel[i]) + Math.abs(svel[i]) + Math.abs(lift[i] - near * 0.3);
        const h = Math.min(0.99, riseAt(u) + lift[i]) * H;
        const top = H - h;
        // warm from navy towards bronze with proximity
        const k = Math.min(1, lift[i] / 0.2);
        const r = Math.round(27 + (154 - 27) * k), g = Math.round(36 + (106 - 36) * k), b = Math.round(66 + (47 - 66) * k);
        ctx.strokeStyle = `rgba(${r},${g},${b},${(0.3 + 0.6 * k).toFixed(3)})`;
        ctx.beginPath();
        ctx.moveTo(x, H);
        ctx.quadraticCurveTo(x + sway[i] * 2, top + h * 0.45, x + sway[i], top);   // bends like a thread
        ctx.stroke();
      }
      // keep animating while the pointer is over the graph or threads are still moving
      if (on && (px != null || energy > 0.002)) raf = requestAnimationFrame(frame);
      else raf = 0;
    };
    const wake = () => { if (on && !raf) raf = requestAnimationFrame(frame); };

    size();
    onScroll();
    frame();   // draw once straight away, so the threads show even before any motion
    const ro = new ResizeObserver(() => { size(); frame(); });
    ro.observe(c);
    const io = new IntersectionObserver(([e]) => { on = e.isIntersecting; if (on) wake(); });
    io.observe(el);
    window.addEventListener('scroll', onScroll, { passive: true });
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      ro.disconnect(); io.disconnect(); cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      el.removeEventListener('pointermove', onMove); el.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <section className="x-growth" ref={sec}>
      <canvas className="x-growth-svg" ref={cv} aria-hidden="true" />
      <div className="x-wrap x-growth-in">
        <h2 className="x-h2 x-growth-h">From first invoice to final close, <span>agents run it all on one platform.</span></h2>
        <div className="x-growth-stat">
          <b><BigCount to={15000} /><em className="x-os" data-text="+">+</em></b>
          <span>businesses let Hinstantt agents run their finance end to end, across every industry.</span>
        </div>
      </div>
    </section>
  );
}

function Proof() {
  return (
    <section className="x-sec x-proof">
      <div className="x-wrap">
        <div className="x-inv x-rv">
          <div className="x-head">
            <h2 className="x-h2">Backed by leading investors.</h2>
            <div>
              <p className="x-lead">We are building the infrastructure for global money, with investors who back category-defining companies.</p>
              <a className="x-tlink" href="/contact">Talk to us <Arrow /></a>
            </div>
          </div>
          <div className="x-marquee" aria-label="Investors">
            <div className="x-tape">
              {[0, 1].map((rep) => LOGOS.map((src, k) => <span key={`${rep}-${k}`} className="x-logo" aria-hidden={rep === 1}><img src={src} alt="" loading="lazy" /></span>))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Pricing ──────────────────────────────────────────────────────────────── */
const FEATURES = [
  ['Spend', ['Corporate cards', 'Expenses', 'Reimbursements', 'Approvals', 'Travel', 'Procurement']],
  ['Move money', ['Global accounts', 'Stablecoin rails', 'FX & collections', 'Treasury', 'Bill pay']],
  ['Intelligence', ['AI agents', 'Policy engine', 'Close automation', 'Revenue intelligence', 'Reporting', 'Forecasting']],
  ['Controls', ['Multi-entity', 'Roles & permissions', 'Audit trail', 'SSO & SCIM', 'Bank connections', 'Mobile app']],
];

// one headline, then everything included as a wall of moving type: a row per category,
// sliding in alternating directions, with the edges faded out. Hover pauses a row.
function Pricing() {
  return (
    <section className="x-sec x-pricing">
      <div className="x-wrap x-price-head x-rv">
        <h2 className="x-h2">One subscription. Every module, <em>every</em> agent.</h2>
        <div className="x-actions">
          <a className="x-btn x-btn--dark" href={SIGNUP}>Get started</a>
          <a className="x-btn x-btn--line" href="/contact">Talk to sales</a>
        </div>
      </div>
      <div className="x-wall x-rv" aria-label="Everything included">
        {FEATURES.map(([h, items], k) => (
          <div key={h} className={`x-wall-row ${k % 2 ? 'is-rev' : ''}`} style={{ '--dur': `${(48 + k * 7) * 3}s` }}>
            {/* two identical halves, each the row repeated three times so a half is always wider
                than the screen; the tape slides one half and loops seamlessly */}
            <div className="x-wall-tape">
              {[0, 1, 2, 3, 4, 5].map((rep) => (
                <span key={rep} className="x-wall-set" aria-hidden={rep > 0}>
                  <span className="x-wall-cat x-mono">{h}</span>
                  {items.map((it) => <span key={it} className="x-wall-it">{it}<Logomark /></span>)}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Home3() {
  useReveal();
  return (
    <main>
      <Hero />
      <Agents />
      <Metrics />
      <Modules />
      <Workflows />
      <Growth />
      <Proof />
      <Pricing />
      <Closing />
    </main>
  );
}
