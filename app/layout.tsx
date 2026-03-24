import type { Metadata } from "next";
import { Inter, Noto_Serif_JP } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const notoSerifJP = Noto_Serif_JP({
  weight: ["200", "300", "400", "500", "600", "700", "900"],
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Portfolio — The Ronin Developer",
  description: "A digital craftsman building with precision and purpose.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${notoSerifJP.variable}`}>
      <body className="antialiased bg-[var(--bg)] text-[var(--text)] font-sans selection:bg-[var(--accent)] selection:text-white">
        {/* Paper texture background */}
        <div className="fixed inset-0 z-[-1] paper-texture opacity-60 pointer-events-none" />
        {children}
      </body>
    </html>
  );
}
