export default function Home() {
  return (
    <div>
      <section>
        <h1 className="title-underline">syslink</h1>
        <h2 style={{ marginTop: '0' }}>hi there</h2>
        <h3>I'm a developer who enjoys coding and fixing projects</h3>

        <p>
          I'm <em>a developer</em> who's always tinkering with ideas and making stuff.
          My projects are abstract thoughts transformed into tangible digital creations.
        </p>

        <p>
          I'm currently working on a <a href="https://github.com/syslink-sh/Saudi-Weather">weather app</a> and a <a href="/blog/homelab">homelab</a>.
          You can find more of my work in the <a href="/projects">projects</a> section.
        </p>

        <h2 style={{ fontSize: '1.25rem' }}>Have some playful banter:</h2>
        <ul>
          <li>Next.js is my weapon of choice.</li>
          <li>My favorite youtuber is <a href="https://www.youtube.com/@FaceDevStuff" target="_blank" rel="noopener noreferrer">Facedev</a>.</li>
          <li>I love turning caffeine into code.</li>
        </ul>
      </section>

      <footer className="footer">
        <a href="https://bsky.app/profile/syslink.dev" target="_blank" rel="noopener noreferrer">
          @syslink.dev at bluesky ↗
        </a>
        <a href="mailto:syslink.dev">
          me@syslink.dev ↗
        </a>
      </footer>
    </div>
  );
}