import type { Metadata } from "next";
import { Inter, IBM_Plex_Serif } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter-variable",
  subsets: ["latin"],
});

const ibm_plex_serif = IBM_Plex_Serif({
  variable: "--font-ibm-plex-serif-variable",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Horizon",
  description: "Banking for everyday users",
  icons: {
    icon: "/icons/logo.svg",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${ibm_plex_serif.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
