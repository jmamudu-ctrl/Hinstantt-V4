import React from 'react';
import { productHref } from '../data/products.js';
import wordmarkDark from '../assets/wordmark-dark.png';
import wordmarkWhite from '../assets/wordmark-white.png';
import footFilm from '../assets/hero/hero-720.mp4';
import footPoster from '../assets/hero/hero-poster.jpg';
import uiPayments from '../assets/ui/payments.jpg';
import uiCards from '../assets/ui/cards.jpg';
import uiRequests from '../assets/ui/requests.jpg';
import uiHint from '../assets/ui/hint.jpg';
import uiAccounts from '../assets/ui/accounts.jpg';
import uiTravel from '../assets/ui/travel.jpg';
import uiAccounting from '../assets/ui/accounting.jpg';
import uiTreasury from '../assets/ui/treasury.jpg';
import uiReporting from '../assets/ui/reporting.jpg';
import uiProcurement from '../assets/ui/procurement.jpg';
import uiInvoicing from '../assets/ui/invoicing.jpg';
import uiStablecoin from '../assets/ui/stablecoin.jpg';
import mdSendMoney from '../assets/ui/modal/send-money.png';
import mdFreezeCard from '../assets/ui/modal/freeze-card.png';
import mdCompareAccounts from '../assets/ui/modal/compare-accounts.png';
import mdTxnDetails from '../assets/ui/modal/txn-details.png';
import mdCollectPayment from '../assets/ui/modal/collect-payment.png';
import mdCardDetails from '../assets/ui/modal/card-details.png';
import { Scene } from './scenes.jsx';
import './v3.css';

// Shared pieces of the v3 site: the nav, the footer, grey placeholders, the closing CTA,
// and the scroll reveal. Every v3 page builds on these.

export const SIGNUP = 'https://app.hinstantt.com/signup';
export const SALES = 'mailto:newbusiness@hinstantt.com?subject=Enquiries';
export const pad = (n) => String(n).padStart(2, '0');

