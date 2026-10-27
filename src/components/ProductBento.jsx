import React from 'react';
import { Check, Sparkle, ArrowRight, Warning, Plus } from './icons.jsx';
import { productHref } from '../data/products.js';
import FlutedBackground from './FlutedBackground.jsx';
import './ProductBento.css';

import corporateCards from '../assets/bento/corporate-cards.webp';
import flagUS from '../assets/flags/us.svg';
import flagEU from '../assets/flags/eu.svg';
import flagGB from '../assets/flags/gb.svg';
import flagNG from '../assets/flags/ng.svg';
import flagKE from '../assets/flags/ke.svg';

// "Every financial workflow, run by agents." A bento of live product moments, in the style
// of Ramp's: each tile runs one small, quiet piece of the product on a loop (a payment
// confirming, receipts matching, transactions coding themselves, spend re-sorting,
// numbers updating, a wallet opening). The UI is rebuilt from Hinstantt's product
// screens in Figma: white panels, black primary buttons, green / amber / red status,
// blue spend bars. Loops only run while the tile is on screen.

const Expand = () => <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M8.5 2h3.5v3.5M12 2 8 6M5.5 12H2V8.5M2 12l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;

// steps through 0..n-1 every `ms` while the element is on screen; reduced motion holds
// the finished state
export function useLoop(n, ms) {
  const ref = React.useRef(null);
  const [step, setStep] = React.useState(0);
  React.useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setStep(n - 1); return undefined; }
    let timer = 0, on = false;
    const tick = () => { setStep((s) => (s + 1) % n); timer = setTimeout(tick, ms); };
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !on) { on = true; timer = setTimeout(tick, ms * 0.6); }
      if (!e.isIntersecting && on) { on = false; clearTimeout(timer); }
    }, { threshold: 0.35 });
    if (ref.current) io.observe(ref.current);
    return () => { io.disconnect(); clearTimeout(timer); };
  }, [n, ms]);
  return [ref, step];
}

/* 1 · Move money: amount in, a six-digit code fills, send confirms */
export function MoveMoney() {
  const [ref, s] = useLoop(12, 620);
  const done = s >= 9;
  return (
    <div className="ui-stage" ref={ref}>
      <div className="ui-panel ui-send">
        <div className="ui-row ui-head"><b>Send money</b><span className="ui-muted">Step 2 of 2</span></div>
        <div className="ui-recip"><span className="ui-av">S</span><span><b>Stripe Inc.</b><small>Chase ··4821 · Wire</small></span><span className="ui-chip ui-chip--ok">Verified</span></div>
        <div className="ui-field"><small>Amount</small><span className={`ui-amount ${s >= 1 ? 'is-on' : ''}`}>$12,400.00</span></div>
        <div className="ui-field"><small>Enter the 6-digit code</small>
          <div className="ui-code">{Array.from({ length: 6 }, (_, k) => <i key={k} className={s >= 2 + k ? 'is-on' : ''}>{'482913'[k]}</i>)}</div>
        </div>
        <button className={`ui-btn ${s >= 8 ? 'is-on' : ''}`} tabIndex={-1}>Confirm send</button>
        <div className={`ui-done ${done ? 'is-on' : ''}`}>
          <span className="ui-done-ic"><Check size={22} weight="bold" /></span>
          <b>Payment sent</b><small>$12,400.00 to Stripe Inc. arrives today</small>
        </div>
      </div>
    </div>
  );
}

/* 2 · Corporate cards: the card, with spend notes popping in beside it */
export function Cards() {
  const [ref, s] = useLoop(6, 1150);
  // the card tilts toward the pointer and a highlight slides across it like light on
  // metal; it eases back to rest when the pointer leaves
  const tilt = React.useRef(null);
  const onMove = (e) => {
    const el = tilt.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)), y = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
    el.style.setProperty('--rx', `${(0.5 - y) * 16}deg`); el.style.setProperty('--ry', `${(x - 0.5) * 20}deg`);
    el.style.setProperty('--gx', `${x * 100}%`); el.style.setProperty('--gy', `${y * 100}%`);
    el.classList.add('is-lit');
  };
  const onLeave = () => { const el = tilt.current; if (!el) return; el.classList.remove('is-lit'); ['--rx', '--ry'].forEach((k) => el.style.setProperty(k, '0deg')); };
  const notes = [
    <><span className="ui-dot" />$3,100 at AWS · Engineering card</>,
    <><span className="ui-tick"><Check size={10} weight="bold" /></span>Receipt matched, within policy</>,
    <><span className="ui-tick ui-tick--blue"><Sparkle size={10} weight="fill" /></span>Coded to 6100 · Cloud</>,
  ];
  return (
    <div className="ui-stage ui-stage--3d" ref={ref} onPointerMove={onMove} onPointerLeave={onLeave}>
      <div className="ui-card-float">
        <div className="ui-card3d" ref={tilt}>
          <img className="ui-card-img" src={corporateCards} alt="" loading="lazy" decoding="async" />
          <span className="ui-card-glare" />
        </div>
      </div>
      <div className="ui-notes">{notes.map((n, k) => <div key={k} className={`ui-note ${s >= k + 1 ? 'is-on' : ''}`}>{n}</div>)}</div>
    </div>
  );
}

