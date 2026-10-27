import React from 'react';
import { flushSync } from 'react-dom';
import HeroGlass from './components/HeroGlass.jsx';
import OnePlatform from './components/OnePlatform.jsx';
import ProductBento from './components/ProductBento.jsx';
import Investors from './components/Investors.jsx';
import TrustedBand from './components/TrustedBand.jsx';
import AgentsBanner from './components/AgentsBanner.jsx';
import MetricsArc from './components/MetricsArc.jsx';
import FlutedBackground from './components/FlutedBackground.jsx';
import { FinalCTA, GlowCells, SectionHead as KitHead } from './components/Kit.jsx';
import { HugeiconsIcon } from '@hugeicons/react';
import { Ic, NavIcon } from './components/icons.jsx';
import { CreditCardIcon, SentIcon, AiMagicIcon, Shield01Icon, Tick02Icon } from '@hugeicons/core-free-icons';
import FooterMark from './components/FooterMark.jsx';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { startSmoothScroll, startTextEntrances } from './motion.js';
import { startV2 } from './v2.js';
import * as P3 from './v3/Pages3.jsx';
import Home3 from './v3/Home3.jsx';
import Product3 from './v3/Product3.jsx';
import About3 from './v3/About3.jsx';
import Contact3 from './v3/Contact3.jsx';
import Legal3 from './v3/Legal3.jsx';
import NotFound3 from './v3/NotFound3.jsx';
import { Nav as V3Nav, Footer as V3Footer, ARCHIVED } from './v3/kit.jsx';
import { PRODUCTS, productHref } from './data/products.js';
import wordmarkDark from './assets/wordmark-dark.png';
import wordmarkWhite from './assets/wordmark-white.png';

// Nav product/solution icons (sky-circle badges)
const NAV_ICONS = import.meta.glob('./assets/nav-icons/*.svg', { eager: true, query: '?url', import: 'default' });
const navIcon = (key) => NAV_ICONS[`./assets/nav-icons/${key}-hinstantt.svg`];

// ===== FILE: assets/4e4cf1b8.bin =====
// Stroke icons — minimal, uniform weight

// ===== FILE: assets/641005a7.bin =====
// Hinstantt brand assets. Real wordmark PNG + SVG logomark shape.

const Logomark = ({size=22, color='currentColor'}) => (
  <svg width={size*1.16} height={size} viewBox="0 0 19.35 16.668" fill={color} aria-hidden="true">
    {/* left block (matches /Platform/DASHBOARD logomark) */}
    <path d="M 0 0 L 0 16.668 L 4.147 16.668 L 12.573 8.334 L 4.147 0 L 0 0 Z" />
    {/* right chevron */}
    <path d="M 12.574 0 L 12.574 16.668 L 16.721 16.668 L 19.351 8.334 L 16.721 0 L 12.574 0 Z" />
  </svg>
);

const Wordmark = ({size=22, color='#001521', white=false}) => (
  <img
    src={white ? wordmarkWhite : wordmarkDark}
    alt="hinstantt"
    height={size}
    style={{height:size,width:'auto',display:'block'}}
    draggable={false}
  />
);


// ===== FILE: assets/0f760ef6.bin =====
// Cinematic full-page dark-blue loader. ~10s total.
// Shows money flow across Treasury, Payments, Cards, Stablecoin, Procurement, Reporting, ERP.

const Loader = ({ onDone }) => {
  const [lines, setLines] = React.useState([]);
  const [done, setDone] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [assembling, setAssembling] = React.useState(false);
  const [assembled, setAssembled] = React.useState(false);

  React.useEffect(() => {
    if (sessionStorage.getItem('hi_loader_shown') === '1') {
      setDone(true); setTimeout(onDone, 20); return;
    }

    const script = [
      { t: 180, type: 'comment', text: '// Hinstantt · Global Payment Infrastructure · boot sequence' },
      { t: 220, type: 'comment', text: '// Connecting rails across 100+ markets…' },
      { t: 320, type: 'import', text: 'import { Treasury, Payments, Cards, Stablecoin } from "hinstantt/core"' },
      { t: 280, type: 'import', text: 'import { Procurement, Reporting, ERP } from "hinstantt/ops"' },
      { t: 240, type: 'import', text: 'import { AI } from "hinstantt/intelligence"' },
      { t: 260, type: 'blank' },

      { t: 180, type: 'label', text: '▶ treasury.sweep' },
      { t: 300, type: 'exec', label: 'Treasury', amt: '$12,482,910.04', dir: 'USD → USDC (Base)', status: 'settled', ms: '3.1s' },
      { t: 260, type: 'exec', label: 'Treasury', amt: '€3,140,221.18', dir: 'EUR → GBP (FX)',   status: 'routed',  ms: '1.8s' },
      { t: 220, type: 'exec', label: 'Treasury', amt: '$500,000.00',   dir: 'Operating → Yield', status: 'sweeping', ms: '2.0s' },
      { t: 160, type: 'blank' },

      { t: 180, type: 'label', text: '▶ payments.send' },
      { t: 280, type: 'exec', label: 'Payments', amt: '$128,400.00',   dir: 'FedNow · Stripe Inc.',   status: 'cleared', ms: '420ms' },
      { t: 240, type: 'exec', label: 'Payments', amt: '£86,500.00',    dir: 'CHAPS · London Ops',     status: 'cleared', ms: '540ms' },
      { t: 240, type: 'exec', label: 'Payments', amt: '¥645,000',      dir: 'Zengin · Tokyo',         status: 'cleared', ms: '680ms' },
      { t: 240, type: 'exec', label: 'Payments', amt: 'R$ 2,140,000.00', dir: 'PIX · São Paulo',        status: 'cleared', ms: '290ms' },
      { t: 240, type: 'exec', label: 'Payments', amt: 'C$ 52,300.00',  dir: 'ETF · Toronto',          status: 'cleared', ms: '910ms' },
      { t: 160, type: 'blank' },

      { t: 180, type: 'label', text: '▶ cards.authorize' },
      { t: 240, type: 'exec', label: 'Card', amt: '$2,450.00',  dir: 'AWS · Sarah Chen',  status: 'approved', ms: '91ms'  },
      { t: 220, type: 'exec', label: 'Card', amt: '€1,280.00',  dir: 'Figma · Luca M.',   status: 'approved', ms: '104ms' },
      { t: 220, type: 'exec', label: 'Card', amt: 'AED 9,450',  dir: 'Emirates · Priya',  status: 'approved', ms: '88ms'  },
      { t: 160, type: 'blank' },

      { t: 180, type: 'label', text: '▶ stablecoin.finalize' },
      { t: 300, type: 'exec', label: 'Stablecoin', amt: '7,204,000.00 USDC', dir: 'Circle · Base',   status: 'finalized', ms: '2.4s' },
      { t: 260, type: 'exec', label: 'Stablecoin', amt: '2,100,000.00 USDC', dir: 'Solana · yield',  status: 'finalized', ms: '1.9s' },
      { t: 160, type: 'blank' },

      { t: 180, type: 'label', text: '▶ procurement.po' },
      { t: 260, type: 'exec', label: 'Procurement', amt: '$84,750.00', dir: 'PO-48201 · Snowflake', status: 'approved', ms: '1.2s' },
      { t: 240, type: 'exec', label: 'Procurement', amt: '£12,400.00', dir: 'PO-48202 · Datadog',   status: 'approved', ms: '0.9s' },
      { t: 160, type: 'blank' },

      { t: 180, type: 'label', text: '▶ reporting.close' },
      { t: 260, type: 'exec', label: 'Reporting', amt: '2,341 txns', dir: 'GL auto-coded', status: '99.6% match', ms: '4.8s' },
      { t: 240, type: 'exec', label: 'Reporting', amt: 'Board pack', dir: 'PDF · ready',    status: 'sent',        ms: '1.1s' },
      { t: 160, type: 'blank' },

      { t: 180, type: 'label', text: '▶ erp.sync' },
      { t: 260, type: 'exec', label: 'ERP', amt: 'NetSuite',   dir: 'journals · 1,204', status: 'pushed', ms: '2.0s' },
      { t: 240, type: 'exec', label: 'ERP', amt: 'QuickBooks', dir: 'vendors · 312',    status: 'synced', ms: '1.4s' },
      { t: 180, type: 'blank' },

      { t: 240, type: 'ai', text: 'AI · Close Agent ready. Books balanced. 0 exceptions.' },
      { t: 220, type: 'ai', text: 'AI · Treasury Agent: sweeping $1.2M idle → 4.4% APY.' },
      { t: 320, type: 'ready', text: '✓ Hinstantt online · 15,000+ businesses · 100+ markets · $20B annualized' },
    ];

    let cancelled = false; let idx = 0;
    const next = () => {
      if (cancelled) return;
      if (idx >= script.length) {
        // Switch to assembly phase
        setTimeout(() => {
          if (cancelled) return;
          setAssembling(true);
        }, 380);
        // Then reveal wordmark
        setTimeout(() => {
          if (cancelled) return;
          setAssembled(true);
        }, 1900);
        // Then fade to site
        setTimeout(() => {
          if (cancelled) return;
          setDone(true); sessionStorage.setItem('hi_loader_shown', '1');
          setTimeout(onDone, 700);
        }, 3400);
        return;
      }
      const step = script[idx++];
      setTimeout(() => {
        setLines(ls => [...ls, step]);
        setProgress(Math.round((idx / script.length) * 100));
        next();
      }, step.t);
    };
    next();
    return () => { cancelled = true; };
  }, []);

  const renderLine = (l, i) => {
    if (l.type === 'blank') return <div key={i} style={{ height: 10 }}/>;
    if (l.type === 'comment') return <div key={i} style={sx.line}><span style={sx.lnum}>{String(i+1).padStart(2,'0')}</span><span style={{color:'#5b7a8a'}}>{l.text}</span></div>;
    if (l.type === 'import') return (
      <div key={i} style={sx.line}>
        <span style={sx.lnum}>{String(i+1).padStart(2,'0')}</span>
        <span style={{color:'#C4A8FF'}}>import </span>
        <span style={{color:'#E8F7FF'}}>{l.text.slice(7, l.text.indexOf('from')).trim()} </span>
        <span style={{color:'#C4A8FF'}}>from </span>
        <span style={{color:'#9FE6B3'}}>{l.text.slice(l.text.indexOf('"'))}</span>
      </div>
    );
    if (l.type === 'label') return <div key={i} style={sx.line}><span style={sx.lnum}>{String(i+1).padStart(2,'0')}</span><span style={{color:'#00A9E0',fontWeight:600}}>{l.text}</span></div>;
    if (l.type === 'exec') return (
      <div key={i} style={{...sx.line, display:'flex', gap:0, alignItems:'baseline', flexWrap:'wrap'}}>
        <span style={sx.lnum}>{String(i+1).padStart(2,'0')}</span>
        <span style={{color:'#5b7a8a'}}>{'{ '}</span>
        <span style={{color:'#B6E9FF'}}>rail:</span><span style={{color:'#9FE6B3'}}>&nbsp;"{l.label}"</span>
        <span style={{color:'#5b7a8a'}}>, </span>
        <span style={{color:'#B6E9FF'}}>amount:</span><span style={{color:'#FFD28A'}}>&nbsp;{l.amt}</span>
        <span style={{color:'#5b7a8a'}}>, </span>
        <span style={{color:'#B6E9FF'}}>corridor:</span><span style={{color:'#9FE6B3'}}>&nbsp;"{l.dir}"</span>
        <span style={{color:'#5b7a8a'}}>, </span>
        <span style={{color:'#B6E9FF'}}>status:</span><span style={{color:'#22B35D'}}>&nbsp;"{l.status}"</span>
        <span style={{color:'#5b7a8a'}}>, </span>
        <span style={{color:'#B6E9FF'}}>latency:</span><span style={{color:'#FFD28A'}}>&nbsp;{l.ms}</span>
        <span style={{color:'#5b7a8a'}}>&nbsp;{'}'}</span>
        <span style={{marginLeft:10, color:'#22B35D', fontSize:11}}>✓</span>
      </div>
    );
    if (l.type === 'ai') return <div key={i} style={{...sx.line, color:'#C4A8FF'}}><span style={sx.lnum}>{String(i+1).padStart(2,'0')}</span>✦ {l.text}</div>;
    if (l.type === 'ready') return <div key={i} style={{...sx.line, color:'#9FE6B3', fontWeight:600}}><span style={sx.lnum}>{String(i+1).padStart(2,'0')}</span>{l.text}</div>;
    return null;
  };

  // Auto-scroll code body as lines append
  const bodyRef = React.useRef(null);
  React.useEffect(() => { if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight; }, [lines.length]);

  return (
    <div style={{
      position:'fixed', inset:0, zIndex:1000, background:'#001521',
      color:'#E8F7FF', fontFamily:"'JetBrains Mono', ui-monospace, monospace",
      opacity: done ? 0 : 1, transition:'opacity .6s ease',
      pointerEvents: done ? 'none' : 'auto', overflow:'hidden',
    }}>
      <div aria-hidden style={{ position:'absolute', inset:0, pointerEvents:'none' }}>
        <div style={{ position:'absolute', left:'-10%', top:'-20%', width:'70%', height:'70%', background:'radial-gradient(closest-side, rgba(0,169,224,.28), transparent 70%)', filter:'blur(60px)' }}/>
        <div style={{ position:'absolute', right:'-10%', bottom:'-20%', width:'60%', height:'60%', background:'radial-gradient(closest-side, rgba(196,168,255,.2), transparent 70%)', filter:'blur(70px)' }}/>
      </div>
      <svg aria-hidden style={{ position:'absolute', inset:0, width:'100%', height:'100%', opacity:.07 }}>
        <defs>
          <pattern id="ldgrid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M60 0H0V60" fill="none" stroke="#00A9E0" strokeWidth=".5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ldgrid)"/>
      </svg>

      {/* Top chrome */}
      <div style={{ position:'absolute', top:0, left:0, right:0, padding:'24px 40px', display:'flex', justifyContent:'space-between', alignItems:'center', zIndex:2 }}>
        <div style={{ display:'flex', alignItems:'center', gap:10, color:'#fff' }}>
          <Logomark size={20} color="#fff"/>
          <span style={{ fontFamily:'Inter, sans-serif', fontSize:17, fontWeight:600, letterSpacing:'-.01em' }}>hinstantt</span>
        </div>
        <div style={{ fontSize:10.5, letterSpacing:'.14em', textTransform:'uppercase', color:'rgba(232,247,255,.55)', display:'flex', alignItems:'center', gap:8 }}>
          <span style={{ width:7, height:7, borderRadius:99, background:'#00A9E0', animation:'skyPulse 1.6s infinite' }}/>
          live · connecting to rails
        </div>
      </div>

      {/* Full-page code pane */}
      <div style={{ position:'absolute', inset:'88px 40px 90px', zIndex:3, display:'flex', opacity: assembling ? 0 : 1, transform: assembling ? 'scale(.96)' : 'scale(1)', transition:'opacity .6s ease, transform .6s ease' }}>
        <div style={{
          flex:1, background:'rgba(6,32,50,.7)', border: '0', borderRadius:16,
          backdropFilter:'blur(6px)', 
          overflow:'hidden', display:'flex', flexDirection:'column',
        }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, padding:'12px 18px', borderBottom: '0', background:'rgba(0,21,33,.5)' }}>
            <span style={{ width:10, height:10, borderRadius:99, background:'#ff5f57' }}/>
            <span style={{ width:10, height:10, borderRadius:99, background:'#febc2e' }}/>
            <span style={{ width:10, height:10, borderRadius:99, background:'#28c840' }}/>
            <span style={{ marginLeft:18, fontSize:11, color:'rgba(232,247,255,.5)' }}>hinstantt.boot.ts</span>
            <span style={{ marginLeft:'auto', fontSize:10, color:'rgba(232,247,255,.4)', display:'flex', gap:12 }}>
              <span>TypeScript</span><span style={{color:'#22B35D'}}>● connected</span>
            </span>
          </div>
          <div ref={bodyRef} style={{ padding:'26px 32px', flex:1, overflow:'hidden' }}>
            {lines.map(renderLine)}
            {!done && (
              <div style={sx.line}>
                <span style={sx.lnum}>{String(lines.length+1).padStart(2,'0')}</span>
                <span style={{ display:'inline-block', width:9, height:16, background:'#00A9E0', animation:'caret 1s step-end infinite', verticalAlign:'middle' }}/>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom progress */}
      <div style={{ position:'absolute', left:0, right:0, bottom:0, padding:'22px 40px 28px', zIndex:2, opacity: assembling ? 0 : 1, transition:'opacity .5s' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:12, fontSize:10.5, letterSpacing:'.14em', textTransform:'uppercase', color:'rgba(232,247,255,.55)' }}>
          <span style={{ display:'flex', gap:22, flexWrap:'wrap' }}>
            <span><span style={{color:'#00A9E0'}}>●</span> treasury</span>
            <span><span style={{color:'#C4A8FF'}}>●</span> payments</span>
            <span><span style={{color:'#9FE6B3'}}>●</span> cards</span>
            <span><span style={{color:'#FFD28A'}}>●</span> stablecoin</span>
            <span><span style={{color:'#B6E9FF'}}>●</span> procurement</span>
            <span><span style={{color:'#22B35D'}}>●</span> reporting</span>
            <span><span style={{color:'#FFB3C1'}}>●</span> erp</span>
          </span>
          <span style={{ fontVariantNumeric:'tabular-nums', color:'rgba(232,247,255,.8)' }}>{progress}% · initializing</span>
        </div>
        <div style={{ height:2, background:'rgba(0,169,224,.12)', borderRadius:2, overflow:'hidden' }}>
          <div style={{
            width: progress + '%', height:'100%',
            background:'linear-gradient(90deg, #00A9E0 0%, #B6E9FF 45%, #C4A8FF 100%)',
            transition:'width .35s ease', 
          }}/>
        </div>
      </div>

      {/* Assembly overlay — code collapses into wordmark */}
      <div style={{
        position:'absolute', inset:0, zIndex:10, pointerEvents:'none',
        opacity: assembling ? 1 : 0, transition:'opacity .5s ease',
        display:'grid', placeItems:'center',
      }}>
        {/* Collapsing beams — syntax lines rushing in from all sides */}
        <svg aria-hidden style={{ position:'absolute', inset:0, width:'100%', height:'100%' }}>
          <defs>
            <linearGradient id="beam" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#00A9E0" stopOpacity="0"/>
              <stop offset=".5" stopColor="#00A9E0" stopOpacity="1"/>
              <stop offset="1" stopColor="#B6E9FF" stopOpacity="0"/>
            </linearGradient>
          </defs>
          {Array.from({length: 18}).map((_,i) => {
            const ang = (i / 18) * Math.PI * 2;
            const r = 900;
            const cx = 50, cy = 50;
            const x1 = cx + Math.cos(ang) * r;
            const y1 = cy + Math.sin(ang) * r;
            return (
              <line key={i}
                x1={`${x1}%`} y1={`${y1}%`}
                x2={assembled ? '50%' : `${x1}%`} y2={assembled ? '50%' : `${y1}%`}
                stroke="url(#beam)" strokeWidth={1.2}
                style={{
                  transition: `all ${1 + (i%5)*.08}s cubic-bezier(.3,.9,.2,1) ${(i%7)*.03}s`,
                  opacity: assembled ? 0 : .9,
                }}
              />
            );
          })}
        </svg>

        {/* Burst ring at assembly moment */}
        <div style={{
          position:'absolute', width:200, height:200, borderRadius:999,
          border:'0',
          transform: assembled ? 'scale(6)' : 'scale(.2)',
          opacity: assembled ? 0 : .6,
          transition:'all 1.2s cubic-bezier(.2,.8,.2,1)',
          
        }}/>

        {/* Wordmark assembly — 9 letters */}
        <div style={{
          display:'flex', alignItems:'center', gap:8,
          transform: assembled ? 'scale(1)' : 'scale(.7)',
          transition:'transform 1s cubic-bezier(.2,.8,.2,1)',
        }}>
          <div style={{
            width: 64, height: 64, borderRadius: 14,
            background:'#00A9E0',
            display:'grid', placeItems:'center',
            opacity: assembled ? 1 : 0,
            transform: assembled ? 'rotate(0) scale(1)' : 'rotate(-180deg) scale(.3)',
            transition:'all .9s cubic-bezier(.2,1.4,.3,1) .05s',
            marginRight: 14,
            
          }}>
            <Logomark size={36} color="#fff"/>
          </div>
          {'hinstantt'.split('').map((ch, i) => (
            <span key={i} style={{
              display:'inline-block',
              fontFamily:"'Inter', system-ui, sans-serif",
              fontWeight:600, fontSize:96, letterSpacing:'-.04em',
              color:'#fff',
              opacity: assembled ? 1 : 0,
              transform: assembled ? 'translateY(0) rotateX(0) scale(1)' : `translateY(${(i%2?30:-30)}px) rotateX(80deg) scale(.6)`,
              filter: assembled ? 'blur(0)' : 'blur(8px)',
              transition: `all .7s cubic-bezier(.2,.9,.2,1.1) ${i * .06}s`,
              
            }}>{ch}</span>
          ))}
        </div>

        {/* Tagline fades up after wordmark */}
        <div style={{
          position:'absolute', bottom:'32%',
          fontFamily:"'JetBrains Mono', monospace", fontSize:11,
          letterSpacing:'.22em', textTransform:'uppercase', color:'#B6E9FF',
          opacity: assembled ? .9 : 0,
          transform: assembled ? 'translateY(0)' : 'translateY(10px)',
          transition:'all .6s ease .8s',
        }}>
          ◆ The Finance OS, ready
        </div>
      </div>
    </div>
  );
};

