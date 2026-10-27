import React from 'react';
import { CreditCard, PaperPlaneTilt, Bank, CheckCircle, HandPalm, ArrowsOutSimple, X } from './icons.jsx';
import GridLines from './GridLines.jsx';
import './AgentsBanner.css';

// "Automate the work. Keep control." Copy on the left; on the right a white panel that
// shows how the agents work as one flow: a signal from a module, the agent reading it
// against your rules, then either acting or asking you, with everything landing in the
// cockpit. A packet runs the route and lights each stage as it passes. The panel
// expands (Stripe-style) into a full view with the steps spelled out.

// The flow, in the manner of Stripe's old product diagrams: real fragments of the product
// as small white cards, joined by fine grey lines, with a blue pulse carrying each event
// from one to the next. An event arrives from a module, the policy agent checks it rule by
// rule, then either posts it (in policy) or asks you (outside it), and the result lands in
// the activity log. The events cycle, alternating in and out of policy.
const EVENTS = [
  { mod: 'Cards', Icon: CreditCard, title: 'AWS', meta: 'Engineering card ··4821', amt: '$3,100.00',
    checks: [['Within the $5,000 card limit', true], ['Category: Cloud infrastructure', true], ['Receipt matched', true]],
    ok: true, post: ['Coded to 6100 · Cloud', 'Reconciled to Chase ··0192'], log: 'Paid AWS $3,100 · coded 6100' },
  { mod: 'Payments', Icon: PaperPlaneTilt, title: 'Dell Technologies', meta: 'Bill INV-7710 · 40 laptops', amt: '$9,800.00',
    checks: [['Vendor verified', true], ['PO-2041 matched', true], ['Over the $5,000 approval limit', false]],
    ok: false, ask: 'Dell Technologies · $9,800.00', log: 'Dell $9,800 sent to you to approve' },
  { mod: 'Treasury', Icon: Bank, title: 'Sweep idle cash', meta: 'USD operating → Yield', amt: '$400,000.00',
    checks: [['Keeps 60 days of runway', true], ['Within treasury policy', true], ['Yield account verified', true]],
    ok: true, post: ['Moved to yield · 4.6% APY', 'Logged to the ledger'], log: 'Swept $400,000 to yield' },
  { mod: 'Payments', Icon: PaperPlaneTilt, title: 'Ada Okafor', meta: 'Contractor payout · NGN', amt: '$2,400.00',
    checks: [['Bank details verified', true], ['Within payout limit', true], ['First payment to this payee', false]],
    ok: false, ask: 'Ada Okafor · $2,400.00', log: 'New payee payout waiting for you' },
];
// cards in a 560 x 640 space
const B = {
  sig: { x: 24, y: 34, w: 270, h: 74 },
  ag:  { x: 150, y: 168, w: 290, h: 150 },
  ok:  { x: 10, y: 388, w: 258, h: 92 },
  ask: { x: 292, y: 388, w: 258, h: 104 },
  log: { x: 110, y: 530, w: 340, h: 104 },
};
const LINES = {
  in:   { d: 'M 159 108 V 138 H 295 V 168', len: 196 },
  ok:   { d: 'M 230 318 V 352 H 139 V 388', len: 161 },
  ask:  { d: 'M 360 318 V 352 H 421 V 388', len: 131 },
  okL:  { d: 'M 139 480 V 505 H 230 V 530', len: 141 },
  askL: { d: 'M 421 492 V 511 H 330 V 530', len: 129 },
};
const plan = (ok) => [
  { st: 'sig', ms: 1100 }, { line: 'in', ms: 900 },
  { st: 'c1', ms: 520 }, { st: 'c2', ms: 520 }, { st: 'c3', ms: 700 },
  { line: ok ? 'ok' : 'ask', ms: 800 }, { st: 'out', ms: 1400 },
  { line: ok ? 'okL' : 'askL', ms: 800 }, { st: 'log', ms: 1600 },
];

