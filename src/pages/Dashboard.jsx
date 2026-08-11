import React, { useState, useEffect } from 'react';
import {
  LayoutGrid, Waypoints, ScrollText, FolderKanban, Settings, Plus, Search,
  Copy, Check, ChevronDown, Circle
} from 'lucide-react';

const T = {
  ink: '#14181F',
  paper: '#EAEEE6',
  panel: '#F6F8F2',
  white: '#FFFFFF',
  line: '#D3D9CB',
  lineSoft: '#E2E7DA',
  wait: '#6B7178',
  textSoft: '#4A5040',
  signal: '#E85D2C',
  signalDeep: '#B8461E',
  success: '#1F8A70',
  successBg: '#E1F0EA',
  danger: '#C23B32',
  dangerBg: '#FBEAE8',
  amber: '#B8791C',
  amberBg: '#FBF0DC',
};

const methodColor = {
  GET: { fg: '#0C447C', bg: '#E6F1FB' },
  POST: { fg: '#27500A', bg: '#EAF3DE' },
  PUT: { fg: '#854F0B', bg: '#FAEEDA' },
  DELETE: { fg: '#791F1F', bg: '#FCEBEB' },
  PATCH: { fg: '#3C3489', bg: '#EEEDFE' },
};

const endpoints = [
  { id: 1, method: 'GET', path: '/api/checkout/summary', status: 200, latency: 120, enabled: true, edited: '2h ago' },
  { id: 2, method: 'POST', path: '/api/checkout/submit', status: 201, latency: 340, enabled: true, edited: '2h ago' },
  { id: 3, method: 'GET', path: '/api/users/:id', status: 200, latency: 60, enabled: true, edited: '1d ago' },
  { id: 4, method: 'GET', path: '/api/users/:id/orders', status: 200, latency: 90, enabled: true, edited: '1d ago' },
  { id: 5, method: 'DELETE', path: '/api/cart/:itemId', status: 204, latency: 40, enabled: false, edited: '3d ago' },
  { id: 6, method: 'PUT', path: '/api/profile', status: 200, latency: 150, enabled: true, edited: '3d ago' },
  { id: 7, method: 'POST', path: '/api/auth/login', status: 401, latency: 80, enabled: true, edited: '4d ago' },
  { id: 8, method: 'PATCH', path: '/api/cart/:itemId', status: 200, latency: 55, enabled: true, edited: '5d ago' },
  { id: 9, method: 'GET', path: '/api/inventory/search', status: 200, latency: 220, enabled: true, edited: '6d ago' },
  { id: 10, method: 'GET', path: '/api/promotions/active', status: 200, latency: 45, enabled: false, edited: '1w ago' },
];

const logs = [
  { id: 1, method: 'GET', path: '/api/checkout/summary', status: 200, latency: 118, time: '2s ago', matched: true },
  { id: 2, method: 'POST', path: '/api/checkout/submit', status: 201, latency: 352, time: '11s ago', matched: true },
  { id: 3, method: 'GET', path: '/api/users/482/orders', status: 200, latency: 88, time: '24s ago', matched: true },
  { id: 4, method: 'GET', path: '/api/reports/nightly', status: 404, latency: 6, time: '41s ago', matched: false },
  { id: 5, method: 'POST', path: '/api/auth/login', status: 401, latency: 79, time: '1m ago', matched: true },
  { id: 6, method: 'PATCH', path: '/api/cart/9931', status: 200, latency: 51, time: '2m ago', matched: true },
  { id: 7, method: 'GET', path: '/api/inventory/search', status: 200, latency: 231, time: '3m ago', matched: true },
  { id: 8, method: 'DELETE', path: '/api/cart/2201', status: 204, latency: 38, time: '4m ago', matched: false },
];