/* 3 · Ledger: each transaction gets its account, one after another */
const TX = [['A', 'AWS', '$2,450', '6100 · Cloud'], ['W', 'WeWork', '$8,000', '6800 · Rent'], ['D', 'Delta', '$1,280', '6700 · Travel'], ['F', 'Figma', '$540', '6300 · Software'], ['U', 'Uber', '$86', '6700 · Travel']];
export function Ledger() {
  const [ref, s] = useLoop(8, 820);
  return (
    <div className="ui-stage" ref={ref}>
      <div className="ui-panel ui-ledger">
        <div className="ui-row ui-head"><b>Transactions</b><span className="ui-muted">{Math.min(s, 5)} of 5 posted</span></div>
        {TX.map(([a, m, amt, gl], k) => (
          <div key={m} className={`ui-tx ${s > k ? 'is-done' : ''} ${s === k ? 'is-busy' : ''}`}>
            <span className="ui-av ui-av--sm">{a}</span>
            <span className="ui-tx-m"><b>{m}</b><small>{amt}</small></span>
            <span className="ui-gl"><span className="ui-gl-busy"><Sparkle size={10} weight="fill" />Matching</span><span className="ui-gl-done"><Check size={10} weight="bold" />{gl}</span></span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* 4 · Analyze: spend by category and department, re-sorting between periods */
const PERIODS = [
  { k: 'This month', cat: [['Software / SaaS', 35, '$185k'], ['Infrastructure', 24, '$125k'], ['Travel', 18, '$95k'], ['Marketing', 14, '$72k'], ['Office', 9, '$50k']], dep: [['Engineering', 82], ['Marketing', 54], ['Sales', 46], ['Operations', 30]] },
  { k: 'Last month', cat: [['Software / SaaS', 31, '$162k'], ['Infrastructure', 27, '$139k'], ['Travel', 12, '$61k'], ['Marketing', 19, '$97k'], ['Office', 11, '$56k']], dep: [['Engineering', 74], ['Marketing', 63], ['Sales', 38], ['Operations', 34]] },
];
export function Analyze() {
  const [ref, s] = useLoop(5, 1700);
  const p = PERIODS[s >= 3 ? 1 : 0], grown = s >= 1;
  return (
    <div className="ui-stage" ref={ref}>
      <div className="ui-panel ui-analyze">
        <div className="ui-row ui-head"><b>Spend by category</b>
          <span className="ui-seg">{PERIODS.map((q) => <i key={q.k} className={q === p ? 'is-on' : ''}>{q.k}</i>)}</span>
        </div>
        <div className="ui-split">
          <div className="ui-bars">
            {p.cat.map(([n, pct, amt]) => (
              <div key={n} className="ui-bar-row">
                <div className="ui-row"><span>{n}</span><span><span className="ui-muted">{pct}%</span> <b>{amt}</b></span></div>
                <div className="ui-track"><i style={{ width: grown ? `${pct * 2.6}%` : '0%' }} /></div>
              </div>
            ))}
          </div>
          <div className="ui-bars ui-bars--dep">
            <div className="ui-sub">By department</div>
            {p.dep.map(([n, v]) => (
              <div key={n} className="ui-bar-row"><span>{n}</span><div className="ui-track ui-track--deep"><i style={{ width: grown ? `${v}%` : '0%' }} /></div></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* 5 · Decisions: the overview's numbers update, an alert slides in, the line draws on */
const STATS = [
  [['Due this week', 31600, ''], ['Overdue', 8730, 'red'], ['Awaiting approval', 21400, 'amber'], ['Paid this month', 86420, '']],
  [['Due this week', 29850, ''], ['Overdue', 6120, 'red'], ['Awaiting approval', 24900, 'amber'], ['Paid this month', 91780, '']],
];
const money = (v) => `$${v.toLocaleString('en-US')}`;
export function Decide() {
  const [ref, s] = useLoop(4, 1900);
  const st = STATS[s >= 2 ? 1 : 0];
  return (
    <div className="ui-stage" ref={ref}>
      <div className="ui-panel ui-decide">
        <div className="ui-row ui-head"><b>Expenses</b><span className="ui-live"><i />Live</span></div>
        <div className="ui-stats">
          {st.map(([l, v, tone]) => (
            <div key={l} className="ui-stat"><small>{l}</small><b key={v} className={`ui-num ${tone ? `is-${tone}` : ''}`}>{money(v)}</b></div>
          ))}
        </div>
        <div className={`ui-alert ${s >= 1 ? 'is-on' : ''}`}><Warning size={14} weight="fill" /><span><b>3 overdue bills need attention</b><small>Review and pay to keep vendors on track</small></span><span className="ui-alert-cta">Review <ArrowRight size={11} weight="bold" /></span></div>
        <svg className={`ui-spark ${s >= 1 ? 'is-on' : ''}`} viewBox="0 0 300 70" preserveAspectRatio="none" aria-hidden="true">
          <defs><linearGradient id="ui-sf" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#00a9e0" stopOpacity=".25" /><stop offset="1" stopColor="#00a9e0" stopOpacity="0" /></linearGradient></defs>
          <path className="ui-spark-fill" d="M0 58 C30 52 45 40 70 44 S115 30 140 34 S190 18 215 24 S265 10 300 8 V70 H0 Z" fill="url(#ui-sf)" />
          <path className="ui-spark-line" d="M0 58 C30 52 45 40 70 44 S115 30 140 34 S190 18 215 24 S265 10 300 8" pathLength="1" />
        </svg>
      </div>
    </div>
  );
}

/* 6 · Wallets: a new currency wallet opens and joins the list */
const WALLETS = [[flagUS, 'USD', 'US Dollar', '$248,120.00'], [flagEU, 'EUR', 'Euro', '€84,300.50'], [flagGB, 'GBP', 'British Pound', '£41,980.00'], [flagNG, 'NGN', 'Nigerian Naira', '₦0.00'], [flagKE, 'KES', 'Kenyan Shilling', 'KSh0.00']];
export function Wallets() {
  const [ref, s] = useLoop(7, 950);
  const shown = s >= 5 ? 5 : s >= 3 ? 4 : 3;
  return (
    <div className="ui-stage" ref={ref}>
      <div className="ui-panel ui-wallets">
        <div className="ui-row ui-head"><b>Wallets</b><span className={`ui-btn ui-btn--sm ${s === 2 || s === 4 ? 'is-press' : ''}`}><Plus size={11} weight="bold" />New wallet</span></div>
        {WALLETS.map(([f, c, n, b], k) => (
          <div key={c} className={`ui-wallet ${k < shown ? 'is-on' : ''} ${k === shown - 1 && k >= 3 ? 'is-new' : ''}`}>
            <img src={f} alt="" /><span><b>{c}</b><small>{n}</small></span><span className="ui-bal">{b}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const TILES = [
  { size: 'land', tone: 'light',  wash: 'sky',  key: 'move',    h: 'Payments that route themselves to 100+ markets', to: 'Payments', Ui: MoveMoney },
  { size: 'port', tone: 'fluted', wash: 'none', key: 'corp',    h: 'Cards with policy enforced at the swipe', to: 'Corporate Cards', hue: 20, Ui: Cards },
  { size: 'port', tone: 'fluted', wash: 'none', key: 'auto',    h: 'Transactions that code and post themselves', to: 'Accounting', hue: -30, Ui: Ledger },
  { size: 'land', tone: 'light',  wash: 'mint', key: 'analyze', h: 'Spend sorted by team and category, as it happens', to: 'Reporting', Ui: Analyze },
  { size: 'land', tone: 'fluted', wash: 'none', key: 'decide',  h: 'Live numbers, with agents flagging what needs you', to: 'Reporting', hue: 40, Ui: Decide },
  { size: 'port', tone: 'light',  wash: 'sky',  key: 'wallets', h: 'Wallets in any currency, opened in seconds', to: 'Treasury', Ui: Wallets },
];

export default function ProductBento() {
  return (
    <section className="pb2">
      <div className="wrap">
        <h2 className="pb2-title" data-enter>
          Every financial workflow, run by agents.
          <span> Accounting, payments, cards and reporting share one foundation, and an agent works every step from first invoice to final close.</span>
        </h2>
        <div className="pb2-cta" data-enter-follow>
          <a className="btn btn-primary" href="https://app.hinstantt.com/signup">Make the switch</a>
          <a className="btn btn-ghost" href="/contact">Talk to sales</a>
        </div>

        <div className="b2-grid">
          {/* the cells are divided by the site's glowing lines instead of card edges */}
          <div className="b2-lines" aria-hidden="true">
            <i className="h" style={{ top: '0%' }} /><i className="h" style={{ top: '33.333%' }} /><i className="h" style={{ top: '66.667%' }} /><i className="h" style={{ top: '100%' }} />
            <i className="v" style={{ left: '66.667%', top: '0%' }} /><i className="v" style={{ left: '33.333%', top: '33.333%' }} /><i className="v" style={{ left: '66.667%', top: '66.667%' }} />
          </div>
          {TILES.map((t) => (
            <a key={t.key} className={`b2-card t-${t.size} tone-${t.tone} wash-${t.wash} k-${t.key}`} href={productHref(t.to)}>
              {t.tone === 'fluted' && <FlutedBackground className="b2-sky" dark hue={t.hue} ribs={t.size === 'land' ? 5 : 3} />}
              <div className="b2-head"><h3 className="b2-h">{t.h}</h3><span className="b2-expand" aria-hidden="true"><Expand /></span></div>
              <div className="b2-stage" aria-hidden="true">
                <div className="b2-wash" />
                <t.Ui />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