const Flow = ({ large }) => {
  const [n, setN] = React.useState(0);
  const [beat, setBeat] = React.useState(0);
  const [log, setLog] = React.useState([['Paid Figma $540 · coded 6300', true], ['Uber $86 matched to a receipt', true]]);
  const ev = EVENTS[n % EVENTS.length];
  const steps = plan(ev.ok);
  React.useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setBeat(steps.length - 1); return undefined; }
    const t = setTimeout(() => {
      if (steps[beat].st === 'log') setLog((l) => [[ev.log, ev.ok], ...l].slice(0, 3));
      if (beat + 1 < steps.length) setBeat(beat + 1);
      else { setBeat(0); setN((k) => k + 1); }
    }, steps[beat].ms);
    return () => clearTimeout(t);
  }, [beat, n]);   // eslint-disable-line react-hooks/exhaustive-deps

  const at = (name) => steps.findIndex((s) => s.st === name || s.line === name);
  const reached = (name) => beat >= at(name);
  const cur = steps[beat];
  const checksOn = ['c1', 'c2', 'c3'].filter((c) => reached(c)).length;
  const pct = (v, of) => `${(v / of) * 100}%`;
  const box = (b) => ({ left: pct(b.x, 560), top: pct(b.y, 640), width: pct(b.w, 560), minHeight: pct(b.h, 640) });
  const outLit = reached('out');

  return (
    <div className={`sf ${large ? 'is-large' : ''}`} aria-label="How the agents work">
      <svg className="sf-svg" viewBox="0 0 560 640" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="sf-pulse" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#00a9e0" stopOpacity="0" /><stop offset="1" stopColor="#00a9e0" /></linearGradient>
        </defs>
        {Object.entries(LINES).map(([k, l]) => {
          const dim = (k === 'ok' || k === 'okL') ? !ev.ok : (k === 'ask' || k === 'askL') ? ev.ok : false;
          return <path key={k} className={`sf-line ${dim ? 'is-dim' : ''} ${reached(k) && !dim ? 'is-lit' : ''}`} d={l.d} />;
        })}
        {cur.line && <path key={`${n}-${cur.line}`} className="sf-pulse" d={LINES[cur.line].d} style={{ '--len': LINES[cur.line].len, '--ms': `${cur.ms}ms` }} />}
      </svg>

      {/* 1 · the event, as it arrives from the module */}
      <div key={`sig-${n}`} className="sf-card sf-sig" style={box(B.sig)}>
        <span className="sf-ic"><ev.Icon size={15} /></span>
        <span className="sf-main"><small>{ev.mod} · just now</small><b>{ev.title}</b><em>{ev.meta}</em></span>
        <span className="sf-amt">{ev.amt}</span>
      </div>

      {/* 2 · the policy agent, checking it rule by rule */}
      <div className={`sf-card sf-ag ${reached('c1') && !reached('out') ? 'is-busy' : ''}`} style={box(B.ag)}>
        <div className="sf-head"><b>Policy agent</b><span className="sf-state">{reached('out') ? (ev.ok ? 'Approved' : 'Needs you') : reached('c1') ? 'Checking' : 'Waiting'}</span></div>
        <ul className="sf-checks">
          {ev.checks.map(([t, pass], k) => (
            <li key={t} className={k < checksOn ? (pass ? 'is-pass' : 'is-fail') : ''}><i>{k < checksOn ? (pass ? <CheckCircle size={14} weight="fill" /> : <HandPalm size={13} weight="fill" />) : null}</i>{t}</li>
          ))}
        </ul>
      </div>

      {/* 3 · in policy, the agent posts it; outside it, you get a one-tap approval */}
      <div className={`sf-card sf-ok ${ev.ok && outLit ? 'is-on' : ''}`} style={box(B.ok)}>
        <div className="sf-head"><b>Posted by the agent</b>{ev.ok && outLit && <span className="sf-tag sf-tag--ok">Done</span>}</div>
        {(ev.ok ? ev.post : ['Paid, coded and reconciled', 'when it is within policy']).map((l) => <div key={l} className="sf-row">{l}</div>)}
      </div>
      <div className={`sf-card sf-ask ${!ev.ok && outLit ? 'is-on' : ''}`} style={box(B.ask)}>
        <div className="sf-head"><b>Approval request</b>{!ev.ok && outLit && <span className="sf-tag sf-tag--ask">For you</span>}</div>
        <div className="sf-row">{ev.ok ? 'Only when a rule is broken' : ev.ask}</div>
        <div className="sf-btns"><span className="sf-btn">Decline</span><span className="sf-btn sf-btn--go">Approve</span></div>
      </div>

      {/* 4 · everything lands in the activity log */}
      <div className={`sf-card sf-log ${cur.st === 'log' ? 'is-on' : ''}`} style={box(B.log)}>
        <div className="sf-head"><b>Activity</b><span className="sf-live"><i />Live</span></div>
        {log.map(([t, ok], k) => <div key={`${t}-${k}`} className={`sf-entry ${k === 0 && cur.st === 'log' ? 'is-new' : ''}`}><i className={ok ? 'ok' : 'ask'} />{t}</div>)}
      </div>
    </div>
  );
};

