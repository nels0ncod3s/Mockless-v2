import React, { useState } from 'react';
import { Copy, Check, Menu, X } from 'lucide-react';

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
      .ml-btn-primary { background: ${TOKENS.ink}; color: ${TOKENS.paper}; }
      .ml-btn-ghost { background: transparent; color: ${TOKENS.ink}; }
      .ml-btn-ghost:hover { background: ${TOKENS.paperDeep}; }
      .dc-navlink { display: block; font-size: 13.5px; padding: 6px 10px; border-radius: 4px; color: ${TOKENS.wait}; }
      .dc-navlink:hover { background: ${TOKENS.lineSoft}; color: ${TOKENS.ink}; }
      .dc-navlink.active { background: ${TOKENS.ink}; color: ${TOKENS.paper}; }
      .dc-group-label { font-family: 'JetBrains Mono', monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: ${TOKENS.wait}; padding: 0 10px; margin: 20px 0 6px; }
      .dc-group-label:first-child { margin-top: 0; }
      .dc-body h2 { font-family: 'Space Grotesk', sans-serif; font-size: 26px; font-weight: 600; letter-spacing: -0.01em; margin: 40px 0 14px; }
      .dc-body h2:first-child { margin-top: 0; }
      .dc-body h3 { font-family: 'Space Grotesk', sans-serif; font-size: 17px; font-weight: 600; margin: 28px 0 10px; }
      .dc-body p { font-size: 15px; line-height: 1.7; color: ${TOKENS.textSoft}; margin-bottom: 14px; }
      .dc-body ul, .dc-body ol { margin: 0 0 14px 20px; font-size: 15px; line-height: 1.7; color: ${TOKENS.textSoft}; }
      .dc-body li { margin-bottom: 4px; }
      .dc-body code.inline { font-family: 'JetBrains Mono', monospace; background: ${TOKENS.panel}; border: 1px solid ${TOKENS.lineSoft}; border-radius: 3px; padding: 1px 6px; font-size: 13px; color: ${TOKENS.signalDeep}; }
      .dc-code-block { background: ${TOKENS.ink}; border-radius: 6px; padding: 16px 18px; margin: 4px 0 18px; position: relative; }
      .dc-code-block pre { font-family: 'JetBrains Mono', monospace; color: #C9D6BE; font-size: 13px; line-height: 1.7; white-space: pre-wrap; overflow-x: auto; }
      .dc-copy-btn { position: absolute; top: 10px; right: 12px; background: transparent; border: none; cursor: pointer; color: #8A9080; display: flex; align-items: center; gap: 5px; font-size: 11px; font-family: 'JetBrains Mono', monospace; }
      table.dc-table { width: 100%; border-collapse: collapse; font-size: 13.5px; margin-bottom: 18px; }
      table.dc-table th { text-align: left; font-size: 11.5px; text-transform: uppercase; letter-spacing: 0.04em; color: ${TOKENS.wait}; font-weight: 600; padding: 10px 12px; border-bottom: 1px solid ${TOKENS.line}; background: ${TOKENS.panel}; }
      table.dc-table td { padding: 10px 12px; border-bottom: 1px solid ${TOKENS.lineSoft}; color: ${TOKENS.textSoft}; }
      table.dc-table td:first-child { font-family: 'JetBrains Mono', monospace; color: ${TOKENS.ink}; white-space: nowrap; }
    `}</style>
  );
}

function CodeBlock({ children }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="dc-code-block">
      <button className="dc-copy-btn" onClick={() => { navigator.clipboard?.writeText(children); setCopied(true); setTimeout(() => setCopied(false), 1200); }}>
        {copied ? <Check size={12} color={TOKENS.success} /> : <Copy size={12} />} {copied ? 'copied' : 'copy'}
      </button>
      <pre>{children}</pre>
    </div>
  );
}

function Nav({ onMenu }) {
  return (
    <nav style={{ position: 'sticky', top: 0, zIndex: 20, background: `${TOKENS.paper}F0`, backdropFilter: 'blur(6px)', borderBottom: `1px solid ${TOKENS.line}` }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <button className="dc-navlink" onClick={onMenu} style={{ display: 'none' }} aria-label="menu"><Menu size={18} /></button>
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 22, height: 22, background: TOKENS.ink, borderRadius: 4, position: 'relative' }}>
              <div style={{ position: 'absolute', inset: 5, background: TOKENS.signal, borderRadius: 1 }} />
            </div>
            <span className="ml-display" style={{ fontWeight: 700, fontSize: 19, letterSpacing: '-0.02em' }}>mockless</span>
          </a>
          <span className="ml-mono" style={{ fontSize: 12, color: TOKENS.wait, border: `1px solid ${TOKENS.line}`, borderRadius: 3, padding: '2px 7px' }}>docs</span>
        </div>
        <div className="ml-mono" style={{ display: 'flex', gap: 28, fontSize: 13.5, color: TOKENS.wait }}>
          <a href="/#how">how it works</a>
          <a href="/pricing">pricing</a>
        </div>
        <button className="ml-btn ml-btn-primary" style={{ fontSize: 13.5, padding: '9px 16px' }}>Start free</button>
      </div>
    </nav>
  );
}

const NAV_GROUPS = [
  { label: 'Getting started', items: [
    { key: 'introduction', label: 'Introduction' },
    { key: 'install', label: 'Install & quickstart' },
  ]},
  { label: 'Defining mocks', items: [
    { key: 'schema', label: 'Mock schema' },
    { key: 'openapi', label: 'Import from OpenAPI' },
  ]},
  { label: 'Serving mocks', items: [
    { key: 'serve', label: 'Running the server' },
    { key: 'latency', label: 'Latency & error simulation' },
    { key: 'stateful', label: 'Stateful scenarios' },
  ]},
  { label: 'Reference', items: [
    { key: 'cli', label: 'CLI reference' },
    { key: 'sdk', label: 'SDK reference' },
    { key: 'config', label: 'Config file' },
  ]},
];

function Sidebar({ active, setActive, mobileOpen, setMobileOpen }) {
  return (
    <div style={{
      width: 232, flexShrink: 0, padding: '28px 16px', position: 'sticky', top: 65,
      alignSelf: 'flex-start', maxHeight: 'calc(100vh - 65px)', overflowY: 'auto',
    }}>
      {NAV_GROUPS.map(g => (
        <div key={g.label}>
          <p className="dc-group-label">{g.label}</p>
          {g.items.map(it => (
            <a
              key={it.key}
              className={`dc-navlink ${active === it.key ? 'active' : ''}`}
              href={`#${it.key}`}
              onClick={() => { setActive(it.key); setMobileOpen(false); }}
            >
              {it.label}
            </a>
          ))}
        </div>
      ))}
    </div>
  );
}

