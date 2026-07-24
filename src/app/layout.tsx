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
  title: "Hari Babu S R | Portfolio",
  description: "MCA Student & Full-Stack Architect. Specializing in scalable web solutions with React, Next.js, Python, and modern cloud technologies.",
  keywords: ["portfolio", "full-stack developer", "React", "Next.js", "Python", "web developer"],
  authors: [{ name: "Hari Babu S R" }],
  icons: {
    icon: "/favic.png",
    apple: "/favic.png",
  },
  openGraph: {
    title: "Hari Babu S R | Portfolio",
    description: "MCA Student & Full-Stack Architect",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
