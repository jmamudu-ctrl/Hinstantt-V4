import React from 'react';
import FlutedBackground from '../components/FlutedBackground.jsx';
import { HERO_LOOKS } from '../components/Kit.jsx';
import './Legal.css';

/* ----------------------------------------------------------------------------
   Hinstantt legal documents. Source of truth: counsel-provided Terms of Service
   and Privacy Policy for Hinstantt Inc (a Montana corporation). Rendered as
   structured data consumed by the renderer below.
---------------------------------------------------------------------------- */

const PRIVACY = {
  "key": "privacy",
  "title": "Privacy Policy",
  "updated": "10 June 2026",
  "intro": "This Privacy Policy explains how Hinstantt Inc handles personal information when you use the Hinstantt platform and related services.",
  "sections": [
    {
      "id": "introduction-and-scope",
      "h": "Introduction and scope",
      "body": [
        "1.1 This Privacy Policy explains how Hinstantt Inc, a Montana corporation (“Hinstantt,” “we,” “us,” or “our”), handles personal information when you use the Hinstantt platform and related services (the “Services”), visit our websites, or otherwise interact with us. It applies to business customers, their authorized users, beneficial owners and officers, and other individuals whose information we process in connection with the Services.",
        "1.2 The Services are for business use. Where we provide Services to a business customer, that customer is responsible for its own privacy practices toward its personnel and counterparties. This Policy does not apply to third-party products or services that you connect to the Services, which are governed by their own terms and policies."
      ]
    },
    {
      "id": "controller-and-processor",
      "h": "Our role: controller and processor",
      "body": [
        "2.1 Data-protection laws distinguish between a controller (which determines the purposes and means of processing) and a processor (which processes on another’s behalf). Hinstantt acts as a controller for purposes such as account administration, identity verification, fraud and financial-crime prevention, security, regulatory compliance, and operating our business. For these purposes, the controller is Hinstantt Inc unless we state otherwise.",
        "2.2 Where we process personal information on a business customer’s behalf and on its instructions (for example, data about that customer’s employees or contacts handled through the Platform), we act as a processor and that customer is the controller. In those cases, the customer’s instructions and our data-processing terms govern, and individuals should direct requests to that customer. Our processor commitments are set out in our Data Processing Addendum."
      ]
    },
    {
      "id": "information-we-collect",
      "h": "Personal information we collect",
      "body": [
        "Depending on how you interact with us, we may collect the following categories of personal information:",
        {
          "ul": [
            "Identity and verification data: name, date of birth, nationality, government-issued identifiers, photographs of identity documents, and, for liveness and identity checks, biometric data.",
            "Business and relationship data: role, ownership and control information for beneficial owners and officers, and business contact details.",
            "Contact and account data: email, phone number, credentials, and communication preferences.",
            "Financial and transaction data: account and card details, balances, transactions, payment instructions, counterparties, payroll and expense data, and stablecoin and wallet information.",
            "Device and usage data: IP address, device and browser identifiers, log data, and how you use the Services.",
            "Communications: records of your communications with us, including support interactions, which may be recorded for quality, training, and compliance.",
            "Data from third parties: information from identity, credit, sanctions and watch-list, fraud-prevention, and verification providers, from Partners, and from public sources, used to verify you and to meet our legal obligations."
          ]
        }
      ]
    },
    {
      "id": "how-and-why-we-use",
      "h": "How and why we use personal information",
      "body": [
        "We use personal information to provide and operate the Services, verify identity and onboard customers, prevent and detect fraud and financial crime, process payments and other transactions, provide support, secure our systems, develop and improve the Services, send service and (where permitted) marketing communications, and comply with legal and regulatory obligations.",
        {
          "h3": "Legal bases, where required"
        },
        "United States privacy laws generally do not require a specific legal basis to process personal information. Where a data-protection law that applies to you does require one (for example, the EU or UK GDPR or a similar law), we rely on one or more of the following: performance of a contract with you or your organization; compliance with a legal obligation (for example, AML, KYC, sanctions, and tax obligations); our legitimate interests (for example, securing the Services, preventing fraud, and operating and improving our business), balanced against your rights; and your consent where required (for example, for certain biometric processing and direct marketing), which you may withdraw at any time."
      ]
    },
    {
      "id": "biometric-and-sensitive",
      "h": "Biometric and sensitive data",
      "body": [
        "5.1 To verify identity and prevent fraud, our verification providers may process biometric data, such as a facial scan derived from a selfie or video, to confirm that you are a real person and match you to your identity document. Biometric data and other special-category or sensitive data receive heightened protection.",
        "5.2 Where required, we process biometric data on the basis of your explicit consent or another lawful basis, apply additional safeguards, limit access, and retain biometric data only as long as necessary for the verification purpose and any legal retention requirement, after which it is deleted or de-identified."
      ]
    },
    {
      "id": "automated-decisions-ai",
      "h": "Automated decision-making and AI",
      "body": [
        "6.1 We use automated processing, including AI-assisted models, in areas such as identity verification, fraud and financial-crime monitoring, risk scoring, and transaction screening. Some of these processes can produce decisions, such as declining onboarding or holding a transaction, that may be based on automated processing.",
        "6.2 Where Applicable Law gives you rights in relation to decisions based solely on automated processing that produce legal or similarly significant effects, you may request human review, express your point of view, and contest the decision, subject to limits where the processing is necessary for a contract, required by law, or based on your consent, or where disclosure would compromise fraud prevention or security."
      ]
    },
    {
      "id": "how-we-share",
      "h": "How we share personal information",
      "body": [
        "We share personal information with:",
        {
          "ul": [
            "Partners and financial institutions: partner banks, card issuers, payment processors, and similar providers that deliver regulated services.",
            "Service providers and processors: identity, fraud, AML and sanctions screening, cloud hosting, analytics, and support vendors, under contracts that restrict their use of the data.",
            "The business customer: where you are an authorized user, beneficial owner, or worker, we share relevant information with the customer organization that controls the account.",
            "Authorities and for legal reasons: regulators, law enforcement, courts, and others, where required by law or to establish, exercise, or defend legal claims, or to prevent harm or financial crime.",
            "Corporate transactions: acquirers or successors in a merger, acquisition, financing, or sale of assets, subject to appropriate safeguards."
          ]
        },
        "We do not sell personal information for money. Where certain laws define “sale” or “sharing” broadly (for example, for cross-context behavioral advertising), our practices and any opt-out are described under Your rights and choices."
      ]
    },
    {
      "id": "international-transfers",
      "h": "International data transfers",
      "body": [
        "8.1 We operate across multiple countries, so personal information may be transferred to, and processed in, countries other than your own, including the United States, that may have different data-protection standards.",
        "8.2 Where we transfer personal information across borders, we use a lawful transfer mechanism, which may include the European Commission’s Standard Contractual Clauses, the UK International Data Transfer Agreement or Addendum, adequacy decisions where available, and other transfer mechanisms required under applicable data-protection laws. You may request information about these safeguards using the contact details below."
      ]
    },
    {
      "id": "data-retention",
      "h": "Data retention",
      "body": [
        "9.1 We keep personal information only as long as necessary for the purposes described in this Policy, including providing the Services, and to meet legal, regulatory, accounting, and reporting obligations, resolve disputes, and enforce our agreements. Retention periods vary by data type and purpose.",
        "9.2 AML, KYC, and transaction records are typically retained for a minimum period of five years after the end of the customer relationship or the transaction, as required by Applicable Law."
      ]
    },
    {
      "id": "how-we-protect",
      "h": "How we protect personal information",
      "body": [
        "We maintain technical and organizational measures designed to protect personal information against unauthorized access, loss, misuse, and alteration, including encryption in transit and at rest, access controls, monitoring, and staff training. No system is completely secure, and we cannot guarantee absolute security."
      ]
    },
    {
      "id": "your-rights",
      "h": "Your rights and choices",
      "body": [
        "Subject to Applicable Law and to verification of your identity, you may have rights to access, correct, delete, port, restrict, or object to the processing of your personal information, and to withdraw consent. To exercise any right, use the contact details below. We will not discriminate against you for exercising your rights. If you are an authorized user or worker, some requests may need to be directed to the business customer that controls your information.",
        {
          "h3": "United States (baseline)"
        },
        "Hinstantt is a United States company, and US privacy law is our baseline. There is no single comprehensive US federal privacy law; instead, a growing set of state laws grants residents privacy rights. If you are a California resident, you have rights under the California Consumer Privacy Act as amended by the California Privacy Rights Act (CCPA/CPRA), including rights to know, access, correct, and delete personal information, to opt out of any “sale” or “sharing” of personal information, to limit the use of sensitive personal information, and to non-discrimination. Residents of other US states with comprehensive privacy laws have comparable rights, which we honor where they apply. Information processed in a business-to-business or employment context may be treated differently under some of these laws.",
        {
          "h3": "Other jurisdictions"
        },
        "Because the Services are used internationally, individuals located outside the United States may have rights under their local data-protection laws, such as the EU or UK General Data Protection Regulation and various national laws. Where such a law applies to our processing of your personal information, we honor the rights it grants, including, as applicable, rights to access, rectification, erasure, restriction, objection, and portability, rights relating to automated decision-making, and the right to lodge a complaint with your local supervisory or data-protection authority."
      ]
    },
    {
      "id": "breach-notification",
      "h": "Data breach notification",
      "body": [
        "We maintain procedures to detect, investigate, and respond to personal-data breaches. Where required by Applicable Law, we will notify the relevant regulator and affected individuals within the timeframes the law requires (for example, without undue delay and, where feasible, within 72 hours of becoming aware under the EU and UK GDPR), and within the timeframes required by other Applicable Law."
      ]
    },
    {
      "id": "cookies",
      "h": "Cookies and similar technologies",
      "body": [
        "We use cookies and similar technologies to operate, secure, and analyze the Services, and, where permitted and with consent where required, for analytics and marketing. You can manage preferences through our cookie controls and your browser settings."
      ]
    },
    {
      "id": "children",
      "h": "Children",
      "body": [
        "The Services are intended for businesses and their authorized users and are not directed to children. We do not knowingly collect personal information from children below the age of majority for use of the Services."
      ]
    },
    {
      "id": "changes-and-contact",
      "h": "Changes to this Policy and how to contact us",
      "body": [
        "15.1 Changes. We may update this Policy to reflect changes in our practices or in Applicable Law. We will post the updated Policy with a new effective date and, where required, provide additional notice.",
        "15.2 Contact. For privacy questions or to exercise your rights, contact us at support@hinstantt.com. Our Data Protection Officer (where required) can be reached at dpo@hinstantt.com. Our postal address is 447 Broadway, 2nd Floor, #1314, New York, NY 10013."
      ]
    }
  ]
};

