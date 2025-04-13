import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { APP_NAME, APP_DESCRIPTION, SERVER_URL } from "@/lib/constants";
import Header from "@/components/shared/Header/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(SERVER_URL),
  title: {
    template: `%s | ${APP_NAME}`,
    default: APP_NAME,
  },
  description: `${APP_DESCRIPTION}`,
};

// This page wraps whatever pages we reviewing

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Header/>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
