import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Copy } from 'lucide-react';
import { T } from '../theme';
import { GlobalStyle, Nav, Footer } from '../components/SiteChrome';

function CodeBlock({ code }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="ml-mono" style={{ background: T.ink, borderRadius: 8, padding: '16px 18px', position: 'relative', margin: '14px 0' }}>
      <button onClick={() => setCopied(true)} style={{ position: 'absolute', top: 12, right: 12, background: 'transparent', border: 'none', cursor: 'pointer', color: '#B8BCB0', display: 'flex', alignItems: 'center', gap: 6, fontSize: 11 }}>
        {copied ? <Check size={12} color={T.success} /> : <Copy size={12} />} {copied ? 'copied' : 'copy'}
      </button>
      <pre style={{ color: '#C9D6BE', fontSize: 13, lineHeight: 1.8, whiteSpace: 'pre-wrap', margin: 0 }}>{code}</pre>
    </div>
  );
}

const sections = [
  {
    id: 'install',
    title: 'Installation',
    body: 'Install the CLI globally, or add it as a dev dependency to your frontend project.',
    code: 'npm install -g mockless\n# or\nnpm install --save-dev mockless',
  },
  {
    id: 'quickstart',
    title: 'Quickstart',
    body: 'Initialize a mock config in your project root, add an endpoint, and start serving it.',
    code: 'mockless init\nmockless add GET /api/users --schema users.json\nmockless serve',
  },
  {
    id: 'openapi',
    title: 'Import from OpenAPI',
    body: 'Already have a spec? Generate a full set of mock endpoints from it in one command.',
    code: 'mockless import ./openapi.yaml',
  },
  {
    id: 'latency',
    title: 'Simulating latency & errors',
    body: 'Pass flags when serving to simulate real-world network conditions across every mocked endpoint.',
    code: 'mockless serve --latency 150 --error-rate 0.05',
  },
  {
    id: 'sdk',
    title: 'SDK usage',
    body: 'Prefer not to run a separate process? Use the SDK to mock requests directly inside your app during development.',
    code: `import { mock } from "mockless/sdk"\n\nmock("GET /api/users/:id", {\n  status: 200,\n  body: { id: 1, name: "Ada" }\n})`,
  },
];

export default function Docs() {
  return (
    <div className="ml-root">
      <GlobalStyle />
      <Nav />
      <section style={{ maxWidth: 1120, margin: '0 auto', padding: '64px 32px 0' }}>
        <p className="ml-mono" style={{ fontSize: 12.5, color: T.signalDeep, marginBottom: 10 }}>// documentation</p>
        <h1 className="ml-display" style={{ fontSize: 'clamp(28px, 3.4vw, 40px)', fontWeight: 700, letterSpacing: '-0.02em', color: T.ink, marginBottom: 14 }}>
          Get mocking in under five minutes.
        </h1>
        <p style={{ fontSize: 16, color: T.body, maxWidth: 520, marginBottom: 8 }}>
          Everything you need to install the CLI, define endpoints, and point your app at a mock server.
        </p>
      </section>

      <section className="ml-docs-grid" style={{ maxWidth: 1120, margin: '0 auto', padding: '48px 32px 96px', display: 'grid', gridTemplateColumns: 'minmax(0,220px) minmax(0,1fr)', gap: 48 }}>
        <div className="ml-mono ml-docs-toc" style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 13, position: 'sticky', top: 88, alignSelf: 'start' }}>
          {sections.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="ml-navlink" style={{ padding: '6px 0' }}>{s.title}</a>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 48, minWidth: 0 }}>
          {sections.map((s) => (
            <div key={s.id} id={s.id}>
              <h2 className="ml-display" style={{ fontSize: 22, fontWeight: 600, color: T.ink, marginBottom: 10 }}>{s.title}</h2>
              <p style={{ fontSize: 14.5, lineHeight: 1.6, color: T.body }}>{s.body}</p>
              <CodeBlock code={s.code} />
            </div>
          ))}
          <div style={{ borderTop: `1px solid ${T.line}`, paddingTop: 28 }}>
            <p style={{ fontSize: 14, color: T.body, marginBottom: 14 }}>Ready to see it running end to end?</p>
            <Link to="/dashboard" className="ml-btn ml-btn-primary" style={{ display: 'inline-flex' }}>Open the dashboard</Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
