import React from 'react';
import hero1080 from '../assets/hero/hero-1080.mp4';
import hero720 from '../assets/hero/hero-720.mp4';
import heroPoster from '../assets/hero/hero-poster.jpg';
import './HeroGlass.css';

// The homepage hero: the brand film full-bleed behind the headline (cities, ports, warehouses,
// boardrooms, runways: the places global money moves through), muted and looping, darkened
// toward the copy so the type stays legible. Phones get the lighter 720p cut. With reduced
// motion the film stays on its first frame.
const MQ_SMALL = '(max-width: 900px)';

export default function HeroGlass() {
  const [small] = React.useState(() => typeof window !== 'undefined' && window.matchMedia(MQ_SMALL).matches);
  const videoRef = React.useRef(null);

  // Safari/iOS sometimes ignore autoplay unless muted is set on the element itself and
  // play() is called explicitly
  React.useEffect(() => {
    const v = videoRef.current;
    if (!v) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { v.pause(); return undefined; }
    v.muted = true; v.defaultMuted = true; v.setAttribute('muted', '');
    const tryPlay = () => { const p = v.play(); if (p && p.catch) p.catch(() => {}); };
    tryPlay();
    v.addEventListener('canplay', tryPlay, { once: true });
    return () => v.removeEventListener('canplay', tryPlay);
  }, []);

  return (
    <header className="hg hg--film">
      <video ref={videoRef} className="hg-film" src={small ? hero720 : hero1080} poster={heroPoster}
             autoPlay muted loop playsInline preload="auto" aria-hidden="true" />
      <div className="hg-shade" aria-hidden="true" />
      <div className="hg-inner">
        <div className="hg-copy">
          <h1 className="hg-title">The finance OS that moves at the speed of decision</h1>
          <p className="hg-sub">
            Cards, payments, treasury and accounting on one platform, with AI agents doing the
            work across 100+ markets. Built for global teams who refuse to wait for their own money.
          </p>
          <div className="hg-cta">
            <a className="hg-btn hg-btn-primary" href="https://app.hinstantt.com/signup">Get started</a>
            <a className="hg-btn hg-btn-ghost" href="mailto:newbusiness@hinstantt.com?subject=Enquiries">Talk to sales</a>
          </div>
        </div>
      </div>
    </header>
  );
}
