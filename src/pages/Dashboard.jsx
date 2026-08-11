import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutGrid, Waypoints, ScrollText, FolderKanban, Settings, Plus, Search,
  Copy, Check, ChevronDown, Circle, Menu, X, LogOut, Inbox, Radio
} from 'lucide-react';
import { T } from '../theme';

const methodColor = {
  GET: { fg: '#0C447C', bg: '#E6F1FB' },
  POST: { fg: '#27500A', bg: '#EAF3DE' },
  PUT: { fg: '#854F0B', bg: '#FAEEDA' },
  DELETE: { fg: '#791F1F', bg: '#FCEBEB' },
  PATCH: { fg: '#3C3489', bg: '#EEEDFE' },
};

const endpointPool = [
  { method: 'GET', path: '/api/checkout/summary', status: 200, latency: 120, enabled: true },
  { method: 'POST', path: '/api/checkout/submit', status: 201, latency: 340, enabled: true },
  { method: 'GET', path: '/api/users/:id', status: 200, latency: 60, enabled: true },
  { method: 'DELETE', path: '/api/cart/:itemId', status: 204, latency: 40, enabled: true },
  { method: 'PUT', path: '/api/profile', status: 200, latency: 150, enabled: true },
  { method: 'POST', path: '/api/auth/login', status: 401, latency: 80, enabled: true },
];

const logPool = [
  { method: 'GET', path: '/api/checkout/summary', status: 200, latency: 118, matched: true },
  { method: 'POST', path: '/api/checkout/submit', status: 201, latency: 352, matched: true },
  { method: 'GET', path: '/api/users/482/orders', status: 200, latency: 88, matched: true },
  { method: 'GET', path: '/api/reports/nightly', status: 404, latency: 6, matched: false },
  { method: 'POST', path: '/api/auth/login', status: 401, latency: 79, matched: true },
];

