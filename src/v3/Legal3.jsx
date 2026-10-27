import React from 'react';
import { LEGAL_DOCS } from '../pages/Legal.jsx';
import { pad, useFitHeadings } from './kit.jsx';

// v3 legal pages. The documents themselves live in pages/Legal.jsx (counsel-provided text);
// this only renders them: a sticky numbered contents list, a read-progress bar, the sections.

const Block = ({ b }) => {
  if (typeof b === 'string') return <p>{b}</p>;
  if (b.h3) return <h3>{b.h3}</h3>;
  if (b.ul) return <ul>{b.ul.map((li, i) => <li key={i}>{li}</li>)}</ul>;
  return null;
};

export default function Legal3({ doc = 'privacy' }) {
  const data = LEGAL_DOCS[doc] || LEGAL_DOCS.privacy;
  const [active, setActive] = React.useState(data.sections[0].id);
  const [progress, setProgress] = React.useState(0);
  useFitHeadings(doc);

  React.useEffect(() => {
    setActive(data.sections[0].id);
    const onScroll = () => {
      let cur = data.sections[0].id;
      for (const s of data.sections) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top - 120 <= 0) cur = s.id;
      }
      setActive(cur);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  }, [doc]);   // eslint-disable-line react-hooks/exhaustive-deps

  const go = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 92;
    if (window.__lenis) window.__lenis.scrollTo(top); else window.scrollTo({ top, behavior: 'smooth' });
    setActive(id);
  };

  const Toc = () => (
    <nav className="x-toc-nav" aria-label="On this page">
      {data.sections.map((s, i) => (
        <a key={s.id} href={`#${s.id}`} className={active === s.id ? 'is-on' : ''} onClick={(e) => go(e, s.id)}>
          <span className="x-mono">{pad(i + 1)}</span>{s.h}
        </a>
      ))}
    </nav>
  );

  return (
    <main className="x-legal">
      <div className="x-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />

      <section className="x-hero x-phero is-compact">
        <div className="x-wrap">
          <h1 className="x-phero-h">{data.title}</h1>
        </div>
      </section>

      <div className="x-wrap x-legal-grid">
        <aside className="x-toc">
          <div className="x-toc-sticky">
            <span className="x-mono x-toc-h">On this page</span>
            <Toc />
          </div>
        </aside>

        <article className="x-legal-body">
          <details className="x-toc-m">
            <summary className="x-mono">On this page</summary>
            <Toc />
          </details>

          {data.sections.map((s, i) => (
            <section id={s.id} key={s.id} className="x-legal-sec">
              <h2><span className="x-mono">{pad(i + 1)}</span>{s.h}</h2>
              <div className="x-legal-txt">{s.body.map((b, j) => <Block b={b} key={j} />)}</div>
            </section>
          ))}

          <div className="x-legal-cta">
            <div>
              <h3>Questions about this {data.title.toLowerCase()}?</h3>
              <p>Reach our team at support@hinstantt.com.</p>
            </div>
            <a className="x-btn x-btn--dark" href="mailto:support@hinstantt.com">Contact us</a>
          </div>
        </article>
      </div>
    </main>
  );
}
