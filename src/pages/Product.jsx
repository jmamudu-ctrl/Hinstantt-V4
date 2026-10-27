import React from 'react';
import './Product.css';
import plusIcon from '../assets/plus-icon.svg';
import { PRODUCTS, PRODUCT_ORDER } from '../data/products.js';
import { PageHero, Screen, SectionHead, GlowCells, FinalCTA, Reveal, MODULE_ICON, MODULE_UI, HERO_LOOKS, HERO_PHOTOS, Hi, ArrowNE, SIGNUP } from '../components/Kit.jsx';
import FlutedBackground from '../components/FlutedBackground.jsx';
import { FlashIcon, Shield01Icon, AiMagicIcon, CheckmarkCircle02Icon, Layers01Icon, Target02Icon } from '@hugeicons/core-free-icons';

const ICONS = import.meta.glob('../assets/nav-icons/*.svg', { eager: true, query: '?url', import: 'default' });
const icon = (k) => ICONS[`../assets/nav-icons/${k}-hinstantt.svg`];

const PROD_IMG = import.meta.glob('../assets/products/*.webp', { eager: true, query: '?url', import: 'default' });
const pimg = (slug, slot) => PROD_IMG[`../assets/products/${slug}-${slot}.webp`];

const FLAGS = import.meta.glob('../assets/flags/*.svg', { eager: true, query: '?url', import: 'default' });
const flag = (c) => FLAGS[`../assets/flags/${c}.svg`];
const CUR_BADGES = import.meta.glob('../assets/flags-badge/*.svg', { eager: true, query: '?url', import: 'default' });
const curBadge = (n) => CUR_BADGES[`../assets/flags-badge/${n}.svg`];
const VIDEOS = import.meta.glob('../assets/products/*.mp4', { eager: true, query: '?url', import: 'default' });
const vid = (slug, slot) => VIDEOS[`../assets/products/${slug}-${slot}.mp4`];
const VIDEOS_WEBM = import.meta.glob('../assets/products/*.webm', { eager: true, query: '?url', import: 'default' });
const vidWebm = (slug, slot) => VIDEOS_WEBM[`../assets/products/${slug}-${slot}.webm`];

// Payments coverage, grouped by region (country name, ISO 3166-1 alpha-2 for the flag).
export const COVERAGE = [
  { region: 'Africa', items: [['Algeria','dz'],['Benin','bj'],['Botswana','bw'],['Burkina Faso','bf'],['Burundi','bi'],['Cameroon','cm'],['Chad','td'],["Cote d'Ivoire",'ci'],['DR Congo','cd'],['Egypt','eg'],['Ethiopia','et'],['Gabon','ga'],['Gambia','gm'],['Ghana','gh'],['Guinea','gn'],['Guinea-Bissau','gw'],['Kenya','ke'],['Lesotho','ls'],['Liberia','lr'],['Malawi','mw'],['Mali','ml'],['Mauritania','mr'],['Morocco','ma'],['Mozambique','mz'],['Niger','ne'],['Nigeria','ng'],['Republic of the Congo','cg'],['Rwanda','rw'],['Senegal','sn'],['Sierra Leone','sl'],['Somalia','so'],['South Africa','za'],['Sudan','sd'],['Tanzania','tz'],['Togo','tg'],['Tunisia','tn'],['Uganda','ug'],['Zambia','zm']] },
  { region: 'Europe', items: [['Austria','at'],['Belgium','be'],['Bulgaria','bg'],['Croatia','hr'],['Cyprus','cy'],['Czechia','cz'],['Denmark','dk'],['Estonia','ee'],['Finland','fi'],['France','fr'],['Germany','de'],['Greece','gr'],['Hungary','hu'],['Ireland','ie'],['Italy','it'],['Latvia','lv'],['Lithuania','lt'],['Luxembourg','lu'],['Malta','mt'],['Netherlands','nl'],['Poland','pl'],['Portugal','pt'],['Romania','ro'],['Slovakia','sk'],['Slovenia','si'],['Spain','es'],['Sweden','se'],['United Kingdom','gb']] },
  { region: 'Americas', items: [['Guatemala','gt'],['United States','us']] },
  { region: 'Asia & Middle East', items: [['Israel','il'],['Turkiye','tr'],['United Arab Emirates','ae']] },
];

