import React from 'react';
import { PRODUCTS, productHref } from '../data/products.js';
import { SIGNUP, SALES, Arrow, Check, Logomark, useReveal, Closing, PageHero } from './kit.jsx';
import { Scene } from './scenes.jsx';

// The supporting pages: solutions (one template, eight audiences), pricing, security,
// integrations, developers, customers, careers, FAQ and resources. They share the v3 parts:
// PageHero, the x-head intro, hairline grids, light tiles and the closing CTA.
// Copy marked TODO in comments needs confirming by the business before launch.

const Media = ({ kind, tone }) => (
  <div className="x-pg-media x-rv"><Scene kind={kind} big tone={tone} /></div>
);

const Head = ({ title, lead, children }) => (
  <div className="x-head x-rv">
    <h2 className="x-h2">{title}</h2>
    <div>{lead && <p className="x-lead">{lead}</p>}{children}</div>
  </div>
);

const Grid = ({ items, n = 3 }) => (
  <div className="x-feat x-feat--caps x-rv" style={{ '--n': n }}>
    {items.map(([h, p]) => (
      <div key={h} className="x-feat-col"><h3>{h}</h3><p>{p}</p></div>
    ))}
  </div>
);

const ProductLinks = ({ slugs }) => (
  <div className="x-pg-links x-rv">
    {slugs.map((s) => (
      <a key={s} href={`/products/${s}`} className="x-pg-link">
        <span><b>{PRODUCTS[s].name}</b><small>{PRODUCTS[s].short}</small></span><Arrow />
      </a>
    ))}
  </div>
);

/* ── Solutions ─────────────────────────────────────────────────────────────── */
export const SOLUTION_PAGES = {
  'remittance-platforms': {
    name: 'Remittance Platforms', scene: 'routes',
    headline: 'Pay out to 100+ markets from one balance.',
    sub: 'Fund once, then route every transfer to the fastest local rail. Agents reconcile each payout against your ledger as it settles.',
    pains: [['Prefunding sprawl', 'One multi-currency balance replaces a float in every corridor.'], ['Slow corridors', 'The Payments agent picks the fastest, cheapest rail for each transfer.'], ['Manual reconciliation', 'Every payout is matched to its source and posted the moment it settles.']],
    products: ['payments', 'accounts', 'treasury', 'stablecoin-ramp'],
  },
  'fintech-neobanks': {
    name: 'Fintech & Neobanks', scene: 'cards',
    headline: 'Launch cards, accounts and payouts without building the back office.',
    sub: 'Issue cards, hold balances and move money across markets on one platform, with policy and reconciliation handled by agents.',
    pains: [['Partner patchwork', 'Cards, accounts and payments come from one integration instead of five.'], ['Ops headcount', 'Agents code, reconcile and flag exceptions so your team reviews instead of keys.'], ['Expansion', 'Add a market by switching it on, not by signing a new provider.']],
    products: ['corporate-cards', 'accounts', 'payments', 'reporting'],
  },
  'mobile-network-operators': {
    name: 'Mobile Network Operators', scene: 'routes',
    headline: 'Settle with partners and agents across every market you serve.',
    sub: 'Collect, settle and pay out across currencies with one ledger behind it, and live visibility into every position.',
    pains: [['Partner settlement', 'Pay roaming, content and distribution partners in their own currency.'], ['Agent float', 'Watch balances across markets and sweep idle cash automatically.'], ['Month end', 'The Close agent reconciles high-volume flows before the books close.']],
    products: ['payments', 'treasury', 'accounting', 'reporting'],
  },
  'fx-liquidity-platforms': {
    name: 'FX & Liquidity Platforms', scene: 'stacks',
    headline: 'Hold, convert and move liquidity across currencies in seconds.',
    sub: 'Multi-currency accounts, stablecoin rails and treasury rules that keep every position funded and earning.',
    pains: [['Fragmented positions', 'See every currency and venue in one live balance.'], ['Idle cash', 'Sweep rules move surplus into yield and back when you need it.'], ['Settlement speed', 'On and off ramp through stablecoins when the rail is faster.']],
    products: ['accounts', 'treasury', 'stablecoin-ramp', 'payments'],
  },
  'corporates-enterprises': {
    name: 'Corporates & Enterprises', scene: 'ledger',
    headline: 'One finance stack for every entity, currency and team.',
    sub: 'Spend, payables, treasury and close across subsidiaries, with approvals and audit trails your controllers trust.',
    pains: [['Multi-entity books', 'Run every entity from one platform, consolidated in real time.'], ['Spend control', 'Policy is enforced at the swipe, not at month end.'], ['Close speed', 'Agents reconcile and post continuously, so close is a review.']],
    products: ['accounting', 'corporate-cards', 'procurement', 'reporting'],
  },
  'payment-service-providers': {
    name: 'Payment Service Providers', scene: 'routes',
    headline: 'Extend your reach to new markets without new infrastructure.',
    sub: 'Plug into payout rails across Africa, Europe and the Americas, with treasury and reconciliation built in.',
    pains: [['Coverage gaps', 'Reach 100+ markets through one set of APIs.'], ['Merchant payouts', 'Pay merchants in their currency on their local rail.'], ['Liquidity', 'Keep corridors funded with automated sweeps and alerts.']],
    products: ['payments', 'accounts', 'treasury', 'invoicing-billing'],
  },
  'marketplaces-gig-platforms': {
    name: 'Marketplaces & Gig Platforms', scene: 'bars',
    headline: 'Pay every seller and worker, wherever they are.',
    sub: 'Collect from buyers, hold funds and pay out to thousands of recipients in their own currency, reconciled automatically.',
    pains: [['Mass payouts', 'Send thousands of payouts in one batch, each on the right rail.'], ['Collections', 'Invoice and collect from buyers with reminders handled by agents.'], ['Visibility', 'Live reporting on spend, revenue and balances by market.']],
    products: ['payments', 'invoicing-billing', 'accounts', 'reporting'],
  },
  'banks-financial-institutions': {
    name: 'Banks & Financial Institutions', scene: 'signal',
    headline: 'Modern rails and agentic operations alongside your core.',
    sub: 'Add cross-border payouts, cards and AI-run back-office workflows without replacing the systems you run on.',
    pains: [['Legacy rails', 'Reach new corridors through one integration.'], ['Operations cost', 'Agents take on coding, matching and exception handling.'], ['Oversight', 'Every agent action is logged, explained and reversible.']],
    products: ['payments', 'ai-financial-management', 'reporting', 'corporate-cards'],
  },
};
export const solutionHref = (name) => {
  const slug = Object.keys(SOLUTION_PAGES).find((k) => SOLUTION_PAGES[k].name === name);
  return slug ? `/solutions/${slug}` : '/solutions';
};

