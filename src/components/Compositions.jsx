import React from 'react';
import { Check, Sparkle, ArrowRight, AirplaneTilt, ShieldCheck, Receipt, Warning, CreditCard, Bank, PaperPlaneTilt } from './icons.jsx';
import { useLoop } from './ProductBento.jsx';
import corporateCard from '../assets/bento/corporate-cards.webp';
import { PRODUCTS } from '../data/products.js';
import './ProductBento.css';
import './LiveUI.css';
import './Compositions.css';

// Each module told in two or three pieces of its real screen, not the whole screen:
// the components that sell the idea, floating as a small composition (the way the
// homepage hero video does it). Built from the Figma screens' parts, so they stay sharp
// at any size; each runs one small loop so it feels alive.

const FL = import.meta.glob('../assets/flags/*.svg', { eager: true, query: '?url', import: 'default' });
const flag = (c) => FL[`../assets/flags/${c}.svg`];

// a floating panel: position and width in % of the stage, its own float rhythm
// `b` pins it to the stage's bottom instead of `y` from the top; `show` hides it until its moment
const P = ({ x, y, b, w, d = 0, z = 1, show = true, className = '', children }) => (
  <div className={`cmp-p ${b != null ? 'cmp-low' : ''} ${show ? '' : 'is-hidden'} ${className}`} style={{ left: `${x}%`, ...(b != null ? { bottom: `${b}%` } : { top: `${y}%` }), width: `${w}%`, zIndex: z, '--d': `${d}s` }}>
    <div className="cmp-in">{children}</div>
    {b == null && <Skeleton />}
  </div>
);

// the empty part of a card, filled with more of the same structure as loading placeholders:
// list rows under lists, stat tiles under stats, fields under forms (the card picks one by
// what it holds); as many as fit, shimmering, fading out toward the bottom
const Skeleton = () => (
  <span className="cmp-skel" aria-hidden="true">
    <span className="sk-rows">{Array.from({ length: 8 }, (_, k) => <span key={k} className="sk-row"><i className="sk-av" /><span className="sk-lines"><i /><i /></span><i className="sk-amt" /></span>)}</span>
    <span className="sk-stats">{Array.from({ length: 6 }, (_, k) => <span key={k} className="sk-stat"><i /><i /></span>)}</span>
    <span className="sk-fields">{Array.from({ length: 6 }, (_, k) => <span key={k} className="sk-field"><i /><i /></span>)}</span>
  </span>
);
const Head = ({ t, right }) => <div className="ui-row cmp-head"><b>{t}</b>{right}</div>;
const Chip = ({ tone = '', children }) => <span className={`ui-chip ${tone ? `cmp-chip--${tone}` : ''}`}>{children}</span>;
const Note = ({ icon = <Sparkle size={11} weight="fill" />, tone = 'sky', children }) => (
  <div className={`cmp-note cmp-note--${tone}`}><span className="cmp-note-ic">{icon}</span><span>{children}</span></div>
);
const Bar = ({ v, tone }) => <div className="ui-track"><i className={tone ? `is-${tone}` : ''} style={{ width: `${v}%` }} /></div>;

