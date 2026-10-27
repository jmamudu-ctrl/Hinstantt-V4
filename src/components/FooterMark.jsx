import React from 'react';
import './FooterMark.css';

// The footer's last row: the Hinstantt logomark and wordmark spanning edge to edge.
// Speed is the brand, so the type reacts to how fast you move: each glyph near the
// cursor leans and smears in the direction of travel, trailing a streak of the site's
// glowing sky blue, then springs back upright when you slow down. When the footer
// scrolls in, the glyphs rise into place one after another.
const LETTERS = 'hinstantt'.split('');

export default function FooterMark() {
  const wrapRef = React.useRef(null);
  const rowRef = React.useRef(null);
  const glyphs = React.useRef([]);
  const [shown, setShown] = React.useState(false);

  // fit the row to the full width: measure at a reference size, then scale
  React.useLayoutEffect(() => {
    const wrap = wrapRef.current, row = rowRef.current;
    if (!wrap || !row) return undefined;
    const fit = () => {
      row.style.fontSize = '100px';
      const natural = row.scrollWidth;
      const cs = getComputedStyle(wrap);
      const avail = wrap.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      row.style.fontSize = natural ? `${Math.floor(((100 * avail) / natural) * 0.995)}px` : '';   // set directly: a state echo could leave it at 100px
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(wrap);
    document.fonts?.ready.then(fit);
    return () => ro.disconnect();
  }, []);

  // rise in when the row enters
  React.useEffect(() => {
    const el = wrapRef.current; if (!el) return undefined;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } }, { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // the velocity lean: smoothed cursor speed drives skew, shift and a coloured trail,
  // weighted by each glyph's distance from the cursor
  React.useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const wrap = wrapRef.current; if (!wrap) return undefined;
    let raf = 0, x = -9999, lastX = null, v = 0, inside = false;
    const lean = glyphs.current.map(() => 0);
    const onMove = (e) => { const r = wrap.getBoundingClientRect(); x = e.clientX - r.left; inside = true; if (!raf) raf = requestAnimationFrame(tick); };
    const onLeave = () => { inside = false; };
    const tick = () => {
      raf = 0;
      const dx = lastX == null ? 0 : x - lastX;
      lastX = inside ? x : null;
      v += ((inside ? dx : 0) - v) * 0.22;            // smoothed px per frame
      let moving = Math.abs(v) > 0.05;
      const reach = wrap.clientWidth * 0.2;
      glyphs.current.forEach((g, i) => {
        if (!g) return;
        const c = g.offsetLeft + g.offsetWidth / 2;
        const w = Math.exp(-(((c - x) / reach) ** 2));
        const target = Math.max(-1, Math.min(1, v / 40)) * w;
        lean[i] += (target - lean[i]) * 0.18;
        if (Math.abs(lean[i]) > 0.002) moving = true;
        const L = lean[i];
        g.style.transform = `translateX(${L * 26}px) skewX(${-L * 22}deg) scaleX(${1 + Math.abs(L) * 0.12})`;
        g.style.setProperty('--trail', `${-L * 60}px`);
        g.style.setProperty('--trail-a', Math.min(0.85, Math.abs(L) * 1.6).toFixed(3));
      });
      if (moving || inside) raf = requestAnimationFrame(tick);
    };
    wrap.addEventListener('pointermove', onMove);
    wrap.addEventListener('pointerleave', onLeave);
    return () => { wrap.removeEventListener('pointermove', onMove); wrap.removeEventListener('pointerleave', onLeave); cancelAnimationFrame(raf); };
  }, []);

  let k = 0;
  const ref = (el) => { if (el) glyphs.current[Number(el.dataset.i)] = el; };
  return (
    <div className={`fm ${shown ? 'is-in' : ''}`} ref={wrapRef} aria-label="Hinstantt" role="img">
      <div className="fm-row" ref={rowRef} aria-hidden="true">
        <span className="fm-g fm-mark" data-i={k++} ref={ref} style={{ '--d': 0 }}>
          <svg viewBox="0 0 19.35 16.668" fill="currentColor">
            <path d="M 0 0 L 0 16.668 L 4.147 16.668 L 12.573 8.334 L 4.147 0 L 0 0 Z" />
            <path d="M 12.574 0 L 12.574 16.668 L 16.721 16.668 L 19.351 8.334 L 16.721 0 L 12.574 0 Z" />
          </svg>
        </span>
        {LETTERS.map((ch, i) => (
          <span key={i} className="fm-g" data-i={k} ref={ref} style={{ '--d': k++ }} data-ch={ch}>{ch}</span>
        ))}
      </div>
    </div>
  );
}