export function Solution({ slug }) {
  const s = SOLUTION_PAGES[slug];
  useReveal(slug);
  if (!s) return null;
  return (
    <main key={slug}>
      <PageHero title={s.headline} sub={s.sub}
        actions={<><a className="x-btn x-btn--dark" href={SIGNUP}>Get started</a><a className="x-btn x-btn--line" href="/contact">Talk to sales</a></>}
        media={<Media kind={s.scene} />} />
      <section className="x-sec"><div className="x-wrap">
        <Head title={`Built for ${s.name.toLowerCase()}.`} lead="The problems we hear most, and how the platform takes them off your plate." />
        <Grid items={s.pains} />
      </div></section>
      <section className="x-sec"><div className="x-wrap">
        <Head title="The modules behind it." lead="Each one runs with its own agent, on one shared ledger." />
        <ProductLinks slugs={s.products} />
      </div></section>
      <Closing />
    </main>
  );
}

export function Solutions() {
  useReveal();
  return (
    <main>
      <PageHero compact title="Solutions for every kind of operator." sub="Remittance, fintech, telecoms, marketplaces and enterprises run their money on Hinstantt. Find the setup that fits yours." />
      <section className="x-sec x-sec--tight"><div className="x-wrap">
        <div className="x-pg-links x-pg-links--2 x-rv">
          {Object.entries(SOLUTION_PAGES).map(([k, s]) => (
            <a key={k} href={`/solutions/${k}`} className="x-pg-link"><span><b>{s.name}</b><small>{s.headline}</small></span><Arrow /></a>
          ))}
        </div>
      </div></section>
      <Closing />
    </main>
  );
}

