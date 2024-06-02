import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import LinkedinIcon from "@/icons/linkedin";
import TwitterLogo from "@/icons/twitter";
import GithubLogo from "@/icons/github";

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
      <body className={`${inter.className} h-dvh flex flex-col items-stretch`}>
        <nav className="p-4 w-full flex items-center justify-end gap-x-4">
          <Image src="/danilo.png" alt="Danilo" width={20} height={20} />

          <ul className="flex items-center gap-x-6">
            <li><Link href="/">/ home</Link></li>
            <li><a href="https://danilo.life" target="_blank" rel="noreferrer">/ life</a></li>
          </ul>
        </nav>

        {children}

        <footer className="w-full flex justify-center p-4 mt-auto">
          <ul className="flex items-center gap-x-2">
            <li>
              <a href="https://www.linkedin.com/in/danilo-miranda-b39b06103/" target="_blank"
                 rel="noreferrer"><LinkedinIcon width={25} height={25}/></a>
            </li>
            <li>
              <a href="https://x.com/nilomiranda" target="_blank" rel="noreferrer"><TwitterLogo width={25} height={25}/></a>
            </li>
            <li>
              <a href="https://github.com/nilomiranda" target="_blank" rel="noreferrer"><GithubLogo width={25} height={25}/></a>
            </li>
          </ul>
        </footer>
      </body>
    </html>
  );
}
