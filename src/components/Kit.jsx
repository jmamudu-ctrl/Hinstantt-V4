import React from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Calculator01Icon, SentIcon, CreditCardIcon, ReceiptDollarIcon, ShoppingCart01Icon, BankIcon, ChartHistogramIcon,
  Invoice03Icon, Airplane01Icon, Coins01Icon, Wallet01Icon, AiMagicIcon, ArrowUpRight01Icon,
} from '@hugeicons/core-free-icons';
import FlutedBackground from './FlutedBackground.jsx';
import accountingUi from '../assets/platform-ui/accounting.webp';
import paymentsUi from '../assets/platform-ui/payments.webp';
import cardsUi from '../assets/platform-ui/cards.webp';
import expenseUi from '../assets/platform-ui/expense.webp';
import procurementUi from '../assets/platform-ui/procurement.webp';
import reportingUi from '../assets/platform-ui/reporting.webp';
import invoicingUi from '../assets/platform-ui/invoicing.webp';
import revenueUi from '../assets/platform-ui/revenue.webp';
import photoCalm from '../assets/heroes/calm.webp';
import photoTravel from '../assets/heroes/travel.webp';
import photoRelaxed from '../assets/heroes/relaxed.webp';
import photoConfident from '../assets/heroes/confident.webp';
import photoHello from '../assets/heroes/hello.webp';
import photoTogether from '../assets/heroes/together.webp';
import photoPaid from '../assets/heroes/paid.webp';
import photoMeeting from '../assets/heroes/meeting.webp';
import photoPhone from '../assets/heroes/phone.webp';
import photoWindow from '../assets/heroes/window.webp';
import photoNight from '../assets/heroes/night.webp';
import './Kit.css';

// The site's shared parts, so every page speaks the homepage's language: Lora headlines,
// Inter body, the hero's fluted glass, cells divided by glowing lines, dark frosted glass,
// small black and white pills with the glowing hover, Hugeicons, and no strokes.

export const SIGNUP = 'https://app.hinstantt.com/signup';

// a module's Hugeicon, by product slug
export const MODULE_ICON = {
  payments: SentIcon, 'corporate-cards': CreditCardIcon, expense: ReceiptDollarIcon, travel: Airplane01Icon,
  accounts: Wallet01Icon, treasury: BankIcon, 'stablecoin-ramp': Coins01Icon, accounting: Calculator01Icon,
  procurement: ShoppingCart01Icon, 'invoicing-billing': Invoice03Icon, reporting: ChartHistogramIcon, 'ai-financial-management': AiMagicIcon,
};
// a module's real screen from the Figma file, where one exists
export const MODULE_UI = {
  accounting: accountingUi, payments: paymentsUi, 'corporate-cards': cardsUi, expense: expenseUi, procurement: procurementUi,
  reporting: reportingUi, 'invoicing-billing': invoicingUi, 'ai-financial-management': reportingUi, accounts: paymentsUi, treasury: revenueUi,
};

export const Hi = ({ icon, size = 18, color = 'currentColor', stroke = 1.6 }) => <HugeiconsIcon icon={icon} size={size} color={color} strokeWidth={stroke} />;
export const ArrowNE = ({ size = 14 }) => <Hi icon={ArrowUpRight01Icon} size={size} stroke={1.9} />;

// a light hero on the hero's fluted glass: eyebrow, Lora headline, lead, pill actions
// each page's own colour for the fluted glass: a hue rotation (degrees) off the homepage's
// blue, which way the ribbon rises, and how high it sits, so no two heroes look alike
export const HERO_LOOKS = {
  payments: { hue: -38, orient: 1, lift: 0.5 },          // teal
  'corporate-cards': { hue: 62, orient: -1, lift: 0.6 }, // violet-pink
  expense: { hue: 155, orient: 1, lift: 0.46 },          // amber
  travel: { hue: -78, orient: -1, lift: 0.52 },          // green
  accounts: { hue: 28, orient: 1, lift: 0.64 },          // indigo
  treasury: { hue: -112, orient: 1, lift: 0.42 },        // emerald-lime
  'stablecoin-ramp': { hue: 178, orient: -1, lift: 0.58 }, // gold
  accounting: { hue: 104, orient: -1, lift: 0.48 },      // rose
  procurement: { hue: -56, orient: -1, lift: 0.62 },     // sea green
  'invoicing-billing': { hue: 132, orient: 1, lift: 0.56 }, // coral
  reporting: { hue: 82, orient: 1, lift: 0.44 },         // magenta
  'ai-financial-management': { hue: -18, orient: -1, lift: 0.5 }, // cyan
  about: { hue: 44, orient: -1, lift: 0.54 },            // lilac
  contact: { hue: -64, orient: 1, lift: 0.6 },           // mint
  legal: { hue: -8, orient: -1, lift: 0.62 },            // pale sky
};