const sx = {
  line: { fontSize:13, lineHeight:'24px', fontFeatureSettings:'"zero"', whiteSpace:'nowrap' },
  lnum: { display:'inline-block', width:30, color:'rgba(232,247,255,.25)', marginRight:14, textAlign:'right', userSelect:'none' },
};

// ===== FILE: assets/a6a67ac5.bin =====
const PRODUCT_GROUPS = [
  { h:'Spend', items:[
    {t:'Corporate Cards', s:'Virtual and physical', ic:'cards'},
    {t:'Expense', s:'Receipts to repayment', ic:'expense'},
    {t:'Travel', s:'Book and track travel', ic:'travel'},
  ]},
  { h:'Move money', items:[
    {t:'Accounts', s:'Multi-currency banking', ic:'accounts'},
    {t:'Payments', s:'Pay out to 100+ markets', ic:'payments'},
    {t:'Treasury', s:'Cash management, yield', ic:'treasury'},
    {t:'Stablecoin Ramp', s:'On and off ramps', ic:'stablecoin'},
  ]},
  { h:'Operate', items:[
    {t:'Accounting', s:'AI ledger, auto close', ic:'accounting'},
    {t:'Procurement', s:'Request to 3-way match', ic:'procurement'},
    {t:'Invoicing & Billing', s:'Invoice, bill, collect', ic:'Invoiceandbilling'},
  ]},
  { h:'Intelligence', items:[
    {t:'Reporting', s:'Live spend and revenue', ic:'reporting'},
    {t:'AI Financial Management', s:'AI across every module', ic:'AI'},
  ]},
];

const SOLUTION_GROUPS = [
  { h:'Platforms', items:[
    {t:'Remittance Platforms', s:'Cross-border payout rails', ic:'remittanceplatform'},
    {t:'Fintech & Neobanks', s:'Embedded accounts and cards', ic:'fintechneobank'},
    {t:'Payment Service Providers', s:'Pay-in and pay-out at scale', ic:'paymentserviceproviders'},
    {t:'FX & Liquidity Platforms', s:'Conversion and liquidity', ic:'fxandliquidity'},
  ]},
  { h:'Enterprises', items:[
    {t:'Corporates & Enterprises', s:'Global finance operations', ic:'corporateandliquidity'},
    {t:'Banks & Financial Institutions', s:'Modern rails and orchestration', ic:'banksandfinancialinstitutions'},
    {t:'Mobile Network Operators', s:'Wallet and airtime settlement', ic:'mobilenetworkproviders'},
    {t:'Marketplaces & Gig Platforms', s:'Split payouts to sellers', ic:'marketplaceandgigplatforms'},
  ]},
];

const SIGNIN_URL = 'https://app.hinstantt.com/login';
const SIGNUP_URL = 'https://app.hinstantt.com/signup';

const NAV = [
  { label:'Product',  id:'product',  groups: PRODUCT_GROUPS,
    featured:{ title:'The Finance OS', blurb:'Cards, payments, treasury and accounting, run by agents that never sleep.', cta:'See a demo', href:'mailto:newbusiness@hinstantt.com?subject=Enquiries' } },
  { label:'Company',  id:'company',  groups:[
    { h:'Company', items:[
      {t:'About Us',    s:'Our mission and team', ic:'aboutus', href:'/about'},
      {t:'Contact',     s:'Talk to our team',     ic:'contact', href:'/contact'},
    ]},
  ],
    featured:{ title:'Building global money', blurb:'The operating system for finance teams, everywhere.', cta:'Get started', href:SIGNUP_URL } },
];

const NavItem = ({ it }) => (
  <a className="nav-item" href={it.href || productHref(it.t)} key={it.t}>
    <NavIcon k={it.ic} />
    <span>
      <span className="nav-item-t">{it.t}</span>
      <span className="nav-item-s">{it.s}</span>
    </span>
  </a>
);

// Structured mega panel: grouped columns split by hairlines + a featured rail.
const MegaPanel = ({ nav }) => (
  <div className="np">
    <div className="np-groups">
      {nav.groups.map(g=>(
        <div className="np-group" key={g.h}>
          <div className="np-cat">{g.h}</div>
          <div className="np-items">
            {g.items.map(it=> <NavItem it={it} key={it.t}/> )}
          </div>
        </div>
      ))}
    </div>
    {nav.featured && (
      <div className="np-feat">
        <FlutedBackground className="np-feat-bg" ribs={3} />
        <div className="np-feat-title">{nav.featured.title}</div>
        <div className="np-feat-blurb">{nav.featured.blurb}</div>
        <a className="np-feat-cta" href={nav.featured.href}>{nav.featured.cta} <Ic.arrowNE/></a>
      </div>
    )}
  </div>
);

