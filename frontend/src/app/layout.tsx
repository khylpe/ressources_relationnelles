// layout.tsx (root layout)
import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Providers from '@/providers/providers';
import '@/styles/globals.css';
import Head from 'next/head'; // Import the Head component
import CookiesNotification from '@/components/cookiesNotification';
const inter = Inter({ subsets: ['latin'] });
import MainLayout from '@/components/mainLayout';
import BackToTop from '@/components/backToTop';

export const metadata: Metadata = {
       title: '(Re)Sources Relationnelles',
       description: 'CESI school project',
       generator: "Next.js",
       manifest: "/manifest.json",
       keywords: ["Ressources Relationnelles",
              "CESI",
              "Groupe 4",
              "Aix-en-Provence",
              "Cube"],
       authors: [
              { name: "Groupe 4" },
       ],
       icons: [
              { rel: "apple-touch-icon", url: "/logo.png" },
              { rel: "icon", url: "/logo.png" },
       ],
};

export default function RootLayout({
       children,
}: {
       children: React.ReactNode;
}) {
       return (
              <>
                     <Head>
                            <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover" />
                            <link rel="manifest" href="/manifest.json" />
                            <link rel="apple-touch-icon" href="/logo.png" />
                            <meta name="theme-color" content="#317EFB" />
                            <link rel="icon" href="/logo.png" />
                     </Head>
                     <html lang="fr">
                            <body className={inter.className}>
                                   <Providers>
                                          <>
                                                 <MainLayout>{children}</MainLayout>
                                                 <CookiesNotification></CookiesNotification>
                                                 <BackToTop></BackToTop>
                                          </>
                                   </Providers>
                            </body>
                     </html>
              </>
       );
}