// each page's hero photo, with where its subject sits (so phones crop around them)
const PH = {
  calm: { src: photoCalm, pos: '58% 35%' }, travel: { src: photoTravel, pos: '50% 60%' }, relaxed: { src: photoRelaxed, pos: '72% 45%' },
  confident: { src: photoConfident, pos: '58% 30%' }, hello: { src: photoHello, pos: '50% 30%' },
  together: { src: photoTogether, pos: '55% 35%' }, paid: { src: photoPaid, pos: '50% 35%' }, meeting: { src: photoMeeting, pos: '55% 50%' },
  phone: { src: photoPhone, pos: '55% 40%' }, window: { src: photoWindow, pos: '50% 40%' }, night: { src: photoNight, pos: '60% 35%' },
};
export const HERO_PHOTOS = {
  accounting: PH.night, reporting: PH.meeting, 'ai-financial-management': PH.calm, treasury: PH.calm,
  travel: PH.travel, payments: PH.together, accounts: PH.window, 'corporate-cards': PH.window,
  expense: PH.phone, 'invoicing-billing': PH.paid, procurement: PH.relaxed,
  about: PH.confident, contact: PH.hello, 'stablecoin-ramp': PH.hello,
};

export function PageHero({ eyebrow, title, sub, actions, children, compact, look = {}, photo }) {
  if (photo) {
    // the photo full-bleed, a shade toward the copy, white type (as the homepage film)
    return (
      <>
        <section className={`kh kh--photo ${compact ? 'is-compact' : ''}`}>
          <img className="kh-photo" src={photo.src} alt="" style={{ objectPosition: photo.pos }} decoding="async" fetchpriority="high" />
          <div className="kh-shade" aria-hidden="true" />
          <div className="wrap kh-inner">
            {eyebrow && <span className="kh-eyebrow" data-enter-follow>{eyebrow}</span>}
            <h1 className="kh-title" data-enter>{title}</h1>
            {sub && <p className="kh-sub" data-enter-follow>{sub}</p>}
            {actions && <div className="kh-actions" data-enter-follow>{actions}</div>}
          </div>
        </section>
        {children}
      </>
    );
  }
  return (
    <section className={`kh ${compact ? 'is-compact' : ''}`}>
      <div className="kh-bg" aria-hidden="true"><FlutedBackground className="kh-scene" {...look} /></div>
      <div className="wrap kh-inner">
        {eyebrow && <span className="kh-eyebrow" data-enter-follow>{eyebrow}</span>}
        <h1 className="kh-title" data-enter>{title}</h1>
        {sub && <p className="kh-sub" data-enter-follow>{sub}</p>}
        {actions && <div className="kh-actions" data-enter-follow>{actions}</div>}
      </div>
      {children}
    </section>
  );
}

// true once the element has scrolled into view (and stays true)
export function useSeen(ref, threshold = 0.2) {
  const [seen, setSeen] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current; if (!el || seen) return undefined;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, seen, threshold]);
  return seen;
}