const Nav = ({ forceSolid }) => {
  const [open, setOpen] = React.useState(null);
  const closeTimer = React.useRef(null);
  const cancelClose = React.useCallback(() => {
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null; }
  }, []);
  const scheduleClose = React.useCallback(() => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(null), 220);
  }, [cancelClose]);
  React.useEffect(() => () => cancelClose(), [cancelClose]);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [mobilePanel, setMobilePanel] = React.useState(null);
  const [scrolled, setScrolled] = React.useState(false);
  const closeMobile = () => { setMobileOpen(false); setMobilePanel(null); };
  const panelData = NAV.find(n=>n.id===mobilePanel);

  // Clear at the top; frosted glass fades in over the first ~140px of scroll. The
  // amount goes straight to a CSS variable so scrolling doesn't re-render the nav.
  const shellRef = React.useRef(null);
  React.useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      shellRef.current?.style.setProperty('--glass', Math.min(1, Math.max(0, (y - 8) / 140)).toFixed(3));
      setScrolled(y > 12);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, []);

  // A menu being open or the mobile drawer should force the solid (light) state.
  const solid = scrolled || open || mobileOpen || forceSolid;
  const menuOpen = !!open || mobileOpen;
  const navInk = 'var(--ink)';

  // Ramp-style viewport: the panel spans the container; its height settles to the live
  // content. On first open the content fades and rises in. On a switch between menus the
  // old content slides out the way you travelled and the new one slides in from the far
  // side, overlapping for a beat; the outgoing layer is dropped once it has left.
  const [layers, setLayers] = React.useState([]);   // [{ id, motion }]
  const prevOpen = React.useRef(null);
  React.useEffect(() => {
    const a = prevOpen.current, b = open;
    prevOpen.current = b;
    const ids = NAV.map((n) => n.id);
    if (b && !a) { setLayers([{ id: b, motion: 'rise' }]); return undefined; }
    if (b && a && b !== a) {
      const right = ids.indexOf(b) > ids.indexOf(a);
      setLayers([{ id: a, motion: right ? 'to-start' : 'to-end' }, { id: b, motion: right ? 'from-end' : 'from-start' }]);
      const t = setTimeout(() => setLayers((ls) => ls.filter((l) => l.id === b)), 500);
      return () => clearTimeout(t);
    }
    if (!b && a) { const t = setTimeout(() => setLayers([]), 320); return () => clearTimeout(t); }
    return undefined;
  }, [open]);
  const [panelH, setPanelH] = React.useState(0);
  const layerRefs = React.useRef({});
  React.useLayoutEffect(() => {
    const el = open && layerRefs.current[open];
    if (el) setPanelH(el.offsetHeight);
  }, [layers, open]);

  return (
    <React.Fragment>
    <div className={`nav-veil ${open?'is-on':''}`} aria-hidden="true" />
    <div ref={shellRef}
         className={`nav-shell ${solid?'is-solid':'is-top'} ${forceSolid?'is-forced':''} ${menuOpen?'is-menu':''}`}
         style={{position:'fixed',top:0,left:0,right:0,zIndex:40}}
         onMouseEnter={cancelClose}
         onMouseLeave={scheduleClose}
         onClick={(e) => { if (e.target.closest('a')) { cancelClose(); setOpen(null); closeMobile(); } }}>
      <div className="wrap nav-bar">
        <a href="/" className="nav-logo" style={{display:'inline-flex'}}>
          <Wordmark size={18}/>
        </a>

        <nav className={`nav-desktop ${open?'has-open':''}`}>
          {NAV.map(it=>(
            <div key={it.label} onMouseEnter={()=>setOpen(it.groups||it.links?it.id:null)}>
              {it.href ? (
                <a className="nav-top" href={it.href}>{it.label}</a>
              ) : (
                <button className={`nav-top ${open===it.id?'is-active':''}`}>
                  {it.label}
                  <svg className="nav-chev" width="9" height="9" viewBox="0 0 10 10"><path d="M2 4l3 3 3-3" stroke="currentColor" fill="none" strokeWidth="1.4"/></svg>
                </button>
              )}
            </div>
          ))}
        </nav>

        <div className="nav-right">
          <div className="nav-cta">
            <a className="nav-signin" href={SIGNIN_URL}>Sign in</a>
            <a className="btn btn-ghost nav-demo" href="mailto:newbusiness@hinstantt.com?subject=Enquiries">See a demo</a>
            <a className="btn btn-primary" href={SIGNUP_URL}>Get started <Ic.arrowNE/></a>
          </div>
          <button className="nav-burger" aria-label="Menu" onClick={()=>{ setMobileOpen(v=>!v); setMobilePanel(null); }} style={{padding:8,color:navInk,transition:'color .3s ease'}}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M3 7h18M3 12h18M3 17h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
          </button>
        </div>
      </div>

      <div className={`nav-pop ${open?'is-open':''}`} aria-hidden={!open}
           onMouseEnter={cancelClose} onMouseLeave={scheduleClose}>
        <div className="wrap">
          <div className="np-shell" style={{ height: open ? `${panelH}px` : 0 }}>
            {layers.map((l) => {
              const it = NAV.find((x) => x.id === l.id);
              return it && it.groups ? (
                <div key={l.id} ref={(el) => { layerRefs.current[l.id] = el; }} className={`np-layer is-${l.motion}`}><MegaPanel nav={it} /></div>
              ) : null;
            })}
          </div>
        </div>
      </div>
    </div>

      {mobileOpen && (
        <div className="nav-mobile">
          <div className="nav-mobile-head">
            {mobilePanel
              ? <button className="nav-back" onClick={()=>setMobilePanel(null)}><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg> Back</button>
              : <Wordmark size={18}/>}
            <button className="nav-x" aria-label="Close" onClick={closeMobile}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
            </button>
          </div>

          <div className="nav-mobile-body" key={mobilePanel||'root'}>
            {!mobilePanel && NAV.map(row=>(
              (row.groups||row.links)
                ? <button className="nav-m-row" key={row.id} onClick={()=>setMobilePanel(row.id)}>
                    <span>{row.label}</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                : <a className="nav-m-row" key={row.id} href={row.href} onClick={closeMobile}><span>{row.label}</span></a>
            ))}

            {mobilePanel && panelData.groups && panelData.groups.map(g=>(
              <div className="nav-m-group" key={g.h}>
                <div className="nav-group-h">{g.h}</div>
                {g.items.map(it=>(
                  <a className="nav-item" href={it.href || productHref(it.t)} key={it.t} onClick={closeMobile}>
                    <NavIcon k={it.ic} />
                    <span>
                      <span className="nav-item-t">{it.t}</span>
                      <span className="nav-item-s">{it.s}</span>
                    </span>
                  </a>
                ))}
              </div>
            ))}

            {mobilePanel && panelData.links && (
              <div className="nav-m-group">
                <div className="nav-group-h">{panelData.label}</div>
                {panelData.links.map(l=>(
                  <a className="nav-item nav-item--plain" href="#" key={l} onClick={closeMobile}><span className="nav-item-t">{l}</span></a>
                ))}
              </div>
            )}
          </div>

          <div className="nav-mobile-foot">
            <a className="btn btn-ghost" href={SIGNIN_URL} style={{justifyContent:'center',flex:1}}>Sign in</a>
            <a className="btn btn-primary" href={SIGNUP_URL} style={{justifyContent:'center',flex:1}}>Get started <Ic.arrowNE/></a>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

// ===== FILE: assets/d766dd59.bin =====
// ── Hinstantt Hero · Cinematic Spiral-In → Clean Text Finale ─────────────────
// Act 1 (0 – 3.2s): 10+ cards pop/spiral into the dark stage at well-spaced
//                   positions. They breathe, glow, drift.
// Act 2 (3.2 – 4.4s): all cards sweep outward + fade to black. Plasma dims.
// Act 3 (4.4s+):     final hero = centered text only.
//                   Headline, sub, CTA, customer logos, trust strip.

// ── Plasma shader ───────────────────────────────────────────────────────────
const PlasmaCanvas = ({ intensity = 1 }) => {
  const ref = React.useRef(null);
  const intRef = React.useRef(intensity);
  React.useEffect(() => { intRef.current = intensity; }, [intensity]);

  React.useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w=0, h=0, dpr=Math.min(2, window.devicePixelRatio||1), raf, t=0;
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = w*dpr; canvas.height = h*dpr;
      ctx.setTransform(dpr,0,0,dpr,0,0);
    };
    resize();
    window.addEventListener('resize', resize);
    const orbs = Array.from({length: 6}, (_, i) => ({
      hue: [195, 195, 210, 265, 195, 140][i],
      sat: [90, 85, 75, 70, 90, 70][i],
      light: [58, 52, 38, 64, 58, 50][i],
      amp: [.50, .40, .32, .36, .45, .30][i],
      fx: .3 + Math.random()*.4, fy: .3 + Math.random()*.4,
      ax: .35 + Math.random()*.25, ay: .3 + Math.random()*.25,
      sx: .3 + Math.random()*.3, sy: .35 + Math.random()*.3,
      phx: Math.random()*6.28, phy: Math.random()*6.28,
      radius: .4 + Math.random()*.35,
    }));
    const tick = () => {
      t += .0028;
      const k = intRef.current;
      const g = ctx.createLinearGradient(0,0,0,h);
      g.addColorStop(0, '#001521');
      g.addColorStop(1, '#030b12');
      ctx.fillStyle = g; ctx.fillRect(0,0,w,h);
      ctx.globalCompositeOperation = 'lighter';
      orbs.forEach((o) => {
        const cx = w * (o.fx + Math.sin(t*o.sx + o.phx)*o.ax);
        const cy = h * (o.fy + Math.cos(t*o.sy + o.phy)*o.ay);
        const r  = Math.max(w,h) * o.radius;
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        grad.addColorStop(0, `hsla(${o.hue}, ${o.sat}%, ${o.light}%, ${o.amp*k})`);
        grad.addColorStop(.5, `hsla(${o.hue}, ${o.sat}%, ${o.light}%, ${o.amp*.3*k})`);
        grad.addColorStop(1, `hsla(${o.hue}, ${o.sat}%, ${o.light}%, 0)`);
        ctx.fillStyle = grad;
        ctx.fillRect(0,0,w,h);
      });
      ctx.globalCompositeOperation = 'source-over';
      const vg = ctx.createRadialGradient(w/2, h/2, Math.min(w,h)*.2, w/2, h/2, Math.max(w,h)*.7);
      vg.addColorStop(0, 'rgba(0,21,33,0)');
      vg.addColorStop(1, `rgba(0,21,33,${.55 + (1-k)*.3})`);
      ctx.fillStyle = vg; ctx.fillRect(0,0,w,h);
      ctx.globalAlpha = .035 * k;
      for (let i=0; i<60; i++) {
        ctx.fillStyle = Math.random() > .5 ? '#B6E9FF' : '#C4A8FF';
        ctx.fillRect(Math.random()*w, Math.random()*h, 1, 1);
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={ref} style={{position:'absolute', inset:0, width:'100%', height:'100%', display:'block'}}/>;
};

// ── Cinematic spiral panel ──────────────────────────────────────────────────
// states: 'off' (not entered) → 'in' (spiraling in) → 'settled' → 'exit' (sweep out)
const CinePanel = ({
  children, x, y, z = 1,
  angle,        // starting angle for spiral entry (radians)
  radius = 900, // distance from final position at start
  delay = 0,    // entrance delay in seconds
  act,          // 'intro' | 'settle' | 'exit'
  exitAngle,    // angle to sweep out to
}) => {
  const [entered, setEntered] = React.useState(false);
  React.useEffect(() => {
    if (act === 'intro') {
      const t = setTimeout(() => setEntered(true), delay * 1000);
      return () => clearTimeout(t);
    }
  }, [act, delay]);

  // Positions
  const startDx = Math.cos(angle) * radius;
  const startDy = Math.sin(angle) * radius * .62;
  const startRot = (angle * 180 / Math.PI) - 180;
  const startScale = 0.18;

  // Vortex-in: cards spin into the center (their own rest position is ignored on exit;
  // they all collapse toward the screen center where the headline will appear).
  const vortexRot = (angle * 180 / Math.PI) + 540;  // 1.5 full spins inward

  let dx, dy, rot, scale, opacity, blur;
  if (!entered) {
    dx = startDx; dy = startDy; rot = startRot; scale = startScale;
    opacity = 0; blur = 12;
  } else if (act === 'exit') {
    // Force each card to translate FROM its rest (x%,y%) TO the center (50%,50%).
    // Since the container places cards via left:x% top:y%, we need a negative offset
    // equal to (50 - x) and (50 - y) percent of the viewport. We approximate with vw/vh.
    dx = `calc(${50 - x}vw)`;
    dy = `calc(${50 - y}vh)`;
    rot = vortexRot; scale = 0.15;
    opacity = 0; blur = 20;
  } else {
    dx = 0; dy = 0; rot = 0; scale = 1;
    opacity = 1; blur = 0;
  }

  return (
    <div style={{
      position:'absolute', left:`${x}%`, top:`${y}%`,
      opacity,
      filter:`blur(${blur}px)`,
      transform: typeof dx === 'string'
        ? `translate(-50%, -50%) translate(${dx}, ${dy}) rotate(${rot}deg) scale(${scale})`
        : `translate(-50%, -50%) translate3d(${dx}px, ${dy}px, 0) rotate(${rot}deg) scale(${scale})`,
      transition: act === 'exit'
        ? 'transform .9s cubic-bezier(.7,0,.3,1), opacity .85s cubic-bezier(.5,0,.3,1), filter .85s ease'
        : 'transform 1.2s cubic-bezier(.2,.9,.25,1.05), opacity .7s cubic-bezier(.4,0,.2,1), filter .7s cubic-bezier(.4,0,.2,1)',
      willChange:'transform, opacity',
    }}>
      <div style={{animation: entered && act !== 'exit' ? `heroFloat ${5 + z*2}s ease-in-out infinite` : 'none', animationDelay: `${delay + 1.2}s`}}>
        {children}
      </div>
    </div>
  );
};

// ── Panel presentational ────────────────────────────────────────────────────
const PanelGlass = ({ children, padding='18px 20px', width, accent='rgba(0,169,224,.22)' }) => (
  <div style={{
    width,
    background:'linear-gradient(160deg, rgba(15,36,52,.82) 0%, rgba(0,21,33,.9) 100%)',
    border: '0',
    borderRadius:14,
    padding,
    backdropFilter:'blur(18px)',
    WebkitBackdropFilter:'blur(18px)',
    
    color:'#E8F7FF',
  }}>{children}</div>
);

const Odo = ({ value, size = 34 }) => {
  const str = Math.floor(value).toLocaleString();
  return (
    <span style={{display:'inline-flex', alignItems:'flex-end', fontVariantNumeric:'tabular-nums'}}>
      {str.split('').map((ch, i) => ch === ',' || ch === '.' ? (
        <span key={i} style={{fontSize:size*.95, lineHeight:`${size}px`, padding:'0 1px', fontFamily:"'Instrument Serif', serif"}}>{ch}</span>
      ) : (
        <span key={i} style={{display:'inline-block', width:size*.6, height:size, overflow:'hidden'}}>
          <span style={{display:'block', transform:`translateY(${-parseInt(ch,10)*size}px)`, transition:'transform .9s cubic-bezier(.2,.8,.2,1)'}}>
            {[0,1,2,3,4,5,6,7,8,9].map(d => (
              <span key={d} style={{display:'block', height:size, lineHeight:`${size}px`, fontSize:size*.95, fontFamily:"'Instrument Serif', serif"}}>{d}</span>
            ))}
          </span>
        </span>
      )
    )}
    </span>
  );
};

// ── Card variants ───────────────────────────────────────────────────────────
const CardPayment = ({ volume }) => (
  <PanelGlass padding="18px 20px" width={300}>
    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12}}>
      <span className="mono" style={{fontSize:10, letterSpacing:'.16em', textTransform:'uppercase', color:'rgba(232,247,255,.55)', display:'flex', alignItems:'center', gap:8}}>
        <span style={{width:6, height:6, borderRadius:99, background:'#22B35D', }}/>
        Volume · live
      </span>
      <span className="mono" style={{fontSize:9.5, color:'rgba(232,247,255,.4)'}}>102 mkts</span>
    </div>
    <div style={{fontFamily:"'Instrument Serif', serif", fontSize:38, lineHeight:.95, letterSpacing:'-.025em', color:'#fff', display:'flex', alignItems:'baseline', gap:2}}>
      <span>$</span><Odo value={volume} size={34}/>
    </div>
  </PanelGlass>
);

const CardAgent = () => (
  <PanelGlass width={230}>
    <div style={{display:'flex', alignItems:'center', gap:10, marginBottom:10}}>
      <span style={{width:26, height:26, borderRadius:7, background:'linear-gradient(145deg,#00A9E0,#004B87)', display:'grid', placeItems:'center', }}>
        <svg width="12" height="12" viewBox="0 0 16 16" fill="#fff"><path d="M8 1 L10 6 L15 8 L10 10 L8 15 L6 10 L1 8 L6 6 Z"/></svg>
      </span>
      <div>
        <div style={{fontSize:12, fontWeight:600, color:'#fff'}}>Close Agent</div>
        <div className="mono" style={{fontSize:9, color:'#9FE6B3', letterSpacing:'.12em'}}>◆ RUNNING · 62%</div>
      </div>
    </div>
    <div style={{height:3, borderRadius:99, background:'rgba(255,255,255,.08)', overflow:'hidden'}}>
      <div style={{width:'62%', height:'100%', background:'linear-gradient(90deg,#00A9E0,#B6E9FF)'}}/>
    </div>
  </PanelGlass>
);

const CardFx = () => (
  <PanelGlass width={220}>
    <div className="mono" style={{fontSize:9.5, letterSpacing:'.14em', textTransform:'uppercase', color:'rgba(232,247,255,.55)', marginBottom:10}}>Corridor</div>
    <div style={{display:'flex', alignItems:'center', gap:8, marginBottom:10}}>
      <span style={{width:26, height:26, borderRadius:99, background:'#fff', color:'#001521', display:'grid', placeItems:'center', fontSize:9, fontWeight:700}}>USD</span>
      <svg width="26" height="8" viewBox="0 0 32 10" fill="none"><path d="M0 5 L28 5 M22 1 L28 5 L22 9" stroke="#00A9E0" strokeWidth="1.5"/></svg>
      <span style={{width:26, height:26, borderRadius:99, background:'linear-gradient(145deg,#C4A8FF,#7F5FE6)', color:'#fff', display:'grid', placeItems:'center', fontSize:9, fontWeight:700}}>SGD</span>
    </div>
    <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline'}}>
      <span style={{fontFamily:"'Instrument Serif', serif", fontSize:24, color:'#fff'}}>3.1<span style={{fontSize:12, color:'rgba(232,247,255,.55)'}}>s</span></span>
      <span className="mono" style={{fontSize:9, color:'#9FE6B3'}}>fee 0.14%</span>
    </div>
  </PanelGlass>
);

const CardYield = () => (
  <PanelGlass width={220}>
    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8}}>
      <span className="mono" style={{fontSize:9.5, letterSpacing:'.14em', textTransform:'uppercase', color:'rgba(232,247,255,.55)'}}>Yield</span>
      <span className="mono" style={{fontSize:9, color:'#9FE6B3'}}>▲ $25k/mo</span>
    </div>
    <div style={{fontFamily:"'Instrument Serif', serif", fontSize:32, color:'#fff', lineHeight:1, letterSpacing:'-.02em'}}>4.40%<span style={{fontSize:12, color:'rgba(232,247,255,.55)', marginLeft:4}}>APY</span></div>
  </PanelGlass>
);