const PAGES = {
  introduction: (
    <>
      <h2>Introduction</h2>
      <p>Mockless is a mock API server for frontend developers. It generates realistic mock endpoints from a schema you write by hand or import from an OpenAPI spec, then serves them locally with real status codes, headers, and configurable latency — so you can build, test, and demo UI flows before a single backend route exists.</p>
      <p>Point your app's <code className="inline">API_URL</code> at the mock server instead of your real backend. When the real endpoint ships, you swap the URL back and nothing else in your frontend code changes.</p>
      <h3>When to reach for it</h3>
      <ul>
        <li>The backend for a feature isn't built yet, but design review or a demo is.</li>
        <li>You need to test error states, timeouts, or slow responses that are hard to trigger against a real API.</li>
        <li>You want frontend tests that don't depend on a staging environment being up.</li>
        <li>A designer or PM needs to click through a flow that has no real data behind it yet.</li>
      </ul>
    </>
  ),
  install: (
    <>
      <h2>Install &amp; quickstart</h2>
      <p>Install the CLI globally, or as a dev dependency in your project.</p>
      <CodeBlock>{`npm install -g mockless\n# or, per-project\nnpm install -D mockless`}</CodeBlock>
      <p>Initialize a mock config in your project root:</p>
      <CodeBlock>{`mockless init`}</CodeBlock>
      <p>This creates a <code className="inline">mockless.config.json</code> file and an empty <code className="inline">mocks/</code> directory. Add your first endpoint:</p>
      <CodeBlock>{`mockless add GET /api/users/:id --schema user.json`}</CodeBlock>
      <p>Then start the server:</p>
      <CodeBlock>{`mockless serve\n\u2713 listening on :4000`}</CodeBlock>
      <p>Point your frontend's API base URL at <code className="inline">http://localhost:4000</code> and you're serving mocked responses.</p>
    </>
  ),
  schema: (
    <>
      <h2>Mock schema</h2>
      <p>Each endpoint is defined by a method, a path, and a response shape. You can write these by hand in <code className="inline">mockless.config.json</code>:</p>
      <CodeBlock>{`{
  "endpoints": [
    {
      "method": "GET",
      "path": "/api/users/:id",
      "status": 200,
      "response": { "id": "{{params.id}}", "name": "Ada Lovelace", "email": "ada@example.com" },
      "latencyMs": 80
    }
  ]
}`}</CodeBlock>
      <p>Path params (<code className="inline">:id</code>) are available in the response template as <code className="inline">{'{{params.id}}'}</code>. Query params and request body fields are available the same way, as <code className="inline">{'{{query.x}}'}</code> and <code className="inline">{'{{body.x}}'}</code>.</p>
      <h3>Field reference</h3>
      <table className="dc-table">
        <thead><tr><th>Field</th><th>Type</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>method</td><td>string</td><td>HTTP method: GET, POST, PUT, PATCH, DELETE.</td></tr>
          <tr><td>path</td><td>string</td><td>Route pattern, supports :param segments.</td></tr>
          <tr><td>status</td><td>number</td><td>Response status code.</td></tr>
          <tr><td>response</td><td>object</td><td>JSON body returned, supports template variables.</td></tr>
          <tr><td>latencyMs</td><td>number</td><td>Artificial delay before responding.</td></tr>
        </tbody>
      </table>
    </>
  ),
  openapi: (
    <>
      <h2>Import from OpenAPI</h2>
      <p>If you already have an OpenAPI 3.0 spec, generate mock endpoints for every route in it:</p>
      <CodeBlock>{`mockless import openapi.yaml`}</CodeBlock>
      <p>Mockless reads each operation's response schema and generates realistic example values for every field, respecting types, enums, and formats declared in the spec. Generated endpoints are written to <code className="inline">mockless.config.json</code> and can be edited like any hand-written endpoint.</p>
      <p>Re-running import merges by path and method — endpoints you've since customized are left untouched unless you pass <code className="inline">--force</code>.</p>
    </>
  ),
  serve: (
    <>
      <h2>Running the server</h2>
      <p>Start the mock server against your current config:</p>
      <CodeBlock>{`mockless serve --port 4000 --watch`}</CodeBlock>
      <p><code className="inline">--watch</code> reloads endpoint definitions on save, so editing <code className="inline">mockless.config.json</code> updates the running server without a restart.</p>
      <h3>Options</h3>
      <table className="dc-table">
        <thead><tr><th>Flag</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>--port</td><td>4000</td><td>Port the mock server listens on.</td></tr>
          <tr><td>--watch</td><td>false</td><td>Reload config changes without restarting.</td></tr>
          <tr><td>--latency</td><td>0</td><td>Global latency in ms applied to every response.</td></tr>
          <tr><td>--error-rate</td><td>0</td><td>Fraction of requests (0\u20131) that return a random 5xx.</td></tr>
        </tbody>
      </table>
    </>
  ),
  latency: (
    <>
      <h2>Latency &amp; error simulation</h2>
      <p>Real networks are slow and occasionally fail. Bake that into your mocks instead of only ever testing the happy path.</p>
      <CodeBlock>{`mockless serve --latency 300 --error-rate 0.1`}</CodeBlock>
      <p>This adds 300ms to every response and returns a random 5xx for roughly 10% of requests. You can also set latency and forced status codes per endpoint in the config, which takes precedence over the global flags.</p>
      <CodeBlock>{`{
  "method": "GET",
  "path": "/api/inventory/search",
  "status": 200,
  "latencyMs": 1200,
  "response": { "results": [] }
}`}</CodeBlock>
    </>
  ),
  stateful: (
    <>
      <h2>Stateful scenarios</h2>
      <p>Some flows only make sense across multiple requests \u2014 an empty cart, then a full cart, then a failed checkout. Define a scenario as an ordered list of responses for the same route; each request advances to the next step.</p>
      <CodeBlock>{`{
  "method": "GET",
  "path": "/api/cart",
  "scenario": [
    { "status": 200, "response": { "items": [] } },
    { "status": 200, "response": { "items": [{ "id": 1, "name": "Keyboard" }] } },
    { "status": 500, "response": { "error": "payment_failed" } }
  ]
}`}</CodeBlock>
      <p>Reset a scenario back to its first step with <code className="inline">mockless reset /api/cart</code>, or automatically on server restart.</p>
    </>
  ),
  cli: (
    <>
      <h2>CLI reference</h2>
      <table className="dc-table">
        <thead><tr><th>Command</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>mockless init</td><td>Create a new mockless.config.json in the current directory.</td></tr>
          <tr><td>mockless add</td><td>Add a single endpoint from the command line.</td></tr>
          <tr><td>mockless import</td><td>Generate endpoints from an OpenAPI spec.</td></tr>
          <tr><td>mockless serve</td><td>Start the local mock server.</td></tr>
          <tr><td>mockless reset</td><td>Reset a stateful scenario to its first step.</td></tr>
          <tr><td>mockless push</td><td>Publish the current config to a shareable hosted URL (Pro+).</td></tr>
        </tbody>
      </table>
    </>
  ),
  sdk: (
    <>
      <h2>SDK reference</h2>
      <p>For frameworks where swapping an env var isn't convenient, use the SDK to mount mocks directly in your dev server.</p>
      <CodeBlock>{`import { createMockHandler } from 'mockless/sdk';\nimport config from './mockless.config.json';\n\nconst handler = createMockHandler(config);\n\n// e.g. inside a Vite plugin or Express middleware\napp.use('/api', handler);`}</CodeBlock>
      <p><code className="inline">createMockHandler</code> accepts the same config shape as the CLI, so schemas are shared between the standalone server and in-process usage.</p>
    </>
  ),
  config: (
    <>
      <h2>Config file</h2>
      <p><code className="inline">mockless.config.json</code> is the single source of truth for a project's mocks. It's plain JSON, meant to be committed and reviewed like any other file in your repo.</p>
      <CodeBlock>{`{
  "port": 4000,
  "baseLatencyMs": 50,
  "endpoints": [ /* ... */ ]
}`}</CodeBlock>
      <table className="dc-table">
        <thead><tr><th>Field</th><th>Type</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>port</td><td>number</td><td>Default port for mockless serve.</td></tr>
          <tr><td>baseLatencyMs</td><td>number</td><td>Default latency applied to endpoints without their own latencyMs.</td></tr>
          <tr><td>endpoints</td><td>array</td><td>List of endpoint or scenario definitions.</td></tr>
        </tbody>
      </table>
    </>
  ),
};

export default function Docs() {
  const [active, setActive] = useState('introduction');
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <div className="ml-root">
      <GlobalStyle />
      <Nav onMenu={() => setMobileOpen(o => !o)} />
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', display: 'flex', gap: 48 }}>
        <Sidebar active={active} setActive={setActive} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
        <div className="dc-body" style={{ flex: 1, minWidth: 0, maxWidth: 720, padding: '28px 0 96px' }}>
          {PAGES[active]}
        </div>
      </div>
    </div>
  );
}
