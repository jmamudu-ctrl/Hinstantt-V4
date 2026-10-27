import React from 'react';
import { Arrow, useReveal, PageHero } from './kit.jsx';

// v3 contact page. Same lead form as before: on submit it opens an email to sales with the
// details filled in. To capture leads server-side later, swap submit() for a fetch() POST.
const SALES = 'newbusiness@hinstantt.com';
const SUPPORT = 'support@hinstantt.com';
const ADDRESS = '447 Broadway, 2nd Floor, #1314, New York, NY 10013';

const SIZES = ['1–10', '11–50', '51–200', '201–1,000', '1,000+'];
const INTERESTS = ['Cards', 'Payments', 'Treasury', 'Accounting', 'The full platform', 'Something else'];

const Field = ({ label, required, error, children }) => (
  <label className={`x-field ${error ? 'is-err' : ''}`}>
    <span className="x-field-l">{label}{required && <i>*</i>}</span>
    {children}
    {error && <span className="x-field-e">{error}</span>}
  </label>
);

export default function Contact3() {
  useReveal();
  const [f, setF] = React.useState({ name: '', email: '', company: '', size: '', interest: '', message: '' });
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
    <main>
      <PageHero compact eyebrow="Contact" title="Talk to our team" sub="Tell us about your business and a specialist will reach out. For account and platform questions, our support team is one email away." />

      <section className="x-sec x-contact">
        <div className="x-wrap x-contact-grid">
          <div className="x-form-card x-rv">
            <div className="x-form-head">
              <h2 className="x-h3">Talk to sales</h2>
              <p className="x-lead">Share a few details and we will be in touch shortly.</p>
            </div>
            <form className="x-form" onSubmit={submit} noValidate>
              <div className="x-form-2">
                <Field label="Full name" required error={errs.name}>
                  <input type="text" value={f.name} onChange={set('name')} placeholder="Jane Doe" autoComplete="name" />
                </Field>
                <Field label="Work email" required error={errs.email}>
                  <input type="email" value={f.email} onChange={set('email')} placeholder="jane@company.com" autoComplete="email" />
                </Field>
              </div>
              <div className="x-form-2">
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
                <textarea rows={5} value={f.message} onChange={set('message')} placeholder="What are you looking to do with Hinstantt?" />
              </Field>
              <div className="x-form-foot">
                <button type="submit" className="x-btn x-btn--dark">Talk to sales</button>
                {opened && <span className="x-form-note">We have opened your email with the details filled in. If nothing happened, email {SALES}.</span>}
              </div>
            </form>
          </div>

          <aside className="x-rail x-rv">
            <div className="x-rail-c">
              <h3>Already using Hinstantt?</h3>
              <p>Reach our support team for help with your account or the platform.</p>
              <a className="x-tlink" href={`mailto:${SUPPORT}`}>{SUPPORT} <Arrow /></a>
            </div>
            <div className="x-rail-c">
              <h3>New York</h3>
              <p>{ADDRESS}</p>
            </div>
            <div className="x-rail-c">
              <h3>Sales</h3>
              <p>Prefer email? Write to the team directly.</p>
              <a className="x-tlink" href={`mailto:${SALES}`}>{SALES} <Arrow /></a>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
