import type { Metadata, Viewport } from "next";
import { Montserrat, Hanken_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { business } from "@/content/site";
import { siteUrl, siteGraph, ogDefaults } from "@/lib/seo";
import ReviewMode from "@/components/ReviewMode";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import StickyActionBar from "@/components/StickyActionBar";
import JsonLd from "@/components/JsonLd";

// Variable fonts: one file per family/style instead of one per weight.
const montserrat = Montserrat({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-montserrat",
  display: "swap",
});
const hanken = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-hanken", display: "swap" });
// Mono carries data only (hours, row numbers), at one weight.
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: "500",
  variable: "--font-plex-mono",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "C&S Collision LLC | Auto Body Shop in Las Vegas, NV",
    template: "%s | C&S Collision",
  },
  description: `Nevada licensed auto body shop at ${business.street}, Las Vegas, serving Las Vegas and Henderson since ${business.since}. Call ${business.phoneDisplay}.`,
  applicationName: business.name,
  openGraph: ogDefaults,
  twitter: { card: "summary_large_image", images: ["/images/og.png"] },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0b0d0f",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${hanken.variable} ${plexMono.variable}`}>
      <body className="pb-[calc(59px+16px+env(safe-area-inset-bottom))] md:pb-0">
        <ReviewMode />
        <SiteHeader />
        <main id="main" tabIndex={-1} className="focus:outline-none">
          {children}
        </main>
        <SiteFooter />
        <StickyActionBar />
        <JsonLd data={siteGraph()} />
      </body>
    </html>
  );
}
