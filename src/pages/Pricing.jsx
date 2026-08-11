import React, { useState } from 'react';
import { ArrowRight, Check, Minus } from 'lucide-react';

const TOKENS = {
  ink: '#14181F',
  paper: '#EAEEE6',
  paperDeep: '#DCE1D6',
  panel: '#F6F8F2',
  line: '#C4CBBC',
  lineSoft: '#E2E7DA',
  signal: '#E85D2C',
  signalDeep: '#B8461E',
  wait: '#6B7178',
  textSoft: '#3D4339',
  success: '#1F8A70',
  white: '#FFFFFF',
};

function GlobalStyle() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Inter:wght@400;500;600&display=swap');
      .ml-root * { box-sizing: border-box; margin: 0; padding: 0; }
      .ml-root { font-family: 'Inter', sans-serif; color: ${TOKENS.ink}; background: ${TOKENS.paper}; }
      .ml-mono { font-family: 'JetBrains Mono', monospace; }
      .ml-display { font-family: 'Space Grotesk', sans-serif; }
      .ml-root a { color: inherit; text-decoration: none; }
      .ml-btn { display: inline-flex; align-items: center; gap: 8px; font-family: 'Space Grotesk', sans-serif; font-weight: 600; font-size: 15px; padding: 12px 22px; border-radius: 3px; cursor: pointer; border: 1.5px solid ${TOKENS.ink}; transition: transform .15s ease, background .15s ease; }
      .ml-btn:hover { transform: translateY(-1px); }
      .ml-btn-primary { background: ${TOKENS.ink}; color: ${TOKENS.paper}; }
      .ml-btn-primary:hover { background: #262c36; }
      .ml-btn-ghost { background: transparent; color: ${TOKENS.ink}; }
      .ml-btn-ghost:hover { background: ${TOKENS.paperDeep}; }
      .pr-toggle-wrap { display: inline-flex; align-items: center; gap: 10px; background: ${TOKENS.panel}; border: 1px solid ${TOKENS.line}; border-radius: 30px; padding: 4px; }
      .pr-toggle-opt { font-family: 'JetBrains Mono', monospace; font-size: 12.5px; padding: 7px 16px; border-radius: 24px; border: none; background: transparent; cursor: pointer; color: ${TOKENS.wait}; }
      .pr-toggle-opt.on { background: ${TOKENS.ink}; color: ${TOKENS.paper}; }
      .pr-card { background: ${TOKENS.white}; border: 1px solid ${TOKENS.line}; border-radius: 8px; padding: 30px 26px; display: flex; flex-direction: column; }
      .pr-card.pop { border-color: ${TOKENS.ink}; box-shadow: 0 0 0 1px ${TOKENS.ink}; }
      .pr-feat { display: flex; gap: 10px; align-items: flex-start; font-size: 13.5px; color: ${TOKENS.textSoft}; padding: 9px 0; border-bottom: 1px solid ${TOKENS.lineSoft}; }
      .pr-feat:last-child { border-bottom: none; }
      table.pr-table { width: 100%; border-collapse: collapse; font-size: 13.5px; }
      table.pr-table th { text-align: left; font-size: 11.5px; text-transform: uppercase; letter-spacing: 0.04em; color: ${TOKENS.wait}; font-weight: 600; padding: 14px; border-bottom: 1px solid ${TOKENS.line}; background: ${TOKENS.panel}; }
      table.pr-table td { padding: 13px 14px; border-bottom: 1px solid ${TOKENS.lineSoft}; color: ${TOKENS.textSoft}; }
      table.pr-table tr:last-child td { border-bottom: none; }
      table.pr-table th:not(:first-child), table.pr-table td:not(:first-child) { text-align: center; }
    `}</style>
  );
}

function Nav() {
  return (
    <nav style={{ position: 'sticky', top: 0, zIndex: 20, background: `${TOKENS.paper}F0`, backdropFilter: 'blur(6px)', borderBottom: `1px solid ${TOKENS.line}` }}>
      <div style={{ maxWidth: 1120, margin: '0 auto', padding: '18px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 22, height: 22, background: TOKENS.ink, borderRadius: 4, position: 'relative' }}>
            <div style={{ position: 'absolute', inset: 5, background: TOKENS.signal, borderRadius: 1 }} />
          </div>
          <span className="ml-display" style={{ fontWeight: 700, fontSize: 19, letterSpacing: '-0.02em' }}>mockless</span>
        </a>
        <div className="ml-mono" style={{ display: 'flex', gap: 32, fontSize: 13.5, color: TOKENS.wait }}>
          <a href="/#how">how it works</a>
          <a href="/#features">features</a>
          <a href="/pricing" style={{ color: TOKENS.ink }}>pricing</a>
          <a href="/docs">docs</a>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="ml-btn ml-btn-ghost" style={{ fontSize: 13.5, padding: '9px 16px' }}>Sign in</button>
          <button className="ml-btn ml-btn-primary" style={{ fontSize: 13.5, padding: '9px 16px' }}>Start free</button>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer style={{ borderTop: `1px solid ${TOKENS.line}` }}>
      <div style={{ maxWidth: 1120, margin: '0 auto', padding: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span className="ml-display" style={{ fontWeight: 700, fontSize: 15 }}>mockless</span>
        <span className="ml-mono" style={{ fontSize: 12, color: TOKENS.wait }}>&copy; 2026 mockless. build the frontend first.</span>
      </div>
    </footer>
  );
}

const PLANS = {
  free: { label: 'Free', price: 0 },
  pro: { label: 'Pro', priceMonthly: 18, priceAnnual: 14 },
  team: { label: 'Team', priceMonthly: 49, priceAnnual: 39 },
};

const TIERS = [
  {
    key: 'free',
    name: 'Solo',
    tagline: 'For one developer working locally.',
    cta: 'Start free',
    ctaVariant: 'ghost',
    features: [
      'Unlimited local endpoints',
      'OpenAPI import',
      'Latency & error simulation',
      'CLI + SDK',
      '1 project',
      'Community support',
    ],
  },
  {
    key: 'pro',
    name: 'Pro',
    tagline: 'For a frontend dev shipping against a real spec.',
    cta: 'Start 14-day trial',
    ctaVariant: 'primary',
    popular: true,
    features: [
      'Everything in Solo',
      'Shareable hosted mock environments',
      'Stateful scenarios',
      'Request log history (30 days)',
      '10 projects',
      'Email support',
    ],
  },
  {
    key: 'team',
    name: 'Team',
    tagline: 'For frontend teams working off one set of mocks.',
    cta: 'Start 14-day trial',
    ctaVariant: 'ghost',
    features: [
      'Everything in Pro',
      'Shared workspaces & role permissions',
      'Mock configs reviewed in git',
      'Unlimited request log history',
      'Unlimited projects',
      'Priority support',
    ],
  },
];

const COMPARE_ROWS = [
  { label: 'Local mock server', free: true, pro: true, team: true },
  { label: 'OpenAPI import', free: true, pro: true, team: true },
  { label: 'Latency & error simulation', free: true, pro: true, team: true },
  { label: 'Projects', free: '1', pro: '10', team: 'Unlimited' },
  { label: 'Shareable hosted mock URLs', free: false, pro: true, team: true },
  { label: 'Stateful scenarios', free: false, pro: true, team: true },
  { label: 'Request log retention', free: '24 hours', pro: '30 days', team: 'Unlimited' },
  { label: 'Team seats', free: '1', pro: '1', team: 'Unlimited' },
  { label: 'Shared workspaces', free: false, pro: false, team: true },
  { label: 'Role permissions', free: false, pro: false, team: true },
  { label: 'SSO', free: false, pro: false, team: true },
  { label: 'Support', free: 'Community', pro: 'Email', team: 'Priority' },
];

function Cell({ v }) {
  if (v === true) return <Check size={15} color={TOKENS.success} style={{ margin: '0 auto' }} />;
  if (v === false) return <Minus size={14} color={TOKENS.line} style={{ margin: '0 auto' }} />;
  return <span className="ml-mono">{v}</span>;
}

function PricingHero({ annual, setAnnual }) {
  return (
    <section style={{ maxWidth: 900, margin: '0 auto', padding: '72px 32px 48px', textAlign: 'center' }}>
      <p className="ml-mono" style={{ fontSize: 12.5, color: TOKENS.signalDeep, marginBottom: 12 }}>// pricing</p>
      <h1 className="ml-display" style={{ fontSize: 44, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.08, marginBottom: 16 }}>
        Free while you're the only one blocked. Priced for when your team is.
      </h1>
      <p style={{ fontSize: 16, lineHeight: 1.6, color: TOKENS.textSoft, maxWidth: 560, margin: '0 auto 32px' }}>
        No credit card for Solo. Cancel Pro or Team anytime — your mock configs stay yours, exported as plain JSON.
      </p>
      <div className="pr-toggle-wrap">
        <button className={`pr-toggle-opt ${!annual ? 'on' : ''}`} onClick={() => setAnnual(false)}>monthly</button>
        <button className={`pr-toggle-opt ${annual ? 'on' : ''}`} onClick={() => setAnnual(true)}>annual — 2 months free</button>
      </div>
    </section>
  );
}

function TierCards({ annual }) {
  return (
    <section style={{ maxWidth: 1120, margin: '0 auto', padding: '0 32px 96px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
        {TIERS.map(t => {
          const plan = PLANS[t.key];
          const price = t.key === 'free' ? 0 : (annual ? plan.priceAnnual : plan.priceMonthly);
          return (
            <div key={t.key} className={`pr-card ${t.popular ? 'pop' : ''}`}>
              {t.popular && (
                <span className="ml-mono" style={{ alignSelf: 'flex-start', fontSize: 11, fontWeight: 600, color: TOKENS.signalDeep, background: '#FBEAE2', padding: '3px 9px', borderRadius: 3, marginBottom: 14 }}>
                  most teams start here
                </span>
              )}
              <h3 className="ml-display" style={{ fontSize: 19, fontWeight: 600, marginBottom: 6 }}>{t.name}</h3>
              <p style={{ fontSize: 13.5, color: TOKENS.wait, marginBottom: 20, minHeight: 34 }}>{t.tagline}</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 22 }}>
                <span className="ml-display" style={{ fontSize: 34, fontWeight: 700 }}>${price}</span>
                {t.key !== 'free' && <span className="ml-mono" style={{ fontSize: 12.5, color: TOKENS.wait }}>/ mo, per seat</span>}
                {t.key === 'free' && <span className="ml-mono" style={{ fontSize: 12.5, color: TOKENS.wait }}>forever</span>}
              </div>
              <button className={`ml-btn ${t.ctaVariant === 'primary' ? 'ml-btn-primary' : 'ml-btn-ghost'}`} style={{ justifyContent: 'center', marginBottom: 22, fontSize: 13.5 }}>
                {t.cta}
              </button>
              <div>
                {t.features.map((f, i) => (
                  <div key={i} className="pr-feat">
                    <Check size={14} color={TOKENS.success} style={{ marginTop: 2, flexShrink: 0 }} />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function CompareTable() {
  return (
    <section style={{ borderTop: `1px solid ${TOKENS.line}`, background: TOKENS.panel }}>
      <div style={{ maxWidth: 1120, margin: '0 auto', padding: '96px 32px' }}>
        <p className="ml-mono" style={{ fontSize: 12.5, color: TOKENS.signalDeep, marginBottom: 10 }}>// full comparison</p>
        <h2 className="ml-display" style={{ fontSize: 30, fontWeight: 600, letterSpacing: '-0.01em', marginBottom: 40 }}>Every plan, side by side.</h2>
        <div style={{ background: TOKENS.white, border: `1px solid ${TOKENS.line}`, borderRadius: 8, overflow: 'hidden' }}>
          <table className="pr-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th>Solo</th>
                <th>Pro</th>
                <th>Team</th>
              </tr>
            </thead>
            <tbody>
              {COMPARE_ROWS.map((r, i) => (
                <tr key={i}>
                  <td style={{ color: TOKENS.ink, fontWeight: 500 }}>{r.label}</td>
                  <td><Cell v={r.free} /></td>
                  <td><Cell v={r.pro} /></td>
                  <td><Cell v={r.team} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

const FAQS = [
  { q: 'Does the Free plan expire?', a: 'No. Solo is free indefinitely for one project and one developer. You only pay when you need hosted, shareable mock environments or more than one project.' },
  { q: 'What happens to my mocks if I downgrade?', a: 'Your mock configs are stored as plain JSON in your repo. Downgrading disables hosted URLs and multi-seat access, but nothing is deleted — you keep running the same configs locally.' },
  { q: 'Do you charge per project or per seat?', a: 'Pro is billed per seat. Team is billed per seat with unlimited projects and workspaces included.' },
  { q: 'Can I self-host the mock server?', a: 'The CLI and local server are free and self-hosted by default on every plan. Paid plans add the hosted layer for shareable URLs, team sync, and log retention.' },
];

function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section style={{ maxWidth: 780, margin: '0 auto', padding: '96px 32px' }}>
      <h2 className="ml-display" style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.01em', marginBottom: 32 }}>Questions</h2>
      {FAQS.map((f, i) => (
        <div key={i} style={{ borderBottom: `1px solid ${TOKENS.line}`, padding: '18px 0' }}>
          <button
            onClick={() => setOpen(open === i ? -1 : i)}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
          >
            <span className="ml-display" style={{ fontSize: 15.5, fontWeight: 600 }}>{f.q}</span>
            <span style={{ fontSize: 20, color: TOKENS.wait }}>{open === i ? '\u2212' : '+'}</span>
          </button>
          {open === i && <p style={{ fontSize: 14, lineHeight: 1.6, color: TOKENS.textSoft, marginTop: 12 }}>{f.a}</p>}
        </div>
      ))}
    </section>
  );
}

function FinalCTA() {
  return (
    <section style={{ borderTop: `1px solid ${TOKENS.line}`, background: TOKENS.panel }}>
      <div style={{ maxWidth: 1120, margin: '0 auto', padding: '96px 32px', textAlign: 'center' }}>
        <h2 className="ml-display" style={{ fontSize: 32, fontWeight: 600, letterSpacing: '-0.01em', marginBottom: 16 }}>Still blocked on a backend that isn't ready?</h2>
        <p style={{ fontSize: 15.5, color: TOKENS.textSoft, marginBottom: 28 }}>Start on Solo. Upgrade the moment your team needs to share a mock.</p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center' }}>
          <button className="ml-btn ml-btn-primary">Start mocking free <ArrowRight size={16} /></button>
          <button className="ml-btn ml-btn-ghost">Read the docs</button>
        </div>
      </div>
    </section>
  );
}

export default function Pricing() {
  const [annual, setAnnual] = useState(true);
  return (
    <div className="ml-root">
      <GlobalStyle />
      <Nav />
      <PricingHero annual={annual} setAnnual={setAnnual} />
      <TierCards annual={annual} />
      <CompareTable />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}
