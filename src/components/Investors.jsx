import React from 'react';
import './Investors.css';

import inv1 from '../assets/investors/inv1.png';
import inv2 from '../assets/investors/inv2.png';
import inv3 from '../assets/investors/inv3.png';
import inv4 from '../assets/investors/inv4.png';
import inv5 from '../assets/investors/inv5.png';
import inv6 from '../assets/investors/inv6.png';
import inv7 from '../assets/investors/inv7.png';

const LOGOS = [inv1, inv2, inv3, inv4, inv5, inv6, inv7];

export default function Investors() {
  return (
    <section className="inv">
      <div className="wrap">
        <div className="inv-head">
          <h2 className="inv-title" data-enter>Backed by leading investors.</h2>
          <p className="inv-sub" data-enter-follow>
            We are building the infrastructure for global money, with investors who back
            category-defining companies.
          </p>
          <a className="inv-link" href="/contact">Talk to us
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </a>
        </div>

      </div>

      {/* the logos scroll across the page in grey; the tape is doubled so the loop is seamless */}
      <div className="inv-marquee" aria-label="Investors">
        <div className="inv-tape">
          {[0, 1].map((rep) => LOGOS.map((logo, i) => (
            <img className="inv-logo" key={`${rep}-${i}`} src={logo} alt="" aria-hidden={rep === 1} loading="lazy" decoding="async" />
          )))}
        </div>
      </div>
    </section>
  );
}
