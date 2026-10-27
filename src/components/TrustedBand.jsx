import React from 'react';
import FlutedBackground from './FlutedBackground.jsx';
import './TrustedBand.css';

export default function TrustedBand() {
  return (
    <section className="trb">
      {/* the One Platform background: the hero's fluted glass on the dark base, held back */}
      <div className="trb-bg" aria-hidden="true"><FlutedBackground className="trb-scene" dark hue={-20} /></div>
      <div className="wrap trb-inner">
        <h2 className="trb-head" data-enter>
          From first invoice to final close, agents run it all on <em>one platform</em>.
        </h2>
        <div className="trb-stat" data-enter-follow>
          <span className="trb-num">15,000+</span>
          <span className="trb-label">businesses let Hinstantt agents run their finance end to end, across every industry.</span>
        </div>
      </div>

    </section>
  );
}