/* Payments: the send panel, recent transfers settling, the rail the agent picked */
function Payments() {
  const [ref, s] = useLoop(4, 1500);
  const rows = [['gb', 'Northwind Ltd', '£18,200.00', 'Faster Payments'], ['ng', 'Ada Okafor', '₦3,840,000', 'NIP'], ['de', 'Müller GmbH', '€9,450.00', 'SEPA Instant'], ['us', 'Stripe Inc.', '$12,400.00', 'Wire']];
  return (
    <div className="cmp" ref={ref}>
      <P x={4} y={6} w={40} d={0}>
        <Head t="Send payment" right={<span className="ui-muted">Step 2 of 2</span>} />
        <div className="ui-recip"><span className="ui-av">S</span><span><b>Stripe Inc.</b><small>Chase ··4821 · USD</small></span><Chip tone="ok">Verified</Chip></div>
        <div className="cmp-amt"><small>Amount</small><b>$12,400.00</b></div>
        <div className="cmp-rail"><span>Route</span><b>Wire · arrives today</b></div>
        <button className="ui-btn is-on" tabIndex={-1}>Send $12,400.00</button>
      </P>
      <P x={48} y={14} w={48} d={1.2}>
        <Head t="Recent transfers" right={<span className="ui-muted">Today</span>} />
        {rows.map(([f, n, a, r], k) => (
          <div key={n} className="cmp-line">
            <img className="cmp-flag" src={flag(f)} alt="" />
            <span className="cmp-grow"><b>{n}</b><small>{r}</small></span>
            <b className="cmp-num">{a}</b>
            {k === 3 && s < 2 ? <Chip tone="blue">Routing</Chip> : <Chip tone="ok">Settled</Chip>}
          </div>
        ))}
      </P>
      <P x={50} b={2} w={44} d={2.1} z={2}>
        <Note>Payments agent routed Müller GmbH over SEPA Instant, saving $38 in fees</Note>
      </P>
    </div>
  );
}

/* Corporate cards: the card, its controls, the month's limit filling */
function Cards() {
  const [ref, s] = useLoop(4, 1400);
  const spent = [12450, 12450, 15550, 15550][s];
  return (
    <div className="cmp" ref={ref}>
      <div className="cmp-card" style={{ left: '7%', top: '4%', width: '27%' }}><img src={corporateCard} alt="" /></div>
      <P x={50} y={4} w={42} d={0.6}>
        <Head t="Card controls" right={<Chip tone="ok">Active</Chip>} />
        {[['Card active', true], ['Online payments', true], ['ATM withdrawals', false]].map(([t, on]) => (
          <div key={t} className="cmp-line"><span className="cmp-grow">{t}</span><span className={`cmp-toggle ${on ? 'is-on' : ''}`}><i /></span></div>
        ))}
        <div className="cmp-line"><span className="cmp-grow">Monthly limit</span><b className="cmp-num">$25,000</b></div>
      </P>
      <P x={38} b={2} w={46} d={1.5} z={2}>
        <Head t="Spend this month" right={<b className="cmp-num">${spent.toLocaleString('en-US')} / $25,000</b>} />
        <Bar v={(spent / 25000) * 100} />
        <div className={`cmp-reveal ${s >= 2 ? 'is-on' : ''}`}><Note icon={<Check size={11} weight="bold" />} tone="ok">$3,100 at AWS · within policy, coded to 6100</Note></div>
      </P>
    </div>
  );
}

/* Expense: the receipt, the fields read off it, the policy verdict */
function Expense() {
  const [ref, s] = useLoop(6, 900);
  const fields = [['Merchant', 'Blue Bottle Coffee'], ['Amount', '$48.20'], ['Category', 'Meals · Team'], ['Card', 'Engineering ··4821']];
  return (
    <div className="cmp" ref={ref}>
      <P x={8} y={6} w={30} d={0}>
        <div className={`lu-receipt cmp-receipt ${s < 3 ? 'is-scan' : ''}`}>
          <b>BLUE BOTTLE</b><small>Oakland, CA · 14 Nov</small>
          {[['Latte ×4', '$22.00'], ['Pastries ×3', '$21.60'], ['Tax', '$4.60']].map(([l, v]) => <span key={l} className="lu-rline"><i>{l}</i><i>{v}</i></span>)}
          <span className="lu-rline lu-rtotal"><i>Total</i><i>$48.20</i></span>
          <span className="lu-scanbar" />
        </div>
      </P>
      <P x={42} y={10} w={50} d={1}>
        <Head t="New expense" right={<span className="ui-muted">{s >= 4 ? 'Ready' : 'Reading receipt'}</span>} />
        {fields.map(([l, v], k) => <div key={l} className={`lu-field ${s >= 1 + k * 0.75 ? 'is-on' : ''}`}><small>{l}</small><span>{v}</span></div>)}
      </P>
      <P x={30} b={2} w={40} d={1.8} z={2}>
        <Note icon={<ShieldCheck size={11} weight="fill" />} tone="ok">Within the $75 meals policy · coded to 6200</Note>
      </P>
    </div>
  );
}

