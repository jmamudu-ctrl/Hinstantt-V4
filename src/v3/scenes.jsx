import React from 'react';
import { Logomark } from './kit.jsx';

// Glass micro-scenes for the small product cards: the smooth "Section wide" backdrop with one
// frosted panel floating on it, playing a single short moment from the product on a loop.
// Everything is CSS (.x-scene in v3.css); sizes follow the card through container units, and
// motion stops under reduced motion.

const Check = () => (
  <svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2.5 6.2l2.3 2.3 4.7-4.9" /></svg>
);

// payments: an amount travels from your account to its market, then settles. The large tile
// runs three payouts at once, each to its own market on its own rail.
const PAYOUTS = [['GB', '$4,200.00', 'Faster Payments'], ['NG', '₦6,140,000', 'NIP'], ['US', '$8,050.00', 'ACH']];
const Routes = ({ big }) => big ? (
  <>
    <div className="sc-top"><span>Paying out today</span><b>$18,640.00</b></div>
    <ul className="sc-payouts">
      {PAYOUTS.map(([to, amt, rail], i) => (
        <li key={to}>
          <i className="sc-node">{to}</i>
          <span className="sc-track"><i className="sc-dot" style={{ '--d': `${i * 0.5}s` }} /></span>
          <span className="sc-amt"><b>{amt}</b><small>{rail}</small></span>
        </li>
      ))}
    </ul>
    <div className="sc-foot"><span>Fastest rail picked for each market</span><em className="sc-pill sc-pop">All settled</em></div>
  </>
) : (
  <>
    <div className="sc-top"><span>Paying</span><b>$4,200.00</b></div>
    <div className="sc-route">
      <i className="sc-node">AC</i>
      <span className="sc-track"><i className="sc-dot" /></span>
      <i className="sc-node sc-node--to">GB</i>
    </div>
    <div className="sc-foot"><span>Routed via Faster Payments</span><em className="sc-pill sc-pop">Settled · 2s</em></div>
  </>
);

// corporate cards: a swipe checked against policy, one rule at a time, then approved
const Cards = () => (
  <>
    <div className="sc-cardrow">
      <div className="sc-card"><i /><span>•• 5601</span></div>
      <div className="sc-cardmeta"><span>Figma</span><b>$540.00</b></div>
    </div>
    <ul className="sc-checks">
      {['Merchant allowed', 'Within limit', 'Software category'].map((t, i) => (
        <li key={t} className="sc-tick" style={{ '--d': `${i * 0.6}s` }}><Check />{t}</li>
      ))}
    </ul>
    <em className="sc-pill sc-pop" style={{ '--d': '1.8s' }}>Approved at the swipe</em>
  </>
);

// accounting: transactions arrive and code themselves to the ledger
const LEDGER = [['Figma', '−$540.00', '6120 Software'], ['Delta Air Lines', '−$1,486.20', '6400 Travel'], ['Northwind Ltd', '+$9,800.00', '4000 Revenue']];
const Ledger = () => (
  <>
    <div className="sc-top"><span>Coding</span><b>3 new</b></div>
    <ul className="sc-rows">
      {LEDGER.map(([n, a, c], i) => (
        <li key={n}>
          <span className="sc-rn">{n}<small>{a}</small></span>
          <em className="sc-chip sc-pop" style={{ '--d': `${0.3 + i * 0.7}s` }}>{c}</em>
        </li>
      ))}
    </ul>
  </>
);

// reporting: spend by team, bars settling to their share
const TEAMS = [['Engineering', 0.86, '$31.5k'], ['Marketing', 0.6, '$22.4k'], ['Sales', 0.42, '$15.1k'], ['Ops', 0.28, '$9.9k']];
const Bars = () => (
  <>
    <div className="sc-top"><span>Spend by team · Oct</span><b>$84.2k</b></div>
    <ul className="sc-bars">
      {TEAMS.map(([t, w, v], i) => (
        <li key={t}>
          <span>{t}</span>
          <i className="sc-bar"><i style={{ '--w': w, '--d': `${i * 0.25}s` }} /></i>
          <b>{v}</b>
        </li>
      ))}
    </ul>
  </>
);

// live numbers: a spend line draws in, and the agent flags what changed
const Signal = () => (
  <>
    <div className="sc-top"><span>Spend · live</span><b>$84,210</b></div>
    <svg className="sc-spark" viewBox="0 0 200 60" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 48 L20 44 L40 46 L60 38 L80 40 L100 30 L120 34 L140 22 L160 26 L180 12 L200 8" />
    </svg>
    <div className="sc-toast sc-pop" style={{ '--d': '2s' }}><Logomark />Hint flagged Software +12% this week</div>
  </>
);