// Transparent product PNGs sit directly on the section background, no card or frame.
const Visual = ({ slug, slot, name, ic }) => {
  const videoSrc = vid(slug, slot);
  if (videoSrc) {
    const webm = vidWebm(slug, slot);
    return (
      <video
        className={`pp-shot pp-shot-${slot} pp-video`}
        poster={pimg(slug, slot)}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-label={`${name} in Hinstantt`}
      >
        {webm && <source src={webm} type="video/webm" />}
        <source src={videoSrc} type="video/mp4" />
      </video>
    );
  }
  const src = pimg(slug, slot);
  if (src) {
    return <img className={`pp-shot pp-shot-${slot}`} src={src} alt={`${name} in Hinstantt`} loading="lazy" decoding="async" />;
  }
  return (
    <div className="pp-shot pp-frame-fallback" aria-hidden="true">
      <span className="pp-fallback-ic"><img src={icon(ic)} alt="" /></span>
    </div>
  );
};




// "Find your market": one card with a search field, region filters and every covered
// country as a flag chip; the list narrows as you type or pick a region
function CoverageFinder() {
  const [region, setRegion] = React.useState('All');
  const [q, setQ] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const all = COVERAGE.flatMap((g) => g.items.map(([name, code]) => ({ name, code, region: g.region })));
  const needle = q.trim().toLowerCase();
  const shown = all.filter((c) => (region === 'All' || c.region === region) && (!needle || c.name.toLowerCase().includes(needle)));
  // the full list is long: 24 first, unless searching or filtered
  const capped = !open && !needle && region === 'All';
  const list = capped ? shown.slice(0, 24) : shown;
  const tabs = [['All', all.length], ...COVERAGE.map((g) => [g.region, g.items.length])];
  return (
    <div className="cf">
      <div className="cf-bar">
        <label className="cf-search">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" /><path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={`Search ${all.length} markets`} aria-label="Search markets" />
        </label>
        <div className="cf-tabs" role="tablist" aria-label="Regions">
          {tabs.map(([r, n]) => (
            <button key={r} type="button" role="tab" aria-selected={region === r} className={`cf-tab ${region === r ? 'is-on' : ''}`} onClick={() => setRegion(r)}>
              {r}<span>{n}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="cf-grid" aria-live="polite">
        {list.map((c) => (
          <span className="cf-chip" key={c.name}><img src={flag(c.code)} alt="" loading="lazy" decoding="async" />{c.name}</span>
        ))}
        {capped && shown.length > 24 && <button type="button" className="cf-more" onClick={() => setOpen(true)}>Show all {shown.length} markets</button>}
        {!shown.length && <p className="cf-empty">Not listed yet. <a href="/contact">Ask us about {q.trim() || 'your market'}</a> and we will tell you what is possible.</p>}
      </div>
    </div>
  );
}

const COV_PREVIEW = 12;
function CoverageRegion({ region, items }) {
  const [open, setOpen] = React.useState(false);
  const collapsible = items.length > COV_PREVIEW;
  const shown = open || !collapsible ? items : items.slice(0, COV_PREVIEW);
  return (
    <div className="pp-cov-region">
      <div className="pp-cov-region-head">
        <span className="pp-cov-region-name">{region}</span>
        <span className="pp-cov-region-count">{items.length}</span>
      </div>
      <div className="pp-cov-body">
        <div className="pp-cov-grid">
          {shown.map(([name, code]) => (
            <span className="pp-cov-item" key={name}>
              <img className="pp-cov-flag" src={flag(code)} alt="" loading="lazy" decoding="async" />
              <span className="pp-cov-country">{name}</span>
            </span>
          ))}
        </div>
        {collapsible && (
          <button type="button" className="pp-cov-toggle" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
            {open ? 'Show less' : `Show all ${items.length}`}
            <svg className={`pp-cov-chev${open ? ' is-open' : ''}`} width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        )}
      </div>
    </div>
  );
}

// the cells' icons, one per capability in order
const CAP_ICONS = [FlashIcon, Shield01Icon, AiMagicIcon, Layers01Icon, Target02Icon];

// tasks tick in one after another once the console scrolls into view
function useReveal(n, ms = 520) {
  const ref = React.useRef(null);
  const [shown, setShown] = React.useState(0);
  React.useEffect(() => {
    const el = ref.current; if (!el) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setShown(n); return undefined; }
    let t = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      let k = 0; const step = () => { k += 1; setShown(k); if (k < n) t = setTimeout(step, ms); };
      t = setTimeout(step, 300);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); clearTimeout(t); };
  }, [n, ms]);
  return [ref, shown];
}

