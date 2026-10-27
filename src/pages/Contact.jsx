import React from 'react';
import { PageHero, HERO_LOOKS, HERO_PHOTOS, Hi } from '../components/Kit.jsx';
import { Mail01Icon, Location01Icon, CustomerSupportIcon } from '@hugeicons/core-free-icons';
import './Contact.css';

/* Talk to sales leads are emailed to this inbox (matches the site's existing
   "Talk to sales" CTAs). Support goes to support@hinstantt.com. To capture leads
   server-side later, replace buildMailto()/submit() with a fetch() POST to a
   serverless endpoint; the form state stays the same. */
const SALES = 'newbusiness@hinstantt.com';
const SUPPORT = 'support@hinstantt.com';
const ADDRESS = '447 Broadway, 2nd Floor, #1314, New York, NY 10013';

const SIZES = ['1–10', '11–50', '51–200', '201–1,000', '1,000+'];
const INTERESTS = ['Cards', 'Payments', 'Treasury', 'Accounting', 'The full platform', 'Something else'];

const Field = ({ label, required, error, children }) => (
  <label className="ct-field">
    <span className="ct-label">
      {label}
      {required && <span className="ct-req">*</span>}
    </span>
    {children}
    {error && <span className="ct-err">{error}</span>}
  </label>
);

export default function ContactPage() {
  const [f, setF] = React.useState({
    name: '', email: '', company: '', size: '', interest: '', message: '',
  });
  const [errs, setErrs] = React.useState({});
  const [opened, setOpened] = React.useState(false);

  const set = (k) => (e) => {
    setF((p) => ({ ...p, [k]: e.target.value }));
    if (errs[k]) setErrs((p) => ({ ...p, [k]: undefined }));
  };

  const validate = () => {
    const e = {};
    if (!f.name.trim()) e.name = 'Please add your name.';
    if (!f.email.trim()) e.email = 'Please add your work email.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = 'That email does not look right.';
    if (!f.company.trim()) e.company = 'Please add your company.';
    if (!f.message.trim()) e.message = 'Tell us a little about what you need.';
    return e;
  };

  const submit = (e) => {
    e.preventDefault();
    const e2 = validate();
    setErrs(e2);
    if (Object.keys(e2).length) return;
    const subject = `Sales enquiry — ${f.company.trim()}`;
    const body = [
      `Name: ${f.name.trim()}`,
      `Work email: ${f.email.trim()}`,
      `Company: ${f.company.trim()}`,
      `Company size: ${f.size || 'Not specified'}`,
      `Interested in: ${f.interest || 'Not specified'}`,
      '',
      'Message:',
      f.message.trim(),
    ].join('\r\n');
    window.location.href = `mailto:${SALES}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setOpened(true);
  };

  return (
    <main className="ct">
      <PageHero compact look={HERO_LOOKS.contact} photo={HERO_PHOTOS.contact} eyebrow="Contact" title="Talk to our team" sub="Tell us about your business and a specialist will reach out. For account and platform questions, our support team is one email away." />

      <div className="wrap ct-body">
        {/* Lead form */}
        <section className="ct-formcard">
          <div className="ct-formcard-head">
            <h2>Talk to sales</h2>
            <p>Share a few details and we will be in touch shortly.</p>
          </div>

          <form className="ct-form" onSubmit={submit} noValidate>
            <div className="ct-grid2">
              <Field label="Full name" required error={errs.name}>
                <input type="text" value={f.name} onChange={set('name')} placeholder="Jane Doe" autoComplete="name" />
              </Field>
              <Field label="Work email" required error={errs.email}>
                <input type="email" value={f.email} onChange={set('email')} placeholder="jane@company.com" autoComplete="email" />
              </Field>
            </div>

            <div className="ct-grid2">
              <Field label="Company" required error={errs.company}>
                <input type="text" value={f.company} onChange={set('company')} placeholder="Company name" autoComplete="organization" />
              </Field>
              <Field label="Company size">
                <select value={f.size} onChange={set('size')} className={f.size ? '' : 'is-empty'}>
                  <option value="">Select size</option>
                  {SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </Field>
            </div>

            <Field label="What are you interested in?">
              <select value={f.interest} onChange={set('interest')} className={f.interest ? '' : 'is-empty'}>
                <option value="">Select an area</option>
                {INTERESTS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </Field>

            <Field label="How can we help?" required error={errs.message}>
              <textarea rows={4} value={f.message} onChange={set('message')} placeholder="What are you looking to do with Hinstantt?" />
            </Field>

            <div className="ct-actions">
              <button type="submit" className="ct-submit">Talk to sales</button>
              {opened && (
                <span className="ct-opened">
                  We have opened your email with the details filled in. If nothing happened, email {SALES}.
                </span>
              )}
            </div>
          </form>
        </section>

        {/* Side rail */}
        <aside className="ct-rail">
          <div className="ct-card">
            <span className="ct-card-ic"><Hi icon={CustomerSupportIcon} size={18} /></span>
            <div className="ct-card-h">Already using Hinstantt?</div>
            <p>Reach our support team for help with your account or the platform.</p>
            <a className="ct-card-link" href={`mailto:${SUPPORT}`}>
              {SUPPORT}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
          </div>

          <div className="ct-card">
            <span className="ct-card-ic"><Hi icon={Location01Icon} size={18} /></span>
            <div className="ct-card-h">New York</div>
            <p>{ADDRESS}</p>
          </div>

          <div className="ct-card">
            <span className="ct-card-ic"><Hi icon={Mail01Icon} size={18} /></span>
            <div className="ct-card-h">Sales</div>
            <p>Prefer email? Write to the team directly.</p>
            <a className="ct-card-link" href={`mailto:${SALES}`}>{SALES}</a>
          </div>
        </aside>
      </div>
    </main>
  );
}
