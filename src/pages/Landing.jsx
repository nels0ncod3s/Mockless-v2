import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Braces, GitBranch, Users, ShieldAlert, Timer, Check, Copy } from 'lucide-react';
import { T, NAV_H } from '../theme';
import { GlobalStyle, Nav, Footer } from '../components/SiteChrome';

function RaceVisual() {
  const [waitMs, setWaitMs] = useState(0);
  const [cycle, setCycle] = useState(0);
  useEffect(() => {
    const start = Date.now();
    const iv = setInterval(() => {
      const elapsed = Date.now() - start - cycle * 2600;
      if (elapsed >= 2600) { setCycle(c => c + 1); }
      else { setWaitMs(elapsed); }
    }, 40);
    return () => clearInterval(iv);
  }, [cycle]);
  const mockMs = 8 + (cycle * 7) % 19;

  return (
    <div className="ml-mono" style={{ background: T.ink, borderRadius: 8, padding: '22px 24px', width: '100%', maxWidth: 440 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18, opacity: 0.55 }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#E24B4A', flexShrink: 0 }} />
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#EF9F27', flexShrink: 0 }} />
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#639922', flexShrink: 0 }} />
        <span style={{ fontSize: 11, color: '#B8BCB0', marginLeft: 6 }}>GET /api/checkout/summary</span>
      </div>

      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 11, color: '#8A9080', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.04em' }}>real backend</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 12, height: 12, border: `2px solid ${T.wait}`, borderTopColor: 'transparent', borderRadius: '50%', animation: waitMs < 2600 ? 'ml-spin 0.7s linear infinite' : 'none', flexShrink: 0 }} />
          <span style={{ fontSize: 13, color: '#DADDD1' }}>waiting on staging &middot; {(waitMs / 1000).toFixed(1)}s</span>
        </div>
      </div>

      <div style={{ height: 1, background: '#2A3129', margin: '14px 0' }} />

      <div>
        <div style={{ fontSize: 11, color: '#8A9080', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.04em' }}>mockless</div>
        <div key={cycle} style={{ display: 'flex', alignItems: 'center', gap: 10, animation: 'ml-flash 2.6s ease forwards' }}>
          <span style={{ width: 14, height: 14, borderRadius: '50%', background: T.signal, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Check size={10} color={T.ink} strokeWidth={3} />
          </span>
          <span style={{ fontSize: 13, color: T.signal, fontWeight: 600 }}>200 OK &middot; {mockMs}ms</span>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="ml-hero-section" style={{
      minHeight: `calc(100vh - ${NAV_H}px)`,
      display: 'flex',
      alignItems: 'center',
      maxWidth: 1120, margin: '0 auto', padding: '40px 32px',
    }}>
      <div className="ml-hero-grid" style={{ gap: 48, alignItems: 'center', width: '100%' }}>
        <div>
          <div className="ml-mono" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 12.5, color: T.wait, border: `1px solid ${T.line}`, borderRadius: 4, padding: '5px 10px', marginBottom: 22 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: T.success, flexShrink: 0 }} />
            $ mockless serve --watch
          </div>
          <h1 className="ml-display" style={{ fontSize: 'clamp(34px, 4vw, 50px)', fontWeight: 700, lineHeight: 1.06, letterSpacing: '-0.02em', color: T.ink, marginBottom: 20 }}>
            Ship the frontend before the backend exists.
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: T.body, maxWidth: 440, marginBottom: 28 }}>
            Mockless spins up realistic API mocks from your schema in seconds, so you can build, test, and demo real UI flows without a single backend endpoint running.
          </p>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
            <Link to="/dashboard" className="ml-btn ml-btn-primary">Start mocking free <ArrowRight size={16} /></Link>
            <Link to="/docs" className="ml-btn ml-btn-ghost"><span className="ml-mono">&gt;_</span> Read the docs</Link>
          </div>
          <p className="ml-mono" style={{ fontSize: 12.5, color: T.wait, marginTop: 16 }}>no backend required &middot; works with any framework &middot; free for solo devs</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', minWidth: 0 }}>
          <RaceVisual />
        </div>
      </div>
    </section>
  );
}

function TheWait() {
  const blockers = [
    { icon: <Timer size={18} />, title: 'The endpoint isn\u2019t built yet', body: 'Backend is still two sprints out, but design review is tomorrow.' },
    { icon: <ShieldAlert size={18} />, title: 'Staging is down again', body: 'You\u2019re blocked by an environment you don\u2019t control.' },
    { icon: <GitBranch size={18} />, title: 'The contract keeps changing', body: 'Every API shift means re-wiring components before you can even test them.' },
  ];
  return (
    <section style={{ borderTop: `1px solid ${T.line}`, borderBottom: `1px solid ${T.line}`, background: T.panel }}>
      <div style={{ maxWidth: 1120, margin: '0 auto', padding: '72px 32px' }}>
        <p className="ml-mono" style={{ fontSize: 12.5, color: T.signalDeep, marginBottom: 10 }}>// the problem</p>
        <h2 className="ml-display" style={{ fontSize: 'clamp(24px, 2.6vw, 32px)', fontWeight: 600, letterSpacing: '-0.01em', color: T.ink, marginBottom: 44, maxWidth: 560 }}>
          Frontend work keeps stalling on things frontend devs don't control.
        </h2>
        <div className="ml-grid-3" style={{ gap: 1, background: T.line }}>
          {blockers.map((b, i) => (
            <div key={i} style={{ background: T.panel, padding: '28px 26px' }}>
              <div style={{ color: T.signalDeep, marginBottom: 16 }}>{b.icon}</div>
              <h3 className="ml-display" style={{ fontSize: 16.5, fontWeight: 600, color: T.ink, marginBottom: 8 }}>{b.title}</h3>
              <p style={{ fontSize: 14.5, color: T.body, lineHeight: 1.55 }}>{b.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: '01', title: 'Define the shape', body: 'Write a mock schema by hand, or point Mockless at an OpenAPI spec and it generates one for you.', code: 'GET /users/:id\n  \u2192 200 { id, name, email }' },
    { n: '02', title: 'Run the mock server', body: 'One command starts a local server that answers exactly like your real API will \u2014 status codes, headers, latency and all.', code: '$ mockless serve\n\u2713 listening on :4000' },
    { n: '03', title: 'Point your app at it', body: 'Swap your API base URL for the mock server. Your components, hooks, and tests behave exactly as they will in production.', code: 'VITE_API_URL=\n  localhost:4000' },
  ];
  return (
    <section id="how" style={{ maxWidth: 1120, margin: '0 auto', padding: '96px 32px' }}>
      <p className="ml-mono" style={{ fontSize: 12.5, color: T.signalDeep, marginBottom: 10 }}>// how it works</p>
      <h2 className="ml-display" style={{ fontSize: 'clamp(24px, 2.6vw, 32px)', fontWeight: 600, letterSpacing: '-0.01em', color: T.ink, marginBottom: 48 }}>Three commands between you and a working UI.</h2>
      <div className="ml-grid-3" style={{ gap: 32 }}>
        {steps.map((s) => (
          <div key={s.n}>
            <div className="ml-display" style={{ fontSize: 13, fontWeight: 700, color: T.signal, marginBottom: 14 }}>{s.n}</div>
            <h3 className="ml-display" style={{ fontSize: 19, fontWeight: 600, color: T.ink, marginBottom: 10 }}>{s.title}</h3>
            <p style={{ fontSize: 14.5, lineHeight: 1.6, color: T.body, marginBottom: 18 }}>{s.body}</p>
            <pre className="ml-mono" style={{ background: T.ink, color: '#C9D6BE', fontSize: 12.5, padding: '14px 16px', borderRadius: 4, lineHeight: 1.6, whiteSpace: 'pre-wrap', margin: 0 }}>{s.code}</pre>
          </div>
        ))}
      </div>
    </section>
  );
}

function Features() {
  const feats = [
    { icon: <Zap size={20} />, title: 'Latency & error simulation', body: 'Dial in real-world slowness, timeouts, and 4xx/5xx responses to see how your UI actually behaves under bad conditions.' },
    { icon: <Braces size={20} />, title: 'Generate mocks from OpenAPI', body: 'Already have a spec? Import it and get a full set of realistic mock endpoints instantly.' },
    { icon: <GitBranch size={20} />, title: 'Shareable mock environments', body: 'Push a mock config to a URL your teammates or designers can hit \u2014 no local setup required.' },
    { icon: <Users size={20} />, title: 'Team sync', body: 'Keep mock definitions in version control alongside your frontend code, reviewed like any other PR.' },
    { icon: <Timer size={20} />, title: 'Stateful scenarios', body: 'Simulate multi-step flows \u2014 empty cart, then full cart, then checkout failure \u2014 without touching a real database.' },
    { icon: <ShieldAlert size={20} />, title: 'CLI + SDK', body: 'Drop into any framework with a lightweight SDK, or run the standalone server from your terminal.' },
  ];
  return (
    <section id="features" style={{ borderTop: `1px solid ${T.line}`, background: T.panel }}>
      <div style={{ maxWidth: 1120, margin: '0 auto', padding: '96px 32px' }}>
        <p className="ml-mono" style={{ fontSize: 12.5, color: T.signalDeep, marginBottom: 10 }}>// everything you need</p>
        <h2 className="ml-display" style={{ fontSize: 'clamp(24px, 2.6vw, 32px)', fontWeight: 600, letterSpacing: '-0.01em', color: T.ink, marginBottom: 48, maxWidth: 560 }}>Built for the way frontend teams actually work.</h2>
        <div className="ml-grid-3" style={{ gap: 28 }}>
          {feats.map((f, i) => (
            <div key={i} style={{ background: T.paper, border: `1px solid ${T.line}`, borderRadius: 8, padding: '24px 22px' }}>
              <div style={{ color: T.signalDeep, marginBottom: 14 }}>{f.icon}</div>
              <h3 className="ml-display" style={{ fontSize: 16, fontWeight: 600, color: T.ink, marginBottom: 8 }}>{f.title}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.55, color: T.body }}>{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CodeShowcase() {
  const [copied, setCopied] = useState(false);
  const snippet = `mockless init
mockless add GET /api/orders --schema orders.json
mockless serve --latency 120 --error-rate 0.05`;
  return (
    <section style={{ maxWidth: 1120, margin: '0 auto', padding: '96px 32px' }}>
      <div className="ml-grid-2" style={{ gap: 48, alignItems: 'center' }}>
        <div>
          <p className="ml-mono" style={{ fontSize: 12.5, color: T.signalDeep, marginBottom: 10 }}>// three lines in</p>
          <h2 className="ml-display" style={{ fontSize: 'clamp(22px, 2.4vw, 30px)', fontWeight: 600, letterSpacing: '-0.01em', color: T.ink, marginBottom: 18 }}>From empty project to mocked API before your coffee's cold.</h2>
          <p style={{ fontSize: 15, lineHeight: 1.6, color: T.body }}>Install the CLI, describe an endpoint, and start serving it with realistic latency and failure rates baked in.</p>
        </div>
        <div className="ml-mono" style={{ background: T.ink, borderRadius: 8, padding: '20px 22px', position: 'relative', minWidth: 0 }}>
          <button onClick={() => setCopied(true)} style={{ position: 'absolute', top: 14, right: 14, background: 'transparent', border: 'none', cursor: 'pointer', color: '#B8BCB0', display: 'flex', alignItems: 'center', gap: 6, fontSize: 11.5 }}>
            {copied ? <Check size={13} color={T.success} /> : <Copy size={13} />} {copied ? 'copied' : 'copy'}
          </button>
          <pre style={{ color: '#C9D6BE', fontSize: 13.5, lineHeight: 2, whiteSpace: 'pre-wrap', margin: 0 }}>{snippet}</pre>
        </div>
      </div>
    </section>
  );
}

function Quote() {
  return (
    <section style={{ borderTop: `1px solid ${T.line}`, borderBottom: `1px solid ${T.line}`, background: T.panel }}>
      <div style={{ maxWidth: 780, margin: '0 auto', padding: '80px 32px', textAlign: 'center' }}>
        <p className="ml-display" style={{ fontSize: 'clamp(19px, 2.2vw, 24px)', fontWeight: 500, lineHeight: 1.5, letterSpacing: '-0.01em', color: T.ink, marginBottom: 22, textAlign: 'center' }}>
          "We used to block half the sprint on backend availability. Now the frontend team ships against mocks and swaps the base URL when the real API lands."
        </p>
        <p className="ml-mono" style={{ fontSize: 13, color: T.wait, textAlign: 'center' }}>frontend lead, seed-stage fintech startup</p>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section style={{ maxWidth: 1120, margin: '0 auto', padding: '96px 32px', textAlign: 'center' }}>
      <h2 className="ml-display" style={{ fontSize: 'clamp(26px, 3vw, 36px)', fontWeight: 600, letterSpacing: '-0.01em', color: T.ink, marginBottom: 16, textAlign: 'center' }}>Stop waiting on a backend to build your frontend.</h2>
      <p style={{ fontSize: 16, color: T.body, marginBottom: 32, textAlign: 'center' }}>Free for solo developers. No credit card required.</p>
      <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link to="/dashboard" className="ml-btn ml-btn-primary">Start mocking free <ArrowRight size={16} /></Link>
        <Link to="/docs" className="ml-btn ml-btn-ghost">View documentation</Link>
      </div>
    </section>
  );
}

export default function MocklessLanding() {
  return (
    <div className="ml-root">
      <GlobalStyle />
      <Nav />
      <Hero />
      <TheWait />
      <HowItWorks />
      <Features />
      <CodeShowcase />
      <Quote />
      <FinalCTA />
      <Footer />
    </div>
  );
}
