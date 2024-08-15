import type { Metadata } from "next";
import {Fragment_Mono, Kode_Mono} from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import LinkedinIcon from "@/icons/linkedin";
import TwitterLogo from "@/icons/twitter";
import GithubLogo from "@/icons/github";

const fragmentMono = Fragment_Mono({ subsets: ['latin'], weight: "400" })
const kodeMono = Kode_Mono({ subsets: ['latin'], variable: '--font-kode-mono' })

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
    <head>
      <link rel="icon" href="/favicon.ico" sizes="any"/>
    </head>

    <body className={`${fragmentMono.className} ${kodeMono.variable} h-dvh flex flex-col items-stretch`}>
    <nav className="p-4 w-full flex items-center justify-end gap-x-4 fixed bg-amber-50">
      <Image src="/danilo.png" alt="Danilo" width={20} height={20}/>

      <ul className="flex items-center gap-x-6">
        <li><Link href="/">/ home</Link></li>
        <li><a href="https://danilo.life" target="_blank" rel="noreferrer">/ life</a></li>
      </ul>
    </nav>

    <div className="mt-20">
      {children}
    </div>

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