const STEPS = [
  ['A signal from a module', 'A card swipe, an invoice, a payment due, a balance that dips. Every module hands it to its agent the moment it happens.'],
  ['The agent reads it against your rules', 'Policy, limits and history. The same check every time, in milliseconds, with no inbox in the way.'],
  ['Within policy it acts. Outside, it asks you', 'In bounds, the agent pays, codes, reconciles or moves the funds. Out of bounds, you get a one-tap approval.'],
  ['Everything lands in your cockpit', 'Every action is logged in one live picture of the business. You keep the approvals, the limits and full visibility.'],
];
const AGENTS = ['Policy agent', 'Payments agent', 'Expense agent', 'Travel agent', 'Treasury agent', 'Ramp agent', 'Close agent', 'Procurement agent', 'Billing agent', 'Insight agent'];

export default function AgentsBanner() {
  const [open, setOpen] = React.useState(false);
  // the full view: lock the page behind it, close on Escape
  React.useEffect(() => {
    if (!open) return undefined;
    const lenis = window.__lenis; lenis && lenis.stop();
    document.documentElement.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => { lenis && lenis.start(); document.documentElement.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [open]);

  return (
    <section className="ag">
      <GridLines />
      <div className="wrap ag-grid">
        <div className="ag-copy">
          <h2 className="h-section ag-title" data-enter>A finance team that <em>never</em> sleeps.</h2>
          <p className="ag-sub" data-enter-follow>Agents handle spend, payments and reconciliation around the clock. You keep the approvals, the limits and full visibility.</p>
          <a className="ag-link" data-enter-follow href="/products/ai-financial-management">See how the agents work
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </a>
        </div>

        <div className="ag-panel">
          <Flow />
          <button className="ag-expand" type="button" aria-label="Expand" title="Expand" onClick={() => setOpen(true)}><ArrowsOutSimple size={16} weight="bold" /></button>
        </div>
      </div>

      {open && (
        <div className="ag-full" role="dialog" aria-modal="true" aria-label="How the agents work">
          <div className="ag-full-veil" onClick={() => setOpen(false)} />
          <div className="ag-full-sheet">
            <button className="ag-close" type="button" aria-label="Close" onClick={() => setOpen(false)}><X size={16} weight="bold" /></button>
            <div className="ag-full-grid">
              <div className="ag-full-copy">
                <h3 className="ag-full-title">How the agents work</h3>
                <ol className="ag-steps">
                  {STEPS.map(([t, d], i) => <li key={t}><span className="ag-step-n">{i + 1}</span><span><b>{t}</b><p>{d}</p></span></li>)}
                </ol>
                <div className="ag-agents">
                  <span className="ag-agents-h">An agent in every module</span>
                  <div className="ag-agents-row">{AGENTS.map((a) => <span key={a} className="ag-agent-pill">{a}</span>)}</div>
                </div>
                <a className="btn btn-primary ag-full-cta" href="/products/ai-financial-management">See AI financial management</a>
              </div>
              <div className="ag-panel ag-panel--large"><Flow large /></div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
