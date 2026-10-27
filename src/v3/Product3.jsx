import React from 'react';
import { PRODUCTS, PRODUCT_ORDER } from '../data/products.js';
import { SCENE_FOR } from './scenes.jsx';
import { COVERAGE } from '../pages/Product.jsx';
import plusIcon from '../assets/plus-icon.svg';
import { SIGNUP, pad, Ph, Shot, Tile, Logomark, Arrow, Check, useReveal, Closing, PageHero } from './kit.jsx';

// v3 product page, one template for all twelve modules. Copy comes from data/products.js
// as before; the screens and photos are grey placeholders.

const FLAGS = import.meta.glob('../assets/flags/*.svg', { eager: true, query: '?url', import: 'default' });
const flag = (c) => FLAGS[`../assets/flags/${c}.svg`];
const CUR_BADGES = import.meta.glob('../assets/flags-badge/*.svg', { eager: true, query: '?url', import: 'default' });
const curBadge = (n) => CUR_BADGES[`../assets/flags-badge/${n}.svg`];

// "Find your market": a light tile. Search and the regions (with counts and share bars) on the
// left; every covered market in a white panel on the right, scrolling inside the panel.
function CoverageFinder() {
  const [region, setRegion] = React.useState('All');
  const [q, setQ] = React.useState('');
  const all = COVERAGE.flatMap((g) => g.items.map(([name, code]) => ({ name, code, region: g.region })));
  const needle = q.trim().toLowerCase();
  const shown = all.filter((c) => (region === 'All' || c.region === region) && (!needle || c.name.toLowerCase().includes(needle)));
  const tabs = [['All', all.length], ...COVERAGE.map((g) => [g.region, g.items.length])];
  return (
    <div className="x-cov x-rv">
      <div className="x-cov-side">
        <label className="x-cov-search">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" /><path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={`Search ${all.length} markets`} aria-label="Search markets" />
          {q && (
            <button type="button" className="x-cov-clear" aria-label="Clear search" onClick={() => setQ('')}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
            </button>
          )}
        </label>
        <div className="x-cov-tabs" role="tablist" aria-label="Regions">
          {tabs.map(([r, n]) => (
            <button key={r} type="button" role="tab" aria-selected={region === r} className={region === r ? 'is-on' : ''} onClick={() => setRegion(r)}>
              <span className="x-cov-r">{r}</span>
              <b>{n}</b>
              <i style={{ '--w': n / all.length }} />
            </button>
          ))}
        </div>
      </div>
      <div className="x-cov-panel">
        <div className="x-cov-head"><span>{region === 'All' ? 'All markets' : region}</span><b>{shown.length}</b></div>
        <div className="x-cov-grid" aria-live="polite">
          {shown.map((c) => (
            <span className="x-chip" key={c.name}><img src={flag(c.code)} alt="" loading="lazy" /><span>{c.name}<small>{c.region}</small></span></span>
          ))}
          {!shown.length && <p className="x-cov-empty">Not listed yet. <a href="/contact">Ask us about {q.trim() || 'your market'}</a> and we will tell you what is possible.</p>}
        </div>
      </div>
    </div>
  );
}

// the agent's tasks tick in one after another once the log scrolls into view
function useTicker(n, key, ms = 520) {
  const ref = React.useRef(null);
  const [shown, setShown] = React.useState(0);
  React.useEffect(() => {
    const el = ref.current; if (!el) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setShown(n); return undefined; }
    setShown(0);
    let t = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      let k = 0; const step = () => { k += 1; setShown(k); if (k < n) t = setTimeout(step, ms); };
      t = setTimeout(step, 300);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); clearTimeout(t); };
  }, [n, key, ms]);
  return [ref, shown];
}

