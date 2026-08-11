import React, { useState, useEffect } from 'react';
import { ArrowRight, Zap, Braces, GitBranch, Users, ShieldAlert, Timer, Check, Copy } from 'lucide-react';

const TOKENS = {
  ink: '#14181F',
  paper: '#EAEEE6',
  paperDeep: '#DCE1D6',
  panel: '#F6F8F2',
  line: '#C4CBBC',
  signal: '#E85D2C',
  signalDeep: '#B8461E',
  wait: '#6B7178',
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
      @keyframes ml-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
      @keyframes ml-flash { 0% { opacity: 0; transform: scale(.94); } 12% { opacity: 1; transform: scale(1); } 78% { opacity: 1; } 100% { opacity: 0; } }
    `}</style>
  );
}

function Nav() {
  return (
    <nav style={{ position: 'sticky', top: 0, zIndex: 20, background: `${TOKENS.paper}F0`, backdropFilter: 'blur(6px)', borderBottom: `1px solid ${TOKENS.line}` }}>
      <div style={{ maxWidth: 1120, margin: '0 auto', padding: '18px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 22, height: 22, background: TOKENS.ink, borderRadius: 4, position: 'relative' }}>
            <div style={{ position: 'absolute', inset: 5, background: TOKENS.signal, borderRadius: 1 }} />
          </div>
          <span className="ml-display" style={{ fontWeight: 700, fontSize: 19, letterSpacing: '-0.02em' }}>mockless</span>
        </div>
        <div className="ml-mono" style={{ display: 'flex', gap: 32, fontSize: 13.5, color: TOKENS.wait }}>
          <a href="#how">how it works</a>
          <a href="#features">features</a>
          <a href="/pricing">pricing</a>
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
    <div className="ml-mono" style={{ background: TOKENS.ink, borderRadius: 6, padding: '22px 24px', width: '100%', maxWidth: 480 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18, opacity: 0.5 }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#E24B4A' }} />
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#EF9F27' }} />
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#639922' }} />
        <span style={{ fontSize: 11, color: '#8A9080', marginLeft: 6 }}>GET /api/checkout/summary</span>
      </div>

      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 11, color: '#8A9080', marginBottom: 6 }}>real backend</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 12, height: 12, border: `2px solid ${TOKENS.wait}`, borderTopColor: 'transparent', borderRadius: '50%', animation: waitMs < 2600 ? 'ml-spin 0.7s linear infinite' : 'none' }} />
          <span style={{ fontSize: 13, color: '#B8BCB0' }}>waiting on staging&nbsp;&middot;&nbsp;{(waitMs / 1000).toFixed(1)}s</span>
        </div>
      </div>

      <div style={{ height: 1, background: '#2A3129', margin: '14px 0' }} />

      <div>
        <div style={{ fontSize: 11, color: '#8A9080', marginBottom: 6 }}>mockless</div>
        <div key={cycle} style={{ display: 'flex', alignItems: 'center', gap: 10, animation: 'ml-flash 2.6s ease forwards' }}>
          <span style={{ width: 14, height: 14, borderRadius: '50%', background: TOKENS.signal, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Check size={10} color={TOKENS.ink} strokeWidth={3} />
          </span>
          <span style={{ fontSize: 13, color: TOKENS.signal, fontWeight: 600 }}>200 OK &middot; {mockMs}ms</span>
        </div>
      </div>
      <style>{`@keyframes ml-spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function Hero() {
  return (
    <section style={{ maxWidth: 1120, margin: '0 auto', padding: '88px 32px 96px', display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 56, alignItems: 'center' }}>
      <div>
        <div className="ml-mono" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 12.5, color: TOKENS.wait, border: `1px solid ${TOKENS.line}`, borderRadius: 3, padding: '5px 10px', marginBottom: 24 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: TOKENS.success }} />
          $ mockless serve --watch
        </div>
        <h1 className="ml-display" style={{ fontSize: 54, fontWeight: 700, lineHeight: 1.04, letterSpacing: '-0.02em', marginBottom: 22 }}>
          Ship the frontend<br />before the backend<br />exists.
        </h1>
        <p style={{ fontSize: 17.5, lineHeight: 1.6, color: '#3D4339', maxWidth: 460, marginBottom: 32 }}>
          Mockless spins up realistic API mocks from your schema in seconds, so you can build, test, and demo real UI flows without a single backend endpoint running.
        </p>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
          <button className="ml-btn ml-btn-primary">Start mocking free <ArrowRight size={16} /></button>
          <button className="ml-btn ml-btn-ghost">Read the docs</button>
        </div>
        <p className="ml-mono" style={{ fontSize: 12.5, color: TOKENS.wait, marginTop: 18 }}>no backend required &middot; works with any framework &middot; free for solo devs</p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <RaceVisual />
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
    <section style={{ borderTop: `1px solid ${TOKENS.line}`, borderBottom: `1px solid ${TOKENS.line}`, background: TOKENS.panel }}>
      <div style={{ maxWidth: 1120, margin: '0 auto', padding: '72px 32px' }}>
        <p className="ml-mono" style={{ fontSize: 12.5, color: TOKENS.signalDeep, marginBottom: 10 }}>// the problem</p>
        <h2 className="ml-display" style={{ fontSize: 32, fontWeight: 600, letterSpacing: '-0.01em', marginBottom: 44, maxWidth: 560 }}>
          Frontend work keeps stalling on things frontend devs don't control.
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: TOKENS.line }}>
          {blockers.map((b, i) => (
            <div key={i} style={{ background: TOKENS.panel, padding: '28px 26px' }}>
              <div style={{ color: TOKENS.signalDeep, marginBottom: 16 }}>{b.icon}</div>
              <h3 className="ml-display" style={{ fontSize: 16.5, fontWeight: 600, marginBottom: 8 }}>{b.title}</h3>
              <p style={{ fontSize: 14.5, color: '#4A5040', lineHeight: 1.55 }}>{b.body}</p>
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
      <p className="ml-mono" style={{ fontSize: 12.5, color: TOKENS.signalDeep, marginBottom: 10 }}>// how it works</p>
      <h2 className="ml-display" style={{ fontSize: 32, fontWeight: 600, letterSpacing: '-0.01em', marginBottom: 48 }}>Three commands between you and a working UI.</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
        {steps.map((s) => (
          <div key={s.n}>
            <div className="ml-display" style={{ fontSize: 13, fontWeight: 700, color: TOKENS.signal, marginBottom: 14 }}>{s.n}</div>
            <h3 className="ml-display" style={{ fontSize: 19, fontWeight: 600, marginBottom: 10 }}>{s.title}</h3>
            <p style={{ fontSize: 14.5, lineHeight: 1.6, color: '#3D4339', marginBottom: 18 }}>{s.body}</p>
            <pre className="ml-mono" style={{ background: TOKENS.ink, color: '#C9D6BE', fontSize: 12.5, padding: '14px 16px', borderRadius: 4, lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{s.code}</pre>
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
    <section id="features" style={{ borderTop: `1px solid ${TOKENS.line}`, background: TOKENS.panel }}>
      <div style={{ maxWidth: 1120, margin: '0 auto', padding: '96px 32px' }}>
        <p className="ml-mono" style={{ fontSize: 12.5, color: TOKENS.signalDeep, marginBottom: 10 }}>// everything you need</p>
        <h2 className="ml-display" style={{ fontSize: 32, fontWeight: 600, letterSpacing: '-0.01em', marginBottom: 48, maxWidth: 560 }}>Built for the way frontend teams actually work.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
          {feats.map((f, i) => (
            <div key={i} style={{ background: TOKENS.paper, border: `1px solid ${TOKENS.line}`, borderRadius: 6, padding: '24px 22px' }}>
              <div style={{ color: TOKENS.signalDeep, marginBottom: 14 }}>{f.icon}</div>
              <h3 className="ml-display" style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{f.title}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.55, color: '#4A5040' }}>{f.body}</p>
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
      <div style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 56, alignItems: 'center' }}>
        <div>
          <p className="ml-mono" style={{ fontSize: 12.5, color: TOKENS.signalDeep, marginBottom: 10 }}>// three lines in</p>
          <h2 className="ml-display" style={{ fontSize: 30, fontWeight: 600, letterSpacing: '-0.01em', marginBottom: 18 }}>From empty project to mocked API before your coffee's cold.</h2>
          <p style={{ fontSize: 15, lineHeight: 1.6, color: '#3D4339' }}>Install the CLI, describe an endpoint, and start serving it with realistic latency and failure rates baked in.</p>
        </div>
        <div className="ml-mono" style={{ background: TOKENS.ink, borderRadius: 6, padding: '20px 22px', position: 'relative' }}>
          <button onClick={() => setCopied(true)} style={{ position: 'absolute', top: 14, right: 14, background: 'transparent', border: 'none', cursor: 'pointer', color: '#8A9080', display: 'flex', alignItems: 'center', gap: 6, fontSize: 11.5 }}>
            {copied ? <Check size={13} color={TOKENS.success} /> : <Copy size={13} />} {copied ? 'copied' : 'copy'}
          </button>
          <pre style={{ color: '#C9D6BE', fontSize: 13.5, lineHeight: 2, whiteSpace: 'pre-wrap' }}>{snippet}</pre>
        </div>
      </div>
    </section>
  );
}

function Quote() {
  return (
    <section style={{ borderTop: `1px solid ${TOKENS.line}`, borderBottom: `1px solid ${TOKENS.line}`, background: TOKENS.panel }}>
      <div style={{ maxWidth: 780, margin: '0 auto', padding: '80px 32px', textAlign: 'center' }}>
        <p className="ml-display" style={{ fontSize: 24, fontWeight: 500, lineHeight: 1.5, letterSpacing: '-0.01em', marginBottom: 22 }}>
          "We used to block half the sprint on backend availability. Now the frontend team ships against mocks and swaps the base URL when the real API lands."
        </p>
        <p className="ml-mono" style={{ fontSize: 13, color: TOKENS.wait }}>frontend lead, seed-stage fintech startup</p>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section style={{ maxWidth: 1120, margin: '0 auto', padding: '96px 32px', textAlign: 'center' }}>
      <h2 className="ml-display" style={{ fontSize: 36, fontWeight: 600, letterSpacing: '-0.01em', marginBottom: 16 }}>Stop waiting on a backend to build your frontend.</h2>
      <p style={{ fontSize: 16, color: '#3D4339', marginBottom: 32 }}>Free for solo developers. No credit card required.</p>
      <div style={{ display: 'flex', gap: 14, justifyContent: 'center' }}>
        <button className="ml-btn ml-btn-primary">Start mocking free <ArrowRight size={16} /></button>
        <button className="ml-btn ml-btn-ghost">View documentation</button>
      </div>
    </section>
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