/* Travel: the trip, the chosen flight, the approval trail */
function Travel() {
  const [ref, s] = useLoop(4, 1300);
  return (
    <div className="cmp" ref={ref}>
      <P x={6} y={8} w={38} d={0}>
        <Head t="Sales offsite" right={<Chip>Trip</Chip>} />
        <div className="cmp-route"><b>JFK</b><span><AirplaneTilt size={14} /></span><b>SFO</b></div>
        <div className="cmp-line"><span className="cmp-grow">Thu 14 – Sat 16 Nov</span><span className="ui-muted">3 travellers</span></div>
        <div className="cmp-line"><span className="cmp-grow">Budget</span><b className="cmp-num">$2,400</b></div>
      </P>
      <P x={50} y={4} w={44} d={1.1}>
        <Head t="Flight options" right={<span className="ui-muted">Economy</span>} />
        {[['DL 412', '07:10 → 10:25', '$412', true], ['UA 88', '09:45 → 13:05', '$468', true], ['AA 230', '12:30 → 15:50', '$1,120', false]].map(([n, t, p, ok], k) => (
          <div key={n} className={`lu-flight is-on ${k === 0 ? 'is-pick' : ''}`}><span className="lu-flight-m"><b>{n}</b><small>{t}</small></span><Chip tone={ok ? 'ok' : 'warn'}>{ok ? 'In policy' : 'Over limit'}</Chip><b className="lu-price">{p}</b></div>
        ))}
      </P>
      <P x={20} b={2} w={46} d={2} z={2}>
        <div className="lu-steps is-on">{['Requested', 'Approved', 'Booked'].map((l, k) => <span key={l} className={s >= k + 1 ? 'is-done' : ''}><i><Check size={9} weight="bold" /></i>{l}</span>)}</div>
      </P>
    </div>
  );
}

/* Accounts: balances in every currency, the account details, money arriving */
function Accounts() {
  const [ref, s] = useLoop(4, 1400);
  const bal = [['us', 'USD', '$248,120.00'], ['eu', 'EUR', '€84,300.50'], ['gb', 'GBP', '£41,980.00'], ['ng', 'NGN', '₦12,400,000']];
  return (
    <div className="cmp" ref={ref}>
      <P x={5} y={6} w={40} d={0}>
        <Head t="Balances" right={<span className="ui-muted">4 currencies</span>} />
        {bal.map(([f, c, b], k) => <div key={c} className="cmp-line"><img className="cmp-flag" src={flag(f)} alt="" /><span className="cmp-grow"><b>{c}</b></span><b className={`cmp-num ${k === 0 && s >= 2 ? 'cmp-bump' : ''}`}>{k === 0 && s >= 2 ? '$302,120.00' : b}</b></div>)}
      </P>
      <P x={51} y={12} w={42} d={1.2}>
        <Head t="USD account details" right={<Chip>Copy</Chip>} />
        {[['Account name', 'Acme Trading Co.'], ['Routing', '021000021'], ['Account', '··· 4821'], ['Rails', 'ACH · Wire · RTP']].map(([l, v]) => <div key={l} className="cmp-line"><span className="cmp-grow ui-muted">{l}</span><b>{v}</b></div>)}
      </P>
      <P x={24} b={2} w={42} d={2} z={2} show={s >= 1}>
        <Note icon={<ArrowRight size={11} weight="bold" />} tone="ok">+$54,000.00 from Northwind Ltd · ACH · received</Note>
      </P>
    </div>
  );
}