/* ── Pricing ───────────────────────────────────────────────────────────────── */
// TODO: confirm tier names, inclusions and prices with the business
const TIERS = [
  { name: 'Launch', price: 'Free to open', note: 'Pay only for what you move', cta: ['Get started', SIGNUP],
    items: ['Multi-currency accounts', 'Virtual cards for your team', 'Local and international payouts', 'Expense capture and receipts', 'Email support'] },
  { name: 'Scale', price: 'Custom', note: 'Volume-based pricing', cta: ['Talk to sales', '/contact'], featured: true,
    items: ['Everything in Launch', 'Physical cards and spend policies', 'Agents across every module', 'Accounting sync and auto close', 'Treasury sweeps and yield', 'Priority support'] },
  { name: 'Enterprise', price: 'Custom', note: 'For multi-entity groups', cta: ['Talk to sales', '/contact'],
    items: ['Everything in Scale', 'Multi-entity and consolidation', 'SSO, SCIM and custom roles', 'Dedicated account team', 'Custom SLAs and onboarding'] },
];
export function Pricing() {
  useReveal();
  return (
    <main>
      <PageHero compact title="Pricing that grows with you." sub="Open an account at no cost, then pay for what you use. Larger teams get pricing set to their volume." />
      <section className="x-sec x-sec--tight"><div className="x-wrap">
        <div className="x-tiers x-rv">
          {TIERS.map((t) => (
            <div key={t.name} className={`x-tier ${t.featured ? 'is-featured' : ''}`}>
              <div className="x-tier-h"><span>{t.name}</span>{t.featured && <em>Most popular</em>}</div>
              <b className="x-tier-p">{t.price}</b>
              <small>{t.note}</small>
              <a className={`x-btn ${t.featured ? 'x-btn--dark' : 'x-btn--line'}`} href={t.cta[1]}>{t.cta[0]}</a>
              <ul className="x-checks">{t.items.map((i) => <li key={i}><span className="x-check"><Check /></span>{i}</li>)}</ul>
            </div>
          ))}
        </div>
      </div></section>
      <section className="x-sec"><div className="x-wrap">
        <Head title="Questions about pricing?" lead="See the most common ones answered, or talk to our team about your volumes and corridors.">
          <div className="x-actions"><a className="x-btn x-btn--line" href="/faq">Read the FAQ</a><a className="x-btn x-btn--dark" href="/contact">Talk to sales</a></div>
        </Head>
      </div></section>
      <Closing />
    </main>
  );
}

/* ── Security & compliance ─────────────────────────────────────────────────── */
// TODO: replace with the actual licences, regulators and certifications held
export function Security() {
  useReveal();
  return (
    <main>
      <PageHero title="Security and compliance, built into every flow." sub="Your money moves through licensed partners and regulated rails, with controls and audit trails on every action, including the ones agents take."
        actions={<a className="x-btn x-btn--dark" href="/contact">Request our security pack</a>} media={<Media kind="approve" />} />
      <section className="x-sec"><div className="x-wrap">
        <Head title="How we protect your money and data." />
        <Grid items={[
          ['Encryption everywhere', 'Data is encrypted in transit and at rest, with keys managed in dedicated hardware.'],
          ['Least-privilege access', 'Roles, approvals and limits decide who can see, spend and move money.'],
          ['Every action logged', 'A full audit trail covers people and agents alike, exportable at any time.'],
          ['Agents within policy', 'Agents act only inside the rules you set; anything outside comes to you.'],
          ['Safeguarded funds', 'Client funds are held with regulated banking partners, separate from our own.'],
          ['Monitored 24/7', 'Fraud, sanctions and transaction monitoring run on every payment.'],
        ]} />
      </div></section>
      <section className="x-sec"><div className="x-wrap">
        <Head title="Licensed across our markets." lead="Hinstantt is a financial technology company, not a bank. Regulated services are provided through licensed partners and our own registrations in the markets we serve." />
        <div className="x-pg-chips x-rv">
          {['Money transmission', 'E-money', 'Payment institution', 'Card issuing', 'KYC / KYB', 'AML & sanctions', 'Data protection'].map((c) => <span key={c}><Logomark />{c}</span>)}
        </div>
      </div></section>
      <Closing title="Questions from your security team?" sub="We will walk them through our controls, partners and policies." />
    </main>
  );
}

/* ── Integrations ──────────────────────────────────────────────────────────── */
// TODO: confirm which of these connections are live
const INTEGRATIONS = [
  ['Accounting', ['QuickBooks', 'Xero', 'NetSuite', 'Sage']],
  ['ERP', ['SAP', 'Microsoft Dynamics', 'Oracle']],
  ['Banking', ['Open banking', 'SWIFT', 'Local rails']],
  ['HR & payroll', ['Gusto', 'Deel', 'Rippling']],
  ['Identity', ['Okta', 'Google Workspace', 'Microsoft Entra']],
  ['Communication', ['Slack', 'Microsoft Teams', 'Email']],
];
export function Integrations() {
  useReveal();
  return (
    <main>
      <PageHero compact title="Connects to the tools you already run." sub="Sync your ledger, people and approvals with the systems your finance team lives in, or build your own on our API." />
      <section className="x-sec x-sec--tight"><div className="x-wrap">
        <div className="x-int x-rv">
          {INTEGRATIONS.map(([h, items]) => (
            <div key={h} className="x-int-g"><span>{h}</span><ul>{items.map((i) => <li key={i}>{i}</li>)}</ul></div>
          ))}
        </div>
      </div></section>
      <section className="x-sec"><div className="x-wrap">
        <Head title="Need something else?" lead="Our API and webhooks cover every module, so your team can connect anything.">
          <div className="x-actions"><a className="x-btn x-btn--dark" href="/developers">Explore the API</a></div>
        </Head>
      </div></section>
      <Closing />
    </main>
  );
}

