import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Ambit — The 360° CRM for teams that run on momentum",
  description:
    "Ambit unifies leads, HR, invoicing and every lead source you use into one connected workspace. Capture leads from Facebook, IndiaMART, 99acres, Housing and more — automatically.",
  keywords: [
    "CRM",
    "Lead Management",
    "HRMS",
    "Invoicing",
    "IndiaMART Integration",
    "Facebook Lead Ads",
    "360 CRM",
  ],
  openGraph: {
    title: "Ambit — The 360° CRM for teams that run on momentum",
    description:
      "Leads, HR, invoicing and every integration you need — orbiting one connected record.",
    type: "website",
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
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="antialiased bg-ink text-paper">{children}</body>
    </html>
  );
}