/* Treasury: the cash position, where it sits, the sweep the agent suggests */
function Treasury() {
  const [ref, s] = useLoop(4, 1500);
  return (
    <div className="cmp" ref={ref}>
      <P x={5} y={6} w={44} d={0}>
        <Head t="Cash position" right={<span className="ui-live"><i />Live</span>} />
        <div className="cmp-big">$3,137,520</div>
        <svg className="cmp-spark" viewBox="0 0 300 60" preserveAspectRatio="none" aria-hidden="true"><path d="M0 48 C40 44 60 30 90 34 S140 22 170 26 S220 12 250 16 S285 8 300 6" /></svg>
        <small className="ui-muted">Runway 14 months · forecast by the Treasury agent</small>
      </P>
      <P x={54} y={10} w={40} d={1.2}>
        <Head t="Accounts" />
        {[['C', 'Chase', 'USD operating', '$1,840,220'], ['B', 'Barclays', 'GBP operating', '$612,400'], ['A', 'Access Bank', 'NGN collections', '$286,900'], ['H', 'Hinstantt', 'Yield · 4.6%', '$398,000']].map(([a, n, l, v]) => (
          <div key={n} className="cmp-line"><span className="ui-av ui-av--sm">{a}</span><span className="cmp-grow"><b>{n}</b><small>{l}</small></span><b className="cmp-num">{v}</b></div>
        ))}
      </P>
      <P x={18} b={2} w={50} d={2} z={2}>
        <div className={`lu-suggest is-on ${s >= 2 ? 'is-done' : ''}`}>
          <span className="ui-tick ui-tick--blue"><Sparkle size={10} weight="fill" /></span>
          <span><b>{s >= 2 ? 'Swept $400,000 into yield' : 'Sweep $400,000 idle cash into yield?'}</b><small>{s >= 2 ? 'Earning about $1,530 a month' : 'Keeps 60 days of runway in operating'}</small></span>
          <span className="ui-btn ui-btn--sm">{s >= 2 ? <Check size={11} weight="bold" /> : 'Sweep'}</span>
        </div>
      </P>
    </div>
  );
}

/* Stablecoin ramp: the conversion, the balance it lands in */
function Ramp() {
  const [ref, s] = useLoop(4, 1400);
  return (
    <div className="cmp" ref={ref}>
      <P x={8} y={8} w={50} d={0}>
        <Head t="Convert" right={<span className="ui-muted">1 USD = 1.0000 USDC</span>} />
        <div className="lu-swap">
          <div className="lu-leg"><small>You send</small><b>$50,000.00</b><Chip>USD</Chip></div>
          <span className={`lu-arrow ${s >= 1 ? 'is-on' : ''}`}><ArrowRight size={14} weight="bold" /></span>
          <div className="lu-leg"><small>You receive</small><b>50,000.00</b><Chip tone="usdc">USDC</Chip></div>
        </div>
        <div className="cmp-line"><span className="cmp-grow ui-muted">Fee</span><b>$0.00</b></div>
      </P>
      <P x={62} y={20} w={32} d={1.2}>
        <Head t="USDC wallet" />
        <div className="cmp-big">{s >= 2 ? '62,480.00' : '12,480.00'}</div>
        <small className="ui-muted">USDC · Ethereum and Solana</small>
      </P>
      <P x={24} b={2} w={44} d={2} z={2} show={s >= 2}>
        <Note icon={<Check size={11} weight="bold" />} tone="ok">Settled on-chain in 4 seconds · Ramp agent picked the best rate</Note>
      </P>
    </div>
  );
}

