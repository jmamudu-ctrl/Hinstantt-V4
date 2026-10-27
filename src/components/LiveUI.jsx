import React from 'react';
import { Check, Sparkle, ArrowRight, AirplaneTilt, ShieldCheck, Receipt, CurrencyDollar } from './icons.jsx';
import { useLoop, MoveMoney, Cards, Ledger, Analyze, Decide, Wallets } from './ProductBento.jsx';
import './LiveUI.css';

// Live product moments for the product pages, in the bento's language: a white panel of
// real Hinstantt UI running one small piece of the module on a loop. Six come from the
// homepage bento; the rest are built here the same way.

/* Expense: a receipt is scanned, its fields fill in, policy passes, it is submitted */
function Expense() {
  const [ref, s] = useLoop(9, 700);
  const fields = [['Merchant', 'Blue Bottle Coffee'], ['Amount', '$48.20'], ['Category', 'Meals · Team'], ['Card', 'Engineering ··4821']];
  return (
    <div className="ui-stage" ref={ref}>
      <div className="ui-panel lu-expense">
        <div className={`lu-receipt ${s >= 1 && s < 5 ? 'is-scan' : ''}`}>
          <b>BLUE BOTTLE</b><small>Oakland, CA</small>
          {['Latte ×4', 'Pastries ×3', 'Tax'].map((l, k) => <span key={l} className="lu-rline"><i>{l}</i><i>{['$22.00', '$21.60', '$4.60'][k]}</i></span>)}
          <span className="lu-rline lu-rtotal"><i>Total</i><i>$48.20</i></span>
          <span className="lu-scanbar" />
        </div>
        <div className="lu-fields">
          <div className="ui-row ui-head"><b>New expense</b><span className="ui-muted">{s >= 8 ? 'Submitted' : s >= 6 ? 'In policy' : 'Reading receipt'}</span></div>
          {fields.map(([l, v], k) => (
            <div key={l} className={`lu-field ${s >= 2 + k ? 'is-on' : ''}`}><small>{l}</small><span>{v}</span></div>
          ))}
          <div className={`lu-policy ${s >= 6 ? 'is-on' : ''}`}><ShieldCheck size={13} weight="fill" />Within the $75 meals policy</div>
          <button className={`ui-btn ${s >= 7 ? 'is-on' : ''} ${s === 7 ? 'is-press' : ''}`} tabIndex={-1}>{s >= 8 ? <><Check size={12} weight="bold" />Submitted</> : 'Submit expense'}</button>
        </div>
      </div>
    </div>
  );
}

/* Travel: flight options load, one is picked, policy checks it, the trip is booked */
const FLIGHTS = [['DL 412', '07:10 → 10:25', '$412', true], ['UA 88', '09:45 → 13:05', '$468', true], ['AA 230', '12:30 → 15:50', '$1,120', false]];
function Travel() {
  const [ref, s] = useLoop(8, 820);
  return (
    <div className="ui-stage" ref={ref}>
      <div className="ui-panel lu-travel">
        <div className="ui-row ui-head"><b>New York → San Francisco</b><span className="ui-muted">Thu 14 Nov · 1 traveller</span></div>
        {FLIGHTS.map(([n, t, p, ok], k) => (
          <div key={n} className={`lu-flight ${s >= 1 + k * 0.5 ? 'is-on' : ''} ${s >= 3 && k === 0 ? 'is-pick' : ''}`} style={{ transitionDelay: `${k * 90}ms` }}>
            <span className="ui-av ui-av--sm"><AirplaneTilt size={13} weight="fill" /></span>
            <span className="lu-flight-m"><b>{n}</b><small>{t}</small></span>
            <span className={`ui-chip ${ok ? 'ui-chip--ok' : 'lu-chip--warn'}`}>{ok ? 'In policy' : 'Over limit'}</span>
            <b className="lu-price">{p}</b>
          </div>
        ))}
        <div className={`lu-steps ${s >= 4 ? 'is-on' : ''}`}>
          {['Requested', 'Approved', 'Booked'].map((l, k) => <span key={l} className={s >= 4 + k ? 'is-done' : ''}><i><Check size={9} weight="bold" /></i>{l}</span>)}
        </div>
        <div className={`lu-ticket ${s >= 7 ? 'is-on' : ''}`}><AirplaneTilt size={15} weight="fill" /><span><b>Trip booked · DL 412</b><small>Charged to the Travel card, synced to Expense</small></span></div>
      </div>
    </div>
  );
}

