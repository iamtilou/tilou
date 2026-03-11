import VideoBackground from "../components/video-background";

const schemaData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      name: "tilou",
      url: "https://tilou.xyz/",
      sameAs: [
        "https://www.youtube.com/@iamtilou",
        "https://instagram.com/iamtilou",
        "https://x.com/iamtilou",
        "https://github.com/iamtilou",
        "https://twitch.tv/iamtilou",
      ],
      email: "mailto:iamtilou@proton.me",
    },
    {
      "@type": "WebSite",
      name: "tilou",
      url: "https://tilou.xyz/",
    },
  ],
};

export default function Page() {
  return (
    <>
      <VideoBackground />
      <main className="page">
        <header className="profile-row">
          <div className="profile">
            <div className="avatar" aria-hidden="true">
              t
            </div>
            <div className="identity">
              <h1>tilou</h1>
              <p className="role">aspiring agentic ai engineer</p>
            </div>
          </div>
          <div className="header-actions">
            <nav className="social-links" aria-label="social links">
              <a href="https://www.youtube.com/@iamtilou" target="_blank" rel="noreferrer" aria-label="youtube">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22 12c0 2.2-.2 3.4-.4 4.1a2.9 2.9 0 0 1-2 2c-.7.2-1.9.4-7.6.4s-6.9-.2-7.6-.4a2.9 2.9 0 0 1-2-2C2.2 15.4 2 14.2 2 12s.2-3.4.4-4.1a2.9 2.9 0 0 1 2-2C5.1 5.7 6.3 5.5 12 5.5s6.9.2 7.6.4a2.9 2.9 0 0 1 2 2c.2.7.4 1.9.4 4.1Z" />
                  <path d="m10 9 5 3-5 3z" />
                </svg>
              </a>
              <a href="https://instagram.com/iamtilou" target="_blank" rel="noreferrer" aria-label="instagram">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17" cy="7" r="1" />
                </svg>
              </a>
              <a href="https://x.com/iamtilou" target="_blank" rel="noreferrer" aria-label="x">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4 4 20 20" />
                  <path d="M20 4 4 20" />
                </svg>
              </a>
              <a href="https://github.com/iamtilou" target="_blank" rel="noreferrer" aria-label="github">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3.3-.4 6.8-1.6 6.8-7A5.4 5.4 0 0 0 19.4 4 5 5 0 0 0 19.3 1s-1.6-.4-4.6 1.5a13.4 13.4 0 0 0-7.4 0C4.3.6 2.7 1 2.7 1A5 5 0 0 0 2.6 4a5.4 5.4 0 0 0-1.4 3.8c0 5.4 3.5 6.6 6.8 7A4.8 4.8 0 0 0 7 18v4" />
                  <path d="M7 18c-4 2-4-2-6-2" />
                </svg>
              </a>
              <a href="https://twitch.tv/iamtilou" target="_blank" rel="noreferrer" aria-label="twitch">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4 3h16v11l-4 4h-4l-2 2H7v-2H4z" />
                  <path d="M9 8v4" />
                  <path d="M13 8v4" />
                </svg>
              </a>
              <a href="mailto:iamtilou@proton.me" aria-label="email">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 7 9-7" />
                </svg>
              </a>
            </nav>
          </div>
        </header>

        <p className="intro">lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

        <section className="section">
          <h2>what i do:</h2>
          <ul>
            <li>i (will) design and ship autonomous intelligent systems for large-scale real-world use.</li>
          </ul>
        </section>

        <section className="section">
          <h2>skills</h2>
          <div className="skills-grid">
            <article className="card">
              <h3>skills</h3>
            </article>
          </div>
        </section>

        <section className="projects-section">
          <h2>projects</h2>
          <div className="projects-list">
            <span>projects</span>
          </div>
        </section>
      </main>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
    </>
  );
}