// mirrors PRODUCT_GROUPS in App.jsx
const PRODUCT_GROUPS = [
  { h: 'Spend', items: [['Corporate Cards', 'Virtual and physical'], ['Expense', 'Receipts to repayment'], ['Travel', 'Book and track travel']] },
  { h: 'Move money', items: [['Accounts', 'Multi-currency banking'], ['Payments', 'Pay out to 100+ markets'], ['Treasury', 'Cash management, yield'], ['Stablecoin Ramp', 'On and off ramps']] },
  { h: 'Operate', items: [['Accounting', 'AI ledger, auto close'], ['Procurement', 'Request to 3-way match'], ['Invoicing & Billing', 'Invoice, bill, collect']] },
  { h: 'Intelligence', items: [['Reporting', 'Live spend and revenue'], ['AI Financial Management', 'AI across every module']] },
];
// archived pages: their code stays, but every nav, menu and footer link to them is dropped and their
// routes show the 404 page. Take a path out of this list to bring that page back.
export const ARCHIVED = ['/pricing', '/developers', '/integrations', '/resources', '/faq', '/customers', '/legal/cookie-policy'];
const live = (href) => !ARCHIVED.includes(href);
const COMPANY = [['About Us', 'Our mission and team', '/about'], ['Customers', 'Stories from operators', '/customers'], ['Careers', 'Join the team', '/careers'], ['Security', 'How we keep money safe', '/security'], ['Contact', 'Talk to our team', '/contact']].filter(([, , h]) => live(h));
const RESOURCES = [['Pricing', 'Plans for every stage', '/pricing'], ['Developers', 'API, webhooks, sandbox', '/developers'], ['Integrations', 'Connect your stack', '/integrations'], ['Resources', 'Guides and reports', '/resources'], ['FAQ', 'Common questions', '/faq']].filter(([, , h]) => live(h));
// solution pages live at /solutions/<slug>
export const solutionSlug = (t) => t.toLowerCase().replace(/&/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export const SOLUTIONS = ['Remittance Platforms', 'Fintech & Neobanks', 'Mobile Network Operators', 'FX & Liquidity Platforms', 'Corporates & Enterprises', 'Payment Service Providers', 'Marketplaces & Gig Platforms', 'Banks & Financial Institutions'];

// a grey stand-in for a photo or film; `label` says what goes there
export const Ph = ({ label, ratio, className = '', dark, children }) => (
  <div className={`x-ph ${dark ? 'is-dark' : ''} ${className}`} style={ratio ? { aspectRatio: ratio } : undefined}>
    {label && <span className="x-ph-l">{label}</span>}
    {children}
  </div>
);

// product screens from Figma (Sprint 5 Designs › New Website), shown with its "treatment":
// a navy-to-warm backdrop, the screen inset from the top left and bleeding off the right and
// bottom. A module without a screen yet falls back to the grey placeholder. Accounting through
// Stablecoin were designed from the Accounts frame and sit beside the originals in that section.
export const SCREENS = {
  payments: uiPayments, cards: uiCards, requests: uiRequests, hint: uiHint, accounts: uiAccounts, travel: uiTravel,
  accounting: uiAccounting, treasury: uiTreasury, reporting: uiReporting, procurement: uiProcurement, invoicing: uiInvoicing, stablecoin: uiStablecoin,
};
// product slug → screen
export const SCREEN_FOR = {
  'payments': 'payments',
  'corporate-cards': 'cards',
  'expense': 'requests',
  'travel': 'travel',
  'accounts': 'accounts',
  'treasury': 'treasury',
  'stablecoin-ramp': 'stablecoin',
  'accounting': 'accounting',
  'procurement': 'procurement',
  'invoicing-billing': 'invoicing',
  'reporting': 'reporting',
  'ai-financial-management': 'hint',
};

// modals and drawers from the same file, shown floating on the backdrop instead of a full screen
export const MODALS = {
  'send-money': mdSendMoney, 'freeze-card': mdFreezeCard, 'compare-accounts': mdCompareAccounts,
  'txn-details': mdTxnDetails, 'collect-payment': mdCollectPayment, 'card-details': mdCardDetails,
};
// product slug → modal, for cards that alternate screens and modals
export const MODAL_FOR = {
  'payments': 'send-money',
  'corporate-cards': 'card-details',
  'accounts': 'compare-accounts',
  'treasury': 'compare-accounts',
  'invoicing-billing': 'collect-payment',
  'accounting': 'txn-details',
  'reporting': 'txn-details',
};

export const Shot = ({ screen, slug, modal, ratio, wide, label, className = '', children }) => {
  if (modal && MODALS[modal]) return (
    <div className={`x-shot x-shot--modal ${className}`} style={ratio ? { aspectRatio: ratio } : undefined}>
      <img src={MODALS[modal]} alt="" loading="lazy" decoding="async" />
      {children}
    </div>
  );
  const src = SCREENS[screen || SCREEN_FOR[slug]];
  if (!src) return <Ph label={label} ratio={ratio} className={className}>{children}</Ph>;
  return (
    <div className={`x-shot ${wide ? 'x-shot--wide' : ''} ${className}`} style={ratio ? { aspectRatio: ratio } : undefined}>
      <img src={src} alt="" loading="lazy" decoding="async" />
      {children}
    </div>
  );
};

// small product tile. With `kind` it is a glass micro-scene (scenes.jsx); without one it falls
// back to the Figma "Modals" maze, where `v` picks one of six crops and directions.
export const Tile = ({ kind, v = 0, ratio, className = '', children }) => (kind
  ? <Scene kind={kind} ratio={ratio}>{children}</Scene>
  : (
    <div className={`x-tile x-tile--${v % 6} ${className}`} style={ratio ? { aspectRatio: ratio } : undefined}>
      <i className="x-tile-maze" aria-hidden="true" />
      {children}
    </div>
  ));

// the Hinstantt logomark (from Figma), in the current text colour; used wherever a status mark
// is needed instead of a dot
export const Logomark = ({ className = '' }) => (
  <svg className={`x-mark ${className}`} viewBox="0 0 206 178" aria-hidden="true">
    <path d="M177.5 0H133.478V177.033H177.5L205.427 88.5184L177.5 0Z" fill="currentColor" />
    <path d="M0 0V177.033H44.0219L133.477 88.5184L44.0219 0H0Z" fill="currentColor" />
  </svg>
);

export const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
export const Check = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

// Every heading below a page's main title must sit on at most two lines. CSS sizes them for
// the common case; this steps the font down (6% at a time, to a floor) wherever a longer
// heading or a narrow column would still push it to a third line. Re-run on resize and once
// the web fonts have loaded, since both change the wrap.
// Page titles (the h1 in each hero) are held to three lines at every width.
const FIT_TITLE = '.x-hero-h, .x-phero-h';
const FIT = `.x-h2, .x-h3, .x-band-h, .x-hs-panel h3, .x-card h3, .x-values h3, .x-feat-col h3, .x-legal-sec h2, .x-rail-c h3, .x-legal-cta h3, ${FIT_TITLE}`;
export function fitHeadings() {
  document.querySelectorAll(FIT).forEach((el) => {
    el.style.fontSize = ''; el.style.maxWidth = '';
    let size = parseFloat(getComputedStyle(el).fontSize);
    // a title's measure is in ch, which would shrink with the font and keep the same wrap; pin it in px
    if (el.matches(FIT_TITLE)) el.style.maxWidth = getComputedStyle(el).maxWidth;
    const floor = Math.max(15, size * 0.55);
    // count the rendered lines of text, not the box height (grid rows can stretch the box);
    // tops within half a line of each other are the same line. A subtitle in <small> is left out.
    const lines = () => {
      const r = document.createRange();
      r.setStart(el, 0);
      const sub = el.querySelector('small');
      if (sub) r.setEndBefore(sub); else r.setEnd(el, el.childNodes.length);
      const tops = [...r.getClientRects()].filter((b) => b.width > 1 && b.height > size * 0.5).map((b) => b.top).sort((a, b) => a - b);
      return tops.reduce((n, t, k) => (k === 0 || t - tops[k - 1] > size * 0.5 ? n + 1 : n), 0);
    };
    // phones allow up to four lines, so headings keep a readable size instead of shrinking to fit
    const max = el.matches(FIT_TITLE) ? 3 : window.innerWidth < 700 ? 4 : 2;
    while (lines() > max && size > floor) { size *= 0.94; el.style.fontSize = `${size}px`; }
  });
}
export function useFitHeadings(dep) {
  React.useLayoutEffect(() => {
    fitHeadings();
    let t = 0;
    const onResize = () => { clearTimeout(t); t = setTimeout(fitHeadings, 120); };
    window.addEventListener('resize', onResize);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitHeadings);
    return () => { window.removeEventListener('resize', onResize); clearTimeout(t); };
  }, [dep]);
}

