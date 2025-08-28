import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getMetaData } from "@/lib/data";

const inter = Inter({ subsets: ["latin"] });

const metaData = getMetaData();

export const metadata: Metadata = {
  title: metaData.title,
  description: metaData.description,
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