const TERMS = {
  "key": "terms",
  "title": "Terms of Service",
  "updated": "10 June 2026",
  "intro": "These Terms of Service form a binding contract between Hinstantt Inc and the business that uses the Services.",
  "sections": [
    {
      "id": "the-agreement",
      "h": "The agreement and the parties",
      "body": [
        "1.1 These Terms of Service, together with all documents they incorporate by reference (collectively, the “Agreement”), form a binding contract between Hinstantt Inc, a corporation organized under the laws of the State of Montana, United States, with its principal place of business at 447 Broadway, 2nd Floor, #1314, New York, NY 10013 (“Hinstantt,” “we,” “us,” or “our”), and the business entity that registers for or uses the Services (the “Customer,” “you,” or “your”).",
        "1.2 Hinstantt provides a financial operations technology platform (the “Platform”). Hinstantt is not a bank. Regulated banking, money transmission, custody, card issuance, payment processing, and similar regulated activities are provided by Hinstantt’s licensed financial institution partners and other service providers (each a “Partner”), as further described in Section 5. Your use of any regulated service is also governed by the applicable Partner’s own terms, which are incorporated into this Agreement by reference.",
        "1.3 This Agreement consists of (a) these master Terms of Service; (b) the service-specific terms in Sections 7 to 19 and any further service-specific terms, product schedules, or order forms we make available (the “Service-Specific Terms”); (c) the Privacy Policy; (d) the Fee Schedule; (e) any applicable Partner terms and disclosures; and (f) any acceptable use, program, or supplemental policies we publish. If there is a conflict, a signed order form controls over Service-Specific Terms, which control over these master Terms, except where a Partner’s terms or applicable law require otherwise.",
        "1.4 By clicking to accept, signing an order form, or accessing or using the Services, the individual doing so represents that they are authorized to bind the Customer, and the Customer agrees to this Agreement. If you do not agree, you must not use the Services."
      ]
    },
    {
      "id": "definitions",
      "h": "Definitions",
      "body": [
        "Capitalized terms have the meanings given where they first appear or as set out below.",
        {
          "ul": [
            "“Authorized User” means an individual the Customer permits to access the Platform on its behalf.",
            "“Services” means the Platform and all features, modules, and services Hinstantt makes available, including those described in Sections 7 to 19.",
            "“Customer Funds” means funds held for the Customer through a Partner in connection with the Services.",
            "“Customer Data” means data the Customer or its Authorized Users submit to or generate through the Platform.",
            "“Applicable Law” means all laws, rules, regulations, and network or scheme rules applicable to a party or to the Services."
          ]
        }
      ]
    },
    {
      "id": "eligibility",
      "h": "Eligibility, business use and verification",
      "body": [
        "3.1 The Services are offered solely to businesses and their Authorized Users for business purposes. The Services are not offered to consumers and may not be used for personal, family, or household purposes. Because the Services are commercial, certain consumer financial protections do not apply to your use of them, including, in the United States, the Electronic Fund Transfer Act and Regulation E, and corresponding consumer-specific payment network and clearing-house rules.",
        "3.2 To use the Services, the Customer must be a duly formed and validly existing legal entity, and each Authorized User must be at least 18 years old and authorized by the Customer.",
        "3.3 As a condition of access, the Customer and its beneficial owners, directors, officers, and Authorized Users must complete know-your-business (KYB) and know-your-customer (KYC) verification, and ongoing due diligence, as required by Hinstantt and its Partners under anti-money-laundering (AML), counter-terrorist-financing (CTF), and sanctions laws. You agree to provide accurate, complete and current information and supporting documentation on request, and to keep it updated. We and our Partners may verify this information through third-party sources.",
        "3.4 You represent that you, your beneficial owners, and your Authorized Users are not subject to sanctions administered by the U.S. Office of Foreign Assets Control (OFAC), the United Nations, the European Union, the United Kingdom, or other applicable authorities, are not located in a comprehensively sanctioned jurisdiction, and are not otherwise prohibited from using the Services. We may screen you and your transactions against sanctions and watch lists on an ongoing basis.",
        "3.5 We and our Partners may decline to onboard, may limit, or may offboard any Customer or Authorized User, in our or their discretion, including where verification cannot be completed or where required by Applicable Law."
      ]
    },
    {
      "id": "accounts-security",
      "h": "Accounts, Authorized Users, and security",
      "body": [
        "4.1 The Customer is responsible for designating administrators, configuring roles and permissions, and managing its Authorized Users. The Customer is responsible for all activity conducted through its account and by its Authorized Users, whether or not authorized, to the extent permitted by Applicable Law.",
        "4.2 You must keep credentials confidential, use available security controls (including multi-factor authentication), and notify us promptly at support@hinstantt.com of any suspected compromise or unauthorized use. You will not share credentials or permit access by anyone other than your Authorized Users.",
        "4.3 You consent to receive communications, disclosures, notices, and agreements electronically, including by email, in-Platform message, and SMS or other messaging where you provide a number. Electronic delivery has the same legal effect as writing. You may withdraw consent for non-essential communications, but doing so may prevent you from using the Services."
      ]
    },
    {
      "id": "partners-custody",
      "h": "Financial institution partners, custody of funds, and safeguarding",
      "body": [
        "5.1 Hinstantt provides technology and program-management services and acts as an interface to its Partners. Hinstantt does not take deposits, does not hold Customer Funds as a principal, and does not provide banking services in its own name.",
        "5.2 Customer Funds are held by one or more Partners. Depending on the Partner and jurisdiction, funds may be (a) held in pooled or individual accounts at a partner bank; (b) safeguarded by an electronic money or payment institution in accordance with applicable safeguarding rules; or (c) swept to one or more program banks. The applicable Partner, account structure, and any deposit-insurance or safeguarding arrangement are described in the relevant Partner terms and disclosures.",
        "5.3 Where deposit insurance applies, it is provided by the relevant deposit insurer subject to its rules and limits and only on the conditions described in the applicable Partner disclosure. Insurance, where available, protects against the failure of an insured institution, not against the failure of Hinstantt, a Partner that is not an insured institution, or any loss in value of an asset. Stablecoin and other digital-asset balances are not deposits and are not insured (see Section 17).",
        "5.4 No interest unless stated. Hinstantt does not pay interest or yield on balances except where expressly stated in writing for a specific product and permitted by Applicable Law."
      ]
    },
    {
      "id": "the-services",
      "h": "The Services",
      "body": [
        "The Platform provides an integrated suite of financial operations modules. Each module is subject to the general terms in this Agreement and to its Service-Specific Terms. Not all modules are available in all markets, and availability depends on eligibility, verification, and Partner participation. The modules are: multi-currency business accounts; corporate cards; payments; treasury; foreign exchange; expense management; procurement; invoicing and billing; accounting; reporting; payroll; travel; stablecoin on-ramp and off-ramp; and AI-assisted financial management. Hinstantt may add, modify, suspend, or discontinue any module or feature, in whole or in part, on reasonable notice except where immediate action is required by Applicable Law, a Partner, or to address risk."
      ]
    },
    {
      "id": "accounts-module",
      "h": "Multi-currency business accounts",
      "body": [
        "7.1 Through a Partner, the Customer may access multi-currency account features, including local or virtual account details and the ability to hold, send, and receive funds in supported currencies. The available currencies, account details, limits, and cut-off times are as published on the Platform and may change.",
        "7.2 Funds availability, holds, and reversals may apply as described in the Partner terms and Section 8. Account details are provided for the Customer’s use and must not be used to receive funds on behalf of undisclosed third parties unless expressly permitted."
      ]
    },
    {
      "id": "payments",
      "h": "Payments",
      "body": [
        "8.1 Payment instructions: You may initiate payments through supported rails, which may include ACH, domestic and international wires, real-time payment systems, card networks, and local payment schemes. You authorize Hinstantt and its Partners to execute, and to debit and credit, in accordance with your instructions and the applicable scheme rules. You are responsible for the accuracy of payment details, including beneficiary name, account number, and routing information.",
        "8.2 Provisional credit and settlement: Credits may be provisional until settlement is final. In the United States, certain credit transfers are governed by Article 4A of the Uniform Commercial Code as adopted in the applicable state. If final settlement does not occur, we and our Partners may reverse the entry and you must repay any amount credited.",
        "8.3 Chargebacks, returns, and reversals: Card and other scheme transactions may be subject to chargebacks, disputes, returns, and reversals under network rules. You are responsible for amounts charged back or reversed, related fees, and for cooperating in dispute handling. We may debit your balances, or invoice you, for these amounts.",
        "8.4 Errors and unauthorized transactions: You must review activity promptly and notify us of suspected errors or unauthorized transactions within the period stated in the applicable Partner terms. Because the Services are commercial, statutory consumer error-resolution rights do not apply; error handling is governed by this Agreement, the Partner terms, and scheme rules.",
        "8.5 Cut-off times and execution: Instructions received after a cut-off time or on a non-business day may be processed the next business day. We do not guarantee execution times, which depend on rails, Partners, intermediaries, and recipient institutions."
      ]
    },
    {
      "id": "corporate-cards",
      "h": "Corporate cards",
      "body": [
        "9.1 Issuance: Corporate cards are issued by a Partner issuer (the “Issuer”) under license from the applicable card network and are subject to a separate cardholder or card program agreement. Cards are commercial cards for business use only.",
        "9.2 Authorized Users and controls: The Customer may issue cards to Authorized Users and set spending controls. The Customer is responsible for all card activity, including by Authorized Users, and for amounts owed, subject to the Issuer’s terms and Applicable Law.",
        "9.3 Repayment, security, and liability: Where a card product extends credit or operates on a charge basis, repayment terms, any required security or personal or corporate guarantee, and liability for unpaid amounts are set out in the card program agreement.",
        "9.4 Lost, stolen, or compromised cards: You must notify us or the Issuer promptly of any lost, stolen, or compromised card. Liability allocation for unauthorized use is governed by the card program agreement and network rules applicable to commercial cards."
      ]
    },
    {
      "id": "treasury",
      "h": "Treasury",
      "body": [
        "10.1 Treasury features may allow the Customer to allocate balances among supported options, which may include partner-bank holdings or money-market or similar products offered by a Partner. The available options, their providers, and their risk characteristics are described on the Platform and in the relevant Partner terms.",
        "10.2 Not investment advice: Hinstantt does not provide investment, tax, or legal advice and does not act as your investment adviser, broker, or fiduciary. Treasury options other than insured deposits may lose value, are not insured, and are not guaranteed. You are responsible for your own allocation decisions."
      ]
    },
    {
      "id": "foreign-exchange",
      "h": "Foreign exchange",
      "body": [
        "11.1 Where you convert currency, the applicable exchange rate includes a margin or spread over a reference rate and may include fees, as disclosed at or before the time of conversion or in the Fee Schedule. Rates fluctuate and the rate applied is the rate at the time the conversion is executed, not when instructed.",
        "11.2 Conversions are generally final once executed. We do not guarantee any rate in advance unless we expressly agree to a locked rate in writing. FX services are provided by Hinstantt or a Partner as identified on the Platform."
      ]
    },
    {
      "id": "expense-management",
      "h": "Expense management",
      "body": [
        "12.1 The expense module lets the Customer capture, categorize, approve, and reconcile spend, and apply policies and approval workflows. The Customer is responsible for configuring its policies and for the accuracy and lawfulness of the data it submits, including receipts and tax information."
      ]
    },
    {
      "id": "procurement",
      "h": "Procurement",
      "body": [
        "13.1 The procurement module supports purchase requests, approvals, purchase orders, and vendor management. Hinstantt is not a party to, and is not responsible for, any purchase contract between the Customer and its vendors. You are responsible for your procurement decisions and for compliance with your own and Applicable Law requirements."
      ]
    },
    {
      "id": "invoicing-billing",
      "h": "Invoicing and billing",
      "body": [
        "14.1 The invoicing module lets the Customer create, send, and track invoices and accept payment. The Customer is solely responsible for the content, accuracy, and lawfulness of its invoices, including tax treatment and any tax invoice or e-invoicing requirements that apply to it. Hinstantt provides tooling only and does not assume responsibility for the Customer’s tax or billing compliance."
      ]
    },
    {
      "id": "accounting",
      "h": "Accounting",
      "body": [
        "15.1 The accounting module provides bookkeeping, ledger, and integration features. Outputs are tools to support the Customer’s own record-keeping. Hinstantt is not your accountant or auditor, does not provide accounting or tax advice, and does not certify that records meet any accounting standard or regulatory requirement. The Customer is responsible for the accuracy of its books and for engaging qualified professionals as needed."
      ]
    },
    {
      "id": "reporting",
      "h": "Reporting",
      "body": [
        "16.1 The reporting module provides dashboards, analytics, and exports. Reports are provided for the Customer’s information and may rely on data from the Customer, Partners, and third parties. Hinstantt does not warrant that reports are error-free or fit for any regulatory, audit, or filing purpose."
      ]
    },
    {
      "id": "stablecoin",
      "h": "Stablecoin on-ramp and off-ramp",
      "body": [
        "17.1 The stablecoin module lets the Customer convert between supported fiat currencies and supported stablecoins (on-ramp and off-ramp) and, where offered, hold or transfer supported stablecoins. These services are provided by Hinstantt or a Partner, subject to eligibility, verification, and Applicable Law, and may be restricted or unavailable in certain markets.",
        "17.2 In the United States, payment stablecoins are subject to the federal framework established by the Guiding and Establishing National Innovation for U.S. Stablecoins Act of 2025 (the “GENIUS Act”), together with state and federal money-transmission, virtual-currency, and AML requirements. The Customer’s use of the stablecoin module may also be subject to the laws of other markets in which it operates.",
        "17.3 Supported stablecoins are not legal tender, are not deposits, and are not insured by any deposit insurer. Hinstantt does not pay, and you will not receive from Hinstantt, any interest or yield by virtue of holding a payment stablecoin, consistent with the GENIUS Act. The value, redeemability, and stability of a stablecoin depend on its issuer and reserves and are outside Hinstantt’s control.",
        "17.4 Digital-asset activity carries significant risks, including loss of peg or value, issuer default, smart-contract or network failure, irreversible transactions, incorrect addresses, blockchain congestion or forks, and regulatory change. Blockchain transactions are generally irreversible; we cannot recover assets sent to an incorrect or unsupported address. You accept these risks.",
        "17.5 Stablecoin transfers may be subject to information-sharing (travel rule) and screening obligations. You agree to provide required information, and we and our Partners may delay, block, or report transactions as required by Applicable Law."
      ]
    },
    {
      "id": "payroll",
      "h": "Payroll",
      "body": [
        "18.1 The payroll module supports the calculation, funding, and disbursement of wages and related payments to the Customer’s workers, and, where offered, related filings. Depending on the market and configuration, payroll services may be provided directly by the Customer using the Platform, or through a Partner acting as a payroll provider, employer of record, or agent.",
        "18.2 Except where a Partner expressly assumes a specific obligation in writing, the Customer remains the employer of its workers and is responsible for classification of workers, the accuracy of payroll inputs, lawful employment practices, and the funding of all wages, taxes, and contributions. The Customer must fund payroll in cleared funds by the required time; we and our Partners are not obligated to advance funds.",
        "18.3 The Customer is responsible for calculating, withholding, remitting, and filing all employment taxes and contributions in every market in which it operates. Where Hinstantt or a Partner performs withholding, remittance, or filing as the Customer’s agent, it does so solely on the basis of information the Customer provides, and the Customer remains responsible for the accuracy of that information and for any interest, penalty, or other liability arising from inaccurate, incomplete, or late inputs or insufficient funding. No such service relieves the Customer of its underlying statutory obligations."
      ]
    },
    {
      "id": "travel",
      "h": "Travel",
      "body": [
        "19.1 The travel module lets the Customer search, book, and manage travel. Travel products (flights, lodging, ground transport, and related services) are provided by third-party suppliers, not by Hinstantt. Hinstantt acts as an intermediary or agent and is not the supplier or operator of any travel service.",
        "19.2 Bookings are subject to the terms, fare rules, and cancellation and change policies of the relevant supplier, which you accept when booking. Hinstantt is not responsible for the acts, omissions, performance, cancellations, or insolvency of any supplier. Claims relating to a travel service must be pursued against the supplier, except to the extent Applicable Law provides otherwise."
      ]
    },
    {
      "id": "ai-management",
      "h": "AI-assisted financial management",
      "body": [
        "20.1 Certain features use artificial intelligence and automated processing to generate insights, suggestions, categorizations, summaries, forecasts, and similar outputs (“AI Output”). AI Output is provided for informational purposes only.",
        "20.2 AI Output does not constitute financial, investment, tax, accounting, or legal advice, and is not a recommendation to enter into any transaction. AI Output may be inaccurate, incomplete, or not suitable for your circumstances. You are responsible for independently verifying AI Output and for all decisions you make. You should not rely on AI Output as the sole basis for any decision and should consult qualified professionals.",
        "20.3 You are responsible for reviewing AI Output before acting on it and for the data you submit. Where automated processing materially affects an individual, applicable data-protection rights, including rights regarding automated decision-making, are addressed in the Privacy Policy."
      ]
    },
    {
      "id": "fees-taxes",
      "h": "Fees, taxes, and payment",
      "body": [
        "21.1 You agree to pay the fees set out in the Fee Schedule and any order form. We may change fees on prospective notice as permitted by Applicable Law. Fees are exclusive of taxes; you are responsible for applicable taxes other than taxes on Hinstantt’s net income.",
        "21.2 We may deduct fees, and amounts you owe (including chargebacks, reversals, and negative balances), from your balances, or set them off against amounts payable to you, or invoice you. Overdue amounts may accrue interest as permitted by Applicable Law. If your balance is insufficient, you must repay any shortfall on demand."
      ]
    },
    {
      "id": "acceptable-use",
      "h": "Acceptable use and prohibited activities",
      "body": [
        "You agree not to use the Services to engage in or facilitate any of the following, and you agree to comply with all applicable acceptable-use, Partner, and network rules:",
        {
          "ul": [
            "unlawful activity, fraud, money laundering, terrorist financing, sanctions evasion, or bribery and corruption;",
            "transactions for undisclosed third parties, or activity that conceals the source, ownership, or destination of funds;",
            "activities prohibited by a Partner, a card network, or a payment scheme, or any restricted or high-risk business not approved in writing;",
            "infringement of intellectual property or other rights, or transmission of unlawful, harmful, or malicious content or code;",
            "attempts to gain unauthorized access to, interfere with, reverse engineer, or disrupt the Services or their security; and",
            "providing false, misleading, or incomplete information, including in KYB or KYC."
          ]
        },
        "We may publish a more detailed acceptable use and restricted business policy, which forms part of this Agreement."
      ]
    },
    {
      "id": "suspension",
      "h": "Suspension, holds, and freezing",
      "body": [
        "23.1 We and our Partners may, with or without prior notice, decline, hold, delay, freeze, reverse, limit, or suspend any transaction, account, balance, or access where we or they reasonably believe it is necessary to (a) comply with Applicable Law, a court order, or a Partner or network requirement; (b) investigate suspected fraud, unauthorized, prohibited, or high-risk activity, or a breach of this Agreement; (c) manage credit, financial, security, or legal risk; or (d) protect Hinstantt, a Partner, you, or a third party.",
        "23.2 Where we are legally permitted, we will provide notice and restore access when the reason for the action is resolved. We are not liable for losses arising from action taken in good faith under this Section, except to the extent Applicable Law provides otherwise and subject to Section 26."
      ]
    },
    {
      "id": "ip-and-data",
      "h": "Intellectual property and data",
      "body": [
        "24.1 Hinstantt and its licensors own the Platform and all related intellectual property. We grant the Customer a limited, non-exclusive, non-transferable, revocable right to access and use the Services during the term for its internal business purposes. You may not copy, modify, create derivative works from, reverse engineer, or resell the Services.",
        "24.2 As between the parties, the Customer owns Customer Data. The Customer grants Hinstantt a worldwide, non-exclusive license to use, host, process, and transmit Customer Data to provide and improve the Services, to comply with Applicable Law, and as otherwise described in the Privacy Policy. The Customer is responsible for the accuracy and lawfulness of Customer Data and for having the rights needed to provide it, including for data about its personnel and counterparties.",
        "24.3 Hinstantt may create and use aggregated or de-identified data that does not identify the Customer or any individual for any lawful purpose, including analytics and improving the Services.",
        "24.4 If you provide feedback, you grant Hinstantt a perpetual, irrevocable, royalty-free license to use it without restriction."
      ]
    },
    {
      "id": "disclaimers",
      "h": "Disclaimers",
      "body": [
        "25.1 Except as expressly stated in this Agreement, the Services are provided “as is” and “as available,” and Hinstantt disclaims all other warranties, whether express, implied, or statutory, including warranties of merchantability, fitness for a particular purpose, title, and non-infringement, to the maximum extent permitted by Applicable Law.",
        "25.2 Hinstantt does not warrant that the Services will be uninterrupted, timely, secure, or error-free, or that AI Output, reports, or data will be accurate or complete. Hinstantt is not responsible for the acts or omissions of Partners, suppliers, networks, or other third parties, except as expressly stated."
      ]
    },
    {
      "id": "liability",
      "h": "Limitation of liability",
      "body": [
        "26.1 To the maximum extent permitted by Applicable Law, neither party will be liable for any indirect, incidental, special, consequential, exemplary, or punitive damages, or for lost profits, revenue, goodwill, or data, arising out of or relating to the Agreement or the Services, even if advised of the possibility.",
        "26.2 To the maximum extent permitted by Applicable Law, Hinstantt’s total aggregate liability arising out of or relating to the Agreement or the Services will not exceed the total fees actually paid by the Customer to Hinstantt for the Services in the twelve (12) months immediately preceding the event giving rise to the liability.",
        "26.3 Except as set out in Section 26.4, nothing in this Agreement limits or excludes liability that cannot be limited or excluded under Applicable Law, including, where applicable, liability for death or personal injury caused by negligence, for fraud or fraudulent misrepresentation, or for a party’s indemnification obligations or a party’s breach of its confidentiality or data-protection obligations.",
        "26.4 Notwithstanding Sections 26.2 and 26.3, and to the maximum extent permitted by Applicable Law, Hinstantt’s total aggregate liability arising out of or relating to a breach by Hinstantt of its data-protection or data-security obligations will not exceed the lesser of (a) US$50,000; and (b) the total fees paid by the Customer to Hinstantt for the Services in the twelve (12) months immediately preceding the event giving rise to the liability.",
        "26.5 The limitations in this Section reflect the allocation of risk between the parties and apply regardless of the theory of liability."
      ]
    },
    {
      "id": "indemnification",
      "h": "Indemnification",
      "body": [
        "27.1 The Customer will indemnify, defend, and hold harmless Hinstantt, its Partners, and their respective affiliates, officers, directors, employees, and agents from and against any third-party claims, and related losses, liabilities, damages, fines, penalties, and reasonable costs (including legal fees), arising out of or relating to (a) the Customer’s breach of this Agreement or Applicable Law; (b) Customer Data or the Customer’s use of the Services; (c) the Customer’s employment, tax, or payroll obligations; (d) disputes between the Customer and its Authorized Users, vendors, counterparties, workers, or suppliers; and (e) chargebacks, reversals, returns, and negative balances attributable to the Customer."
      ]
    },
    {
      "id": "term-termination",
      "h": "Term, termination, and return of funds",
      "body": [
        "28.1 This Agreement begins when you first accept it or use the Services and continues until terminated.",
        "28.2 Either party may terminate for convenience on 30 days written notice, unless an order form states otherwise. We may suspend or terminate immediately where required by Applicable Law or a Partner, for risk or security reasons, or for your material breach.",
        "28.3 On termination, your right to use the Services ends. Subject to completion of pending transactions, holds, AML and sanctions checks, chargeback and reversal windows, and any legal or Partner requirement, remaining Customer Funds will be returned to a verified account in the Customer’s name, or otherwise dealt with as required by Applicable Law, including unclaimed-property (escheatment) rules. We may retain amounts reasonably necessary to cover anticipated liabilities.",
        "28.4 Provisions that by their nature should survive (including Sections 21, 24, 25, 26, 27, 29, and 30) survive termination."
      ]
    },
    {
      "id": "governing-law",
      "h": "Governing law and dispute resolution",
      "body": [
        "29.1 This Agreement, and any dispute arising out of or relating to it or the Services, is governed by the laws of the State of New York, without regard to its conflict-of-laws principles, and, where applicable, by U.S. federal law.",
        "29.2 Except for claims that may be brought in a small-value court or claims for injunctive relief to protect intellectual property or confidential information, any dispute arising out of or relating to this Agreement will be finally resolved by binding arbitration administered by the American Arbitration Association under its Commercial Arbitration Rules. The seat and venue of arbitration will be New York County, New York, and the proceedings will be conducted in English.",
        "29.3 To the maximum extent permitted by Applicable Law, disputes will be resolved on an individual basis, and each party waives any right to participate in a class, collective, or representative proceeding.",
        "29.4 For any matter not subject to arbitration, the parties submit to the exclusive jurisdiction of the state and federal courts located in New York County, New York."
      ]
    },
    {
      "id": "general",
      "h": "General",
      "body": [
        "30.1 We may update this Agreement. We will provide notice of material changes as required by Applicable Law, and changes take effect on the stated date. Your continued use after the effective date constitutes acceptance. Where Applicable Law requires advance notice of changes that reduce your rights or increase your obligations, we will provide it.",
        "30.2 Neither party is liable for failure or delay caused by events beyond its reasonable control, including acts of God, outages, network or banking-system failures, cyber-attacks, or governmental action.",
        "30.3 You may not assign this Agreement without our consent. We may assign to an affiliate or in connection with a merger, acquisition, or sale of assets.",
        "30.4 This Agreement is the entire agreement between the parties on its subject matter and supersedes prior agreements. If any provision is unenforceable, the rest remains in effect. Failure to enforce a provision is not a waiver.",
        "30.5 The parties are independent contractors. Partners and indemnified persons are intended third-party beneficiaries of the provisions that benefit them. There are no other third-party beneficiaries.",
        "30.6 Notices. Legal notices to Hinstantt must be sent to legal@hinstantt.com. We may give notice to you through the Platform or your registered contact details."
      ]
    }
  ]
};

