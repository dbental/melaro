import type { Metadata } from "next";
import { DM_Serif_Display, Major_Mono_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const dmSerif = DM_Serif_Display({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const majorMono = Major_Mono_Display({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-wordmark",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Melaro — AI Teams in Natural Harmony",
  description:
    "Deploy autonomous AI agent teams that plan, build, and ship together. Orchestrated intelligence, naturally balanced.",
  metadataBase: new URL("https://melaro.io"),
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "Melaro — AI Teams in Natural Harmony",
    description:
      "Deploy autonomous AI agent teams that plan, build, and ship together.",
    siteName: "Melaro",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Melaro — AI Teams in Natural Harmony",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Melaro — AI Teams in Natural Harmony",
    description:
      "Deploy autonomous AI agent teams that plan, build, and ship together.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSerif.variable} ${jakarta.variable} ${majorMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
