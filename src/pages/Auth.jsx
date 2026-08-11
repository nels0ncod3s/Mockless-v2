import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight, ArrowLeft, Check, Star } from 'lucide-react';
import { T } from '../theme';

function GlobalStyle() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Inter:wght@400;500;600&display=swap');
      .au-root, .au-root * { box-sizing: border-box; }
      .au-root { font-family: 'Inter', sans-serif; margin: 0; width: 100%; height: 100vh; overflow: hidden; display: flex; }
      .au-root h1, .au-root h2, .au-root p, .au-root span, .au-root a, .au-root label, .au-root li {
        margin: 0; font-weight: 400; text-align: left; line-height: normal;
      }
      .au-mono { font-family: 'JetBrains Mono', monospace; }
      .au-display { font-family: 'Space Grotesk', sans-serif; }
      .au-root a { text-decoration: none; }
      .au-root input { font-family: 'Inter', sans-serif; }
      .au-underline {
        width: 100%; border: none; border-bottom: 1.5px solid ${T.line}; border-radius: 0; padding: 9px 2px;
        font-size: 14.5px; color: ${T.ink}; background: transparent; outline: none; transition: border-color .15s ease;
      }
      .au-underline:focus { border-bottom-color: ${T.signal}; }
      .au-tab { flex: 1; text-align: center; padding: 9px 0; border-radius: 5px; font-family: 'Space Grotesk', sans-serif; font-weight: 600; font-size: 13.5px; cursor: pointer; border: none; background: transparent; color: ${T.wait}; }
      .au-tab.active { background: ${T.ink}; color: ${T.paper}; }
      .au-submit { width: 100%; display: flex; align-items: center; justify-content: center; gap: 8px; background: ${T.ink}; color: ${T.paper}; border: none; border-radius: 6px; padding: 12px 0; font-family: 'Space Grotesk', sans-serif; font-weight: 600; font-size: 15px; cursor: pointer; transition: background .15s ease, transform .15s ease; }
      .au-submit:hover { background: #262c36; transform: translateY(-1px); }
      .au-eye { background: none; border: none; cursor: pointer; color: ${T.wait}; display: flex; padding: 2px; }
      .au-back { display: inline-flex; align-items: center; gap: 6px; color: ${T.wait} !important; font-size: 13px; transition: color .15s ease; }
      .au-back:hover { color: ${T.ink} !important; }
      .au-checkbox { width: 15px; height: 15px; accent-color: ${T.signal}; cursor: pointer; flex-shrink: 0; }
      .au-side { display: flex; }
      @keyframes au-spin { to { transform: rotate(360deg); } }
      @keyframes au-flash { 0% { opacity: 0; transform: scale(.94); } 12% { opacity: 1; transform: scale(1); } 78% { opacity: 1; } 100% { opacity: 0; } }

      @media (max-width: 880px) {
        .au-side { display: none; }
        .au-form-panel { width: 100% !important; }
      }
    `}</style>
  );
}

function RacePreview() {
  const [waitMs, setWaitMs] = React.useState(0);
  const [cycle, setCycle] = React.useState(0);
  React.useEffect(() => {
    const start = Date.now();
    const iv = setInterval(() => {
      const elapsed = Date.now() - start - cycle * 2600;
      if (elapsed >= 2600) { setCycle(c => c + 1); } else { setWaitMs(elapsed); }
    }, 40);
    return () => clearInterval(iv);
  }, [cycle]);
  const mockMs = 8 + (cycle * 7) % 19;
  return (
    <div className="au-mono" style={{ background: '#1B2028', border: '1px solid #2A3129', borderRadius: 10, padding: '22px 24px', width: '100%', maxWidth: 380 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18, opacity: 0.55 }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#E24B4A', flexShrink: 0 }} />
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#EF9F27', flexShrink: 0 }} />
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#639922', flexShrink: 0 }} />
        <span style={{ fontSize: 11, color: '#8A9080', marginLeft: 6 }}>GET /api/checkout/summary</span>
      </div>
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 11, color: '#8A9080', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.04em' }}>real backend</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 12, height: 12, border: '2px solid #5B6154', borderTopColor: 'transparent', borderRadius: '50%', animation: waitMs < 2600 ? 'au-spin 0.7s linear infinite' : 'none', flexShrink: 0 }} />
          <span style={{ fontSize: 13, color: '#B8BCB0' }}>waiting on staging &middot; {(waitMs / 1000).toFixed(1)}s</span>
        </div>
      </div>
      <div style={{ height: 1, background: '#2A3129', margin: '14px 0' }} />
      <div>
        <div style={{ fontSize: 11, color: '#8A9080', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.04em' }}>mockless</div>
        <div key={cycle} style={{ display: 'flex', alignItems: 'center', gap: 10, animation: 'au-flash 2.6s ease forwards' }}>
          <span style={{ width: 14, height: 14, borderRadius: '50%', background: T.signal, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Check size={10} color={T.ink} strokeWidth={3} />
          </span>
          <span style={{ fontSize: 13, color: T.signal, fontWeight: 600 }}>200 OK &middot; {mockMs}ms</span>
        </div>
      </div>
    </div>
  );
}

function Stars({ value }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {[0, 1, 2, 3, 4].map(i => (
        <Star key={i} size={11} fill={i < Math.round(value) ? '#E8C547' : 'none'} color="#E8C547" />
      ))}
    </div>
  );
}

export default function Auth() {
  const [mode, setMode] = useState('signin'); // 'signin' | 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();

  const isSignup = mode === 'signup';

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="au-root">
      <GlobalStyle />

      {/* Left: form */}
      <div className="au-form-panel" style={{ width: '46%', minWidth: 0, background: T.paper, display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto' }}>
        <div style={{ padding: '24px 32px 0' }}>
          <Link to="/" className="au-back">
            <ArrowLeft size={14} /> Back to home
          </Link>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', padding: '32px 32px 40px' }}>
          <div style={{ width: '100%', maxWidth: 360, marginTop: 24 }}>
            <h1 className="au-display" style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em', color: T.ink, marginBottom: 6 }}>
              {isSignup ? 'Get started with Mockless' : 'Welcome back'}
            </h1>
            <p style={{ fontSize: 13.5, color: T.wait, marginBottom: 20, lineHeight: 1.5 }}>
              {isSignup ? 'Create an account and start mocking APIs in minutes.' : 'Sign in to your Mockless dashboard.'}
            </p>

            <div style={{ display: 'flex', gap: 4, background: T.panel, border: `1px solid ${T.line}`, borderRadius: 7, padding: 4, marginBottom: 22 }}>
              <button type="button" className={`au-tab ${!isSignup ? 'active' : ''}`} onClick={() => setMode('signin')}>Sign in</button>
              <button type="button" className={`au-tab ${isSignup ? 'active' : ''}`} onClick={() => setMode('signup')}>Sign up</button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label className="au-mono" style={{ display: 'block', fontSize: 11.5, color: T.wait, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.03em' }}>Email</label>
                <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@company.com" className="au-underline" />
              </div>

              <div>
                <label className="au-mono" style={{ display: 'block', fontSize: 11.5, color: T.wait, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.03em' }}>Password</label>
                <div style={{ position: 'relative' }}>
                  <input type={showPw ? 'text' : 'password'} required value={password} onChange={e => setPassword(e.target.value)} placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" className="au-underline" style={{ paddingRight: 30 }} />
                  <button type="button" onClick={() => setShowPw(s => !s)} className="au-eye" style={{ position: 'absolute', right: 2, top: '50%', transform: 'translateY(-50%)' }} aria-label="Toggle password visibility">
                    {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>

                {!isSignup && (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 12.5, color: T.wait, cursor: 'pointer' }}>
                      <input type="checkbox" className="au-checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} />
                      Remember me
                    </label>
                    <a href="#" className="au-mono" style={{ fontSize: 12, color: T.signalDeep }}>Forgot password?</a>
                  </div>
                )}
              </div>

              {isSignup && (
                <div>
                  <label className="au-mono" style={{ display: 'block', fontSize: 11.5, color: T.wait, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.03em' }}>Confirm password</label>
                  <input type={showPw ? 'text' : 'password'} required value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" className="au-underline" />
                </div>
              )}

              <button type="submit" className="au-submit" style={{ marginTop: 8 }}>
                {isSignup ? 'Create account' : 'Sign in'} <ArrowRight size={16} />
              </button>
            </form>

            <p style={{ fontSize: 12, color: T.wait, textAlign: 'center', lineHeight: 1.6, marginTop: 18 }}>
              By continuing, you agree to Mockless's{' '}
              <a href="#" style={{ color: T.ink, textDecoration: 'underline' }}>Terms of Service</a> and{' '}
              <a href="#" style={{ color: T.ink, textDecoration: 'underline' }}>Privacy Policy</a>.
            </p>

            <p className="au-mono" style={{ fontSize: 13, color: T.wait, textAlign: 'center', marginTop: 14 }}>
              {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button type="button" onClick={() => setMode(isSignup ? 'signin' : 'signup')} style={{ background: 'none', border: 'none', color: T.signalDeep, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', fontSize: 13 }}>
                {isSignup ? 'Sign in' : 'Sign up free'}
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Right: showcase */}
      <div className="au-side" style={{ width: '54%', background: T.ink, flexDirection: 'column', justifyContent: 'space-between', padding: '48px 56px', position: 'relative', overflow: 'hidden' }}>
        <div
          style={{
            position: 'absolute', inset: 0, opacity: 0.5,
            backgroundImage: `linear-gradient(#2A3129 1px, transparent 1px), linear-gradient(90deg, #2A3129 1px, transparent 1px)`,
            backgroundSize: '36px 36px',
            maskImage: 'radial-gradient(ellipse at 60% 30%, black 0%, transparent 70%)',
          }}
        />
        <div style={{ position: 'relative' }}>
          <p className="au-mono" style={{ fontSize: 12.5, color: T.signal, marginBottom: 14 }}>// mockless</p>
          <h2 className="au-display" style={{ fontSize: 30, fontWeight: 600, lineHeight: 1.2, letterSpacing: '-0.01em', color: '#EDEFEA', maxWidth: 420 }}>
            Ship the frontend before the backend exists.
          </h2>
        </div>

        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
          <RacePreview />
        </div>

        <div style={{ position: 'relative' }}>
          <p style={{ fontSize: 13, color: '#B8BCB0', marginBottom: 16 }}>Trusted by frontend teams shipping without backend blockers</p>
          <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span className="au-display" style={{ fontSize: 22, fontWeight: 700, color: '#EDEFEA' }}>4.9</span>
                <Stars value={4.9} />
              </div>
              <p className="au-mono" style={{ fontSize: 11.5, color: '#8A9080', marginTop: 3 }}>Product Hunt</p>
            </div>
            <div>
              <span className="au-display" style={{ fontSize: 22, fontWeight: 700, color: '#EDEFEA' }}>18k</span>
              <p className="au-mono" style={{ fontSize: 11.5, color: '#8A9080', marginTop: 3 }}>npm downloads / week</p>
            </div>
            <div>
              <span className="au-display" style={{ fontSize: 22, fontWeight: 700, color: '#EDEFEA' }}>2.3k</span>
              <p className="au-mono" style={{ fontSize: 11.5, color: '#8A9080', marginTop: 3 }}>GitHub stars</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
