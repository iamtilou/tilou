import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
});

export const metadata = {
  metadataBase: new URL("https://tilou.xyz"),
  title: "tilou",
  description: "official portfolio of tilou. social links and contact.",
  applicationName: "tilou",
  authors: [{ name: "tilou" }],
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      "x-default": "/",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_us",
    url: "https://tilou.xyz/",
    siteName: "tilou",
    title: "tilou",
    description: "official portfolio of tilou. social links and contact.",
  },
  twitter: {
    card: "summary",
    title: "tilou",
    description: "official portfolio of tilou. social links and contact.",
    creator: "@iamtilou",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export function generateViewport() {
  return {
    width: "device-width",
    initialScale: 1,
    viewportFit: "cover",
    themeColor: "#050608",
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={geist.variable} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