// treasury: wallets in several currencies, and a new one opening
const WALLETS = [['US', 'USD', '$142,596'], ['EU', 'EUR', '€35,101'], ['GB', 'GBP', '£17,116']];
const Stacks = ({ big }) => (
  <>
    {big ? (
      <>
        <div className="sc-top"><span>Treasury balance</span><b>$195,213.00</b></div>
        <svg className="sc-spark sc-spark--area" viewBox="0 0 200 60" preserveAspectRatio="none" aria-hidden="true">
          <path className="sc-area" d="M0 52 L25 50 L50 47 L75 44 L100 38 L125 33 L150 26 L175 17 L200 8 V60 H0 Z" />
          <path d="M0 52 L25 50 L50 47 L75 44 L100 38 L125 33 L150 26 L175 17 L200 8" />
        </svg>
      </>
    ) : <div className="sc-top"><span>Wallets</span><b>4 currencies</b></div>}
    <ul className="sc-wallets">
      {WALLETS.map(([f, c, v]) => <li key={c}><i className="sc-node">{f}</i><span>{c}</span><b>{v}</b></li>)}
      <li className="sc-new"><i className="sc-node">NG</i><span>NGN</span><em className="sc-pill">Opened · 4s</em></li>
    </ul>
  </>
);


// agent steps (homepage horizontal scroll)
// 1: signals arriving from the modules
const EVENTS = [['Card swipe', 'Figma · $540.00', 'Cards'], ['Invoice due', 'INV-2051 · $4,820.00', 'Billing'], ['Payment due', 'Payroll · $18,000.00', 'Payments'], ['Balance dip', 'USD below $50,000', 'Treasury']];
const Events = () => (
  <>
    <div className="sc-top"><span>Incoming</span><b>Live</b></div>
    <ul className="sc-rows">
      {EVENTS.map(([t, d, m], i) => (
        <li key={t} className="sc-pop" style={{ '--d': `${i * 0.6}s` }}>
          <span className="sc-rn">{t}<small>{d}</small></span>
          <em className="sc-chip">{m}</em>
        </li>
      ))}
    </ul>
  </>
);

// 3: in policy it acts, out of policy it asks
const Approve = () => (
  <>
    <ul className="sc-rows">
      <li><span className="sc-rn">Figma<small>Within policy</small></span><em className="sc-pill">Paid · coded</em></li>
    </ul>
    <div className="sc-ask sc-pop" style={{ '--d': '.9s' }}>
      <div className="sc-top"><span>Needs you</span><b>$1,486.20</b></div>
      <p>Delta Air Lines is $286 over the travel limit for this card.</p>
      <div className="sc-btns"><i className="is-yes">Approve</i><i>Decline</i></div>
    </div>
  </>
);

// 4: every action in one live feed
const FEED = [['Payments agent', 'Paid Northwind Design Ltd'], ['Close agent', 'Reconciled 48 transactions'], ['Treasury agent', 'Swept $40,000 to reserve'], ['Expense agent', 'Coded Figma to 6120 Software']];
const Feed = () => (
  <>
    <div className="sc-top"><span>Activity</span><b>Today</b></div>
    <ul className="sc-feed">
      {FEED.map(([a, d], i) => (
        <li key={d} className="sc-pop" style={{ '--d': `${i * 0.6}s` }}><Logomark /><span className="sc-rn">{d}<small>{a}</small></span></li>
      ))}
    </ul>
  </>
);

const SCENES = { routes: Routes, cards: Cards, ledger: Ledger, bars: Bars, signal: Signal, stacks: Stacks, events: Events, approve: Approve, feed: Feed };

// product slug → scene (the six moments cover all twelve products)
export const SCENE_FOR = {
  'payments': 'routes', 'travel': 'routes', 'stablecoin-ramp': 'routes',
  'corporate-cards': 'cards', 'procurement': 'cards',
  'accounting': 'ledger', 'expense': 'ledger', 'invoicing-billing': 'ledger',
  'reporting': 'bars',
  'ai-financial-management': 'signal',
  'treasury': 'stacks', 'accounts': 'stacks',
};

// `tone="light"` swaps the dark glow for a light surface with white panels; `big` gives the
// payments and treasury scenes their fuller versions; `head` renders above the panel in flow.
export function Scene({ kind, ratio, tone, big, head, children }) {
  const S = SCENES[kind] || Routes;
  return (
    <div className={`x-scene x-scene--${kind} ${tone === 'light' ? 'is-light' : ''} ${big ? 'is-big' : ''}`} style={ratio ? { aspectRatio: ratio } : undefined}>
      {head}
      <div className="sc-panel" aria-hidden="true"><S big={big} /></div>
      {children}
    </div>
  );
}