export default function ProductPage({ slug }) {
  const p = PRODUCTS[slug];
  if (!p) return null;

  // four surrounding modules: related first, then fill from the nav order
  const around = [...p.related];
  for (const s of PRODUCT_ORDER) {
    if (around.length >= 4) break;
    if (s !== slug && !around.includes(s)) around.push(s);
  }
  const ui = MODULE_UI[slug] || pimg(slug, 'hero');
  const stack = around.map((s) => MODULE_UI[s]).filter(Boolean);
  const tasks = p.capabilities;   // the agent's real jobs, once each
  const [consoleRef, shown] = useReveal(tasks.length);
  // three layouts rotate across the product pages
  const layout = ['split', 'rail', 'grid'][PRODUCT_ORDER.indexOf(slug) % 3];
  const railRef = React.useRef(null);
  React.useEffect(() => {
    const r = railRef.current; if (!r) return undefined;
    const fit = () => {
      const kids = [...r.children];
      const need = kids.reduce((a, k) => a + k.offsetWidth, 0) + 16 * (kids.length - 1) + 48;
      r.classList.toggle('is-fit', need <= r.clientWidth);
    };
    fit();
    const ro = new ResizeObserver(fit); ro.observe(r);
    return () => ro.disconnect();
  }, [slug, layout]);
  // the rail's cards each get a different photo: the set minus this page's hero, starting
  // at a different point per page so neighbouring pages don't repeat
  const railPhotos = (() => {
    const seen = new Set([HERO_PHOTOS[slug].src]);
    const pool = Object.values(HERO_PHOTOS).filter((ph) => (seen.has(ph.src) ? false : (seen.add(ph.src), true)));
    const start = (PRODUCT_ORDER.indexOf(slug) * 3) % pool.length;
    return [...pool.slice(start), ...pool.slice(0, start)];
  })();

  return (
    <main className="pp">
      <PageHero
        key={slug}
        look={HERO_LOOKS[slug]}
        photo={HERO_PHOTOS[slug]}
        eyebrow={<><Hi icon={MODULE_ICON[slug]} size={14} />{p.eyebrow} · {p.name}</>}
        title={p.headline}
        sub={p.sub}
        actions={<><a className="btn btn-primary" href={SIGNUP}>Get started</a><a className="btn btn-ghost" href="/contact">Talk to sales</a></>}
      />

      {/* capabilities: one of three layouts per page, so the inner pages don't all read alike */}
      {layout === 'split' && (
        <section className="pp-sec v2-split">
          <div className="wrap v2-split-grid">
            <div className="v2-split-head">
              <SectionHead kicker="What you can do" title={`${p.name}, connected to everything else.`} sub="Powerful on its own, and wired into every other module on Hinstantt through one shared ledger." />
            </div>
            <div className="v2-split-cards">
              {p.capabilities.map((c, i) => (
                <article className="v2-card" key={c.t}>
                  <span className="v2-card-n">{String(i + 1).padStart(2, '0')}</span>
                  <span className="kf-ic"><Hi icon={CAP_ICONS[i % CAP_ICONS.length]} size={20} /></span>
                  <h3 className="v2-card-t">{c.t}</h3>
                  <p className="v2-card-d">{c.d}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
      {layout === 'rail' && (
        <section className="pp-sec v2-railsec">
          <div className="wrap">
            <SectionHead kicker="What you can do" title={`${p.name}, connected to everything else.`} sub="Powerful on its own, and wired into every other module on Hinstantt through one shared ledger." />
          </div>
          <div className="v2-rail" ref={railRef}>
            {p.capabilities.map((c, i) => (
              <article className="v2-rcard" key={c.t} style={{ '--img': `url(${railPhotos[i % railPhotos.length].src})`, '--pos': railPhotos[i % railPhotos.length].pos }}>
                <span className="v2-rcard-ic"><Hi icon={CAP_ICONS[i % CAP_ICONS.length]} size={20} /></span>
                <div className="v2-rcard-body">
                  <h3>{c.t}</h3>
                  <p>{c.d}</p>
                </div>
              </article>
            ))}
            <a className="v2-rcard v2-rcard--cta" href={SIGNUP}>
              <div className="v2-rcard-body"><h3>Start with {p.name}</h3><p>Open an account in minutes.</p><span className="v2-arrow">→</span></div>
            </a>
          </div>
        </section>
      )}
      {layout === 'grid' && (
        <section className="pp-sec">
          <div className="wrap">
            <SectionHead kicker="What you can do" title={`${p.name}, connected to everything else.`} sub="Powerful on its own, and wired into every other module on Hinstantt through one shared ledger." />
            <GlowCells cols={p.capabilities.length} className="pp-caps-grid">
              {p.capabilities.map((c, i) => (
                <div key={c.t}>
                  <span className="kf-ic"><Hi icon={CAP_ICONS[i % CAP_ICONS.length]} size={19} /></span>
                  <h3 className="kf-t">{c.t}</h3>
                  <p className="kf-d">{c.d}</p>
                </div>
              ))}
            </GlowCells>
          </div>
        </section>
      )}

      {slug === 'payments' && (
        <section className="pp-sec pp-sec--tight">
          <div className="wrap">
            <SectionHead kicker="Coverage" title="35+ currencies. 100+ markets." sub="One platform for every corridor your business touches. Pay in, pay out and settle in the currencies your customers and suppliers actually use." />
            <CoverageFinder />
          </div>
        </section>
      )}

      {slug === 'accounts' && (
        <section className="pp-sec pp-sec--tight">
          <div className="wrap">
            <SectionHead kicker="Currencies" title="One account, every currency you run on." sub="Hold, receive and convert across USD, GBP, CAD, NGN, EUR and 10+ more currencies, all under one verified business identity." />
            <div className="pp-cur-grid">
              {[['usd', 'USD', 'US Dollar'], ['gbp', 'GBP', 'British Pound'], ['cad', 'CAD', 'Canadian Dollar'], ['ngn', 'NGN', 'Nigerian Naira'], ['eur', 'EUR', 'Euro']].map(([f, code, name]) => (
                <div className="pp-cur-chip" key={code}><img className="pp-cur-badge-img" src={curBadge(f)} alt="" /><span className="pp-cur-meta"><span className="pp-cur-code">{code}</span><span className="pp-cur-name">{name}</span></span></div>
              ))}
              <div className="pp-cur-chip"><img className="pp-cur-badge-img" src={plusIcon} alt="" /><span className="pp-cur-meta"><span className="pp-cur-code">10+ more</span><span className="pp-cur-name">currencies</span></span></div>
            </div>
          </div>
        </section>
      )}

      {/* spotlight */}
      <section className="pp-sec">
        <div className={`wrap pp-spot pp-spot--text ${layout === 'rail' ? 'is-flip' : ''}`}>
          <div className="pp-spot-text">
            <SectionHead title={p.spotlight.headline} sub={p.spotlight.body} />
          </div>
          <div className="pp-spot-list">
            <ul className="pp-list">
              {p.spotlight.bullets.map((b) => <li key={b}><span className="pp-check"><Hi icon={CheckmarkCircle02Icon} size={16} /></span>{b}</li>)}
            </ul>
          </div>
        </div>
      </section>

      {/* the agent: dark fluted glass, a console of tasks ticking in */}
      <section className="pp-agent">
        <div className="pp-agent-bg" aria-hidden="true"><FlutedBackground className="pp-agent-scene" dark hue={30} /></div>
        <div className="wrap pp-agent-inner">
          <div className="pp-agent-copy">
            <SectionHead light kicker="Working 24/7" title={p.agent.name} sub={p.agent.line} />
            <p className="pp-agent-note">It runs inside {p.name} around the clock, doing the work in the background so your team reviews and approves instead of keying it in.</p>
          </div>
          <div className="pp-console pp-log" ref={consoleRef} aria-label={`What the ${p.agent.name} does`}>
            <div className="pp-log-head">
              <span className="pp-log-agent"><i />{p.agent.name}</span>
              <span className="pp-log-count">{Math.min(shown, tasks.length)} of {tasks.length} complete</span>
            </div>
            <ol className="pp-log-list">
              {tasks.map((c, k) => (
                <li key={c.t} className={`${k < shown ? 'is-on' : ''} ${k === shown ? 'is-now' : ''}`}>
                  <time>{`09:4${k + 1}:0${(k * 3) % 10}`}</time>
                  <span className="pp-log-tile" aria-hidden="true"><Hi icon={CAP_ICONS[k % CAP_ICONS.length]} size={14} /></span>
                  <span className="pp-log-text"><b>{c.t}</b><small>{c.d}</small></span>
                  <span className="pp-log-st">{k < shown ? `Done · ${(0.4 + k * 0.3).toFixed(1)}s` : k === shown ? 'Working…' : 'Queued'}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* the rest of the platform */}
      <section className="pp-sec">
        <div className="wrap">
          <SectionHead kicker="One platform" title="Works with every other module." sub="Cards, payments, treasury and accounting share a single ledger, with an agent working inside each one." />
          <GlowCells cols={4} className="pp-mods">
            {around.map((s) => { const m = PRODUCTS[s]; return (
              <a className="pp-mod" href={`/products/${s}`} key={s}>
                <span className="kf-ic"><Hi icon={MODULE_ICON[s]} size={19} /></span>
                <span className="kf-t">{m.name}</span>
                <span className="kf-d">{m.short}</span>
                <span className="pp-mod-go"><ArrowNE /></span>
              </a>
            ); })}
          </GlowCells>
        </div>
      </section>

      <FinalCTA />
    </main>
  );
}