/* Accounting: transactions coding themselves, the P&L they roll into, the ERP sync */
function Accounting() {
  const [ref, s] = useLoop(6, 800);
  const tx = [['A', 'AWS', '$2,450', '6100 · Cloud'], ['W', 'WeWork', '$8,000', '6800 · Rent'], ['D', 'Delta', '$1,280', '6700 · Travel'], ['F', 'Figma', '$540', '6300 · Software']];
  return (
    <div className="cmp" ref={ref}>
      <P x={4} y={6} w={50} d={0}>
        <Head t="Transactions" right={<span className="ui-muted">{Math.min(s, 4)} of 4 coded</span>} />
        {tx.map(([a, m, amt, gl], k) => (
          <div key={m} className={`ui-tx ${s > k ? 'is-done' : ''} ${s === k ? 'is-busy' : ''}`}>
            <span className="ui-av ui-av--sm">{a}</span><span className="ui-tx-m"><b>{m}</b><small>{amt}</small></span>
            <span className="ui-gl"><span className="ui-gl-busy"><Sparkle size={10} weight="fill" />Coding</span><span className="ui-gl-done"><Check size={10} weight="bold" />{gl}</span></span>
          </div>
        ))}
      </P>
      <P x={60} y={14} w={34} d={1.2}>
        <Head t="P&L · November" />
        {[['Revenue', '$1,240,000'], ['Cost of sales', '−$412,300'], ['Operating costs', '−$498,700']].map(([l, v]) => <div key={l} className="cmp-line"><span className="cmp-grow ui-muted">{l}</span><b className="cmp-num">{v}</b></div>)}
        <div className="cmp-line cmp-total"><span className="cmp-grow">Net income</span><b className="cmp-num">$329,000</b></div>
      </P>
      <P x={36} b={2} w={36} d={2} z={2}>
        <Note icon={<Check size={11} weight="bold" />} tone="ok">Synced to NetSuite · 2 minutes ago</Note>
      </P>
    </div>
  );
}

/* Procurement: the request, the three-way match, the payment it unlocks */
function Procurement() {
  const [ref, s] = useLoop(5, 1000);
  return (
    <div className="cmp" ref={ref}>
      <P x={5} y={6} w={38} d={0}>
        <Head t="Purchase request" right={<Chip tone="ok">Approved</Chip>} />
        <div className="cmp-amt"><small>40 × MacBook Pro 14"</small><b>$56,000.00</b></div>
        {[['Requested by', 'Maya · Engineering'], ['Supplier', 'Dell Technologies'], ['Budget', 'Q4 Hardware']].map(([l, v]) => <div key={l} className="cmp-line"><span className="cmp-grow ui-muted">{l}</span><b>{v}</b></div>)}
      </P>
      <P x={48} y={12} w={46} d={1.2}>
        <Head t="Three-way match" right={<span className="ui-muted">{s >= 3 ? 'Matched' : `${s} of 3`}</span>} />
        <div className="lu-docs">
          {[['PO-2041', '$56,000'], ['GRN-883', '40 units'], ['INV-7710', '$56,000']].map(([t, v], k) => (
            <div key={t} className={`lu-doc is-on ${s >= k + 1 ? 'is-match' : ''}`}><span className="lu-doc-ic"><Receipt size={13} weight="fill" /></span><b>{t}</b><span className="lu-doc-v">{v}</span><span className="lu-doc-ok"><Check size={10} weight="bold" /></span></div>
          ))}
        </div>
      </P>
      <P x={26} b={2} w={44} d={2} z={2} show={s >= 3}>
        <Note icon={<Check size={11} weight="bold" />} tone="ok">Matched · payment to Dell scheduled for Friday</Note>
      </P>
    </div>
  );
}

/* Invoicing: the invoice and its status, the payment trail */
function Invoicing() {
  const [ref, s] = useLoop(4, 1400);
  const st = [['Sent', ''], ['Viewed', 'blue'], ['Paid', 'ok'], ['Paid', 'ok']][s];
  return (
    <div className="cmp" ref={ref}>
      <P x={6} y={6} w={44} d={0}>
        <Head t="Invoice INV-0192" right={<Chip tone={st[1]}>{st[0]}</Chip>} />
        <div className="lu-inv-to"><span className="ui-av">A</span><span><b>Acme Corporation</b><small>Due in 14 days</small></span><b className="lu-inv-amt">$18,400.00</b></div>
        {[['Platform licence · Q4', '$12,000.00'], ['Implementation', '$4,800.00'], ['Support · Premium', '$1,600.00']].map(([l, v]) => <div key={l} className="lu-inv-line"><span>{l}</span><span>{v}</span></div>)}
      </P>
      <P x={56} y={16} w={38} d={1.2}>
        <Head t="Activity" />
        <div className="lu-timeline">{[['Sent to billing@acme.com', 0], ['Opened by Jane at Acme', 1], ['Paid by card · reconciled', 2]].map(([l, at]) => <span key={l} className={s >= at ? 'is-on' : ''}><i />{l}</span>)}</div>
      </P>
      <P x={30} b={2} w={40} d={2} z={2}>
        <Note>Billing agent will remind Acme two days before it is due</Note>
      </P>
    </div>
  );
}

