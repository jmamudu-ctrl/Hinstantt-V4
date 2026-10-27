import React from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { SentIcon, CreditCardIcon, ReceiptDollarIcon, BankIcon, Calculator01Icon } from '@hugeicons/core-free-icons';
import { HERO_PHOTOS } from './Kit.jsx';
import { PRODUCTS } from '../data/products.js';
import './OnePlatform.css';

// "One back office. An agent in every module." A scroll-through: the section pins while
// five full-screen photos pass one after another, each carrying its module's headline,
// line and a link to its page. Five pills at the foot show the place and jump on tap.
const MODULES = [
  { slug: 'payments', icon: SentIcon },
  { slug: 'corporate-cards', icon: CreditCardIcon, short: 'Cards' },
  { slug: 'expense', icon: ReceiptDollarIcon },
  { slug: 'treasury', icon: BankIcon },
  { slug: 'accounting', icon: Calculator01Icon },
];

export default function OnePlatform() {
  const ref = React.useRef(null);
  const [i, setI] = React.useState(0);
  const updateRef = React.useRef(null);

  // one screen of scroll per module: module k is at rest when the section's top is k screens
  // above the viewport, and the switch happens halfway between two modules. --p is the
  // progress from the current module toward the next (0 at rest, 1 at the next one).
  React.useEffect(() => {
    const el = ref.current; if (!el) return undefined;
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      const x = Math.min(MODULES.length - 1, Math.max(0, -el.getBoundingClientRect().top / vh));
      const n = Math.min(MODULES.length - 1, Math.round(x));
      // the active module owns the scroll from halfway after the previous one to halfway
      // before the next; its bar fills across exactly that stretch
      const lo = Math.max(0, n - 0.5), hi = Math.min(MODULES.length - 1, n + 0.5);
      el.style.setProperty('--p', (hi > lo ? (x - lo) / (hi - lo) : 1).toFixed(3));
      setI(n);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    updateRef.current = update;
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    // while the section is on screen, also check every frame, so no scroll is ever missed
    // (the smooth-scroll library doesn't always raise a native event on its last frame)
    let loop = 0, lastY = -1;
    const tick = () => { if (window.scrollY !== lastY) { lastY = window.scrollY; update(); } loop = requestAnimationFrame(tick); };
    const io = new IntersectionObserver(([e]) => { cancelAnimationFrame(loop); if (e.isIntersecting) loop = requestAnimationFrame(tick); });
    io.observe(el);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); io.disconnect(); cancelAnimationFrame(loop); cancelAnimationFrame(raf); };
  }, []);

  // a tap scrolls to that module at rest
  const go = (n) => {
    const el = ref.current; if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY + n * window.innerHeight;
    if (window.__lenis) window.__lenis.scrollTo(y, { duration: 1, onComplete: () => updateRef.current && updateRef.current() }); else window.scrollTo({ top: y, behavior: 'smooth' });
  };

  return (
    <section className="op2" ref={ref} style={{ '--n': MODULES.length }}>
      <div className="op2-pin">
        {MODULES.map((m, k) => (
          <img key={m.slug} className={`op2-img ${k === i ? 'is-on' : ''} ${k < i ? 'is-past' : ''}`} src={HERO_PHOTOS[m.slug].src}
               alt="" style={{ objectPosition: HERO_PHOTOS[m.slug].pos }} loading={k ? 'lazy' : 'eager'} decoding="async" />
        ))}
        <div className="op2-shade" aria-hidden="true" />

        <div className="wrap op2-inner">
          <div className="op2-head">
            <h2 className="op2-title" data-enter>One back office. An agent in every module.</h2>
            <a className="btn op2-cta" href="https://app.hinstantt.com/signup">Get started</a>
          </div>

          <div className="op2-slides">
            {MODULES.map((m, k) => {
              const p = PRODUCTS[m.slug];
              return (
                <div key={m.slug} className={`op2-slide ${k === i ? 'is-on' : ''}`} aria-hidden={k !== i}>
                  <span className="op2-tag"><HugeiconsIcon icon={m.icon} size={14} color="currentColor" strokeWidth={1.8} />{p.name}<i />{p.agent.name} · 24/7</span>
                  <h3 className="op2-h">{p.headline}</h3>
                  <p className="op2-sub">{p.sub}</p>
                  <a className="op2-link" href={`/products/${m.slug}`} tabIndex={k === i ? 0 : -1}>Explore {p.name} <span aria-hidden="true">→</span></a>
                </div>
              );
            })}
          </div>

          <div className="op2-pills" role="tablist" aria-label="Modules">
            {MODULES.map((m, k) => (
              <button key={m.slug} type="button" role="tab" aria-selected={k === i} aria-label={PRODUCTS[m.slug].name} className={`op2-pill ${k === i ? 'is-on' : ''} ${k < i ? 'is-done' : ''}`} onClick={() => go(k)}>
                <span className="op2-pill-fill" />
                <span className="op2-pill-ic"><HugeiconsIcon icon={m.icon} size={16} color="currentColor" strokeWidth={1.8} /></span>
                <span className="op2-pill-t">{m.short || PRODUCTS[m.slug].name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
