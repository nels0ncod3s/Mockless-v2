import React from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import { T } from '../theme';
import { GlobalStyle, Nav, Footer } from '../components/SiteChrome';

const tiers = [
  {
    name: 'Solo',
    price: 'Free',
    sub: 'For individual developers',
    cta: 'Start free',
    to: '/dashboard',
    features: ['Up to 10 mock endpoints', '1 project', 'Latency & error simulation', 'Local CLI + SDK'],
  },
  {
    name: 'Team',
    price: '$24',
    sub: 'per editor / month',
    cta: 'Start free trial',
    to: '/dashboard',
    highlighted: true,
    features: ['Unlimited endpoints', 'Unlimited projects', 'Shareable mock environments', 'OpenAPI import', 'Team sync via git'],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    sub: 'For larger orgs',
    cta: 'Contact sales',
    to: '/dashboard',
    features: ['SSO & audit logs', 'Self-hosted option', 'Priority support', 'Custom latency profiles'],
  },
];

export default function Pricing() {
  return (
    <div className="ml-root">
      <GlobalStyle />
      <Nav />
      <section style={{ maxWidth: 1120, margin: '0 auto', padding: '72px 32px 24px', textAlign: 'center' }}>
        <p className="ml-mono" style={{ fontSize: 12.5, color: T.signalDeep, marginBottom: 10, textAlign: 'center' }}>// pricing</p>
        <h1 className="ml-display" style={{ fontSize: 'clamp(28px, 3.4vw, 40px)', fontWeight: 700, letterSpacing: '-0.02em', color: T.ink, marginBottom: 14, textAlign: 'center' }}>
          Simple pricing, no surprises.
        </h1>
        <p style={{ fontSize: 16, color: T.body, textAlign: 'center', maxWidth: 480, margin: '0 auto' }}>
          Free to try on your own. Pay only when your team needs to share mocks and stay in sync.
        </p>
      </section>

      <section style={{ maxWidth: 1120, margin: '0 auto', padding: '48px 32px 96px' }}>
        <div className="ml-grid-3" style={{ gap: 24 }}>
          {tiers.map((t) => (
            <div key={t.name} style={{
              background: t.highlighted ? T.ink : T.panel,
              border: `1px solid ${t.highlighted ? T.ink : T.line}`,
              borderRadius: 10,
              padding: '32px 26px',
              display: 'flex',
              flexDirection: 'column',
            }}>
              <h3 className="ml-display" style={{ fontSize: 15, fontWeight: 600, color: t.highlighted ? T.paper : T.ink, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{t.name}</h3>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 4 }}>
                <span className="ml-display" style={{ fontSize: 38, fontWeight: 700, color: t.highlighted ? T.paper : T.ink }}>{t.price}</span>
              </div>
              <p className="ml-mono" style={{ fontSize: 12.5, color: t.highlighted ? '#9AA192' : T.wait, marginBottom: 26 }}>{t.sub}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28, flex: 1 }}>
                {t.features.map((f) => (
                  <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 9 }}>
                    <Check size={15} color={t.highlighted ? T.signal : T.signalDeep} style={{ flexShrink: 0, marginTop: 2 }} />
                    <span style={{ fontSize: 13.5, color: t.highlighted ? '#DADDD1' : T.body, lineHeight: 1.4 }}>{f}</span>
                  </div>
                ))}
              </div>
              <Link
                to={t.to}
                className="ml-btn"
                style={{
                  justifyContent: 'center',
                  background: t.highlighted ? T.signal : 'transparent',
                  borderColor: t.highlighted ? T.signal : T.ink,
                  color: t.highlighted ? `${T.ink} !important` : `${T.ink} !important`,
                }}
              >
                {t.cta} <ArrowRight size={15} />
              </Link>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