/* Reporting: spend by category, the insight on what changed */
function Reporting() {
  const [ref, s] = useLoop(3, 1800);
  const cat = [['Software / SaaS', 35, '$185k'], ['Infrastructure', 24, '$125k'], ['Travel', 18, '$95k'], ['Marketing', 14, '$72k']];
  return (
    <div className="cmp" ref={ref}>
      <P x={5} y={6} w={52} d={0}>
        <Head t="Spend by category" right={<span className="ui-seg"><i className="is-on">This month</i><i>Last month</i></span>} />
        {cat.map(([n, pct, amt]) => (
          <div key={n} className="ui-bar-row"><div className="ui-row"><span>{n}</span><span><span className="ui-muted">{pct}%</span> <b>{amt}</b></span></div><Bar v={s >= 1 ? pct * 2.6 : 0} /></div>
        ))}
      </P>
      <P x={62} y={14} w={32} d={1.2}>
        <Head t="Monthly burn" />
        <div className="cmp-big">$412k</div>
        <small className="cmp-up">−6.2% vs October</small>
      </P>
      <P x={30} b={2} w={46} d={2} z={2} show={s >= 1}>
        <Note>Software spend is up 18%: three new tools in Engineering this month</Note>
      </P>
    </div>
  );
}

/* AI finance: the overview, the agents' activity, the one thing that needs you */
function AiFinance() {
  const [ref, s] = useLoop(4, 1300);
  const feed = [['Close agent', 'Reconciled 1,284 transactions'], ['Payments agent', 'Paid 42 bills on schedule'], ['Treasury agent', 'Swept $400k into yield'], ['Policy agent', 'Blocked a duplicate invoice']];
  return (
    <div className="cmp" ref={ref}>
      <P x={4} y={6} w={52} d={0}>
        <Head t="Overview" right={<span className="ui-live"><i />Live</span>} />
        <div className="ui-stats">{[['Cash', '$3.14M'], ['Burn', '$412k'], ['Runway', '14 mo'], ['Overdue', '$8,730']].map(([l, v], k) => <div key={l} className="ui-stat"><small>{l}</small><b className={`ui-num ${k === 3 ? 'is-red' : ''}`}>{v}</b></div>)}</div>
      </P>
      <P x={58} y={10} w={38} d={1.2}>
        <Head t="Agent activity" />
        {feed.map(([a, t], k) => <div key={a} className={`cmp-feed ${k <= s ? 'is-on' : ''}`}><span className="ui-tick ui-tick--blue"><Sparkle size={9} weight="fill" /></span><span><b>{a}</b><small>{t}</small></span></div>)}
      </P>
      <P x={12} b={2} w={44} d={2} z={2}>
        <div className="ui-alert is-on"><Warning size={14} weight="fill" /><span><b>3 overdue bills need you</b><small>Everything else is handled</small></span><span className="ui-alert-cta">Review <ArrowRight size={11} weight="bold" /></span></div>
      </P>
    </div>
  );
}

