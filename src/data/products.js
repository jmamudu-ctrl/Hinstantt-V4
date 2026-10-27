// Content for every sub-product page. One entry per slug.
// Keep facts aligned to real product mechanics; visuals are placeholders the team fills in.

export const PRODUCTS = {
  'payments': {
    name: 'Payments', eyebrow: 'Move money', ic: 'payments', short: 'Pay in and out, 100+ markets',
    headline: 'Payments that route themselves to 100+ markets.',
    sub: 'Collect and disburse from one platform. The Payments agent picks the fastest, cheapest rail for every transfer and runs accounts payable for you, while you approve what matters.',
    capabilities: [
      { t: 'Pay-in and pay-out', d: 'Collect and disburse from one platform, on the rail that fits each market.' },
      { t: 'Accounts payable', d: 'Bills parsed, approvals routed and pay runs scheduled for you.' },
      { t: '100+ markets', d: 'Reach payees across currencies and rails without leaving Hinstantt.' },
    ],
    spotlight: {
      headline: 'One platform for money in and out.',
      body: 'Collect and disburse across rails and markets, with accounts payable built in.',
      bullets: ['Pay-in and pay-out from one place', 'Bills parsed, approved and scheduled', 'Reach 100+ markets on the right rail'],
    },
    agent: { name: 'Payments agent', line: 'Routes every payment to the cheapest, fastest rail, automatically.' },
    related: ['accounts', 'treasury', 'invoicing-billing'],
  },

  'corporate-cards': {
    name: 'Corporate Cards', eyebrow: 'Spend', ic: 'cards', short: 'Virtual and physical issuance',
    headline: 'Cards with an agent at every swipe.',
    sub: 'Issue virtual and physical cards in seconds. The Policy agent enforces limits and rules the moment a card is used, and codes the spend before the receipt lands.',
    capabilities: [
      { t: 'Virtual and physical', d: 'Issue either in seconds and freeze any card instantly.' },
      { t: 'Controls at authorization', d: 'Per-card limits, categories and policies enforced at the swipe.' },
      { t: 'Real-time visibility', d: 'Every transaction coded and visible the moment it happens.' },
    ],
    spotlight: {
      headline: 'Controls at the swipe, not the statement.',
      body: 'Limits, policies and freezes are enforced the moment a card is used, so spend stays in bounds.',
      bullets: ['Issue virtual and physical cards in seconds', 'Per-card limits, categories and freezes', 'Transactions coded and visible in real time'],
    },
    agent: { name: 'Policy agent', line: 'Reads every transaction against your rules and enforces them at authorization.' },
    related: ['expense', 'payments', 'accounting'],
  },

  'expense': {
    name: 'Expense', eyebrow: 'Spend', ic: 'expense', short: 'Submit to reimbursement',
    headline: 'Expenses that file themselves.',
    sub: 'The Expense agent reads the receipt, checks it against policy and codes it on submission, so the loop from receipt to reimbursement runs on its own.',
    capabilities: [
      { t: 'Receipt capture', d: 'Snap or forward a receipt and let AI handle the rest.' },
      { t: 'Policy at submission', d: 'Out-of-policy spend is flagged before it is approved.' },
      { t: 'Fast reimbursement', d: 'Approved expenses are reimbursed without the back-and-forth.' },
    ],
    spotlight: {
      headline: 'From receipt to reimbursed.',
      body: 'Capture the receipt and the rest is automatic: coded, checked and reimbursed.',
      bullets: ['Snap or forward receipts from anywhere', 'Policy checked at submission, not after', 'Approved expenses reimbursed on schedule'],
    },
    agent: { name: 'Expense agent', line: 'Codes receipts and checks them against policy on submission.' },
    related: ['corporate-cards', 'travel', 'accounting'],
  },

  'travel': {
    name: 'Travel', eyebrow: 'Spend', ic: 'travel', short: 'Book and track travel',
    headline: 'Travel that books itself in policy.',
    sub: 'Request, approve, book and track every trip in one flow. The Travel agent keeps each booking inside policy and wires the spend straight into Expense and Payments.',
    capabilities: [
      { t: 'Request and approve', d: 'Trips approved against policy before anything is booked.' },
      { t: 'Book and track', d: 'Flights and stays booked and tracked in one itinerary view.' },
      { t: 'Wired to spend', d: 'Connected to Expense and Payments from end to end.' },
    ],
    spotlight: {
      headline: 'Travel that books itself into the books.',
      body: 'Trips are approved, booked and tracked, then flow straight into expense and payment.',
      bullets: ['Policy-checked before booking', 'Flights and stays in one itinerary view', 'Connected to Expense and Payments end to end'],
    },
    agent: { name: 'Travel agent', line: 'Keeps every trip inside policy and in sync with spend.' },
    related: ['expense', 'corporate-cards', 'payments'],
  },

  'accounts': {
    name: 'Accounts', eyebrow: 'Move money', ic: 'accounts', short: 'Multi-currency business accounts',
    headline: 'Every currency in one account, routed for you.',
    sub: 'Hold USD, EUR, GBP and more under one verified business identity. The Accounts agent sends each payment over the right rail for where it is going.',
    capabilities: [
      { t: 'Multi-currency', d: 'Hold USD, EUR, GBP and more in a single place.' },
      { t: 'One business identity', d: 'Every currency sits under one verified entity.' },
      { t: '6+ payment rails', d: 'Send and receive on the rail that fits each market.' },
    ],
    spotlight: {
      headline: 'One identity, every currency.',
      body: 'Open multi-currency accounts under a single verified business identity, ready to move money on day one.',
      bullets: ['Hold USD, EUR, GBP and more', 'Support for 6+ payment rails', 'Local details where your customers and suppliers are'],
    },
    agent: { name: 'Accounts agent', line: 'Routes each payment to the right rail for the destination.' },
    related: ['payments', 'treasury', 'stablecoin-ramp'],
  },

  'treasury': {
    name: 'Treasury', eyebrow: 'Move money', ic: 'treasury', short: 'Cash management and yield',
    headline: 'Cash that puts itself to work.',
    sub: 'See every balance across banks and currencies in one position. The Treasury agent forecasts your runway, flags shortfalls and sweeps idle cash into yield.',
    capabilities: [
      { t: 'Multi-bank view', d: 'Every bank and balance, in one position.' },
      { t: 'AI cash forecasting', d: 'See where your cash is heading before it gets there.' },
      { t: 'Yield-bearing accounts', d: 'Put idle balances to work without locking them up.' },
    ],
    spotlight: {
      headline: 'Cash, working as hard as you do.',
      body: 'See every balance across banks and currencies, and let idle cash earn while staying available.',
      bullets: ['One position across every bank and currency', 'AI forecasts your runway and shortfalls', 'Yield on balances you are not using'],
    },
    agent: { name: 'Treasury agent', line: 'Forecasts your cash position and flags shortfalls daily.' },
    related: ['accounts', 'payments', 'reporting'],
  },

  'stablecoin-ramp': {
    name: 'Stablecoin Ramp', eyebrow: 'Move money', ic: 'stablecoin', short: 'Fiat and stablecoin, on and off',
    headline: 'Dollars to stablecoins, at the best rate.',
    sub: 'Hold, send and convert USDC and EURC as a first-class account. The Ramp agent converts at the best available rate whenever you move funds.',
    capabilities: [
      { t: 'On and off ramp', d: 'Move between fiat and stablecoin in a tap.' },
      { t: 'Hold and convert', d: 'USDC and EURC treated like any other balance.' },
      { t: 'Send anywhere', d: 'Move stablecoin to any wallet or counterparty.' },
    ],
    spotlight: {
      headline: 'Fiat and stablecoin, one account.',
      body: 'Move between dollars and stablecoins in a tap, and treat USDC and EURC like any other balance.',
      bullets: ['On and off ramp between fiat and stablecoin', 'Hold, send and convert USDC and EURC', 'Move to any wallet or counterparty'],
    },
    agent: { name: 'Ramp agent', line: 'Converts at the best available rate when you move funds.' },
    related: ['accounts', 'payments', 'treasury'],
  },

  'accounting': {
    name: 'Accounting', eyebrow: 'Operate', ic: 'accounting', short: 'AI ledger, auto statements',
    headline: 'Close the books while the team sleeps.',
    sub: 'The Close agent classifies every transaction, reconciles accounts and syncs your ERP in real time, so the Balance Sheet, P&L and Cash Flow are ready before the period ends.',
    capabilities: [
      { t: 'AI-classified ledger', d: 'Every transaction categorized and coded to the right account.' },
      { t: 'Real-time ERP sync', d: 'Two-way sync with NetSuite, QuickBooks, Xero and Sage.' },
      { t: 'Statements on demand', d: 'Balance Sheet, P&L, Cash Flow and Trial Balance, ready to review.' },
    ],
    spotlight: {
      headline: 'Month-end, minus the month-end.',
      body: 'Transactions sync as they happen and post to the right accounts, so closing is a review, not a scramble.',
      bullets: ['Two-way ERP sync with the tools you use', 'Statements generated automatically', 'Variance explained and accruals drafted for you'],
    },
    agent: { name: 'Close agent', line: 'Reconciles accounts and drafts statements before the period ends.' },
    related: ['reporting', 'payments', 'treasury'],
  },

  'procurement': {
    name: 'Procurement', eyebrow: 'Operate', ic: 'procurement', short: 'Request to three-way match',
    headline: 'Purchases matched before you look.',
    sub: 'Request, approve, raise the PO and receive in one flow. The Procurement agent runs the three-way match and flags any mismatch, so spend is controlled before it happens.',
    capabilities: [
      { t: 'Requests and approvals', d: 'Route every request through the right approvers by policy.' },
      { t: 'Purchase orders', d: 'Issue and track POs against budgets in one place.' },
      { t: 'Three-way match', d: 'PO, receipt and invoice matched before anything is paid.' },
    ],
    spotlight: {
      headline: 'Control spend before it happens.',
      body: 'Every request runs through policy and budget before a purchase order is ever raised.',
      bullets: ['Approval routes by amount, team and vendor', 'Purchase orders tracked against budget', 'Three-way match across PO, receipt and invoice'],
    },
    agent: { name: 'Procurement agent', line: 'Runs the three-way match and flags any mismatch.' },
    related: ['payments', 'invoicing-billing', 'expense'],
  },

  'invoicing-billing': {
    name: 'Invoicing & Billing', eyebrow: 'Operate', ic: 'Invoiceandbilling', short: 'Invoices, billing, collection',
    headline: 'Get paid faster, on autopilot.',
    sub: 'Create invoices and payment links and run recurring billing. The Billing agent chases what is unpaid and reconciles payments as they land.',
    capabilities: [
      { t: 'Invoices and links', d: 'Create invoices and shareable payment links in seconds.' },
      { t: 'Recurring billing', d: 'Subscriptions and schedules handled for you.' },
      { t: 'Auto reconciliation', d: 'Payments matched to invoices automatically.' },
    ],
    spotlight: {
      headline: 'Revenue without the chasing.',
      body: 'Send invoices and payment links, run recurring billing, and let reconciliation happen on its own.',
      bullets: ['Invoices and shareable payment links', 'Recurring and scheduled billing', 'Payments auto-matched to invoices'],
    },
    agent: { name: 'Billing agent', line: 'Chases unpaid invoices and reconciles payments as they arrive.' },
    related: ['payments', 'accounting', 'reporting'],
  },


  'reporting': {
    name: 'Reporting', eyebrow: 'Intelligence', ic: 'reporting', short: 'Spend and revenue insights',
    headline: 'Numbers that explain themselves.',
    sub: 'Spend, revenue and customer health in one place. The Insight agent watches every number and tells you what changed and why, before you go looking.',
    capabilities: [
      { t: 'Spend reporting', d: 'Slice spend by team, vendor, category or entity.' },
      { t: 'Revenue intelligence', d: 'Track revenue, MRR and what is moving the numbers.' },
      { t: 'Customer health', d: 'Spot churn risk and expansion early.' },
    ],
    spotlight: {
      headline: 'The numbers, explained.',
      body: 'Reporting does not just show the data, it tells you what moved and why.',
      bullets: ['Spend by team, vendor, category and entity', 'Revenue, MRR and customer-health trends', 'AI insights without building a single report'],
    },
    agent: { name: 'Insight agent', line: 'Watches the numbers and surfaces what changed before you ask.' },
    related: ['accounting', 'treasury', 'ai-financial-management'],
  },

  'ai-financial-management': {
    name: 'AI Financial Management', eyebrow: 'Intelligence', ic: 'AI', short: 'AI cockpit across modules',
    headline: 'An AI finance team that never clocks out.',
    sub: 'One cockpit pulls every module into a single financial picture. AI agents work inside each one around the clock, so your team owns the decisions and skips the busywork.',
    capabilities: [
      { t: 'Financial dashboard', d: 'Every module rolled into one live cockpit.' },
      { t: 'Agents in every module', d: 'AI working inside cards, payments, close and more.' },
      { t: 'Always on', d: 'Reconciles, flags and forecasts around the clock.' },
    ],
    spotlight: {
      headline: 'An AI cockpit for the whole back office.',
      body: 'Every module rolls into one live financial dashboard, with agents working inside each one.',
      bullets: ['One dashboard across every module', 'Agents reconcile, flag and forecast 24/7', 'Ask a question, get an answer from your own data'],
    },
    agent: { name: 'Finance agents', line: 'Work inside every module, 24/7, so your team owns the decisions.' },
    related: ['reporting', 'accounting', 'treasury'],
  },
};

// Nav-order list of slugs.
export const PRODUCT_ORDER = [
  'corporate-cards', 'expense', 'travel',
  'accounts', 'payments', 'treasury', 'stablecoin-ramp',
  'accounting', 'procurement', 'invoicing-billing',
  'reporting', 'ai-financial-management',
];

// Map the various display names used in nav / footer to a slug.
const NAME_TO_SLUG = {
  'Corporate Cards': 'corporate-cards', 'Expense': 'expense', 'Travel': 'travel',
  'Accounts': 'accounts', 'Payments': 'payments', 'Treasury': 'treasury',
  'Stablecoin Ramp': 'stablecoin-ramp', 'Stablecoin On and Off Ramp': 'stablecoin-ramp',
  'Accounting': 'accounting', 'Procurement': 'procurement',
  'Invoicing & Billing': 'invoicing-billing',
  'Reporting': 'reporting', 'AI Financial Management': 'ai-financial-management', 'AI Finance': 'ai-financial-management',
};
export const productSlug = (name) => NAME_TO_SLUG[name] || null;
export const productHref = (name) => {
  const s = NAME_TO_SLUG[name];
  return s ? `/products/${s}` : '#';
};
