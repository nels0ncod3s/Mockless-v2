import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { T, NAV_H } from '../theme';

export function GlobalStyle() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Inter:wght@400;500;600&display=swap');
      .ml-root, .ml-root * { box-sizing: border-box; }
      .ml-root { font-family: 'Inter', sans-serif; color: ${T.ink}; background: ${T.paper}; margin: 0; width: 100%; min-height: 100vh; overflow-x: hidden; }
      .ml-root h1, .ml-root h2, .ml-root h3, .ml-root p, .ml-root span, .ml-root a, .ml-root li, .ml-root button {
        margin: 0; color: ${T.ink}; font-weight: 400; text-align: left; line-height: normal;
      }
      .ml-mono { font-family: 'JetBrains Mono', monospace; }
      .ml-display { font-family: 'Space Grotesk', sans-serif; }
      .ml-root a { text-decoration: none; }
      .ml-btn { display: inline-flex; align-items: center; gap: 8px; font-family: 'Space Grotesk', sans-serif; font-weight: 600; font-size: 15px; padding: 12px 22px; border-radius: 4px; cursor: pointer; border: 1.5px solid ${T.ink}; transition: transform .15s ease, background .15s ease; }
      .ml-btn:hover { transform: translateY(-1px); }
      .ml-btn-primary { background: ${T.ink}; color: ${T.paper} !important; }
      .ml-btn-primary:hover { background: #262c36; }
      .ml-btn-ghost { background: transparent; color: ${T.ink} !important; }
      .ml-btn-ghost:hover { background: ${T.paperDeep}; }
      .ml-navlink { color: ${T.wait} !important; transition: color .15s ease; }
      .ml-navlink:hover { color: ${T.ink} !important; }
      @keyframes ml-spin { to { transform: rotate(360deg); } }
      @keyframes ml-flash { 0% { opacity: 0; transform: scale(.94); } 12% { opacity: 1; transform: scale(1); } 78% { opacity: 1; } 100% { opacity: 0; } }

      /* ---- responsive grid utilities shared across pages ---- */
      .ml-grid-3 { display: grid; grid-template-columns: repeat(3, minmax(0,1fr)); }
      .ml-grid-2 { display: grid; grid-template-columns: minmax(0,1fr) minmax(0,1fr); }
      .ml-hero-grid { display: grid; grid-template-columns: minmax(0,1.05fr) minmax(0,0.95fr); }
      .ml-desktop-nav { display: flex; }
      .ml-desktop-actions { display: flex; }
      .ml-hamburger { display: none; }
      .ml-mobile-menu { display: none; }

      @media (max-width: 860px) {
        .ml-grid-3 { grid-template-columns: 1fr; }
        .ml-grid-2 { grid-template-columns: 1fr; }
        .ml-hero-grid { grid-template-columns: 1fr; gap: 36px !important; }
        .ml-desktop-nav { display: none; }
        .ml-desktop-actions { display: none; }
        .ml-hamburger { display: flex; }
        .ml-hero-section { min-height: auto !important; padding-top: 44px !important; padding-bottom: 56px !important; }
        .ml-docs-grid { grid-template-columns: 1fr !important; gap: 28px !important; }
        .ml-docs-toc { position: static !important; flex-direction: row !important; flex-wrap: wrap; gap: 14px !important; }
        section { padding-left: 20px !important; padding-right: 20px !important; }
      }
      @media (max-width: 500px) {
        .ml-btn { width: 100%; justify-content: center; }
      }
    `}</style>
  );
}

export function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <nav style={{ position: 'sticky', top: 0, zIndex: 30, background: `${T.paper}F5`, backdropFilter: 'blur(6px)', borderBottom: `1px solid ${T.line}` }}>
      <div style={{ maxWidth: 1120, width: '100%', margin: '0 auto', padding: '0 32px', height: NAV_H, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link to="/" onClick={() => setOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 22, height: 22, background: T.ink, borderRadius: 4, position: 'relative', flexShrink: 0 }}>
            <div style={{ position: 'absolute', inset: 5, background: T.signal, borderRadius: 1 }} />
          </div>
          <span className="ml-display" style={{ fontWeight: 700, fontSize: 19, letterSpacing: '-0.02em', color: T.ink }}>mockless</span>
        </Link>
        <div className="ml-mono ml-desktop-nav" style={{ gap: 32, fontSize: 13.5 }}>
          <a className="ml-navlink" href="/#how">how it works</a>
          <a className="ml-navlink" href="/#features">features</a>
          <Link className="ml-navlink" to="/pricing">pricing</Link>
          <Link className="ml-navlink" to="/docs">docs</Link>
        </div>
        <div className="ml-desktop-actions" style={{ gap: 10 }}>
          <Link to="/login" className="ml-btn ml-btn-ghost" style={{ fontSize: 13.5, padding: '9px 16px' }}>Sign in</Link>
          <Link to="/signup" className="ml-btn ml-btn-primary" style={{ fontSize: 13.5, padding: '9px 16px' }}>Start free</Link>
        </div>
        <button
          className="ml-hamburger"
          onClick={() => setOpen(o => !o)}
          style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: T.ink, alignItems: 'center', justifyContent: 'center', padding: 6 }}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <div className="ml-mono" style={{ display: 'flex', flexDirection: 'column', borderTop: `1px solid ${T.line}`, background: T.paper, padding: '16px 20px 24px', gap: 4 }}>
          <a className="ml-navlink" href="/#how" onClick={() => setOpen(false)} style={{ padding: '10px 4px', fontSize: 15 }}>how it works</a>
          <a className="ml-navlink" href="/#features" onClick={() => setOpen(false)} style={{ padding: '10px 4px', fontSize: 15 }}>features</a>
          <Link className="ml-navlink" to="/pricing" onClick={() => setOpen(false)} style={{ padding: '10px 4px', fontSize: 15 }}>pricing</Link>
          <Link className="ml-navlink" to="/docs" onClick={() => setOpen(false)} style={{ padding: '10px 4px', fontSize: 15 }}>docs</Link>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 14 }}>
            <Link to="/login" onClick={() => setOpen(false)} className="ml-btn ml-btn-ghost" style={{ fontSize: 14, justifyContent: 'center' }}>Sign in</Link>
            <Link to="/signup" onClick={() => setOpen(false)} className="ml-btn ml-btn-primary" style={{ fontSize: 14, justifyContent: 'center' }}>Start free</Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export function Footer() {
  return (
    <footer style={{ borderTop: `1px solid ${T.line}` }}>
      <div style={{ maxWidth: 1120, margin: '0 auto', padding: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <Link to="/" className="ml-display" style={{ fontWeight: 700, fontSize: 15, color: T.ink }}>mockless</Link>
        <span className="ml-mono" style={{ fontSize: 12, color: T.wait }}>&copy; 2026 mockless. build the frontend first.</span>
      </div>
    </footer>
  );
}
