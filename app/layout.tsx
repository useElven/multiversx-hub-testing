import { ThemeProvider } from '@/components/theme-provider';
import './globals.css';
import packageJson from '@/package.json';
import { Github } from 'lucide-react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ModeToggle } from '@/components/mode-toggle';
import { ElvenInit } from '@/components/elven-ui/elven-init';
import { LoginModalButton } from '@/components/elven-ui/login-modal-button';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

const dappHostname =
  process.env.NEXT_PUBLIC_DAPP_HOST || 'http://localhost:3000';
const globalTitle =
  'useElven and elven.js MultiversX web view provider testing';
const globalDescription =
  'An app for testing the MultiversX Apps Hub integration in apps using useElven and elven.js';
const globalImage = `${dappHostname}/og-image.png`;

export const metadata: Metadata = {
  metadataBase: new URL(dappHostname!),
  title: globalTitle,
  description: globalDescription,
  authors: { name: 'Elven Family', url: 'https://www.elven.family' },
  openGraph: {
    title: globalTitle,
    images: [globalImage],
    description: globalDescription,
    type: 'website',
    url: dappHostname,
  },
  twitter: {
    title: globalTitle,
    description: globalDescription,
    images: [globalImage],
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ElvenInit />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="container mx-auto">
            <div className="w-full flex items-center justify-between flex-wrap gap-2 py-9 flex-col lg:flex-row">
              <Link href="/">
                <div className="flex items-center gap-2 relative select-none">
                  <span className="cursor-pointer mb-0 text-4xl font-black text-center">
                    MultiversX web view provider testing (devnet)
                  </span>
                </div>
              </Link>
              <div className="flex items-center gap-5">
                <div className="flex items-center gap-3">
                  <a
                    href="https://github.com/useElven/multiversx-apps-hub-testing"
                    target="_blank"
                  >
                    <Github size={30} />
                  </a>
                </div>
                <LoginModalButton />
                <ModeToggle />
              </div>
            </div>
          </div>
          <div className="container mx-auto min-h-[calc(100vh-280px)] lg:min-h-[calc(100vh-235px)]">
            {children}
          </div>
          <div className="flex h-[120px] items-center">
            <div className="flex flex-col items-center justify-center container mx-auto text-center text-sm">
              <div className="font-bold">
                useElven and elven.js MultiversX web view provider testing (v
                {`${packageJson.version}`})
              </div>
              <div className="text-xs font-light">Support Our Project.</div>
              <div className="flex flex-row content-center text-xs font-bold mt-4">
                <a href="https://github.com/xdevguild" target="_blank">
                  {'xDevGuild'}
                </a>
                <span className="font-thin mx-2"> | </span>
                <a href="https://www.elven.family" target="_blank">
                  {'Elven Family tools'}
                </a>
                <span className="font-thin mx-2"> | </span>
                <a href="https://www.buildo.dev" target="_blank">
                  {'Buildo.dev'}
                </a>
                <span className="font-thin mx-2"> | </span>
                <a href="https://www.julian.io" target="_blank">
                  {'julian.io'}
                </a>
              </div>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