// TODO: a working draft; to be reviewed by counsel before launch
const COOKIES = {
  key: 'cookies',
  title: 'Cookie Policy',
  updated: '27 October 2026',
  intro: 'This Cookie Policy explains how Hinstantt uses cookies and similar technologies on its websites and platform.',
  sections: [
    { id: 'what-are-cookies', h: 'What cookies are', body: ['Cookies are small text files placed on your device when you visit a website. They help the site work, remember your preferences and understand how it is used.'] },
    { id: 'how-we-use', h: 'How we use cookies', body: ['We use cookies in the following categories:', { ul: ['Strictly necessary: to keep you signed in, secure your session and prevent fraud. These cannot be switched off.', 'Preferences: to remember choices such as language and region.', 'Analytics: to understand how visitors use our site so we can improve it.', 'Marketing: to measure the effectiveness of our campaigns, only where you have agreed.'] }] },
    { id: 'third-parties', h: 'Third-party cookies', body: ['Some cookies are set by service providers that help us run analytics, support and marketing. They process data on our behalf under contract and in line with our Privacy Policy.'] },
    { id: 'your-choices', h: 'Your choices', body: ['You can accept or decline non-essential cookies when you first visit, and change your mind at any time through your browser settings. Blocking some cookies may affect how the site works.'] },
    { id: 'changes', h: 'Changes to this policy', body: ['We may update this policy from time to time. The date at the top shows when it last changed.'] },
    { id: 'contact', h: 'Contact', body: ['Questions about this policy can be sent to support@hinstantt.com.'] },
  ],
};
export const LEGAL_DOCS = { privacy: PRIVACY, terms: TERMS, cookies: COOKIES };