/* ── Developers ────────────────────────────────────────────────────────────── */
// TODO: illustrative request only; match it to the real API reference
const SAMPLE = `curl https://api.hinstantt.com/v1/payouts \\
  -H "Authorization: Bearer $HINSTANTT_KEY" \\
  -d amount=420000 \\
  -d currency=GBP \\
  -d recipient=rcp_8Fq2Lw \\
  -d reference="Invoice INV-2051"`;
export function Developers() {
  useReveal();
  return (
    <main>
      <PageHero title="Build on the Finance OS." sub="One API for accounts, cards, payouts, treasury and ledger, with webhooks for every event and a sandbox to try it all."
        actions={<><a className="x-btn x-btn--dark" href={SIGNUP}>Get API keys</a><a className="x-btn x-btn--line" href="/contact">Talk to an engineer</a></>} />
      <section className="x-sec x-sec--tight"><div className="x-wrap">
        <div className="x-dev x-rv">
          <div className="x-dev-copy">
            <h2 className="x-h3">Send a payout in one call.</h2>
            <p className="x-lead">Pick the amount, currency and recipient. The Payments agent chooses the rail, and a webhook tells you when it settles.</p>
            <ul className="x-checks">
              {['REST API with predictable resources', 'Webhooks for every money movement', 'Sandbox with test balances', 'Idempotency keys on every write'].map((i) => <li key={i}><span className="x-check"><Check /></span>{i}</li>)}
            </ul>
          </div>
          <pre className="x-code" aria-label="Example request"><code>{SAMPLE}</code></pre>
        </div>
      </div></section>
      <section className="x-sec"><div className="x-wrap">
        <Head title="Everything you need to ship." />
        <Grid items={[['Accounts & balances', 'Open multi-currency accounts and read balances in real time.'], ['Cards', 'Issue virtual and physical cards with spend rules per card.'], ['Payouts', 'Pay recipients in 100+ markets on local rails.'], ['Treasury', 'Move funds between balances, sweeps and yield.'], ['Ledger', 'Read every transaction, coded and reconciled.'], ['Webhooks', 'Get notified of every event as it happens.']]} />
      </div></section>
      <Closing title="Start building today." sub="Create an account to get sandbox keys in minutes." />
    </main>
  );
}

/* ── Customers ─────────────────────────────────────────────────────────────── */
// TODO: replace with named, approved customer stories and real figures
const STORIES = [
  ['A remittance platform', 'Lagos · London', 'Cut payout times across West African corridors by routing each transfer to the fastest local rail.', 'payments'],
  ['A B2B marketplace', 'Nairobi', 'Pays thousands of suppliers a month in their own currency, reconciled before month end.', 'invoicing-billing'],
  ['A fintech scale-up', 'Toronto · Lagos', 'Issued cards to every team with spend policies enforced at the swipe.', 'corporate-cards'],
  ['A multi-entity group', 'Riga · New York', 'Closes the books across five entities in days instead of weeks.', 'accounting'],
];
export function Customers() {
  useReveal();
  return (
    <main>
      <PageHero compact title="15,000+ businesses run their finance on Hinstantt." sub="From remittance platforms to multi-entity groups, here is how operators use agents to move faster." />
      <section className="x-sec x-sec--tight"><div className="x-wrap">
        <div className="x-stories x-rv">
          {STORIES.map(([who, where, what, slug]) => (
            <a key={who} href={productHref(PRODUCTS[slug].name)} className="x-story">
              <span className="x-story-m"><Logomark /></span>
              <h3>{who}</h3>
              <small>{where}</small>
              <p>{what}</p>
              <span className="x-tlink">{PRODUCTS[slug].name} <Arrow /></span>
            </a>
          ))}
        </div>
      </div></section>
      <Closing title="Become our next story." />
    </main>
  );
}