// the product screen in a window frame, with the next screens stacked behind it like
// notifications. It rises in tilted back and flattens as the page scrolls, the sheets
// behind fan out, and inside the window the UI pans slowly down the page and back, as
// if someone were working in it.
export function Screen({ img, title, icon, agent, stack = [] }) {
  const ref = React.useRef(null);
  const viewRef = React.useRef(null);
  const seen = useSeen(ref, 0.1);
  const [pan, setPan] = React.useState(0);   // how far the UI can travel inside the window, px

  // scroll progress through the hero drives the tilt and the fan
  React.useEffect(() => {
    const el = ref.current; if (!el) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { el.style.setProperty('--p', 1); return undefined; }
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (window.innerHeight - r.top) / (window.innerHeight * 0.9)));
      el.style.setProperty('--p', p.toFixed(3));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); cancelAnimationFrame(raf); };
  }, []);

  const measure = (e) => {
    const view = viewRef.current; if (!view) return;
    const h = e.currentTarget.getBoundingClientRect().height;
    setPan(Math.max(0, Math.round(h - view.clientHeight)));
  };

  return (
    <div className={`ks ${seen ? 'is-in' : ''}`} ref={ref}>
      {stack.slice(0, 2).reverse().map((s, k, arr) => (
        <div key={k} className={`ks-sheet ks-sheet--${arr.length - k}`} aria-hidden="true"><img src={s} alt="" /></div>
      ))}
      <div className="ks-win">
        <div className="ks-bar"><span className="ks-dots"><i /><i /><i /></span><span className="ks-title">{icon && <Hi icon={icon} size={14} />}{title}</span>{agent && <span className="ks-agent"><i />{agent} · 24/7</span>}</div>
        <div className="ks-view" ref={viewRef}>
          <img className={`ks-ui ${pan > 24 ? 'is-panning' : ''}`} src={img} alt={`${title} in Hinstantt`} decoding="async" onLoad={measure} style={{ '--pan': `${-pan}px` }} />
        </div>
      </div>
    </div>
  );
}

// a visual that rises into place and then floats gently
export function Reveal({ children, className = '' }) {
  const ref = React.useRef(null);
  const seen = useSeen(ref, 0.25);
  return <div ref={ref} className={`kr ${seen ? 'is-in' : ''} ${className}`}>{children}</div>;
}

// a section heading: optional kicker, Lora title, lead
export function SectionHead({ kicker, title, sub, center, light }) {
  return (
    <div className={`ksh ${center ? 'is-center' : ''} ${light ? 'is-light' : ''}`}>
      {kicker && <span className="ksh-kicker" data-enter-follow>{kicker}</span>}
      <h2 className="ksh-title" data-enter>{title}</h2>
      {sub && <p className="ksh-sub" data-enter-follow>{sub}</p>}
    </div>
  );
}

// cells divided by the site's glowing lines: full-bleed horizontals above and below,
// verticals between the cells, each with light flowing along it
export function GlowCells({ cols = 3, children, className = '' }) {
  const n = React.Children.count(children);
  const rows = Math.ceil(n / cols);
  return (
    <div className={`kg ${className}`} style={{ '--cols': cols }}>
      <span className="kg-h kg-h--top" aria-hidden="true" />
      <div className="kg-grid">
        {React.Children.map(children, (c, i) => <div className="kg-cell" style={{ '--i': i }}>{c}</div>)}
        {Array.from({ length: cols - 1 }, (_, k) => <span key={`v${k}`} className="kg-v" aria-hidden="true" style={{ left: `${((k + 1) / cols) * 100}%`, '--k': k }} />)}
        {Array.from({ length: rows - 1 }, (_, k) => <span key={`r${k}`} className="kg-r" aria-hidden="true" style={{ top: `${((k + 1) / rows) * 100}%` }} />)}
      </div>
      <span className="kg-h" aria-hidden="true" />
    </div>
  );
}

// the closing call to action: the dark fluted glass, held back, a Lora line and two pills
export function FinalCTA({ title = 'Hand the busywork to agents. Keep every decision.', sub = 'Open an account in minutes and put agents to work on spend, payments and accounting this quarter.' }) {
  return (
    <section className="kc">
      <div className="kc-bg" aria-hidden="true"><FlutedBackground className="kc-scene" dark hue={-20} /></div>
      <div className="wrap kc-inner">
        <h2 className="kc-title" data-enter>{title}</h2>
        <p className="kc-sub" data-enter-follow>{sub}</p>
        <div className="kc-actions" data-enter-follow>
          <a className="btn kc-primary" href={SIGNUP}>Get started</a>
          <a className="btn kc-ghost" href="/contact">Talk to sales</a>
        </div>
      </div>
    </section>
  );
}