function GlobalStyle() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Inter:wght@400;500;600&display=swap');
      .md-root * { box-sizing: border-box; margin: 0; padding: 0; }
      .md-root { font-family: 'Inter', sans-serif; color: ${T.ink}; background: ${T.paper}; }
      .md-mono { font-family: 'JetBrains Mono', monospace; }
      .md-display { font-family: 'Space Grotesk', sans-serif; }
      .md-root button { font-family: inherit; cursor: pointer; }
      .md-navitem { display: flex; align-items: center; gap: 10px; padding: 9px 14px; border-radius: 4px; font-size: 13.5px; font-weight: 500; color: ${T.wait}; border: none; background: transparent; width: 100%; text-align: left; }
      .md-navitem:hover { background: ${T.lineSoft}; color: ${T.ink}; }
      .md-navitem.active { background: ${T.ink}; color: ${T.paper}; }
      .md-toggle { width: 34px; height: 19px; border-radius: 10px; border: none; position: relative; cursor: pointer; flex-shrink: 0; }
      .md-toggle .knob { position: absolute; top: 2px; width: 15px; height: 15px; border-radius: 50%; background: white; transition: left .15s ease; }
      table.md-table { width: 100%; border-collapse: collapse; font-size: 13.5px; }
      table.md-table th { text-align: left; font-size: 11.5px; text-transform: uppercase; letter-spacing: 0.04em; color: ${T.wait}; font-weight: 600; padding: 0 14px 10px; border-bottom: 1px solid ${T.line}; }
      table.md-table td { padding: 13px 14px; border-bottom: 1px solid ${T.lineSoft}; vertical-align: middle; }
      table.md-table tr:last-child td { border-bottom: none; }
    `}</style>
  );
}

function Badge({ text, fg, bg }) {
  return <span className="md-mono" style={{ fontSize: 11.5, fontWeight: 600, color: fg, background: bg, padding: '3px 8px', borderRadius: 3, letterSpacing: '0.01em' }}>{text}</span>;
}

function Toggle({ on, onClick }) {
  return (
    <button className="md-toggle" onClick={onClick} style={{ background: on ? T.success : '#C6CCBC' }} aria-label="toggle endpoint">
      <span className="knob" style={{ left: on ? 17 : 2 }} />
    </button>
  );
}

function Sidebar({ active, setActive }) {
  const items = [
    { key: 'overview', label: 'Overview', icon: <LayoutGrid size={16} /> },
    { key: 'endpoints', label: 'Endpoints', icon: <Waypoints size={16} /> },
    { key: 'logs', label: 'Request logs', icon: <ScrollText size={16} /> },
    { key: 'environments', label: 'Environments', icon: <FolderKanban size={16} /> },
    { key: 'settings', label: 'Settings', icon: <Settings size={16} /> },
  ];
  return (
    <div style={{ width: 216, flexShrink: 0, borderRight: `1px solid ${T.line}`, padding: '20px 14px', display: 'flex', flexDirection: 'column', gap: 2, background: T.panel }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '0 8px', marginBottom: 24 }}>
        <div style={{ width: 20, height: 20, background: T.ink, borderRadius: 4, position: 'relative' }}>
          <div style={{ position: 'absolute', inset: 4, background: T.signal, borderRadius: 1 }} />
        </div>
        <span className="md-display" style={{ fontWeight: 700, fontSize: 16 }}>mockless</span>
      </div>
      {items.map(it => (
        <button key={it.key} className={`md-navitem ${active === it.key ? 'active' : ''}`} onClick={() => setActive(it.key)}>
          {it.icon}{it.label}
        </button>
      ))}
    </div>
  );
}

function TopBar() {
  const [copied, setCopied] = useState(false);
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 28px', borderBottom: `1px solid ${T.line}` }}>
      <button style={{ display: 'flex', alignItems: 'center', gap: 8, background: T.white, border: `1px solid ${T.line}`, borderRadius: 5, padding: '7px 12px' }}>
        <span className="md-display" style={{ fontSize: 13.5, fontWeight: 600 }}>checkout-flow</span>
        <ChevronDown size={14} color={T.wait} />
      </button>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div className="md-mono" style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 12.5, color: T.textSoft, background: T.successBg, padding: '6px 12px', borderRadius: 5 }}>
          <Circle size={7} fill={T.success} color={T.success} />
          mock server running &middot; localhost:4000
        </div>
        <button onClick={() => setCopied(true)} className="md-mono" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12.5, border: `1px solid ${T.line}`, background: T.white, borderRadius: 5, padding: '6px 12px', color: T.ink }}>
          {copied ? <Check size={13} color={T.success} /> : <Copy size={13} />} {copied ? 'copied' : 'copy base url'}
        </button>
      </div>
    </div>
  );
}

function StatCard({ label, value, sub }) {
  return (
    <div style={{ background: T.panel, borderRadius: 8, padding: '16px 18px', flex: 1 }}>
      <p className="md-mono" style={{ fontSize: 12, color: T.wait, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.03em' }}>{label}</p>
      <p className="md-display" style={{ fontSize: 26, fontWeight: 600 }}>{value}</p>
      {sub && <p style={{ fontSize: 12.5, color: T.wait, marginTop: 4 }}>{sub}</p>}
    </div>
  );
}

function OverviewTab({ goToEndpoints, goToLogs }) {
  return (
    <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', gap: 14 }}>
        <StatCard label="Active endpoints" value="14" sub="of 18 total" />
        <StatCard label="Requests today" value="1,284" sub="+ 212 vs yesterday" />
        <StatCard label="Avg simulated latency" value="86ms" sub="across all endpoints" />
        <StatCard label="Simulated error rate" value="3.2%" sub="set per-endpoint" />
      </div>

      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <h3 className="md-display" style={{ fontSize: 15, fontWeight: 600 }}>Recent requests</h3>
          <button onClick={goToLogs} className="md-mono" style={{ fontSize: 12.5, color: T.wait, background: 'none', border: 'none' }}>view all logs \u2192</button>
        </div>
        <div style={{ background: T.white, border: `1px solid ${T.line}`, borderRadius: 8, overflow: 'hidden' }}>
          <table className="md-table">
            <thead><tr><th>Method</th><th>Path</th><th>Status</th><th>Latency</th><th>Time</th></tr></thead>
            <tbody>
              {logs.slice(0, 5).map(l => (
                <tr key={l.id}>
                  <td><Badge text={l.method} fg={methodColor[l.method].fg} bg={methodColor[l.method].bg} /></td>
                  <td className="md-mono" style={{ fontSize: 13 }}>{l.path}</td>
                  <td><Badge text={l.status} fg={l.status < 400 ? '#085041' : '#791F1F'} bg={l.status < 400 ? '#E1F5EE' : '#FCEBEB'} /></td>
                  <td className="md-mono" style={{ color: T.textSoft }}>{l.latency}ms</td>
                  <td style={{ color: T.wait, fontSize: 13 }}>{l.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <h3 className="md-display" style={{ fontSize: 15, fontWeight: 600 }}>Endpoints</h3>
          <button onClick={goToEndpoints} className="md-mono" style={{ fontSize: 12.5, color: T.wait, background: 'none', border: 'none' }}>view all endpoints \u2192</button>
        </div>
        <div style={{ background: T.white, border: `1px solid ${T.line}`, borderRadius: 8, overflow: 'hidden' }}>
          <table className="md-table">
            <thead><tr><th>Method</th><th>Path</th><th>Returns</th><th>Latency</th><th>Enabled</th></tr></thead>
            <tbody>
              {endpoints.slice(0, 5).map(e => (
                <tr key={e.id}>
                  <td><Badge text={e.method} fg={methodColor[e.method].fg} bg={methodColor[e.method].bg} /></td>
                  <td className="md-mono" style={{ fontSize: 13 }}>{e.path}</td>
                  <td className="md-mono" style={{ color: T.textSoft }}>{e.status}</td>
                  <td className="md-mono" style={{ color: T.textSoft }}>{e.latency}ms</td>
                  <td><Toggle on={e.enabled} onClick={() => {}} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function EndpointsTab() {
  const [list, setList] = useState(endpoints);
  const [query, setQuery] = useState('');
  const filtered = list.filter(e => e.path.toLowerCase().includes(query.toLowerCase()));
  return (
    <div style={{ padding: '24px 28px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: T.white, border: `1px solid ${T.line}`, borderRadius: 6, padding: '8px 12px', width: 300 }}>
          <Search size={14} color={T.wait} />
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search endpoints" style={{ border: 'none', outline: 'none', fontSize: 13.5, width: '100%', background: 'transparent' }} />
        </div>
        <button style={{ display: 'flex', alignItems: 'center', gap: 6, background: T.ink, color: T.paper, border: 'none', borderRadius: 6, padding: '9px 16px', fontSize: 13.5, fontWeight: 600 }} className="md-display">
          <Plus size={15} /> New endpoint
        </button>
      </div>
      <div style={{ background: T.white, border: `1px solid ${T.line}`, borderRadius: 8, overflow: 'hidden' }}>
        <table className="md-table">
          <thead><tr><th>Method</th><th>Path</th><th>Returns</th><th>Latency</th><th>Last edited</th><th>Enabled</th></tr></thead>
          <tbody>
            {filtered.map(e => (
              <tr key={e.id}>
                <td><Badge text={e.method} fg={methodColor[e.method].fg} bg={methodColor[e.method].bg} /></td>
                <td className="md-mono" style={{ fontSize: 13 }}>{e.path}</td>
                <td className="md-mono" style={{ color: T.textSoft }}>{e.status}</td>
                <td className="md-mono" style={{ color: T.textSoft }}>{e.latency}ms</td>
                <td style={{ color: T.wait, fontSize: 13 }}>{e.edited}</td>
                <td>
                  <Toggle on={e.enabled} onClick={() => setList(l => l.map(x => x.id === e.id ? { ...x, enabled: !x.enabled } : x))} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function LogsTab() {
  const [openId, setOpenId] = useState(null);
  return (
    <div style={{ padding: '24px 28px' }}>
      <h3 className="md-display" style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>Request log</h3>
      <p style={{ fontSize: 13, color: T.wait, marginBottom: 18 }}>Every request the mock server has received, in real time.</p>
      <div style={{ background: T.white, border: `1px solid ${T.line}`, borderRadius: 8, overflow: 'hidden' }}>
        <table className="md-table">
          <thead><tr><th>Method</th><th>Path</th><th>Match</th><th>Status</th><th>Latency</th><th>Time</th></tr></thead>
          <tbody>
            {logs.map(l => (
              <React.Fragment key={l.id}>
                <tr onClick={() => setOpenId(openId === l.id ? null : l.id)} style={{ cursor: 'pointer' }}>
                  <td><Badge text={l.method} fg={methodColor[l.method].fg} bg={methodColor[l.method].bg} /></td>
                  <td className="md-mono" style={{ fontSize: 13 }}>{l.path}</td>
                  <td>{l.matched
                    ? <Badge text="matched" fg="#085041" bg="#E1F5EE" />
                    : <Badge text="unmatched" fg={T.amber} bg={T.amberBg} />}</td>
                  <td><Badge text={l.status} fg={l.status < 400 ? '#085041' : '#791F1F'} bg={l.status < 400 ? '#E1F5EE' : '#FCEBEB'} /></td>
                  <td className="md-mono" style={{ color: T.textSoft }}>{l.latency}ms</td>
                  <td style={{ color: T.wait, fontSize: 13 }}>{l.time}</td>
                </tr>
                {openId === l.id && (
                  <tr>
                    <td colSpan={6} style={{ background: T.panel, padding: 0 }}>
                      <pre className="md-mono" style={{ fontSize: 12.5, color: T.textSoft, padding: '14px 18px', whiteSpace: 'pre-wrap' }}>
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
    </div>
  );
}

function Placeholder({ label }) {
  return (
    <div style={{ padding: '80px 28px', textAlign: 'center', color: T.wait }}>
      <p className="md-display" style={{ fontSize: 16, fontWeight: 600, marginBottom: 6, color: T.ink }}>{label}</p>
      <p style={{ fontSize: 13.5 }}>This section isn't wired up in the preview.</p>
    </div>
  );
}

export default function MocklessDashboard() {
  const [active, setActive] = useState('overview');
  return (
    <div className="md-root" style={{ display: 'flex', minHeight: 600, border: `1px solid ${T.line}`, borderRadius: 10, overflow: 'hidden' }}>
      <GlobalStyle />
      <Sidebar active={active} setActive={setActive} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <TopBar />
        {active === 'overview' && <OverviewTab goToEndpoints={() => setActive('endpoints')} goToLogs={() => setActive('logs')} />}
        {active === 'endpoints' && <EndpointsTab />}
        {active === 'logs' && <LogsTab />}
        {active === 'environments' && <Placeholder label="Environments" />}
        {active === 'settings' && <Placeholder label="Settings" />}
      </div>
    </div>
  );
}