function GlobalStyle() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Inter:wght@400;500;600&display=swap');
      .md-root * { box-sizing: border-box; margin: 0; padding: 0; }
      .md-root { font-family: 'Inter', sans-serif; color: ${T.ink}; background: ${T.paper}; }
      .md-root h1, .md-root h2, .md-root h3, .md-root p, .md-root span, .md-root td, .md-root th, .md-root a, .md-root li {
        color: ${T.ink}; font-weight: 400; text-align: left;
      }
      .md-root button { font-family: inherit; cursor: pointer; }
      .md-navitem { display: flex; align-items: center; gap: 10px; padding: 9px 14px; border-radius: 4px; font-size: 13.5px; font-weight: 500; color: ${T.wait}; border: none; background: transparent; width: 100%; text-align: left; }
      .md-navitem:hover { background: ${T.paperDeep}; color: ${T.ink}; }
      .md-navitem.active { background: ${T.ink}; color: ${T.paper}; }
      .md-toggle { width: 34px; height: 19px; border-radius: 10px; border: none; position: relative; cursor: pointer; flex-shrink: 0; }
      .md-toggle .knob { position: absolute; top: 2px; width: 15px; height: 15px; border-radius: 50%; background: white; transition: left .15s ease; }
      table.md-table { width: 100%; border-collapse: collapse; font-size: 13.5px; }
      table.md-table th { text-align: left; font-size: 11.5px; text-transform: uppercase; letter-spacing: 0.04em; color: ${T.wait}; font-weight: 600; padding: 0 14px 10px; border-bottom: 1px solid ${T.line}; white-space: nowrap; }
      table.md-table td { padding: 13px 14px; border-bottom: 1px solid ${T.lineSoft}; vertical-align: middle; white-space: nowrap; }
      table.md-table tr:last-child td { border-bottom: none; }
      .md-table-scroll { overflow-x: auto; -webkit-overflow-scrolling: touch; }
      .md-stat-row { display: flex; gap: 14px; }
      .md-hamburger { display: none; }
      .md-sidebar { transition: transform .2s ease; }
      .md-scrim { display: none; }

      @media (max-width: 860px) {
        .md-stat-row { flex-direction: column; }
        .md-hamburger { display: flex; }
        .md-sidebar { position: fixed; top: 0; left: 0; height: 100vh; z-index: 50; transform: translateX(-100%); }
        .md-sidebar.open { transform: translateX(0); }
        .md-scrim.open { display: block; position: fixed; inset: 0; background: rgba(20,24,31,0.4); z-index: 40; }
        .md-content-pad { padding: 18px 16px !important; }
        .md-topbar { padding: 14px 16px !important; flex-wrap: wrap; gap: 10px; }
      }
    `}</style>
  );
}

function Badge({ text, fg, bg }) {
  return <span className="md-mono" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11.5, fontWeight: 600, color: fg, background: bg, padding: '3px 8px', borderRadius: 3, letterSpacing: '0.01em', whiteSpace: 'nowrap' }}>{text}</span>;
}

function Toggle({ on, onClick }) {
  return (
    <button className="md-toggle" onClick={onClick} style={{ background: on ? T.success : '#C6CCBC' }} aria-label="toggle endpoint">
      <span className="knob" style={{ left: on ? 17 : 2 }} />
    </button>
  );
}

function EmptyState({ icon, title, body, actionLabel, onAction, compact }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
      padding: compact ? '36px 20px' : '56px 24px', gap: 6,
    }}>
      <div style={{ width: 40, height: 40, borderRadius: 10, background: T.paperDeep, display: 'flex', alignItems: 'center', justifyContent: 'center', color: T.wait, marginBottom: 6 }}>
        {icon}
      </div>
      <p className="md-display" style={{ fontSize: 15, fontWeight: 600, color: T.ink }}>{title}</p>
      <p style={{ fontSize: 13, color: T.wait, maxWidth: 320, lineHeight: 1.5 }}>{body}</p>
      {actionLabel && (
        <button
          onClick={onAction}
          style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 6, background: T.ink, color: T.paper, border: 'none', borderRadius: 6, padding: '9px 16px', fontSize: 13, fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif" }}
        >
          <Plus size={14} /> {actionLabel}
        </button>
      )}
    </div>
  );
}

function Sidebar({ active, setActive, mobileOpen, setMobileOpen }) {
  const items = [
    { key: 'overview', label: 'Overview', icon: <LayoutGrid size={16} /> },
    { key: 'endpoints', label: 'Endpoints', icon: <Waypoints size={16} /> },
    { key: 'logs', label: 'Request logs', icon: <ScrollText size={16} /> },
    { key: 'environments', label: 'Environments', icon: <FolderKanban size={16} /> },
    { key: 'settings', label: 'Settings', icon: <Settings size={16} /> },
  ];
  return (
    <>
      {mobileOpen && <div className="md-scrim open" onClick={() => setMobileOpen(false)} />}
      <div className={`md-sidebar ${mobileOpen ? 'open' : ''}`} style={{
        width: 216, flexShrink: 0, borderRight: `1px solid ${T.line}`, background: T.panel,
        display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 14px 0' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
            <div style={{ width: 20, height: 20, background: T.ink, borderRadius: 4, position: 'relative', flexShrink: 0 }}>
              <div style={{ position: 'absolute', inset: 4, background: T.signal, borderRadius: 1 }} />
            </div>
            <span className="md-display" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 16, color: T.ink }}>mockless</span>
          </Link>
          <button className="md-hamburger" onClick={() => setMobileOpen(false)} style={{ background: 'none', border: 'none', color: T.wait }}>
            <X size={18} />
          </button>
        </div>

        <div style={{ padding: '20px 14px 0', display: 'flex', flexDirection: 'column', gap: 2, overflowY: 'auto', flex: 1, minHeight: 0 }}>
          {items.map(it => (
            <button key={it.key} className={`md-navitem ${active === it.key ? 'active' : ''}`} onClick={() => { setActive(it.key); setMobileOpen(false); }}>
              {it.icon}{it.label}
            </button>
          ))}
        </div>

        <div style={{ borderTop: `1px solid ${T.line}`, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          <div style={{ width: 30, height: 30, borderRadius: '50%', background: T.signal, color: T.ink, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 12.5, flexShrink: 0 }}>
            JD
          </div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: T.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Jordan Diaz</p>
            <p style={{ fontSize: 11.5, color: T.wait, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>jordan@mockless.dev</p>
          </div>
          <button aria-label="Log out" style={{ background: 'none', border: 'none', color: T.wait, padding: 6, flexShrink: 0, display: 'flex' }}>
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </>
  );
}

function TopBar({ onMenuClick }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="md-topbar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 28px', borderBottom: `1px solid ${T.line}` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <button className="md-hamburger" onClick={onMenuClick} style={{ background: T.white, border: `1px solid ${T.line}`, borderRadius: 5, padding: 7, color: T.ink }}>
          <Menu size={17} />
        </button>
        <button style={{ display: 'flex', alignItems: 'center', gap: 8, background: T.white, border: `1px solid ${T.line}`, borderRadius: 5, padding: '7px 12px' }}>
          <span className="md-display" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13.5, fontWeight: 600 }}>checkout-flow</span>
          <ChevronDown size={14} color={T.wait} />
        </button>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        <div className="md-mono" style={{ fontFamily: "'JetBrains Mono', monospace", display: 'flex', alignItems: 'center', gap: 7, fontSize: 12.5, color: T.body, background: T.successBg, padding: '6px 12px', borderRadius: 5 }}>
          <Circle size={7} fill={T.success} color={T.success} />
          mock server running &middot; localhost:4000
        </div>
        <button onClick={() => setCopied(true)} className="md-mono" style={{ fontFamily: "'JetBrains Mono', monospace", display: 'flex', alignItems: 'center', gap: 6, fontSize: 12.5, border: `1px solid ${T.line}`, background: T.white, borderRadius: 5, padding: '6px 12px', color: T.ink }}>
          {copied ? <Check size={13} color={T.success} /> : <Copy size={13} />} {copied ? 'copied' : 'copy base url'}
        </button>
      </div>
    </div>
  );
}

function StatCard({ label, value, sub }) {
  return (
    <div style={{ background: T.panel, borderRadius: 8, padding: '16px 18px', flex: 1, minWidth: 0 }}>
      <p className="md-mono" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: T.wait, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.03em' }}>{label}</p>
      <p className="md-display" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 26, fontWeight: 600 }}>{value}</p>
      {sub && <p style={{ fontSize: 12.5, color: T.wait, marginTop: 4 }}>{sub}</p>}
    </div>
  );
}

function OverviewTab({ endpoints, logs, addSampleEndpoint, addSampleLog, goToEndpoints, goToLogs }) {
  const active = endpoints.filter(e => e.enabled).length;
  const avgLatency = logs.length ? Math.round(logs.reduce((a, l) => a + l.latency, 0) / logs.length) : null;
  const errorRate = logs.length ? Math.round((logs.filter(l => l.status >= 400).length / logs.length) * 1000) / 10 : null;

  return (
    <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 24 }} className="md-content-pad">
      <div className="md-stat-row">
        <StatCard label="Active endpoints" value={endpoints.length ? active : '0'} sub={endpoints.length ? `of ${endpoints.length} total` : 'none yet'} />
        <StatCard label="Requests today" value={logs.length || '0'} sub={logs.length ? 'since midnight' : 'no traffic yet'} />
        <StatCard label="Avg simulated latency" value={avgLatency !== null ? `${avgLatency}ms` : '—'} sub="across all endpoints" />
        <StatCard label="Simulated error rate" value={errorRate !== null ? `${errorRate}%` : '—'} sub="set per-endpoint" />
      </div>

      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <h3 className="md-display" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 600 }}>Recent requests</h3>
          {logs.length > 0 && <button onClick={goToLogs} className="md-mono" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12.5, color: T.wait, background: 'none', border: 'none', cursor: 'pointer' }}>view all logs &rarr;</button>}
        </div>
        <div style={{ background: T.white, border: `1px solid ${T.line}`, borderRadius: 8, overflow: 'hidden' }}>
          {logs.length === 0 ? (
            <EmptyState
              compact
              icon={<Inbox size={18} />}
              title="No requests yet"
              body="Point your frontend at the mock server and requests will start showing up here."
              actionLabel="Simulate a request"
              onAction={addSampleLog}
            />
          ) : (
            <div className="md-table-scroll">
              <table className="md-table">
                <thead><tr><th>Method</th><th>Path</th><th>Status</th><th>Latency</th></tr></thead>
                <tbody>
                  {logs.slice(0, 5).map((l, i) => (
                    <tr key={i}>
                      <td><Badge text={l.method} fg={methodColor[l.method].fg} bg={methodColor[l.method].bg} /></td>
                      <td className="md-mono" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13 }}>{l.path}</td>
                      <td><Badge text={l.status} fg={l.status < 400 ? '#085041' : '#791F1F'} bg={l.status < 400 ? '#E1F5EE' : '#FCEBEB'} /></td>
                      <td className="md-mono" style={{ fontFamily: "'JetBrains Mono', monospace", color: T.body }}>{l.latency}ms</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <h3 className="md-display" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 600 }}>Endpoints</h3>
          {endpoints.length > 0 && <button onClick={goToEndpoints} className="md-mono" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12.5, color: T.wait, background: 'none', border: 'none', cursor: 'pointer' }}>view all endpoints &rarr;</button>}
        </div>
        <div style={{ background: T.white, border: `1px solid ${T.line}`, borderRadius: 8, overflow: 'hidden' }}>
          {endpoints.length === 0 ? (
            <EmptyState
              compact
              icon={<Waypoints size={18} />}
              title="No endpoints yet"
              body="Create your first mock endpoint to start serving fake responses to your frontend."
              actionLabel="New endpoint"
              onAction={addSampleEndpoint}
            />
          ) : (
            <div className="md-table-scroll">
              <table className="md-table">
                <thead><tr><th>Method</th><th>Path</th><th>Returns</th><th>Latency</th><th>Enabled</th></tr></thead>
                <tbody>
                  {endpoints.slice(0, 5).map((e, i) => (
                    <tr key={i}>
                      <td><Badge text={e.method} fg={methodColor[e.method].fg} bg={methodColor[e.method].bg} /></td>
                      <td className="md-mono" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13 }}>{e.path}</td>
                      <td className="md-mono" style={{ fontFamily: "'JetBrains Mono', monospace", color: T.body }}>{e.status}</td>
                      <td className="md-mono" style={{ fontFamily: "'JetBrains Mono', monospace", color: T.body }}>{e.latency}ms</td>
                      <td><Toggle on={e.enabled} onClick={() => {}} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function EndpointsTab({ endpoints, setEndpoints, addSampleEndpoint }) {
  const [query, setQuery] = useState('');
  const filtered = endpoints.filter(e => e.path.toLowerCase().includes(query.toLowerCase()));

  return (
    <div style={{ padding: '24px 28px' }} className="md-content-pad">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18, flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: T.white, border: `1px solid ${T.line}`, borderRadius: 6, padding: '8px 12px', width: 300, maxWidth: '100%' }}>
          <Search size={14} color={T.wait} />
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search endpoints" style={{ border: 'none', outline: 'none', fontSize: 13.5, width: '100%', background: 'transparent' }} />
        </div>
        <button onClick={addSampleEndpoint} style={{ display: 'flex', alignItems: 'center', gap: 6, background: T.ink, color: T.paper, border: 'none', borderRadius: 6, padding: '9px 16px', fontSize: 13.5, fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif" }}>
          <Plus size={15} /> New endpoint
        </button>
      </div>
      <div style={{ background: T.white, border: `1px solid ${T.line}`, borderRadius: 8, overflow: 'hidden' }}>
        {endpoints.length === 0 ? (
          <EmptyState
            icon={<Waypoints size={20} />}
            title="No endpoints yet"
            body="Mock endpoints define what your fake API returns. Create one to start serving responses to your frontend."
            actionLabel="New endpoint"
            onAction={addSampleEndpoint}
          />
        ) : filtered.length === 0 ? (
          <EmptyState compact icon={<Search size={18} />} title="No matches" body={`No endpoints match "${query}".`} />
        ) : (
          <div className="md-table-scroll">
            <table className="md-table">
              <thead><tr><th>Method</th><th>Path</th><th>Returns</th><th>Latency</th><th>Enabled</th></tr></thead>
              <tbody>
                {filtered.map((e, i) => (
                  <tr key={i}>
                    <td><Badge text={e.method} fg={methodColor[e.method].fg} bg={methodColor[e.method].bg} /></td>
                    <td className="md-mono" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13 }}>{e.path}</td>
                    <td className="md-mono" style={{ fontFamily: "'JetBrains Mono', monospace", color: T.body }}>{e.status}</td>
                    <td className="md-mono" style={{ fontFamily: "'JetBrains Mono', monospace", color: T.body }}>{e.latency}ms</td>
                    <td>
                      <Toggle on={e.enabled} onClick={() => setEndpoints(list => list.map((x, xi) => xi === i ? { ...x, enabled: !x.enabled } : x))} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function LogsTab({ logs, addSampleLog }) {
  const [openIdx, setOpenIdx] = useState(null);
  return (
    <div style={{ padding: '24px 28px' }} className="md-content-pad">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h3 className="md-display" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 600, marginBottom: 4 }}>Request log</h3>
          <p style={{ fontSize: 13, color: T.wait }}>Every request the mock server has received, in real time.</p>
        </div>
        {logs.length > 0 && (
          <button onClick={addSampleLog} style={{ display: 'flex', alignItems: 'center', gap: 6, background: T.white, color: T.ink, border: `1px solid ${T.line}`, borderRadius: 6, padding: '8px 14px', fontSize: 13, fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif" }}>
            <Radio size={14} /> Simulate request
          </button>
        )}
      </div>
      <div style={{ background: T.white, border: `1px solid ${T.line}`, borderRadius: 8, overflow: 'hidden' }}>
        {logs.length === 0 ? (
          <EmptyState
            icon={<ScrollText size={20} />}
            title="No requests logged yet"
            body="Once your app calls the mock server \u2014 or you simulate one \u2014 you'll see the full request and response here."
            actionLabel="Simulate a request"
            onAction={addSampleLog}
          />
        ) : (
          <div className="md-table-scroll">
            <table className="md-table">
              <thead><tr><th>Method</th><th>Path</th><th>Match</th><th>Status</th><th>Latency</th></tr></thead>
              <tbody>
                {logs.map((l, i) => (
                  <React.Fragment key={i}>
                    <tr onClick={() => setOpenIdx(openIdx === i ? null : i)} style={{ cursor: 'pointer' }}>
                      <td><Badge text={l.method} fg={methodColor[l.method].fg} bg={methodColor[l.method].bg} /></td>
                      <td className="md-mono" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13 }}>{l.path}</td>
                      <td>{l.matched
                        ? <Badge text="matched" fg="#085041" bg="#E1F5EE" />
                        : <Badge text="unmatched" fg={T.amber} bg={T.amberBg} />}</td>
                      <td><Badge text={l.status} fg={l.status < 400 ? '#085041' : '#791F1F'} bg={l.status < 400 ? '#E1F5EE' : '#FCEBEB'} /></td>
                      <td className="md-mono" style={{ fontFamily: "'JetBrains Mono', monospace", color: T.body }}>{l.latency}ms</td>
                    </tr>
                    {openIdx === i && (
                      <tr>
                        <td colSpan={5} style={{ background: T.panel, padding: 0 }}>
                          <pre className="md-mono" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12.5, color: T.body, padding: '14px 18px', whiteSpace: 'pre-wrap', margin: 0 }}>
{l.matched ? `{\n  "status": ${l.status},\n  "latency_ms": ${l.latency},\n  "matched_endpoint": "${l.path}"\n}` : `{\n  "status": 404,\n  "error": "no mock configured for this path"\n}`}
                          </pre>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function Placeholder({ label, icon }) {
  return (
    <div className="md-content-pad" style={{ padding: '24px 28px' }}>
      <div style={{ background: T.white, border: `1px solid ${T.line}`, borderRadius: 8 }}>
        <EmptyState icon={icon} title={label} body="This section isn't wired up in the preview yet." />
      </div>
    </div>
  );
}

export default function MocklessDashboard() {
  const [active, setActive] = useState('overview');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [endpoints, setEndpoints] = useState([]);
  const [logs, setLogs] = useState([]);

  const addSampleEndpoint = () => {
    const next = endpointPool[endpoints.length % endpointPool.length];
    setEndpoints(list => [...list, { ...next }]);
  };
  const addSampleLog = () => {
    const next = logPool[logs.length % logPool.length];
    setLogs(list => [{ ...next }, ...list]);
  };

  return (
    <div className="md-root" style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <GlobalStyle />
      <Sidebar active={active} setActive={setActive} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, height: '100%' }}>
        <TopBar onMenuClick={() => setMobileOpen(true)} />
        <div style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
          {active === 'overview' && (
            <OverviewTab
              endpoints={endpoints}
              logs={logs}
              addSampleEndpoint={addSampleEndpoint}
              addSampleLog={addSampleLog}
              goToEndpoints={() => setActive('endpoints')}
              goToLogs={() => setActive('logs')}
            />
          )}
          {active === 'endpoints' && <EndpointsTab endpoints={endpoints} setEndpoints={setEndpoints} addSampleEndpoint={addSampleEndpoint} />}
          {active === 'logs' && <LogsTab logs={logs} addSampleLog={addSampleLog} />}
          {active === 'environments' && <Placeholder label="Environments" icon={<FolderKanban size={20} />} />}
          {active === 'settings' && <Placeholder label="Settings" icon={<Settings size={20} />} />}
        </div>
      </div>
    </div>
  );
}
