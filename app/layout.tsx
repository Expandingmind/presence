import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Presence — the marketing brain for app founders",
  description:
    "Send Presence your videos. It watches what goes viral in your niche, finds the patterns, and tells you what to make next.",
  openGraph: {
    title: "Presence — the marketing brain for app founders",
    description:
      "Send it your videos. It learns what goes viral and helps you make more of it.",
    type: "website",
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🧠</text></svg>",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Hanken+Grotesk:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="glow" />
        {children}
      </body>
    </html>
  );
}
