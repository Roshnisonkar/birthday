import type { Metadata, Viewport } from "next";
import { Playfair_Display, Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const display = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

const script = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["italic", "normal"],
  variable: "--font-script",
  display: "swap",
});

const body = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Happy Birthday, My Dearest vipin sonkar",
  description:
    "A private, cinematic birthday celebration built with love — memories, letters, wishes, and a little bit of magic, just for her.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Happy Birthday, My Dearest Sister",
    description: "A private cinematic birthday surprise, made with love.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${script.variable} ${body.variable}`}>
      <body className="font-body bg-obsidian text-ivory antialiased">
        <div className="noise-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