/* ----------------------------------------------------------------------------
   Renderer
---------------------------------------------------------------------------- */

const Block = ({ b }) => {
  if (typeof b === 'string') return <p>{b}</p>;
  if (b.h3) return <h3>{b.h3}</h3>;
  if (b.ul)
    return (
      <ul>
        {b.ul.map((li, i) => (
          <li key={i}>{li}</li>
        ))}
      </ul>
    );
  return null;
};

export default function LegalPage({ doc = 'privacy' }) {
  const data = LEGAL_DOCS[doc] || PRIVACY;
  const [active, setActive] = React.useState(data.sections[0].id);
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    setActive(data.sections[0].id);
    const probe = 120;
    const onScroll = () => {
      let cur = data.sections[0].id;
      for (const s of data.sections) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top - probe <= 0) cur = s.id;
      }
      setActive(cur);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [doc]); // eslint-disable-line react-hooks/exhaustive-deps

  const go = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 92;
      window.scrollTo({ top, behavior: 'smooth' });
      setActive(id);
    }
  };

  const Toc = () => (
    <>
      <div className="lg-toc-h">On this page</div>
      <nav className="lg-toc-nav">
        {data.sections.map((s, i) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className={active === s.id ? 'is-active' : ''}
            onClick={(e) => go(e, s.id)}
          >
            <span className="lg-toc-n">{String(i + 1).padStart(2, '0')}</span>
            {s.h}
          </a>
        ))}
      </nav>
    </>
  );

  return (
    <main className="lg">
      <div className="lg-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />

      <div className="lg-hero">
        <div className="lg-hero-bg" aria-hidden="true"><FlutedBackground className="lg-hero-scene" {...HERO_LOOKS.legal} /></div>
        <div className="wrap">
          <h1 className="lg-title">{data.title}</h1>
          <div className="lg-metarow">
            <span className="lg-chip">Updated {data.updated}</span>
          </div>
        </div>
      </div>

      <div className="wrap lg-body">
        <article className="lg-content">
          <details className="lg-toc-m">
            <summary>On this page</summary>
            <Toc />
          </details>

          {data.sections.map((s, i) => (
            <section id={s.id} key={s.id} className="lg-sec">
              <h2>
                <span className="lg-sec-n">{String(i + 1).padStart(2, '0')}</span>
                <span className="lg-sec-t">{s.h}</span>
              </h2>
              <div className="lg-sec-body">
                {s.body.map((b, j) => (
                  <Block b={b} key={j} />
                ))}
              </div>
            </section>
          ))}

          <div className="lg-cta-card">
            <div className="lg-cta-text">
              <div className="lg-cta-h">Questions about this {data.title.toLowerCase()}?</div>
              <p>Reach our team at support@hinstantt.com.</p>
            </div>
            <a className="lg-cta-btn" href="mailto:support@hinstantt.com">Contact us</a>
          </div>
        </article>

        <aside className="lg-toc">
          <div className="lg-toc-sticky">
            <Toc />
          </div>
        </aside>
      </div>
    </main>
  );
}