/* Treasury: balances arrive from each bank, the total counts up, the agent suggests a sweep */
const BANKS = [['Chase', 'USD operating', 1840220], ['Barclays', 'GBP operating', 612400], ['Access Bank', 'NGN collections', 286900], ['Hinstantt', 'USD wallet', 398000]];
function useCount(target, on, ms = 900) {
  const [v, setV] = React.useState(0);
  React.useEffect(() => {
    if (!on) { setV(0); return undefined; }
    let raf, t0;
    const tick = (t) => { t0 ??= t; const p = Math.min(1, (t - t0) / ms); setV(Math.round(target * (1 - (1 - p) ** 3))); if (p < 1) raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, on, ms]);
  return v;
}
function Treasury() {
  const [ref, s] = useLoop(9, 760);
  const shown = Math.min(BANKS.length, s);
  const total = BANKS.slice(0, shown).reduce((a, b) => a + b[2], 0);
  const v = useCount(total, shown > 0, 600);
  return (
    <div className="ui-stage" ref={ref}>
      <div className="ui-panel lu-treasury">
        <div className="ui-row ui-head"><b>Cash position</b><span className="ui-live"><i />Live</span></div>
        <div className="lu-total"><small>Across {shown} of {BANKS.length} accounts</small><b>${v.toLocaleString('en-US')}</b></div>
        {BANKS.map(([b, l, amt], k) => (
          <div key={b} className={`lu-bank ${k < shown ? 'is-on' : ''}`}>
            <span className="ui-av ui-av--sm">{b[0]}</span><span className="lu-flight-m"><b>{b}</b><small>{l}</small></span><b>${amt.toLocaleString('en-US')}</b>
          </div>
        ))}
        <div className={`lu-suggest ${s >= 5 ? 'is-on' : ''} ${s >= 7 ? 'is-done' : ''}`}>
          <span className="ui-tick ui-tick--blue"><Sparkle size={10} weight="fill" /></span>
          <span><b>{s >= 7 ? 'Swept $400,000 to the 4.6% yield account' : 'Sweep $400,000 idle cash to yield?'}</b><small>{s >= 7 ? 'Earning about $1,530 a month' : 'Keeps 60 days of runway in operating'}</small></span>
          <span className={`ui-btn ui-btn--sm ${s === 6 ? 'is-press' : ''}`}>{s >= 7 ? <Check size={11} weight="bold" /> : 'Sweep'}</span>
        </div>
      </div>
    </div>
  );
}

/* Stablecoin ramp: dollars in, a quote locks, the conversion settles, USDC lands */
function Ramp() {
  const [ref, s] = useLoop(8, 800);
  const usdc = useCount(50000, s >= 5, 900);
  return (
    <div className="ui-stage" ref={ref}>
      <div className="ui-panel lu-ramp">
        <div className="ui-row ui-head"><b>Convert</b><span className="ui-muted">Rate 1 USD = 1.0000 USDC</span></div>
        <div className="lu-swap">
          <div className="lu-leg"><small>You send</small><b>$50,000.00</b><span className="ui-chip">USD</span></div>
          <span className={`lu-arrow ${s >= 1 ? 'is-on' : ''}`}><ArrowRight size={14} weight="bold" /></span>
          <div className="lu-leg"><small>You receive</small><b>{usdc.toLocaleString('en-US')}.00</b><span className="ui-chip lu-chip--usdc">USDC</span></div>
        </div>
        <div className="lu-progress">
          {['Quote locked', 'Converting', 'Settled on-chain'].map((l, k) => (
            <span key={l} className={`${s >= 2 + k * 1.5 ? 'is-done' : ''} ${Math.floor(s) === 2 + k ? 'is-busy' : ''}`}><i><Check size={9} weight="bold" /></i>{l}</span>
          ))}
          <em style={{ width: `${Math.min(100, Math.max(0, (s - 1) / 4) * 100)}%` }} />
        </div>
        <div className={`lu-ticket ${s >= 6 ? 'is-on' : ''}`}><CurrencyDollar size={15} weight="bold" /><span><b>50,000 USDC in your wallet</b><small>Settled in 4 seconds · fee $0.00</small></span></div>
      </div>
    </div>
  );
}

/* Procurement: the PO, goods receipt and invoice each check in, then three-way match */
function Procurement() {
  const [ref, s] = useLoop(8, 780);
  const docs = [['Purchase order', 'PO-2041 · 40 laptops', '$56,000'], ['Goods received', 'GRN-883 · 40 of 40', '40 units'], ['Supplier invoice', 'INV-7710 · Dell', '$56,000']];
  return (
    <div className="ui-stage" ref={ref}>
      <div className="ui-panel lu-proc">
        <div className="ui-row ui-head"><b>Three-way match</b><span className="ui-muted">{s >= 5 ? 'Matched' : `${Math.min(3, s)} of 3 documents`}</span></div>
        <div className="lu-docs">
          {docs.map(([t, d, v], k) => (
            <div key={t} className={`lu-doc ${s >= 1 + k ? 'is-on' : ''} ${s >= 4 ? 'is-match' : ''}`}>
              <span className="lu-doc-ic"><Receipt size={14} weight="fill" /></span><b>{t}</b><small>{d}</small><span className="lu-doc-v">{v}</span>
              <span className="lu-doc-ok"><Check size={10} weight="bold" /></span>
            </div>
          ))}
        </div>
        <div className={`lu-ticket ${s >= 5 ? 'is-on' : ''}`}><Check size={15} weight="bold" /><span><b>Matched · payment scheduled for Friday</b><small>Quantities and amounts agree across all three</small></span></div>
      </div>
    </div>
  );
}

/* Invoicing: an invoice moves from draft to sent, viewed and paid */
function Invoicing() {
  const [ref, s] = useLoop(8, 850);
  const st = s >= 6 ? ['Paid', 'ok'] : s >= 4 ? ['Viewed', 'blue'] : s >= 2 ? ['Sent', 'grey'] : ['Draft', 'grey'];
  return (
    <div className="ui-stage" ref={ref}>
      <div className="ui-panel lu-inv">
        <div className="ui-row ui-head"><b>Invoice INV-0192</b><span key={st[0]} className={`ui-chip lu-st lu-st--${st[1]}`}>{st[0]}</span></div>
        <div className="lu-inv-to"><span className="ui-av">A</span><span><b>Acme Corporation</b><small>Due in 14 days · NET 14</small></span><b className="lu-inv-amt">$18,400.00</b></div>
        {[['Platform licence · Q4', '$12,000.00'], ['Implementation', '$4,800.00'], ['Support · Premium', '$1,600.00']].map(([l, v]) => <div key={l} className="lu-inv-line"><span>{l}</span><span>{v}</span></div>)}
        <div className="lu-timeline">
          {[['Sent to billing@acme.com', 2], ['Opened by Jane at Acme', 4], ['Paid by card · reconciled', 6]].map(([l, at]) => (
            <span key={l} className={s >= at ? 'is-on' : ''}><i />{l}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export const LIVE_UI = {
  payments: MoveMoney, 'corporate-cards': Cards, accounting: Ledger, reporting: Analyze, 'ai-financial-management': Decide, accounts: Wallets,
  expense: Expense, travel: Travel, treasury: Treasury, 'stablecoin-ramp': Ramp, procurement: Procurement, 'invoicing-billing': Invoicing,
};