/* ── Careers ───────────────────────────────────────────────────────────────── */
// TODO: confirm the careers inbox and list live roles
const TEAMS = [['Engineering', 'Build the rails, ledger and agents behind global money.'], ['Product & design', 'Shape how finance teams work with agents every day.'], ['Compliance & risk', 'Keep money safe and regulators confident in every market.'], ['Go-to-market', 'Bring the Finance OS to operators across continents.']];
export function Careers() {
  useReveal();
  return (
    <main>
      <PageHero title="Come build with us." sub="We are a remote-first team across New York, Toronto, London, Riga and Lagos, building the operating system for global money."
        actions={<a className="x-btn x-btn--dark" href="mailto:careers@hinstantt.com?subject=Careers">Send us your CV</a>} media={<Media kind="feed" />} />
      <section className="x-sec"><div className="x-wrap">
        <Head title="Teams we are growing." lead="No role that fits? Write to us anyway and tell us what you would build." />
        <div className="x-jobs x-rv">
          {TEAMS.map(([t, d]) => (
            <a key={t} className="x-job" href={`mailto:careers@hinstantt.com?subject=${encodeURIComponent(`Careers · ${t}`)}`}>
              <b>{t}</b><span>{d}</span><Arrow />
            </a>
          ))}
        </div>
      </div></section>
      <Closing title="Build the future of money with us." sub="Remote-first, across five cities and growing." />
    </main>
  );
}

/* ── FAQ ───────────────────────────────────────────────────────────────────── */
const FAQS = [
  ['What is Hinstantt?', 'Hinstantt is the Finance OS for global operators: cards, payments, treasury and accounting on one platform, with AI agents doing the work in every module.'],
  ['Is Hinstantt a bank?', 'No. Hinstantt is a financial technology company. Regulated services are provided through licensed partners and banks, and client funds are held with them.'],
  ['Which markets do you support?', 'You can pay into and out of 100+ markets across Africa, Europe, the Americas and the Middle East. Ask us about a specific corridor.'],
  ['What do the agents actually do?', 'They code transactions, enforce spend policy, route payments, reconcile accounts and flag anything unusual. Within your rules they act; outside them, they ask you.'],
  ['Can I control what agents do?', 'Yes. You set the limits, approvals and policies. Every agent action is logged and can be reviewed or reversed.'],
  ['How long does it take to get started?', 'Most businesses open an account in minutes. Larger teams usually go live within a few weeks, with help from our onboarding team.'],
  ['Does it work with my accounting software?', 'Hinstantt syncs with popular accounting and ERP tools, and our API covers anything else. See the integrations page for details.'],
  ['How is my data protected?', 'Data is encrypted in transit and at rest, access is role-based, and every action is recorded in an audit trail. Our security page has more.'],
  ['How much does it cost?', 'Opening an account is free, and you pay for what you use. Growing and multi-entity teams get pricing set to their volume.'],
];
export function Faq() {
  useReveal();
  return (
    <main>
      <PageHero compact title="Frequently asked questions." sub="Everything people usually ask before they switch. Still curious? Our team is one email away." />
      <section className="x-sec x-sec--tight"><div className="x-wrap">
        <div className="x-faq x-rv">
          {FAQS.map(([q, a], i) => (
            <details key={q} open={i === 0}>
              <summary><span>{q}</span><i aria-hidden="true" /></summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div></section>
      <Closing title="Still have questions?" sub="Talk to our team about your business, markets and volumes." />
    </main>
  );
}

/* ── Resources ─────────────────────────────────────────────────────────────── */
// TODO: placeholder guides until real articles are written
const GUIDES = [
  ['Guide', 'Paying suppliers across Africa: a corridor-by-corridor playbook', 'routes', 'dark'],
  ['Guide', 'How agents close the books in days, not weeks', 'ledger', 'light'],
  ['Report', 'The state of cross-border finance for operators', 'bars', 'light'],
  ['Guide', 'Setting spend policy that enforces itself', 'cards', 'dark'],
  ['Product', 'Treasury sweeps: putting idle cash to work', 'stacks', 'dark'],
  ['Guide', 'Stablecoin rails for B2B payments, explained', 'signal', 'light'],
];
export function Resources() {
  useReveal();
  return (
    <main>
      <PageHero compact title="Resources for modern finance teams." sub="Guides, reports and product deep dives on moving money and running finance across markets." />
      <section className="x-sec x-sec--tight"><div className="x-wrap">
        <div className="x-res x-rv">
          {GUIDES.map(([tag, t, kind, tone]) => (
            <a key={t} className="x-res-c" href="/contact">
              <div className="x-res-m"><Scene kind={kind} tone={tone === 'light' ? 'light' : undefined} /></div>
              <small>{tag} · Coming soon</small>
              <h3>{t}</h3>
            </a>
          ))}
        </div>
      </div></section>
      <Closing />
    </main>
  );
}
