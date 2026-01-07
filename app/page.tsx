export default function Home() {
  return (
    <div>
      <section>
        <h1 className="title-underline">syslink</h1>
        <h2 style={{ marginTop: '0', opacity: 0.8, fontWeight: 500 }}>hi</h2>

        <p style={{ fontSize: '1.2rem', lineHeight: '1.7', marginTop: '2rem' }}>
          i build small, practical software and experiment with ideas until they turn into something useful. i enjoy keeping things simple and functional.
        </p>

        <p style={{ marginTop: '1.5rem' }}>
          these days i’m focused on a <a href="https://github.com/syslink-sh/Saudi-Weather">weather app</a> and my <a href="/blog/homelab">homelab setup</a>. more of what i build lives in the <a href="/projects">projects</a> section.
        </p>

        <h2 style={{ fontSize: '1.25rem', marginTop: '4rem' }}>tech & mindset:</h2>
        <ul style={{ paddingLeft: '0', listStyleType: 'none' }}>
          <li style={{ marginBottom: '0.5rem', opacity: 0.8 }}>mostly working with next.js</li>
          <li style={{ marginBottom: '0.5rem', opacity: 0.8 }}>powered by coffee</li>
          <li style={{ marginBottom: '0.5rem', opacity: 0.8 }}>i like having full control over the stack</li>
        </ul>
      </section>

      <footer className="footer">
        <div className="muted" style={{ fontSize: '0.9rem' }}>
          © 2026 syslink
        </div>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <a href="https://bsky.app/profile/syslink.dev" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.9rem' }}>
            Bluesky ↗
          </a>
          <a href="mailto:me@syslink.dev" style={{ fontSize: '0.9rem' }}>
            Email ↗
          </a>
        </div>
      </footer>
    </div>
  );
}