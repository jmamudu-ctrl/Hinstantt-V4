import React from 'react';
import { createPortal } from 'react-dom';
import Product3 from './Product3.jsx';
import { PRODUCTS } from '../data/products.js';

// the spinning coin is three.js, so it loads only when a peek opens
const Coin = React.lazy(() => import('./coin.jsx'));
// each product's coin alloy, so neighbouring products feel different
const ALLOY = { 'payments': 'gold', 'corporate-cards': 'silver', 'accounting': 'copper', 'reporting': 'rose', 'treasury': 'gold', 'accounts': 'silver',
  'expense': 'rose', 'travel': 'copper', 'stablecoin-ramp': 'silver', 'procurement': 'copper', 'invoicing-billing': 'rose', 'ai-financial-management': 'gold' };

// Page peek: a product link opens its page in a pop-up that grows out of the tile you pressed.
// A thin line along the top fills over DWELL ms; stay that long and the pop-up expands to the
// full screen and becomes the page (URL, scroll position and all). Close it first, with ×, Esc
// or a click outside, and you stay where you were. "Open page" expands it straight away.

const DWELL = 4000;
const reduce = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function usePeek() {
  const [peek, setPeek] = React.useState(null);   // { slug, href, from: DOMRect }
  const open = (e, href) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;   // let new-tab clicks through
    const slug = href.split('/').pop();
    if (!PRODUCTS[slug]) return;
    e.preventDefault();
    setPeek({ slug, href, from: e.currentTarget.getBoundingClientRect() });
  };
  const node = peek ? <Peek {...peek} onClose={() => setPeek(null)} /> : null;
  return [open, node];
}

function Peek({ slug, href, from, onClose }) {
  const box = React.useRef(null);
  const scroller = React.useRef(null);
  const [phase, setPhase] = React.useState('in');   // in → open → full | out
  const p = PRODUCTS[slug];

  // freeze the page behind (Lenis and native scroll) while the pop-up is up
  React.useEffect(() => {
    const lenis = window.__lenis;
    lenis?.stop();
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    return () => { lenis?.start(); document.documentElement.style.overflow = prev; };
  }, []);

  // grow out of the tile: start scaled and placed over it, then release to the final box
  React.useLayoutEffect(() => {
    const el = box.current;
    if (!el || reduce()) { setPhase('open'); return; }
    const to = el.getBoundingClientRect();
    const s = from.width / to.width;
    const dx = from.left + from.width / 2 - (to.left + to.width / 2);
    const dy = from.top + from.height / 2 - (to.top + to.height / 2);
    el.style.transform = `translate(${dx}px, ${dy}px) scale(${s})`;
    el.style.opacity = '0';
    el.getBoundingClientRect();
    requestAnimationFrame(() => { el.style.transform = ''; el.style.opacity = ''; setPhase('open'); });
  }, []);   // eslint-disable-line react-hooks/exhaustive-deps

  const close = React.useCallback(() => {
    if (phase === 'full') return;
    setPhase('out');
    setTimeout(onClose, reduce() ? 0 : 260);
  }, [phase, onClose]);

  // become the page: fill the screen, then hand over to the router keeping the scroll position
  const expand = React.useCallback(() => {
    if (phase === 'full' || phase === 'out') return;
    setPhase('full');
    const y = scroller.current ? scroller.current.scrollTop : 0;
    setTimeout(() => {
      window.history.pushState({}, '', href);
      window.dispatchEvent(new PopStateEvent('popstate'));
      requestAnimationFrame(() => {
        if (window.__lenis) window.__lenis.scrollTo(y, { immediate: true, force: true });
        else window.scrollTo(0, y);
      });
    }, reduce() ? 0 : 520);
  }, [phase, href]);

  // the dwell itself is a timer (the line along the top only shows it), so it still runs with
  // reduced motion, where animations are off
  React.useEffect(() => {
    if (phase !== 'open') return undefined;
    const t = setTimeout(expand, DWELL);
    return () => clearTimeout(t);
  }, [phase, expand]);

  React.useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [close]);

  return createPortal(
    <div className={`v3 x-peek is-${phase}`} role="dialog" aria-modal="true" aria-label={`${p.name} preview`}>
      <div className="x-peek-scrim" onClick={close} />
      {/* a minted coin spins above the pop-up, in the space over its top edge, while it waits
          to expand; it lifts away as the pop-up fills the screen */}
      <div className={`x-peek-coin ${phase === 'open' ? 'is-on' : ''}`} aria-hidden="true">
        <React.Suspense fallback={null}><Coin kind={slug} tone={ALLOY[slug]} size={150} /></React.Suspense>
      </div>
      <div className="x-peek-box" ref={box}>
        <div className="x-peek-bar">
          <span className="x-peek-t">{p.name}<small>Opening the full page…</small></span>
          <span className="x-peek-acts">
            <button type="button" className="x-btn x-btn--dark x-btn--sm" onClick={expand}>Open page</button>
            <button type="button" className="x-peek-x" aria-label="Close preview" onClick={close} autoFocus>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
            </button>
          </span>
          {phase === 'open' && <i className="x-peek-dwell" style={{ animationDuration: `${DWELL}ms` }} />}
        </div>
        <div className="x-peek-scroll" ref={scroller} data-lenis-prevent>
          <div className="x-peek-page"><Product3 slug={slug} /></div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
