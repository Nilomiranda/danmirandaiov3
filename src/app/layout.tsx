import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Danilo Tech Garden",
  description: "Creating software, breaking it, and documenting",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="p-2 w-full flex items-center justify-end">
          <ul>
            <li><Link href="/">/ home</Link></li>
          </ul>
        </nav>
        {children}
      </body>
    </html>
  );
}
