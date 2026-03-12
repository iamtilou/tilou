import VideoBackground from "./video-background";

export const dynamic = "force-static";

const SOCIAL_LINKS = [
  { id: "x", href: "https://x.com/iamtilou", label: "x", includeInSameAs: true },
  { id: "github", href: "https://github.com/iamtilou", label: "github", includeInSameAs: true },
  { id: "email", href: "mailto:iamtilou@proton.me", label: "email", includeInSameAs: false },
  { id: "instagram", href: "https://instagram.com/iamtilou", label: "instagram", includeInSameAs: true },
  { id: "tiktok", href: "https://www.tiktok.com/@iamtilou", label: "tiktok", includeInSameAs: true },
  { id: "youtube", href: "https://www.youtube.com/@iamtilou", label: "youtube", includeInSameAs: true },
  { id: "twitch", href: "https://twitch.tv/iamtilou", label: "twitch", includeInSameAs: true },
];

const schemaData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      name: "tilou",
      url: "https://tilou.xyz/",
      sameAs: SOCIAL_LINKS.filter((social) => social.includeInSameAs).map((social) => social.href),
      email: "mailto:iamtilou@proton.me",
    },
    {
      "@type": "WebSite",
      name: "tilou",
      url: "https://tilou.xyz/",
    },
  ],
};

function SocialIcon({ id }) {
  if (id === "x") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 4 20 20" />
        <path d="M20 4 4 20" />
      </svg>
    );
  }

  if (id === "github") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3.3-.4 6.8-1.6 6.8-7A5.4 5.4 0 0 0 19.4 4 5 5 0 0 0 19.3 1s-1.6-.4-4.6 1.5a13.4 13.4 0 0 0-7.4 0C4.3.6 2.7 1 2.7 1A5 5 0 0 0 2.6 4a5.4 5.4 0 0 0-1.4 3.8c0 5.4 3.5 6.6 6.8 7A4.8 4.8 0 0 0 7 18v4" />
        <path d="M7 18c-4 2-4-2-6-2" />
      </svg>
    );
  }

  if (id === "email") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 7 9-7" />
      </svg>
    );
  }

  if (id === "instagram") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17" cy="7" r="1" />
      </svg>
    );
  }

  if (id === "tiktok") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M14 4v9.2a3.2 3.2 0 1 1-2.6-3.1" />
        <path d="M14 4c1.1 1.6 2.5 2.6 4 2.8" />
      </svg>
    );
  }

  if (id === "youtube") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M22 12c0 2.2-.2 3.4-.4 4.1a2.9 2.9 0 0 1-2 2c-.7.2-1.9.4-7.6.4s-6.9-.2-7.6-.4a2.9 2.9 0 0 1-2-2C2.2 15.4 2 14.2 2 12s.2-3.4.4-4.1a2.9 2.9 0 0 1 2-2C5.1 5.7 6.3 5.5 12 5.5s6.9.2 7.6.4a2.9 2.9 0 0 1 2 2c.2.7.4 1.9.4 4.1Z" />
        <path d="m10 9 5 3-5 3z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 3h16v11l-4 4h-4l-2 2H7v-2H4z" />
      <path d="M9 8v4" />
      <path d="M13 8v4" />
    </svg>
  );
}

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
              <p className="role">aspiring autonomous intelligent systems architect</p>
            </div>
          </div>
          <div className="header-actions">
            <nav className="social-links" aria-label="social links">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.id}
                  href={social.href}
                  target={social.id === "email" ? undefined : "_blank"}
                  rel={social.id === "email" ? undefined : "noreferrer noopener"}
                  aria-label={social.label}
                >
                  <SocialIcon id={social.id} />
                </a>
              ))}
            </nav>
          </div>
        </header>
      </main>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
    </>
  );
}