// fades sections up as they enter; reduced motion shows everything at once
export function useReveal(dep) {
  useFitHeadings(dep);
  React.useEffect(() => {
    const els = document.querySelectorAll('.x-rv');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { els.forEach((e) => e.classList.add('is-in')); return undefined; }
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }), { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [dep]);
}

/* ── Nav ─────────────────────────────────────────────────────────────────── */
export function Nav() {
  const [open, setOpen] = React.useState(null);     // which dropdown is open on desktop
  const [menu, setMenu] = React.useState(false);    // the phone menu
  const [solid, setSolid] = React.useState(false);
  React.useEffect(() => {
    const on = () => setSolid(window.scrollY > 8);
    on(); window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  React.useEffect(() => {
    document.documentElement.style.overflow = menu ? 'hidden' : '';
    return () => { document.documentElement.style.overflow = ''; };
  }, [menu]);

  const Drop = ({ id, label, children }) => (
    <div className={`x-nav-dd ${open === id ? 'is-open' : ''}`} onMouseEnter={() => setOpen(id)} onMouseLeave={() => setOpen(null)}>
      <button type="button" className="x-nav-link" aria-expanded={open === id} onClick={() => setOpen(open === id ? null : id)}>
        {label}<svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true"><path d="M2 3.5l3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.4" /></svg>
      </button>
      <div className="x-nav-panel">{children}</div>
    </div>
  );

  // the router swaps pages without a reload, so close any open menu on a link tap
  const onNavClick = (e) => { if (e.target.closest('a')) { setOpen(null); setMenu(false); } };

  return (
    <header className={`x-nav ${solid ? 'is-solid' : ''} ${menu ? 'is-menu' : ''}`} onClick={onNavClick}>
      <div className="x-wrap x-nav-in">
        <a href="/" className="x-nav-logo" aria-label="Hinstantt home"><img src={wordmarkDark} alt="Hinstantt" /></a>
        <nav className="x-nav-links" aria-label="Main">
          <Drop id="product" label="Product">
            <div className="x-np">
              {PRODUCT_GROUPS.map((g) => (
                <div key={g.h} className="x-np-g">
                  <span className="x-mono">{g.h}</span>
                  {g.items.map(([t, s]) => <a key={t} href={productHref(t)}><b>{t}</b><small>{s}</small></a>)}
                </div>
              ))}
              <div className="x-np-feat">
                <div className="x-np-media"><Scene kind="routes" /></div>
                <b>The Finance OS</b>
                <small>Cards, payments, treasury and accounting, run by agents that never sleep.</small>
                <a className="x-tlink" href={SALES}>See a demo <Arrow /></a>
              </div>
            </div>
          </Drop>
          <Drop id="solutions" label="Solutions">
            <div className="x-np x-np--sm">
              <div className="x-np-g x-np-g--2">
                <span className="x-mono">Who it is for</span>
                {SOLUTIONS.map((t) => <a key={t} href={`/solutions/${solutionSlug(t)}`}><b>{t}</b></a>)}
              </div>
            </div>
          </Drop>
          {RESOURCES.length > 0 && (
            <Drop id="resources" label="Resources">
              <div className="x-np x-np--sm">
                <div className="x-np-g">
                  <span className="x-mono">Resources</span>
                  {RESOURCES.map(([t, s2, href]) => <a key={t} href={href}><b>{t}</b><small>{s2}</small></a>)}
                </div>
              </div>
            </Drop>
          )}
          <Drop id="company" label="Company">
            <div className="x-np x-np--sm">
              <div className="x-np-g">
                <span className="x-mono">Company</span>
                {COMPANY.map(([t, s, href]) => <a key={t} href={href}><b>{t}</b><small>{s}</small></a>)}
              </div>
              <div className="x-np-feat">
                <b>Building global money</b>
                <small>The operating system for finance teams, everywhere.</small>
                <a className="x-tlink" href={SIGNUP}>Get started <Arrow /></a>
              </div>
            </div>
          </Drop>
        </nav>
        <div className="x-nav-cta">
          <a className="x-nav-link x-hide-sm" href="/contact">Talk to sales</a>
          <a className="x-btn x-btn--dark x-btn--sm" href={SIGNUP}>Get started</a>
          <button type="button" className="x-burger" aria-label={menu ? 'Close menu' : 'Open menu'} aria-expanded={menu} onClick={() => setMenu(!menu)}>
            <i /><i />
          </button>
        </div>
      </div>

      {menu && (
        <div className="x-mnav">
          {PRODUCT_GROUPS.map((g) => (
            <div key={g.h} className="x-mnav-g">
              <span className="x-mono">{g.h}</span>
              {g.items.map(([t]) => <a key={t} href={productHref(t)}>{t}</a>)}
            </div>
          ))}
          <div className="x-mnav-g">
            <span className="x-mono">Solutions</span>
            {SOLUTIONS.map((t) => <a key={t} href={`/solutions/${solutionSlug(t)}`}>{t}</a>)}
          </div>
          {RESOURCES.length > 0 && (
            <div className="x-mnav-g">
              <span className="x-mono">Resources</span>
              {RESOURCES.map(([t, , href]) => <a key={t} href={href}>{t}</a>)}
            </div>
          )}
          <div className="x-mnav-g">
            <span className="x-mono">Company</span>
            {COMPANY.map(([t, , href]) => <a key={t} href={href}>{t}</a>)}
          </div>
          <div className="x-mnav-cta">
            <a className="x-btn x-btn--dark" href={SIGNUP}>Get started</a>
            <a className="x-btn x-btn--line" href={SALES}>Talk to sales</a>
          </div>
        </div>
      )}
    </header>
  );
}

/* ── Closing CTA ──────────────────────────────────────────────────────────── */
export function Closing({ title = 'Hand the busywork to agents. Keep every decision.', sub = 'Open an account in minutes and put agents to work on spend, payments and accounting this quarter.' }) {
  return (
    <section className="x-sec x-close">
      <div className="x-wrap x-close-in x-rv">
        <h2 className="x-h2">{title}</h2>
        <p className="x-lead">{sub}</p>
        <div className="x-actions">
          <a className="x-btn x-btn--light" href={SIGNUP}>Get started</a>
          <a className="x-btn x-btn--ghost" href="/contact">Talk to sales</a>
        </div>
      </div>
    </section>
  );
}

/* ── Footer ───────────────────────────────────────────────────────────────── */
export function Footer() {
  const products = ['Accounting', 'Procurement', 'Treasury', 'Reporting', 'Expense', 'Accounts', 'Corporate Cards', 'Payments', 'Travel', 'Invoicing & Billing', 'Stablecoin Ramp', 'AI Finance'];
  const cols = [
    ['Products', products.slice(0, 6).map((t) => [t, productHref(t)])],
    ['More products', products.slice(6).map((t) => [t, productHref(t)])],
    ['Solutions', SOLUTIONS.map((t) => [t, `/solutions/${solutionSlug(t)}`])],
    ['Company', [...COMPANY.map(([t, , h]) => [t, h]), ['Get started', SIGNUP]]],
    ...(RESOURCES.length ? [['Resources', RESOURCES.map(([t, , h]) => [t, h])]] : []),
    ['Legal', [['Privacy policy', '/legal/privacy-policy'], ['Terms of service', '/legal/terms-of-service'], ['Cookie policy', '/legal/cookie-policy']].filter(([, h]) => live(h))],
  ];
  // the film plays only while the footer is on screen, and loads only as it nears
  const film = React.useRef(null);
  const [near, setNear] = React.useState(false);
  React.useEffect(() => {
    const v = film.current; if (!v) return undefined;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setNear(true); if (!still) { v.muted = true; const pl = v.play(); if (pl && pl.catch) pl.catch(() => {}); } } else v.pause();
    }, { rootMargin: '400px 0px' });
    io.observe(v);
    // once the footer reaches the top of the screen the nav slides away, so it doesn't sit
    // over the panel; it comes back as soon as the footer starts to leave
    const foot = v.parentElement;
    const onScroll = () => document.documentElement.classList.toggle('x-in-foot', foot.getBoundingClientRect().top <= 68);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll);
      document.documentElement.classList.remove('x-in-foot');
    };
  }, []);

  // a full-screen footer: the film behind, the links in a dark panel hung from the top, and
  // the wordmark spanning the foot, with open film between them
  return (
    <footer className="x-foot">
      <video ref={film} className="x-foot-film" src={near ? footFilm : undefined} poster={footPoster} muted loop playsInline preload="none" aria-hidden="true" />
      <div className="x-foot-shade" aria-hidden="true" />
      <div className="x-foot-panel">
        <div className="x-foot-grid">
          <div className="x-foot-brand">
            <a href="/"><img src={wordmarkWhite} alt="Hinstantt" /></a>
            <p>The Finance OS for global operators. Cards, payments, treasury and accounting, run by agents that work 24/7 across 100+ markets.</p>
          </div>
          {cols.map(([h, links]) => (
            <div key={h} className="x-foot-col">
              <span className="x-mono">{h}</span>
              <ul>{links.map(([t, href]) => <li key={t}><a href={href}>{t}</a></li>)}</ul>
            </div>
          ))}
        </div>
        <div className="x-foot-bottom">
          <span>© 2026 Hinstantt Inc. All rights reserved.</span>
          <span>Hinstantt is a financial technology company, not a bank. Regulated payment services are provided through financial services partners or banks.</span>
        </div>
      </div>
      <a href="/" className="x-foot-mark" aria-label="Hinstantt home"><img src={wordmarkWhite} alt="Hinstantt" /></a>
    </footer>
  );
}


/* ── Page hero: mono eyebrow, big headline, lead and actions, then a wide visual ── */
export function PageHero({ eyebrow, title, sub, actions, media, compact }) {
  return (
    <section className={`x-hero x-phero ${compact ? 'is-compact' : ''}`}>
      <div className="x-wrap">
        <div className="x-hero-grid">
          <div className="x-rv">
            <h1 className="x-phero-h">{title}</h1>
          </div>
          {(sub || actions) && (
            <div className="x-hero-side x-rv">
              {sub && <p className="x-hero-sub">{sub}</p>}
              {actions && <div className="x-actions">{actions}</div>}
            </div>
          )}
        </div>
        {media}
      </div>
    </section>
  );
}