const CardCard = () => (
  <PanelGlass width={210} padding="14px 16px">
    <div className="mono" style={{fontSize:9.5, letterSpacing:'.14em', textTransform:'uppercase', color:'rgba(232,247,255,.55)', marginBottom:10}}>Card · approved</div>
    <div style={{display:'flex', alignItems:'center', gap:10}}>
      <div style={{width:36, height:24, borderRadius:4, background:'linear-gradient(135deg,#C4A8FF,#7F5FE6)', position:'relative', overflow:'hidden'}}>
        <div style={{position:'absolute', bottom:3, left:3, width:10, height:7, background:'rgba(255,255,255,.6)', borderRadius:1}}/>
      </div>
      <div>
        <div style={{fontSize:12, color:'#fff', fontWeight:500}}>Figma · $1,280</div>
        <div className="mono" style={{fontSize:9.5, color:'rgba(232,247,255,.55)'}}>Luca M.</div>
      </div>
    </div>
  </PanelGlass>
);

const CardBlip = ({ title, amt, tag, accent='#00A9E0' }) => (
  <PanelGlass padding="12px 14px" width={210}>
    <div style={{display:'flex', alignItems:'center', gap:10}}>
      <span style={{width:22, height:22, borderRadius:5, background:`${accent}22`, border: '0', display:'grid', placeItems:'center', color:accent, fontSize:10, fontWeight:600, flexShrink:0}}>◆</span>
      <div style={{flex:1, minWidth:0}}>
        <div style={{fontSize:11, color:'#fff', fontWeight:500, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{title}</div>
        <div className="mono" style={{fontSize:9, color:'rgba(232,247,255,.55)', letterSpacing:'.05em'}}>{tag}</div>
      </div>
      <span className="num" style={{fontSize:11, color:'#fff', fontWeight:500, whiteSpace:'nowrap'}}>{amt}</span>
    </div>
  </PanelGlass>
);

const CardChip = ({ label, value, ic }) => (
  <PanelGlass width={180} padding="12px 14px">
    <div style={{display:'flex', alignItems:'center', gap:10}}>
      <span style={{width:28, height:28, borderRadius:7, background:'rgba(0,169,224,.15)', border: '0', display:'grid', placeItems:'center', color:'#B6E9FF', fontSize:14}}>{ic}</span>
      <div>
        <div className="mono" style={{fontSize:9, letterSpacing:'.12em', textTransform:'uppercase', color:'rgba(232,247,255,.5)'}}>{label}</div>
        <div style={{fontSize:13, fontWeight:500, color:'#fff'}}>{value}</div>
      </div>
    </div>
  </PanelGlass>
);

const CardTicker = () => (
  <PanelGlass width={190} padding="12px 14px">
    <div className="mono" style={{fontSize:9, letterSpacing:'.14em', textTransform:'uppercase', color:'rgba(232,247,255,.5)', marginBottom:6}}>FX · live</div>
    <div style={{display:'flex', flexDirection:'column', gap:4}}>
      {[['EUR/USD','1.0842','#9FE6B3'],['GBP/USD','1.2651','#9FE6B3'],['USD/JPY','149.32','#e8c47a']].map(([p,v,c])=>(
        <div key={p} style={{display:'flex', justifyContent:'space-between', fontSize:11}}>
          <span className="mono" style={{color:'rgba(232,247,255,.65)'}}>{p}</span>
          <span className="num" style={{color:c, fontWeight:500}}>{v}</span>
        </div>
      ))}
    </div>
  </PanelGlass>
);

const CardGlobe = () => (
  <PanelGlass width={200} padding="14px 16px">
    <div className="mono" style={{fontSize:9, letterSpacing:'.14em', textTransform:'uppercase', color:'rgba(232,247,255,.5)', marginBottom:8}}>Global rails</div>
    <svg viewBox="0 0 180 80" width="100%">
      <circle cx="90" cy="40" r="30" fill="none" stroke="rgba(0,169,224,.4)" strokeWidth="1" strokeDasharray="2 3"/>
      <ellipse cx="90" cy="40" rx="30" ry="10" fill="none" stroke="rgba(0,169,224,.3)" strokeWidth="1"/>
      {[[60,40],[90,25],[120,45],[90,55],[75,32],[108,38]].map(([x,y],i)=>(<circle key={i} cx={x} cy={y} r="2" fill="#00A9E0"/>))}
    </svg>
  </PanelGlass>
);

const CardReceipt = () => (
  <PanelGlass width={200} padding="12px 14px">
    <div style={{display:'flex', justifyContent:'space-between', marginBottom:6}}>
      <span className="mono" style={{fontSize:9, letterSpacing:'.14em', textTransform:'uppercase', color:'rgba(232,247,255,.5)'}}>Invoice · AP</span>
      <span className="mono" style={{fontSize:9, color:'#22B35D'}}>MATCHED</span>
    </div>
    <div style={{fontSize:12, color:'#fff', fontWeight:500}}>AWS · $14,820</div>
    <div className="mono" style={{fontSize:9.5, color:'rgba(232,247,255,.55)', marginTop:4}}>PO-48203 · 3-way ✓</div>
  </PanelGlass>
);

// ── Hero ─────────────────────────────────────────────────────────────────────
const Hero = () => {
  const [act, setAct] = React.useState('intro');   // intro → exit → final
  const [volume, setVolume] = React.useState(2814839759);

  React.useEffect(() => {
    const t = setInterval(() => setVolume(v => v + Math.floor(Math.random()*3200)+800), 140);
    return () => clearInterval(t);
  }, []);

  React.useEffect(() => {
    // Arc 1: Cards spiral in (delays up to ~2.2s). Hold until 3.4s.
    // Arc 2: Cards sweep out (1.1s).
    // Arc 3: Final text fades up.
    const t1 = setTimeout(() => setAct('exit'), 2800);
    const t2 = setTimeout(() => setAct('final'), 3500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // Scattered positions — organic, non-grid. Kept OUT of the center safe zone
  // (38%-62% x, 40%-60% y) so the spin-in collapse toward the middle reads clearly.
  // Mix of near and far positions, varied sizes via z.
  const cards = [
    // upper band
    { key:'payment', x:22, y:14, z:.7, node:<CardPayment volume={volume}/> },
    { key:'ticker',  x:78, y:10, z:1.0, node:<CardTicker/> },
    { key:'chipA',   x:48, y:8,  z:1.1, node:<CardChip label="Uptime" value="99.99%" ic="◆"/> },
    { key:'fx',      x:8,  y:26, z:1.1, node:<CardFx/> },
    { key:'yield',   x:92, y:32, z:.9,  node:<CardYield/> },

    // middle band — carved around 50/50 center
    { key:'agent',   x:16, y:46, z:1.2, node:<CardAgent/> },
    { key:'blip2',   x:86, y:50, z:1.3, node:<CardBlip title="Wise · EUR" amt="+€92k" tag="INSTANT" accent="#00A9E0"/> },
    { key:'chipB',   x:28, y:62, z:.9,  node:<CardChip label="Markets" value="102+" ic="✦"/> },
    { key:'globe',   x:72, y:66, z:1.0, node:<CardGlobe/> },

    // lower band
    { key:'card',    x:10, y:78, z:1.1, node:<CardCard/> },
    { key:'blip1',   x:90, y:82, z:1.4, node:<CardBlip title="Stripe payout" amt="+$214k" tag="AP AGENT" accent="#22B35D"/> },
    { key:'receipt', x:50, y:90, z:1.0, node:<CardReceipt/> },
    { key:'chipC',   x:22, y:92, z:1.2, node:<CardChip label="Latency" value="420ms" ic="●"/> },
    { key:'chipD',   x:76, y:92, z:1.2, node:<CardChip label="Rails" value="7 live" ic="⟁"/> },
  ];

  // Intensity of plasma (dim slightly during the final text phase for contrast on copy)
  const plasmaIntensity = act === 'final' ? 0.65 : 1;

  // Fade timing for final hero text
  const textReady = act === 'final';
  const fadeUp = (delay, y = 18) => ({
    opacity: textReady ? 1 : 0,
    transform: textReady ? 'translateY(0)' : `translateY(${y}px)`,
    transition: `opacity .9s cubic-bezier(.2,.8,.2,1) ${delay}s, transform .9s cubic-bezier(.2,.8,.2,1) ${delay}s, filter .9s cubic-bezier(.2,.8,.2,1) ${delay}s`,
    filter: textReady ? 'blur(0)' : 'blur(6px)',
  });

  return (
    <section style={{
      position:'relative', minHeight:'100vh', background:'#001521',
      overflow:'hidden', color:'#fff',
    }}>
      {/* Plasma */}
      <div style={{position:'absolute', inset:0, zIndex:0}}>
        <PlasmaCanvas intensity={plasmaIntensity}/>
      </div>

      {/* Dotted grid */}
      <svg aria-hidden style={{position:'absolute', inset:0, width:'100%', height:'100%', opacity: act === 'final' ? .1 : .15, zIndex:1, pointerEvents:'none', transition:'opacity 1s ease'}}>
        <defs><pattern id="hx" width="48" height="48" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="#B6E9FF"/></pattern></defs>
        <rect width="100%" height="100%" fill="url(#hx)"/>
      </svg>

      {/* Spiral-in cards — rendered only during intro/exit */}
      {act !== 'final' && (
        <div style={{position:'absolute', inset:0, zIndex:3, pointerEvents:'none'}}>
          {cards.map((c, i) => {
            // Spread entry angles evenly around a full circle
            const entryAngle = (i / cards.length) * Math.PI * 2 + Math.PI * .65;
            const exitAngle  = entryAngle + Math.PI; // opposite direction for dispersal
            return (
              <CinePanel
                key={c.key}
                x={c.x} y={c.y} z={c.z}
                angle={entryAngle}
                exitAngle={exitAngle}
                radius={800}
                delay={i * 0.09}
                act={act}
              >
                {c.node}
              </CinePanel>
            );
          })}
        </div>
      )}

      {/* Brief bright flash at act transition */}
      <div aria-hidden style={{
        position:'absolute', inset:0, zIndex:4, pointerEvents:'none',
        background:'radial-gradient(closest-side, rgba(255,255,255,.35) 0%, rgba(0,169,224,.1) 30%, transparent 60%)',
        opacity: act === 'exit' ? 1 : 0,
        transition:'opacity .6s ease',
      }}/>

      {/* FINAL HERO — text only */}
      <div style={{
        position:'relative', zIndex:5, minHeight:'100vh',
        display:'flex', flexDirection:'column',
        paddingTop:88, paddingBottom:36,
      }}>
        <div className="wrap" style={{flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center', gap:22}}>
          {/* eyebrow */}
          <div className="hero-eyebrow" style={{
            display:'inline-flex', alignItems:'center', gap:12,
            padding:'7px 16px 7px 7px',
            background:'rgba(15,36,52,.55)',
            border: '0',
            borderRadius:999,
            backdropFilter:'blur(12px)',
            ...fadeUp(0, 10),
          }}>
            <span className="mono" style={{fontSize:10, letterSpacing:'.14em', background:'rgba(0,169,224,.18)', color:'#B6E9FF', padding:'4px 10px', borderRadius:999, border: '0'}}>NEW</span>
            <span className="mono" style={{fontSize:11, letterSpacing:'.12em', color:'rgba(232,247,255,.85)', textTransform:'uppercase'}}>Hinstantt Intelligence · now in GA</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6 H10 M7 3 L10 6 L7 9" stroke="rgba(232,247,255,.7)" strokeWidth="1.3"/></svg>
          </div>

          {/* HEADLINE */}
          <h1 className="hero-h1" style={{
            margin:0, fontWeight:500,
            fontSize:'clamp(56px, 6.8vw, 108px)',
            lineHeight:.94, letterSpacing:'-.045em',
            maxWidth:1100, color:'#fff',
            
            ...fadeUp(.15, 24),
          }}>
            The finance OS that moves <em style={{
              fontWeight:'inherit',
              color:'#00A9E0',
              background:'linear-gradient(180deg, #B6E9FF 0%, #00A9E0 70%)',
              WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
            }}>at the speed of decision.</em>
          </h1>

          <p className="hero-sub" style={{
            margin:0, maxWidth:620, fontSize:17.5, lineHeight:1.5,
            color:'rgba(232,247,255,.78)',
            ...fadeUp(.35, 16),
          }}>
            Cards, payments, treasury, and agentic AI on a single surface. Built for global finance teams who refuse to wait for their own money.
          </p>

          <div className="hero-cta-row" style={{display:'flex', gap:12, alignItems:'center', marginTop:8, ...fadeUp(.5, 12)}}>
            <form onSubmit={e=>e.preventDefault()} className="hero-form" style={{display:'flex', gap:4, alignItems:'center', background:'rgba(15,36,52,.65)', border: '0', borderRadius:999, padding:'5px 5px 5px 20px', minWidth:380, backdropFilter:'blur(12px)'}}>
              <input placeholder="you@company.com" style={{flex:1, border:0, outline:0, background:'transparent', color:'#fff', fontSize:14, fontFamily:'inherit'}}/>
              <button className="btn" style={{background:'#fff', color:'#001521', fontWeight:600}}>Get started</button>
            </form>
            <a href="#" style={{fontSize:13.5, color:'rgba(255,255,255,.75)', display:'inline-flex', alignItems:'center', gap:10, padding:'10px 4px'}}>
              <span style={{width:32, height:32, borderRadius:99, border: '0', display:'grid', placeItems:'center'}}>
                <svg width="9" height="9" viewBox="0 0 10 10" fill="currentColor"><path d="M2 1 L9 5 L2 9 Z"/></svg>
              </span>
              Watch tour · 92s
            </a>
          </div>

          <div style={{marginTop:22, display:'flex', alignItems:'center', gap:32, flexWrap:'wrap', justifyContent:'center', opacity:.55, ...fadeUp(.7, 10)}}>
            <span className="mono" style={{fontSize:10, letterSpacing:'.18em', textTransform:'uppercase', color:'rgba(232,247,255,.5)'}}>Trusted by</span>
            {['Perplexity','Ramp','Linear','Cursor','Vercel','Arc','Notion'].map(n=>(
              <span key={n} style={{fontFamily:"'Inter',system-ui,sans-serif", fontWeight:600, fontSize:14, color:'rgba(232,247,255,.85)', letterSpacing:'-.015em'}}>{n}</span>
            ))}
          </div>
        </div>

        <div style={{marginTop:'auto', paddingTop:12, ...fadeUp(.9, 8)}}>
          <div className="wrap">
            <div className="hero-stats" style={{
              display:'grid',
              gridTemplateColumns:'repeat(5, 1fr)',
              columnGap:64,
              rowGap:24,
              alignItems:'start',
              maxWidth:1200,
              margin:'0 auto',
            }}>
              {[
                { value:'99.99%', label:'Platform uptime' },
                { value:'$9B+',   label:'In payments processed annually' },
                { value:'$25M',   label:'Raised' },
                { value:'150+',   label:'Countries supported' },
                { value:'0.1s',   label:'Avg. API response time' },
              ].map((s, i) => (
                <div key={s.value} style={{display:'flex', flexDirection:'column', gap:14, position:'relative', alignItems:'flex-start'}}>
                  <div style={{
                    fontFamily:'inherit',
                    fontSize:'clamp(38px, 3.6vw, 54px)',
                    lineHeight:.95,
                    letterSpacing:'-.045em',
                    fontWeight:500,
                    color:'#fff',
                    fontVariantNumeric:'tabular-nums',
                  }}>
                    {s.value}
                  </div>
                  <div style={{
                    fontFamily:'Inter, sans-serif',
                    fontSize:12.5,
                    lineHeight:1.5,
                    color:'rgba(232,247,255,.58)',
                    maxWidth:170,
                    letterSpacing:'.002em',
                  }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const HeroStage = () => null;


// ===== FILE: assets/365e29cd.bin =====
// Platform layers — four animated Hinstantt product vignettes.
// No em-dashes. Hinstantt sky-blue accent. Real-looking product surfaces.

// ── Cards vignette — receipt matching flow ───────────────────────────────────
const CardsVignette = () => {
  const [step,setStep] = React.useState(0);
  React.useEffect(()=>{ const t=setInterval(()=>setStep(s=>(s+1)%4),1600); return ()=>clearInterval(t); },[]);
  return (
    <div style={{height:320,padding:'24px 28px',display:'flex',flexDirection:'column',gap:10,justifyContent:'center',alignItems:'center',position:'relative',overflow:'hidden'}}>
      {/* dotted arcs */}
      <svg style={{position:'absolute',right:-50,top:-30,opacity:.55}} width="300" height="300" viewBox="0 0 300 300">
        <circle cx="220" cy="60" r="190" fill="none" stroke="var(--line-2)" strokeWidth="1" strokeDasharray="1 4"/>
        <circle cx="220" cy="60" r="140" fill="none" stroke="var(--sky-soft)" strokeWidth="1" strokeDasharray="1 4"/>
      </svg>
      <div style={{position:'relative',width:'82%'}}>
        <div style={{background:'#fff',border: '0',borderRadius:10,padding:'10px 12px',display:'flex',alignItems:'center',gap:10,animation:'slideInLeft .4s ease both'}}>
          <span style={{fontSize:18}}>✈️</span>
          <div style={{flex:1,fontSize:12.5,fontWeight:500}}>$1,850.00 at Singapore Airlines</div>
          <span className="mono" style={{fontSize:10,color:'var(--muted)'}}>2:14PM</span>
        </div>
        <div style={{marginTop:8,background:'#fff',border: '0',borderRadius:10,padding:'10px 12px',fontSize:12,color:'var(--muted)',display:'flex',alignItems:'center',gap:8,}}>
          <span style={{width:14,height:14,borderRadius:99,border: '0',borderTopColor:'transparent',animation:'dash .8s linear infinite'}}/> Grabbing your receipt
          {step>=1 && <span style={{color:'var(--green)',marginLeft:'auto',display:'flex',alignItems:'center',gap:4}}><Ic.check/> done</span>}
        </div>
        {step>=2 && (
          <div className="fade-up" style={{marginTop:8,background:'#fff',border: '0',borderRadius:10,padding:'10px 12px',fontSize:12,color:'var(--ink-3)',display:'flex',alignItems:'center',gap:8}}>
            <span style={{width:16,height:16,borderRadius:4,background:'var(--sky-wash)',display:'grid',placeItems:'center',color:'var(--sky)'}}><Ic.spark/></span>
            Matched to <b>APAC Offsite</b> · GL 6100
          </div>
        )}
        {step>=3 && (
          <div className="fade-up" style={{marginTop:8,background:'#E8F6ED',border: '0',borderRadius:10,padding:'10px 12px',fontSize:12,color:'#0B4A22',display:'flex',alignItems:'center',gap:8,fontWeight:500}}>
            <Ic.check/> Coded, receipted, booked
          </div>
        )}
      </div>
      {/* physical card */}
      <div style={{position:'absolute',right:-18,bottom:-22,width:188,aspectRatio:'1.58/1',background:'linear-gradient(135deg,#001521 0%, #0b2230 100%)',borderRadius:11,padding:14,color:'#fff',transform:'rotate(-5deg)',border: '0'}}>
        <Logomark size={13} color="#fff"/>
        <div style={{position:'absolute',right:14,top:14,fontSize:8,color:'var(--sky-soft)',letterSpacing:'.15em'}} className="mono">VIRTUAL</div>
        <div className="mono" style={{fontSize:10,marginTop:28,letterSpacing:'.1em'}}>•••• •••• 2184</div>
        <div style={{fontSize:9,marginTop:2,color:'rgba(255,255,255,.5)'}}>Maya Cheng</div>
      </div>
    </div>
  );
};

// ── AP vignette — invoice parsing with progress ──────────────────────────────
const APVignette = () => {
  const [p,setP] = React.useState(0);
  React.useEffect(()=>{ let f; const loop=()=>{setP(x=>x>=100?0:x+1.1);f=requestAnimationFrame(loop)}; f=requestAnimationFrame(loop); return ()=>cancelAnimationFrame(f); },[]);
  return (
    <div style={{height:320,padding:'24px 28px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,alignItems:'center',overflow:'hidden',position:'relative'}}>
      {/* scan line over invoice */}
      <div style={{background:'#fff',border: '0',borderRadius:10,padding:14,fontSize:9,lineHeight:1.5,minWidth:0,position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',left:0,right:0,height:2,background:'linear-gradient(90deg,transparent,var(--sky),transparent)',top:`${(p%100)}%`,opacity:.6}}/>
        <div style={{fontWeight:700,fontSize:11.5}}>Sojitz K.K.</div>
        <div style={{color:'var(--muted)',fontSize:9.5,marginBottom:8}}>1-23 Toranomon, Tokyo</div>
        <div style={{height:1,background:'var(--line)',margin:'4px 0'}}/>
        {[['Software License','$1,200'],['Implementation','$3,000'],['Support','$800']].map(([k,v],i)=>(
          <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'3px 0',color:'var(--ink-3)',fontSize:10}}><span>{k}</span><span className="num">{v}</span></div>
        ))}
        <div style={{height:1,background:'var(--line)',margin:'4px 0'}}/>
        <div style={{display:'flex',justifyContent:'space-between',fontWeight:700,fontSize:11}}><span>Total</span><span className="num">$5,000</span></div>
      </div>
      <div style={{display:'flex',flexDirection:'column',gap:4,minWidth:0}}>
        <div style={{display:'flex',gap:8,alignItems:'center',marginBottom:4}}>
          <div style={{width:22,height:22,borderRadius:5,background:'var(--sky)',color:'#fff',display:'grid',placeItems:'center',fontSize:10}}><Ic.doc/></div>
          <span style={{fontSize:12,fontWeight:600}}>Invoice #4829</span>
          <span className="mono" style={{marginLeft:'auto',fontSize:9,color:'var(--sky)'}}>parsing</span>
        </div>
        {['Vendor verified','Line items extracted','3-way PO match','Routed to Maya C.'].map((s,i)=>{
          const done = p > (i+1)*22;
          const act = !done && p > i*22;
          return (
            <div key={i} style={{display:'flex',alignItems:'center',gap:8,padding:'3px 0',fontSize:11,color: done?'var(--ink)':act?'var(--sky-ink)':'var(--muted)'}}>
              <span style={{width:12,height:12,borderRadius:99,border: '0',display:'grid',placeItems:'center',flexShrink:0}}>
                {done && <span style={{width:5,height:5,borderRadius:99,background:'var(--green)'}}/>}
                {act && <span style={{width:5,height:5,borderRadius:99,background:'var(--sky)',animation:'skyPulse 1s infinite'}}/>}
              </span>
              <span style={{whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{s}</span>
            </div>
          );
        })}
        {p>88 && (
          <div className="fade-up" style={{marginTop:6,padding:'6px 9px',background:'#E8F6ED',border: '0',borderRadius:6,fontSize:10,color:'#0B4A22',display:'flex',alignItems:'center',gap:5,fontWeight:500}}>
            <Ic.check/> Scheduled for pay run Fri
          </div>
        )}
      </div>
    </div>
  );
};

// ── Globe vignette — rail corridors with live payments ───────────────────────
const GlobeVignette = () => {
  const cities = [
    {x:120,y:90,flag:'🇺🇸',c:'NYC'},
    {x:275,y:80,flag:'🇬🇧',c:'LON'},
    {x:305,y:95,flag:'🇩🇪',c:'FRA'},
    {x:390,y:130,flag:'🇸🇬',c:'SGP'},
    {x:360,y:110,flag:'🇦🇪',c:'DIFC'},
    {x:335,y:160,flag:'🇳🇬',c:'LOS'},
    {x:100,y:170,flag:'🇧🇷',c:'SAO'},
    {x:430,y:170,flag:'🇯🇵',c:'TYO'},
  ];
  return (
    <div style={{height:320,padding:'24px 28px',background:'var(--ink)',color:'#fff',position:'relative',overflow:'hidden',display:'flex',flexDirection:'column'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
        <span className="mono" style={{fontSize:10,letterSpacing:'.14em',textTransform:'uppercase',color:'rgba(255,255,255,.5)'}}>Live global ledger · 100+ markets</span>
        <span className="mono" style={{fontSize:10,color:'var(--sky-soft)',display:'flex',alignItems:'center',gap:5}}>
          <span style={{width:5,height:5,borderRadius:99,background:'var(--sky)',animation:'skyPulse 1.6s infinite'}}/> settling
        </span>
      </div>
      <svg viewBox="0 0 500 240" style={{width:'100%',flex:1}}>
        <defs>
          <pattern id="dots" width="5" height="5" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r=".7" fill="rgba(255,255,255,.14)"/>
          </pattern>
          <linearGradient id="rail" x1="0" x2="1"><stop offset="0" stopColor="#00A9E0"/><stop offset="1" stopColor="#B6E9FF"/></linearGradient>
        </defs>
        <path d="M40 140 Q60 100 110 95 T220 90 Q280 92 330 110 T430 140 Q460 160 470 190 L470 210 Q380 218 280 210 T90 200 Q50 190 40 170Z" fill="url(#dots)" stroke="rgba(255,255,255,.08)" strokeWidth=".5"/>
        <path d="M300 110 Q330 115 350 135 T380 200 Q360 220 330 215 T290 185 Q275 150 300 110Z" fill="url(#dots)" stroke="rgba(255,255,255,.08)" strokeWidth=".5"/>
        {[[[120,90],[335,160]],[[120,90],[275,80]],[[275,80],[390,130]],[[335,160],[430,170]],[[120,90],[390,130]]].map(([a,b],i)=>{
          const mx=(a[0]+b[0])/2, my=(a[1]+b[1])/2-45;
          return <path key={i} d={`M${a[0]} ${a[1]} Q ${mx} ${my} ${b[0]} ${b[1]}`} fill="none" stroke="url(#rail)" strokeWidth="1" strokeDasharray="2 4" style={{animation:`dash ${3+i*.3}s linear infinite`}}/>;
        })}
        {cities.map((c,i)=>(
          <g key={i} transform={`translate(${c.x} ${c.y})`}>
            <circle r="8" fill="var(--sky)" opacity=".15" style={{animation:`orbitPulse ${2+i*.2}s ease-out infinite`}}/>
            <circle r="3" fill="var(--sky)"/>
            <text y="-9" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="7" fill="rgba(255,255,255,.8)" letterSpacing=".1em">{c.c}</text>
          </g>
        ))}
        <circle r="3" fill="#fff"><animateMotion dur="4s" repeatCount="indefinite" path="M120,90 Q230,40 335,160"/></circle>
        <circle r="2.5" fill="var(--sky-soft)"><animateMotion dur="5.5s" repeatCount="indefinite" path="M275,80 Q350,40 390,130"/></circle>
      </svg>
      <div style={{display:'flex',justifyContent:'space-between',marginTop:8}}>
        {[['Median settle','3.1s'],['Fee','0.14%'],['Markets','100+']].map(([k,v])=>(
          <div key={k}>
            <div className="mono" style={{fontSize:9,color:'rgba(255,255,255,.45)',letterSpacing:'.1em',textTransform:'uppercase'}}>{k}</div>
            <div style={{fontSize:14,fontWeight:500,marginTop:2}}>{v}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Accounting vignette — animated GL coding rows ────────────────────────────
const AccountingVignette = () => {
  const rows = [
    {v:'Gitlab Inc.',cat:'Software',gl:'6200',amt:'$1,840.00'},
    {v:'Adobe Systems',cat:'Software',gl:'6200',amt:'$2,048.00'},
    {v:'Airbnb',cat:'Travel',gl:'6100',amt:'$884.50'},
    {v:'Lufthansa',cat:'Travel',gl:'6100',amt:'$1,210.00'},
    {v:'WeWork',cat:'Facilities',gl:'6300',amt:'$4,100.00'},
  ];
  const [step,setStep] = React.useState(0);
  React.useEffect(()=>{ const t=setInterval(()=>setStep(s=>(s+1)%(rows.length+1)),700); return ()=>clearInterval(t); },[]);
  return (
    <div style={{height:320,padding:'24px 28px',overflow:'hidden'}}>
      <div style={{background:'#fff',border: '0',borderRadius:10,overflow:'hidden',height:'100%',display:'flex',flexDirection:'column'}}>
        <div style={{display:'grid',gridTemplateColumns:'1.3fr .9fr .6fr .8fr',padding:'9px 14px',fontSize:10,letterSpacing:'.1em',textTransform:'uppercase',color:'var(--muted)',borderBottom: '0',background:'#fafbfc'}} className="mono">
          <span>Vendor</span><span>Category</span><span>GL</span><span>Amount</span>
        </div>
        {rows.map((r,i)=>{
          const coded = i < step;
          return (
            <div key={i} style={{display:'grid',gridTemplateColumns:'1.3fr .9fr .6fr .8fr',padding:'10px 14px',fontSize:11.5,borderTop: i?'1px solid var(--line)':0,alignItems:'center',transition:'all .4s'}}>
              <span style={{fontWeight:500,display:'flex',alignItems:'center',gap:7}}>
                <span style={{width:16,height:16,borderRadius:4,background:`hsl(${i*47} 50% 90%)`,display:'grid',placeItems:'center',fontSize:8,fontWeight:600,color:`hsl(${i*47} 50% 30%)`}}>{r.v[0]}</span>
                {r.v}
              </span>
              <span style={{color: coded?'var(--ink-3)':'var(--muted)',opacity:coded?1:.5}}>
                {coded ? r.cat : <span style={{display:'inline-block',width:40,height:8,background:'var(--line)',borderRadius:2,animation:'shimmer 1.4s linear infinite',backgroundImage:'linear-gradient(90deg, #eef1f3 0%, #dfe4e8 50%, #eef1f3 100%)',backgroundSize:'200% 100%'}}/>}
              </span>
              <span className="mono num" style={{color: coded?'var(--sky-ink)':'var(--muted-2)'}}>{coded?r.gl:'···'}</span>
              <span className="num" style={{fontWeight:500,color:'var(--ink-3)'}}>{r.amt}</span>
            </div>
          );
        })}
        <div style={{marginTop:'auto',padding:'8px 14px',background:'var(--sky-wash)',borderTop: '0',display:'flex',alignItems:'center',gap:8,fontSize:10.5,color:'var(--sky-ink)'}}>
          <Ic.spark/> Close Agent coded {step} of {rows.length} in 0.8s · synced to NetSuite
        </div>
      </div>
    </div>
  );
};

// ── Section ─────────────────────────────────────────────────────────────────
const PlatformLayers = () => {
  const tiles = [
    {
      eyebrow:'Cards & Expenses',
      title:'Cards that handle themselves',
      body:'Virtual and physical cards in 40+ currencies. Receipts captured, GL coded, policies enforced before you open the dashboard.',
      href:'Corporate cards',
      visual:<CardsVignette/>,
    },
    {
      eyebrow:'Accounts Payable',
      title:'Invoices in, money out',
      body:'Forward any bill. Hinstantt parses it, 3-way matches to the PO, routes approvals, and schedules the pay run automatically.',
      href:'Bill pay',
      visual:<APVignette/>,
    },
    {
      eyebrow:'Global accounts',
      title:'One balance. Any market.',
      body:'Hold USD, USDC, EUR, GBP, JPY and dozens more in a single treasury. Real-time FX, instant settlement, deep liquidity in 100+ markets.',
      href:'Global accounts',
      visual:<GlobeVignette/>,
      dark:true,
      featured:true,
    },
    {
      eyebrow:'Accounting & Close',
      title:'A month-end without month-end',
      body:'Transactions sync to NetSuite, QuickBooks, Xero, Sage. Variance explained, accruals drafted, books closed while the team sleeps.',
      href:'Accounting automation',
      visual:<AccountingVignette/>,
    },
  ];

  return (
    <section className="r-sec" style={{padding:'88px 0 88px',borderBottom: '0',background:'var(--paper)'}}>
      <div className="wrap">
        <div style={{maxWidth:820,marginBottom:42}}>
          <h2 className="h-section">One platform for your entire back office.<br/><span style={{color:'var(--muted)'}}>Infinite agents that work 24/7.</span></h2>
          <div style={{marginTop:22,display:'flex',gap:10,flexWrap:'wrap'}}>
            <a className="btn btn-primary" href="#">Make the switch</a>
            <a className="btn btn-ghost" href="#">See pricing</a>
          </div>
        </div>

        <div className="r-tiles2" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
          {tiles.map((t,i)=>(
            <article key={i} style={{background: t.dark?'var(--ink)':'#fff',color: t.dark?'#fff':'var(--ink)',borderRadius:14,overflow:'hidden',border:'0',position:'relative'}}>
              <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',padding:'24px 28px 10px'}}>
                <div style={{maxWidth:'78%'}}>
                  <div style={{fontSize:22,fontWeight:600,letterSpacing:'-.02em',lineHeight:1.15}}>
                    <span>{t.eyebrow}</span>{' '}
                    <span style={{color: t.dark?'rgba(255,255,255,.55)':'var(--muted)',fontWeight:500}}>{t.title}</span>
                  </div>
                </div>
                <span style={{width:30,height:30,borderRadius:99,display:'grid',placeItems:'center',background: t.dark?'rgba(255,255,255,.08)':'var(--paper-2)',border:'0',color:'inherit'}}><Ic.arrowNE/></span>
              </div>
              <div style={{background: t.dark?'#001521':'var(--paper)',borderTop: t.dark?'1px solid rgba(255,255,255,.06)':'1px solid var(--line)',borderBottom: t.dark?'1px solid rgba(255,255,255,.06)':'1px solid var(--line)',margin:'0 20px',borderRadius:12,overflow:'hidden'}}>
                {t.visual}
              </div>
              <div style={{padding:'18px 28px 22px'}}>
                <p style={{fontSize:14,lineHeight:1.55,color: t.dark?'rgba(255,255,255,.6)':'var(--muted)',margin:0,maxWidth:480}}>{t.body}</p>
                <a href="#" style={{marginTop:10,display:'inline-flex',alignItems:'center',gap:6,fontSize:13,fontWeight:500,color: t.dark?'var(--sky-soft)':'var(--sky-ink)'}}>{t.href} <Ic.arrow/></a>
              </div>
              {t.featured && (
                <div style={{position:'absolute',top:22,right:70,padding:'3px 8px',background:'var(--sky)',color:'#fff',borderRadius:4,fontSize:10,letterSpacing:'.12em',textTransform:'uppercase',fontWeight:600}} className="mono">New</div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

// ===== INLINE sections.jsx =====

// ───────────────────────────────────────────────────────────────────────────
// Hinstantt — sections.jsx  (REBUILT)
// The original module that defined these was missing from the bundle. These
// components are reconstructed to match the in-file design system (tokens,
// Ic icons, Logomark/Wordmark, .wrap/.eyebrow/.h-section/.btn helpers) and the
// existing Hero / PlatformLayers / CustomersBand / Footer components.
// Defines: BrandMark, LogoRow, StoryTiles, SingTogether, AgentsBanner,
//          FeaturedTestimonial, TestimonialGrid, TrustBand, FeatureIndex, BigCTA
// ───────────────────────────────────────────────────────────────────────────

// Stylised text wordmark (CustomersBand + LogoRow render real brand names as
// type, not trademarked logos — the dark reveal inverts this to white).
const BrandMark = ({ name }) => (
  <span style={{
    fontWeight: 700, fontSize: 15, letterSpacing: '-.02em',
    color: 'var(--ink)', whiteSpace: 'nowrap', lineHeight: 1, userSelect: 'none'
  }}>{name}</span>
);

const SectionHead = ({ tag, title, copy, light }) => (
  <div className="r-sechead" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'end', marginBottom: 64 }}>
    <div>
      {tag && <div className="eyebrow" style={{ marginBottom: 22, color: 'var(--sky)' }}>◆ {tag}</div>}
      <h2 className="h-section" data-enter style={{ margin: 0, maxWidth: 620, color: light ? '#fff' : 'var(--ink)' }}>{title}</h2>
    </div>
    {copy && (
      <p style={{ fontSize: 17, lineHeight: 1.55, color: light ? 'rgba(255,255,255,.6)' : 'var(--muted)', margin: 0, maxWidth: 460, justifySelf: 'end' }}>{copy}</p>
    )}
  </div>
);

// ── LogoRow ──────────────────────────────────────────────────────────────────
const LogoRow = () => {
  const brands = ['CURSOR', 'NOTION', 'SHOPIFY', 'DEEL', 'PERPLEXITY', 'ELEVENLABS', 'A24', 'ZILLOW', 'GLOSSIER', 'BILT'];
  return (
    <section className="r-sec" style={{ padding: '54px 0', background: '#fff', borderBottom: '0' }}>
      <div className="wrap">
        <div className="eyebrow" style={{ textAlign: 'center', marginBottom: 30 }}>
          Trusted by finance teams moving real money at
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '28px 52px' }}>
          {brands.map((b) => (
            <span key={b} className="logorow-item" style={{ opacity: .42, transition: 'opacity .2s' }}>
              <BrandMark name={b} />
            </span>
          ))}
        </div>
        <style>{`.logorow-item:hover{opacity:1 !important}`}</style>
      </div>
    </section>
  );
};

// ── StoryTiles ────────────────────────────────────────────────────────────────
const StoryTiles = () => {
  const Tile = ({ icon, kicker, title, copy, span, dark }) => (
    <div className="bento-tile" style={{
      gridColumn: span, background: dark ? 'var(--ink)' : '#fff',
      border: 'none', borderRadius: 18, padding: 30,
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      minHeight: 230, color: dark ? '#fff' : 'var(--ink)',
      }}>
      <div>
        <span style={{
          width: 38, height: 38, borderRadius: 10, display: 'grid', placeItems: 'center',
          background: dark ? 'rgba(255,255,255,.08)' : 'var(--sky-wash)', color: 'var(--sky)', marginBottom: 18
        }}>{icon}</span>
        <div className="mono" style={{ fontSize: 10, letterSpacing: '.14em', textTransform: 'uppercase', color: dark ? 'rgba(255,255,255,.45)' : 'var(--muted)', marginBottom: 10 }}>{kicker}</div>
        <h3 style={{ margin: 0, fontSize: 23, letterSpacing: '-.03em', lineHeight: 1.12, maxWidth: 360 }}>{title}</h3>
      </div>
      <p style={{ margin: '16px 0 0', fontSize: 14.5, lineHeight: 1.55, color: dark ? 'rgba(255,255,255,.62)' : 'var(--muted)', maxWidth: 400 }}>{copy}</p>
    </div>
  );
  return (
    <section className="r-sec" style={{ padding: '120px 0', background: 'var(--paper)' }}>
      <div className="wrap">
        <SectionHead
          tag="The platform"
          title={<>One ledger for <em style={{ color: 'var(--sky)' }}>every</em> dollar your business touches.</>}
          copy="Spend, money movement and intelligence on a single system of record. No reconciliation between five tools at month end."
        />
        <div className="r-bento6" style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: 18 }}>
          <Tile span="span 3" dark icon={<Ic.cards />} kicker="Spend" title="Corporate cards with policy built in." copy="Issue unlimited virtual and physical cards. Controls, approvals and receipts enforced before the swipe, not after." />
          <Tile span="span 3" icon={<Ic.planet />} kicker="Money movement" title="Global accounts and stablecoin rails." copy="Hold USD, USDC, EUR and GBP in one balance. Settle across 100+ markets in seconds on the cheapest available rail." />
          <Tile span="span 2" icon={<Ic.chart />} kicker="Treasury" title="Yield on idle cash." copy="Sweep balances into treasury automatically with full liquidity." />
          <Tile span="span 2" icon={<Ic.doc />} kicker="Accounting" title="Close in days, not weeks." copy="Every transaction coded, categorized and synced to your ledger overnight." />
          <Tile span="span 2" icon={<Ic.spark />} kicker="Intelligence" title="Agents that do the work." copy="AI agents draft the board pack, catch duplicate invoices and flag policy breaches." />
        </div>
      </div>
    </section>
  );
};

// ── SingTogether ──────────────────────────────────────────────────────────────
const SingTogether = () => {
  const pills = ['QuickBooks', 'NetSuite', 'Xero', 'Slack', 'Workday', 'Ramp', 'Stripe', 'Plaid', 'Sage', 'HubSpot'];
  return (
    <section className="r-sec" style={{ padding: '120px 0', background: '#fff', borderTop: '0', borderBottom: '0', overflow: 'hidden' }}>
      <div className="wrap r-split" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center' }}>
        <div>
          <div className="eyebrow" style={{ marginBottom: 22, color: 'var(--sky)' }}>◆ One platform</div>
          <h2 className="h-section" style={{ margin: 0, maxWidth: 520 }}>
            Everything in <em style={{ color: 'var(--sky)' }}>concert</em>, not five tools out of tune.
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--muted)', maxWidth: 460, marginTop: 22 }}>
            Hinstantt connects to the systems you already run and keeps them in sync in real time. One source of truth across every entity, currency and team.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 30 }}>
            {pills.map((p) => (
              <span key={p} style={{ padding: '8px 14px', border: '0', borderRadius: 999, fontSize: 13, fontWeight: 500, color: 'var(--ink-3)', background: 'var(--paper)' }}>{p}</span>
            ))}
            <span style={{ padding: '8px 14px', borderRadius: 999, fontSize: 13, fontWeight: 500, color: 'var(--sky)', background: 'var(--sky-wash)' }}>+90 more</span>
          </div>
          <a href="#" className="btn btn-ghost" style={{ marginTop: 30 }}>Browse integrations <Ic.arrow /></a>
        </div>

        <div style={{ position: 'relative', height: 380, display: 'grid', placeItems: 'center' }}>
          <div style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', border: '0' }} />
          <div style={{ position: 'absolute', width: 200, height: 200, borderRadius: '50%', border: '0' }} />
          <div style={{ width: 92, height: 92, borderRadius: 22, background: 'var(--ink)', display: 'grid', placeItems: 'center', zIndex: 2 }}>
            <Logomark size={34} color="#fff" />
          </div>
          {pills.slice(0, 6).map((p, i) => {
            const ang = (i / 6) * Math.PI * 2;
            const r = 150;
            return (
              <span key={p} style={{
                position: 'absolute', left: `calc(50% + ${Math.cos(ang) * r}px)`, top: `calc(50% + ${Math.sin(ang) * r}px)`,
                transform: 'translate(-50%,-50%)', padding: '7px 12px', background: '#fff', border: '0',
                borderRadius: 999, fontSize: 12, fontWeight: 600, color: 'var(--ink)', whiteSpace: 'nowrap',
                animation: `floaty ${4 + i * 0.4}s ease-in-out ${i * 0.3}s infinite`
              }}>{p}</span>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ── AgentsBanner ──────────────────────────────────────────────────────────────
// AgentsBanner lives in src/components/AgentsBanner.jsx (forward bands + live automation flow).

// ── FeaturedTestimonial + TestimonialGrid removed ───────────────────────────
// Replaced by TrustedBand (src/components/TrustedBand.jsx): an honest stat band
// plus end-to-end task pills, no fabricated quotes or logos.

// ── TrustBand ────────────────────────────────────────────────────────────────
const TrustBand = () => {
  const badges = [['SOC 2', 'Type II'], ['PCI DSS', 'Level 1'], ['ISO 27001', 'Certified'], ['FinCEN', 'MSB registered'], ['GDPR', 'Aligned']];
  const stats = [['99.998%', 'Uptime, trailing 90 days'], ['100+', 'Markets settled in'], ['256-bit', 'Encryption at rest & in transit'], ['<3s', 'Median settlement time']];
  return (
    <section className="r-sec" style={{ padding: '110px 0', background: '#fff', borderTop: '0', borderBottom: '0' }}>
      <div className="wrap">
        <SectionHead
          tag="Security & trust"
          title={<>Built for money that <em style={{ color: 'var(--sky)' }}>cannot</em> wait or break.</>}
          copy="Bank-grade controls, independent audits and the redundancy global operators bet the business on."
        />
        <div className="r-bento4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 18, marginBottom: 34 }}>
          {stats.map(([n, l]) => (
            <div key={l} style={{ border: '0', borderRadius: 14, padding: '26px 22px', background: 'var(--paper)' }}>
              <div className="num" style={{ fontSize: 38, fontWeight: 600, letterSpacing: '-.04em', color: 'var(--ink)' }}>{n}</div>
              <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 8, lineHeight: 1.4 }}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {badges.map(([n, s]) => (
            <div key={n} style={{ padding: '10px 14px', border: '0', borderRadius: 8, display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--ink)' }}>{n}</span>
              <span className="mono" style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.06em' }}>{s}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── FeatureIndex ─────────────────────────────────────────────────────────────
// "One subscription. The whole finance stack." In the site's light language: four
// cells divided by the glowing lines, each with a grey icon square, its modules ticked off.
const FeatureIndex = () => {
  const groups = [
    { h: 'Spend', icon: CreditCardIcon, items: ['Corporate cards', 'Expenses', 'Reimbursements', 'Approvals', 'Travel', 'Procurement'] },
    { h: 'Move money', icon: SentIcon, items: ['Global accounts', 'Stablecoin rails', 'FX & collections', 'Treasury', 'Bill pay'] },
    { h: 'Intelligence', icon: AiMagicIcon, items: ['AI agents', 'Policy engine', 'Close automation', 'Revenue intelligence', 'Reporting', 'Forecasting'] },
    { h: 'Controls', icon: Shield01Icon, items: ['Multi-entity', 'Roles & permissions', 'Audit trail', 'SSO & SCIM', 'Bank connections', 'Mobile app'] },
  ];
  return (
    <section className="fx">
      <div className="wrap">
        <div className="fx-head">
          <KitHead kicker="Pricing" title={<>One subscription. Every module, <em className="fx-accent">every</em> agent.</>} />
          <p className="fx-sub" data-enter-follow>One price for the full platform and the agents inside it. No per-module fees, no surprise add-ons, every team gets everything from day one.</p>
        </div>
        <GlowCells cols={4} className="fx-grid">
          {groups.map((g) => (
            <div key={g.h}>
              <span className="kf-ic"><HugeiconsIcon icon={g.icon} size={19} color="currentColor" strokeWidth={1.6} /></span>
              <h3 className="kf-t">{g.h}</h3>
              <ul className="fx-list">
                {g.items.map((it) => <li key={it}><span className="fx-check"><HugeiconsIcon icon={Tick02Icon} size={12} color="currentColor" strokeWidth={2.2} /></span>{it}</li>)}
              </ul>
            </div>
          ))}
        </GlowCells>
        <div className="fx-cta">
          <a className="btn btn-primary" href={SIGNUP_URL}>Get started</a>
          <a className="btn btn-ghost" href="/contact">Talk to sales</a>
        </div>
      </div>
    </section>
  );
};

// ── BigCTA ───────────────────────────────────────────────────────────────────
const BigCTA = () => (
  <section className="r-sec" style={{ padding: '96px 0 96px', background: 'var(--paper)' }}>
    <div className="wrap">
      <div style={{ position: 'relative', overflow: 'hidden', background: 'var(--ink)', borderRadius: 26, padding: 'clamp(48px,7vw,96px) 32px', textAlign: 'center', }}>
        <div aria-hidden style={{ position: 'absolute', bottom: '-40%', left: '50%', transform: 'translateX(-50%)', width: 720, height: 720, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,169,224,.26), transparent 62%)', filter: 'blur(6px)', animation: 'auroraFlow 16s ease-in-out infinite' }} />
        <div style={{ position: 'relative' }}>
          <h2 className="h-section" data-enter style={{ margin: '0 auto', maxWidth: 760, color: '#fff' }}>
            Run global finance on <em style={{ color: 'var(--sky-soft)' }}>one</em> platform.
          </h2>
          <p data-enter-follow style={{ fontSize: 17, lineHeight: 1.55, color: 'rgba(255,255,255,.62)', maxWidth: 520, margin: '22px auto 0' }}>
            Open an account in minutes. Move your spend, payments and accounting onto Hinstantt this quarter.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 36, flexWrap: 'wrap' }}>
            <a href={SIGNUP_URL} className="btn btn-sky">Get started <Ic.arrowNE /></a>
            <a href="/contact" className="btn btn-ghost" style={{ background: 'transparent', borderColor: 'rgba(255,255,255,.25)', color: '#fff' }}>Talk to sales <Ic.arrow /></a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ===== FILE: assets/3c4f673a.bin =====
// Footer in Stripe's style: a light grid of cells, logo and blurb in the first, link
// columns in the rest, a quiet bottom bar. The cell dividers are the site's glowing lines,
// running the full height and width of the footer.
const Footer = () => {
  const products = ['Accounting','Procurement','Treasury','Reporting','Expense','Accounts','Corporate Cards','Payments','Travel','Invoicing & Billing','Stablecoin Ramp','AI Finance'];
  const solutions = ['Remittance Platforms','Fintech & Neobanks','Mobile Network Operators','FX & Liquidity Platforms','Corporates & Enterprises','Payment Service Providers','Marketplaces & Gig Platforms','Banks & Financial Institutions'];
  const cols = [
    { h: 'Products', links: products.slice(0, 6).map((t) => [t, productHref(t)]) },
    { h: 'More products', links: products.slice(6).map((t) => [t, productHref(t)]) },
    { h: 'Solutions', links: solutions.map((t) => [t, '#']) },
    { h: 'Company', links: [['About us', '/about'], ['Contact', '/contact'], ['Get started', SIGNUP_URL]], extra: { h: 'Legal', links: [['Privacy policy', '/legal/privacy-policy'], ['Terms of service', '/legal/terms-of-service']] } },
  ];
  const Group = ({ h, links }) => (
    <div className="ft2-group"><div className="ft2-h">{h}</div><ul>{links.map(([t, href]) => <li key={t}><a href={href}>{t}</a></li>)}</ul></div>
  );
  return (
    <footer className="ft2">
      <div className="wrap">
        <div className="ft2-inner">
          {/* the vertical lines run from the top of the footer to the end of the bottom bar,
              stopping just short of the wordmark */}
          <div className="ft2-vlines" aria-hidden="true">{[0, 1, 2, 3, 4, 5].map((k) => <i key={k} style={{ '--k': k }} />)}</div>
          <div className="ft2-grid">
            <div className="ft2-cell ft2-brand">
              <a href="/" className="ft2-logo"><Wordmark size={20} /></a>
              <p>The Finance OS for global operators. Cards, payments, treasury and accounting, run by agents that work 24/7 across 100+ markets.</p>
            </div>
            {cols.map((c) => (
              <div className="ft2-cell" key={c.h}>
                <Group h={c.h} links={c.links} />
                {c.extra && <Group h={c.extra.h} links={c.extra.links} />}
              </div>
            ))}
          </div>
          <div className="ft2-bottom">
            <span>© 2026 Kredete Inc. All rights reserved.</span>
            <span className="ft2-note">Hinstantt is a financial technology company, not a bank. Regulated payment services are provided through financial services partners or banks.</span>
          </div>
        </div>
      </div>
      <FooterMark />
    </footer>
  );
};

// ===== FILE: assets/00ca7767.bin =====
const Home = () => (
  <React.Fragment>
    <HeroGlass/>
    <AgentsBanner/>
    <MetricsArc/>
    <OnePlatform/>
    <ProductBento/>
    <Investors/>
    <TrustedBand/>
    <FeatureIndex/>
    <FinalCTA />
  </React.Fragment>
);

const normalize = (p) => (p || '/').replace(/\/+$/, '') || '/';

const App = () => {
  const [path, setPath] = React.useState(
    () => (typeof window !== 'undefined' ? window.location.pathname : '/')
  );

  React.useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest('a');
      if (!a) return;
      const href = a.getAttribute('href');
      if (!href || !href.startsWith('/') || href.startsWith('//') || a.target === '_blank' || a.hasAttribute('download')) return;
      e.preventDefault();
      if (normalize(href) !== normalize(window.location.pathname)) {
        window.history.pushState({}, '', href);
        // a page transition: the old page lifts away as the new one rises in (View Transitions)
        const swap = () => { flushSync(() => setPath(href)); window.scrollTo({ top: 0 }); };
        if (document.startViewTransition && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) document.startViewTransition(swap);
        else swap();
        return;
      }
      window.scrollTo({ top: 0 });
    };
    window.addEventListener('popstate', onPop);
    document.addEventListener('click', onClick);
    return () => {
      window.removeEventListener('popstate', onPop);
      document.removeEventListener('click', onClick);
    };
  }, []);

  const route = normalize(path);
  const isLegal = route.startsWith('/legal/');
  const isHome = route === '/v2';
  React.useEffect(() => {
    const base = 'Hinstantt';
    const origin = 'https://hinstantt.com';
    const titles = {
      '/': 'The Finance OS for global operators',
      '/contact': 'Contact sales',
      '/about': 'About us',
      '/legal/privacy-policy': 'Privacy policy',
      '/legal/terms-of-service': 'Terms of service',
      '/legal/cookie-policy': 'Cookie policy',
      '/pricing': 'Pricing',
      '/security': 'Security and compliance',
      '/integrations': 'Integrations',
      '/developers': 'Developers',
      '/customers': 'Customers',
      '/careers': 'Careers',
      '/faq': 'FAQ',
      '/resources': 'Resources',
      '/solutions': 'Solutions',
    };
    const descs = {
      '/': 'Hinstantt is the finance operating system for global operators. Run payments, corporate cards, expense, treasury, and accounting on one platform across 100+ markets, with an AI agent inside every module.',
      '/contact': 'Talk to the Hinstantt sales team about running payments, cards, treasury, and accounting on one finance operating system built for global operators.',
      '/about': 'Hinstantt is the finance OS for global operators, operated by Kredete, Inc. Meet the team behind the platform moving money for 15,000+ businesses across 100+ markets.',
      '/legal/privacy-policy': 'How Hinstantt, operated by Kredete, Inc., collects, uses, and protects your information.',
      '/legal/terms-of-service': 'The terms that govern your use of the Hinstantt finance operating system, operated by Kredete, Inc.',
      '/legal/cookie-policy': 'How Hinstantt uses cookies and similar technologies, and the choices you have.',
      '/pricing': 'Open a Hinstantt account at no cost and pay for what you use. Growing and multi-entity teams get pricing set to their volume.',
      '/security': 'How Hinstantt protects your money and data: encryption, role-based access, audit trails, licensed partners and 24/7 monitoring.',
      '/integrations': 'Connect Hinstantt to your accounting, ERP, HR, identity and communication tools, or build your own on the API.',
      '/developers': 'One API for accounts, cards, payouts, treasury and ledger, with webhooks for every event and a sandbox to build in.',
      '/customers': 'How 15,000+ businesses use Hinstantt agents to run payments, cards, treasury and accounting across markets.',
      '/careers': 'Join the remote-first team building the operating system for global money.',
      '/faq': 'Answers to the most common questions about Hinstantt, its agents, markets, security and pricing.',
      '/resources': 'Guides, reports and product deep dives for modern finance teams.',
      '/solutions': 'Hinstantt solutions for remittance platforms, fintechs, telecoms, FX platforms, marketplaces, enterprises and banks.',
    };

    let title = titles[route];
    let desc = descs[route];
    let ld = null;
    const canonical = origin + (route === '/' ? '/' : route);

    const sm = route.match(/^\/solutions\/([a-z0-9-]+)$/);
    if (sm && P3.SOLUTION_PAGES[sm[1]]) { title = P3.SOLUTION_PAGES[sm[1]].name; desc = P3.SOLUTION_PAGES[sm[1]].sub; }
    const pm = route.match(/^\/products\/([a-z0-9-]+)$/);
    if (pm && PRODUCTS[pm[1]]) {
      const p = PRODUCTS[pm[1]];
      title = p.name;
      desc = p.sub;
      ld = {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Service', name: `Hinstantt ${p.name}`, serviceType: p.name,
            description: p.sub, url: canonical, areaServed: 'Global',
            provider: { '@type': 'Organization', name: 'Hinstantt', url: origin },
          },
          {
            '@type': 'BreadcrumbList', itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Hinstantt', item: origin + '/' },
              { '@type': 'ListItem', position: 2, name: p.name, item: canonical },
            ],
          },
        ],
      };
    }

    const fullTitle = title ? `${base} · ${title}` : `${base} · Page not found`;
    const description = desc || descs['/'];
    document.title = fullTitle;

    const setName = (n, v) => {
      let el = document.head.querySelector(`meta[name="${n}"]`);
      if (!el) { el = document.createElement('meta'); el.setAttribute('name', n); document.head.appendChild(el); }
      el.setAttribute('content', v);
    };
    const setProp = (pr, v) => {
      let el = document.head.querySelector(`meta[property="${pr}"]`);
      if (!el) { el = document.createElement('meta'); el.setAttribute('property', pr); document.head.appendChild(el); }
      el.setAttribute('content', v);
    };
    let link = document.head.querySelector('link[rel="canonical"]');
    if (!link) { link = document.createElement('link'); link.setAttribute('rel', 'canonical'); document.head.appendChild(link); }
    link.setAttribute('href', canonical);

    setName('description', description);
    setProp('og:title', fullTitle);
    setProp('og:description', description);
    setProp('og:url', canonical);
    setProp('og:type', 'website');
    setName('twitter:title', fullTitle);
    setName('twitter:description', description);

    let ldEl = document.getElementById('ld-route');
    if (ld) {
      if (!ldEl) { ldEl = document.createElement('script'); ldEl.type = 'application/ld+json'; ldEl.id = 'ld-route'; document.head.appendChild(ldEl); }
      ldEl.textContent = JSON.stringify(ld);
    } else if (ldEl) {
      ldEl.remove();
    }
  }, [route]);

  // Page-wide scroll reveal: sections fade/slide up; card grids cascade tile by tile.
  // Uses a scroll listener (reliable across browsers) rather than IntersectionObserver.
  React.useEffect(() => {
    const rootEl = document.documentElement;
    rootEl.classList.add('reveal-on');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const grids = Array.from(document.querySelectorAll('.b2-grid, .inv-grid, .r-bento4, .r-bento3'));
    grids.forEach((el) => el.classList.add('reveal-stagger'));
    let pending = [...grids];

    if (reduce) { pending.forEach((el) => el.classList.add('in')); return; }

    let last = 0;
    const check = () => {
      const vh = window.innerHeight;
      for (let i = pending.length - 1; i >= 0; i--) {
        if (pending[i].getBoundingClientRect().top < vh * 0.9) {
          pending[i].classList.add('in');
          pending.splice(i, 1);
        }
      }
      if (!pending.length) detach();
    };
    const onScroll = () => {
      const now = Date.now();
      if (now - last < 60) return;
      last = now;
      check();
    };
    const detach = () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    check();                 // reveal whatever is on screen now
    setTimeout(check, 300);  // re-check after fonts/images settle

    return detach;
  }, [route]);

  // Smooth scroll (Lenis) and the text entrances. Started after the route renders, torn down on route change.
  React.useEffect(() => {
    // v3 pages run their own entrances; only smooth scroll carries over
    const stops = route === '/v2' ? [startSmoothScroll(), startTextEntrances(), startV2()] : [startSmoothScroll()];
    const t = setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => { clearTimeout(t); stops.forEach((f) => f && f()); };
  }, [route]);

  // (The hero's scroll motion lives in HeroGlass: a GSAP-pinned zoom sequence.)

  // the v2 homepage stays at /v2, with its own nav and footer, for comparison
  if (route === '/v2') {
    return (
      <React.Fragment>
        <Nav forceSolid={!isHome} />
        <Home />
        <Footer/>
      </React.Fragment>
    );
  }

  // every other route is v3
  let page;
  if (route === '/') page = <Home3 />;
  else if (ARCHIVED.includes(route)) page = <NotFound3 />;   // archived (see kit.jsx)
  else if (route === '/legal/privacy-policy') page = <Legal3 doc="privacy" />;
  else if (route === '/legal/terms-of-service') page = <Legal3 doc="terms" />;
  else if (route === '/contact') page = <Contact3 />;
  else if (route === '/about') page = <About3 />;
  else if (route === '/legal/cookie-policy') page = <Legal3 doc="cookies" />;
  else if (route === '/pricing') page = <P3.Pricing />;
  else if (route === '/security') page = <P3.Security />;
  else if (route === '/integrations') page = <P3.Integrations />;
  else if (route === '/developers') page = <P3.Developers />;
  else if (route === '/customers') page = <P3.Customers />;
  else if (route === '/careers') page = <P3.Careers />;
  else if (route === '/faq') page = <P3.Faq />;
  else if (route === '/resources') page = <P3.Resources />;
  else if (route === '/solutions') page = <P3.Solutions />;
  else if (/^\/solutions\/[a-z0-9-]+$/.test(route) && P3.SOLUTION_PAGES[route.split('/')[2]]) page = <P3.Solution slug={route.split('/')[2]} />;
  else if (/^\/products\/[a-z0-9-]+$/.test(route) && PRODUCTS[route.split('/')[2]]) page = <Product3 slug={route.split('/')[2]} />;
  else page = <NotFound3 />;

  return (
    <div className="v3">
      <V3Nav />
      {page}
      <V3Footer />
    </div>
  );
};



export default App;
