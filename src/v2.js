// v2: splits big headlines into words that rise in, and unmasks sections as they enter.
// Re-run after every route change.
export function startV2() {
  const heads = document.querySelectorAll('main h1, main h2, .kh-title, .op2-h');
  heads.forEach((h) => {
    if (h.dataset.v2) return;
    h.dataset.v2 = '1';
    let i = 0;
    const walk = (node) => {
      [...node.childNodes].forEach((c) => {
        if (c.nodeType === 3) {
          const frag = document.createDocumentFragment();
          c.textContent.split(/(\s+)/).forEach((w) => {
            if (!w) return;
            if (/^\s+$/.test(w)) { frag.appendChild(document.createTextNode(w)); return; }
            const o = document.createElement('span'); o.className = 'v2-w';
            const n = document.createElement('span'); n.textContent = w; n.style.setProperty('--i', i++);
            o.appendChild(n); frag.appendChild(o);
          });
          c.replaceWith(frag);
        } else if (c.nodeType === 1 && !c.classList.contains('v2-w')) walk(c);
      });
    };
    walk(h);
  });
  const blocks = document.querySelectorAll('.pp-sec .kg, .pp-console, .ab-map-svg, .cf, .v2-rail, .v2-split-cards, .b2-grid, .fx .kg, .ab-sec .kg');
  blocks.forEach((b) => b.classList.add('v2-reveal'));
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('v2-in'); io.unobserve(e.target); } }), { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
  [...heads, ...blocks].forEach((el) => io.observe(el));
  return () => io.disconnect();
}