export default function Product3({ slug }) {
  const p = PRODUCTS[slug];
  useReveal(slug);
  const tasks = p ? p.capabilities : [];
  const [logRef, shown] = useTicker(tasks.length, slug);
  if (!p) return null;

  // four surrounding modules: related first, then fill from the nav order
  const around = [...p.related];
  for (const s of PRODUCT_ORDER) {
    if (around.length >= 4) break;
    if (s !== slug && !around.includes(s)) around.push(s);
  }

  return (
    <main key={slug}>
      <PageHero
        eyebrow={`${p.eyebrow} · ${p.name}`}
        title={p.headline}
        sub={p.sub}
        actions={<><a className="x-btn x-btn--dark" href={SIGNUP}>Get started</a><a className="x-btn x-btn--line" href="/contact">Talk to sales</a></>}
        media={<Shot slug={slug} wide className="x-hero-film x-rv" label={`Image · ${p.name}`} ratio="16 / 7" />}
      />

      {/* capabilities */}
      <section className="x-sec">
        <div className="x-wrap">
          <div className="x-head x-rv">
            <div>
              <h2 className="x-h2">{p.name}, connected to everything else.</h2>
            </div>
            <p className="x-lead">Powerful on its own, and wired into every other module on Hinstantt through one shared ledger.</p>
          </div>
          <div className="x-feat x-feat--caps x-rv" style={{ '--n': p.capabilities.length }}>
            {p.capabilities.map((c, i) => (
              <div key={c.t} className="x-feat-col">
                <span className="x-mono x-feat-i">{pad(i + 1)}</span>
                <h3>{c.t}</h3>
                <p>{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {slug === 'payments' && (
        <section className="x-sec">
          <div className="x-wrap">
            <div className="x-head x-rv">
              <div>
                <h2 className="x-h2">35+ currencies. 100+ markets.</h2>
              </div>
              <p className="x-lead">One platform for every corridor your business touches. Pay in, pay out and settle in the currencies your customers and suppliers actually use.</p>
            </div>
            <CoverageFinder />
          </div>
        </section>
      )}

      {slug === 'accounts' && (
        <section className="x-sec">
          <div className="x-wrap">
            <div className="x-head x-rv">
              <div>
                <h2 className="x-h2">One account, every currency you run on.</h2>
              </div>
              <p className="x-lead">Hold, receive and convert across USD, GBP, CAD, NGN, EUR and 10+ more currencies, all under one verified business identity.</p>
            </div>
            <div className="x-cur x-rv">
              {[['usd', 'USD', 'US Dollar'], ['gbp', 'GBP', 'British Pound'], ['cad', 'CAD', 'Canadian Dollar'], ['ngn', 'NGN', 'Nigerian Naira'], ['eur', 'EUR', 'Euro']].map(([f, code, name]) => (
                <div className="x-cur-c" key={code}><img src={curBadge(f)} alt="" /><b>{code}</b><small>{name}</small></div>
              ))}
              <div className="x-cur-c"><img src={plusIcon} alt="" /><b>10+ more</b><small>currencies</small></div>
            </div>
          </div>
        </section>
      )}

      {/* spotlight */}
      <section className="x-sec">
        <div className="x-wrap">
          <div className="x-module x-spot x-rv">
            <Shot slug={slug} label={`Image · ${p.name}`} ratio="4 / 3" />
            <div className="x-module-copy">
              <h2 className="x-h3">{p.spotlight.headline}</h2>
              <p className="x-lead">{p.spotlight.body}</p>
              <ul className="x-checks">
                {p.spotlight.bullets.map((b) => <li key={b}><span className="x-check"><Check /></span>{b}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* the agent, with a log of its jobs ticking in */}
      <section className="x-sec">
        <div className="x-wrap">
          <div className="x-band x-agent x-rv">
            <div className="x-band-in x-agent-in">
              <div className="x-agent-copy">
                <h2 className="x-band-h">{p.agent.name}</h2>
                <p className="x-agent-line">{p.agent.line}</p>
                <p className="x-agent-note">It runs inside {p.name} around the clock, doing the work in the background so your team reviews and approves instead of keying it in.</p>
              </div>
              <div className="x-log" ref={logRef} aria-label={`What the ${p.agent.name} does`}>
                <div className="x-log-head x-mono">
                  <span><Logomark />{p.agent.name}</span>
                  <span>{Math.min(shown, tasks.length)} of {tasks.length} complete</span>
                </div>
                <ol>
                  {tasks.map((c, k) => (
                    <li key={c.t} className={`${k < shown ? 'is-on' : ''} ${k === shown ? 'is-now' : ''}`}>
                      <time className="x-mono">{`09:4${k + 1}:0${(k * 3) % 10}`}</time>
                      <span className="x-log-t"><b>{c.t}</b><small>{c.d}</small></span>
                      <span className="x-log-st x-mono">{k < shown ? `Done · ${(0.4 + k * 0.3).toFixed(1)}s` : k === shown ? 'Working…' : 'Queued'}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* the rest of the platform */}
      <section className="x-sec">
        <div className="x-wrap">
          <div className="x-head x-rv">
            <div>
              <h2 className="x-h2">Works with every other module.</h2>
            </div>
            <p className="x-lead">Cards, payments, treasury and accounting share a single ledger, with an agent working inside each one.</p>
          </div>
          <div className="x-cards x-cards--4 x-rv">
            {around.map((s, k) => {
              const m = PRODUCTS[s];
              return (
                <a key={s} className="x-card" href={`/products/${s}`}>
                  <Tile kind={SCENE_FOR[s]} ratio="4 / 3"><span className="x-ph-tag x-mono">{pad(k + 1)} · {m.eyebrow}</span></Tile>
                  <div className="x-card-b"><h3>{m.name}<small>{m.short}</small></h3><span className="x-card-go"><Arrow /></span></div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <Closing />
    </main>
  );
}
