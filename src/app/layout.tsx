import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mason Tucker - Software Engineer | masonictemple4.codes",
  description: "Software Engineer with 7+ years of experience in startup environments. Founding engineer specializing in Go, Python, and scalable backend systems. Portfolio featuring terminal-style interface.",
  keywords: "Mason Tucker, Software Engineer, Go, Python, Backend Developer, Startup Engineer, Full Stack Developer, Terminal Portfolio",
  authors: [{ name: "Mason Tucker" }],
  creator: "Mason Tucker",
  openGraph: {
    title: "Mason Tucker - Software Engineer",
    description: "Founding engineer with expertise in Go, Python, and scalable backend systems",
    url: "https://masonictemple4.codes",
    siteName: "masonictemple4.codes",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mason Tucker - Software Engineer",
    description: "Founding engineer with expertise in Go, Python, and scalable backend systems",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