/* Revenue intelligence: recurring revenue, customer health, the churn risk flagged */
function Revenue() {
  const [ref, s] = useLoop(3, 1700);
  return (
    <div className="cmp" ref={ref}>
      <P x={5} y={6} w={44} d={0}>
        <Head t="Recurring revenue" right={<small className="cmp-up">+8.2%</small>} />
        <div className="cmp-big">$1.24M</div>
        <svg className="cmp-spark" viewBox="0 0 300 60" preserveAspectRatio="none" aria-hidden="true"><path d="M0 50 C40 46 70 40 100 36 S160 28 190 22 S250 14 300 8" /></svg>
      </P>
      <P x={54} y={12} w={40} d={1.2}>
        <Head t="Customer health" />
        {[['Acme Corporation', 92, 'ok'], ['Northwind Ltd', 78, 'ok'], ['Globex', 41, 'warn']].map(([n, v, t]) => (
          <div key={n} className="cmp-line"><span className="cmp-grow"><b>{n}</b></span><span className="cmp-meter"><Bar v={v} tone={t} /></span><b className="cmp-num">{v}</b></div>
        ))}
      </P>
      <P x={22} b={2} w={46} d={2} z={2} show={s >= 1}>
        <Note icon={<Warning size={11} weight="fill" />} tone="warn">Globex usage down 40% in 30 days · renewal in March</Note>
      </P>
    </div>
  );
}

export const COMPOSITIONS = {
  payments: Payments, 'corporate-cards': Cards, expense: Expense, travel: Travel, accounts: Accounts, treasury: Treasury,
  'stablecoin-ramp': Ramp, accounting: Accounting, procurement: Procurement, 'invoicing-billing': Invoicing,
  reporting: Reporting, 'ai-financial-management': AiFinance, revenue: Revenue,
};

// the company's figures, one per module, for the big-number card
const STAT = {
  payments: ['100+', 'Markets with local rails'], travel: ['100+', 'Markets your team can travel and spend in'], accounts: ['100+', 'Markets you can receive from'],
  'corporate-cards': ['$20B', 'Annualized volume on Hinstantt'], treasury: ['$20B', 'Annualized volume on Hinstantt'], 'stablecoin-ramp': ['$20B', 'Annualized volume on Hinstantt'],
  'invoicing-billing': ['$20B', 'Annualized volume on Hinstantt'], revenue: ['$20B', 'Annualized volume on Hinstantt'],
  expense: ['15K+', 'Businesses running on Hinstantt'], accounting: ['15K+', 'Businesses running on Hinstantt'], procurement: ['15K+', 'Businesses running on Hinstantt'],
  reporting: ['15K+', 'Businesses running on Hinstantt'], 'ai-financial-management': ['20+', 'Licenses across regions'],
};
const AGENT = { revenue: { name: 'Revenue agent', line: 'Watches recurring revenue and flags churn risk before renewal.' } };

// The module as a bento grid (rounded cards on a fixed grid, no floating): the main
// component tall on the left, the second beside it, the agent's moment under it, and two
// cards of its own on the right: the big number and the agent at work. `compact` keeps
// just the two main components and the number, for shorter stages.
export default function Composition({ slug, className = '', compact = false }) {
  const C = COMPOSITIONS[slug];
  if (!C) return null;
  const p = PRODUCTS[slug];
  const [v, l] = STAT[slug] || ['15K+', 'Businesses running on Hinstantt'];
  const agent = (p && p.agent) || AGENT[slug] || { name: 'Finance agent', line: '' };
  return (
    <div className={`cmp-stage cmp-bento ${compact ? 'is-compact' : ''} ${className}`} aria-hidden="true">
      <C />
      <div className="cmp-cell cmp-stat">
        <b className="cmp-stat-v">{v}</b>
        <span className="cmp-stat-l">{l}</span>
      </div>
      {!compact && (
        <div className="cmp-cell cmp-agent">
          <span className="cmp-agent-top"><i />{agent.name}<em>24/7</em></span>
          <p>{agent.line}</p>
          {/* the agent's activity, still loading */}
          <span className="cmp-agent-log" aria-hidden="true">{Array.from({ length: 6 }, (_, k) => <span key={k}><i /><i /></span>)}</span>
          <span className="cmp-agent-bar"><span /></span>
        </div>
      )}
    </div>
  );
}
