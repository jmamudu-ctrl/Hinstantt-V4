import React from 'react';
import FlutedBackground from './FlutedBackground.jsx';
import './Compare.css';

// "How Hinstantt compares." A dark panel on the site's fluted sky: the heading on the
// left, a glass comparison table on the right with the Hinstantt column lifted out as
// its own brighter pane. Filled dots for yes, hollow for no, half for partly.

const ROWS = [
  { f: 'Accounting, payments, cards and treasury in one platform', us: 1, a: 0, b: 0.5 },
  { f: 'AI agents that do the work, not just suggest it',          us: 1, a: 0, b: 0 },
  { f: 'Pay in and out across 100+ markets',                        us: 1, a: 0.5, b: 0 },
  { f: 'Continuous close: books kept current every day',           us: 1, a: 0, b: 0.5 },
  { f: 'Policies enforced at authorisation, not after',            us: 1, a: 0.5, b: 0 },
  { f: 'Stablecoin and fiat as first-class accounts',              us: 1, a: 0, b: 0 },
  { f: 'One subscription, every module included',                  us: 1, a: 0, b: 0 },
];
const COLS = [
  { k: 'a', t: 'Point solutions', s: 'cards, AP, FX each on their own' },
  { k: 'b', t: 'Legacy ERPs', s: 'with add-ons and consultants' },
];

const Dot = ({ v }) => (
  <span className={`cp-dot ${v === 1 ? 'is-yes' : v === 0.5 ? 'is-half' : 'is-no'}`} aria-label={v === 1 ? 'Yes' : v === 0.5 ? 'Partly' : 'No'} role="img" />
);

export default function Compare() {
  return (
    <section className="cp">
      <div className="wrap">
        <div className="cp-panel">
          <FlutedBackground className="cp-sky" dark hue={-20} ribs={6} />
          <div className="cp-inner">
            <h2 className="cp-title" data-enter>How Hinstantt compares:</h2>

            <div className="cp-table" role="table" aria-label="How Hinstantt compares">
              <div className="cp-row cp-head" role="row">
                <div className="cp-feature" role="columnheader" />
                <div className="cp-us" role="columnheader"><span className="cp-pill">Hinstantt</span></div>
                {COLS.map((c) => <div className="cp-col" role="columnheader" key={c.k}><b>{c.t}</b><small>{c.s}</small></div>)}
              </div>
              {ROWS.map((r) => (
                <div className="cp-row" role="row" key={r.f}>
                  <div className="cp-feature" role="cell">{r.f}</div>
                  <div className="cp-us" role="cell"><Dot v={r.us} /></div>
                  {COLS.map((c) => <div className="cp-col" role="cell" key={c.k}><Dot v={r[c.k]} /></div>)}
                </div>
              ))}
              {/* the Hinstantt column, lifted out as its own pane */}
              <div className="cp-lift" aria-hidden="true" />
            </div>
          </div>
        </div>

        <div className="cp-foot">
          <span className="cp-note">Hinstantt · the operating system for global money</span>
          <a className="btn btn-primary cp-cta" href="https://app.hinstantt.com/signup">Start now</a>
        </div>
      </div>
    </section>
  );
}
