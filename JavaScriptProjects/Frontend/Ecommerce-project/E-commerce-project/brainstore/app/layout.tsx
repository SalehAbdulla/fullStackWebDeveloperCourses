import type { Metadata } from "next";
import { Inter } from "next/font/google";


const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
  title: "Creative Brain store",
  description: "A modern e-commerce platform built with Next.js",
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
