import './globals.css'
import { Inter } from 'next/font/google'

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_MAIN_DOMAIN as string),
  title: 'Solun • Webmail',
  description: 'Send and receive emails with the fast and secure Solun Webmail.',
  tags: ['Solun', 'Privacy', 'Anonymous', 'Encryption', 'E-Mails', 'Freemail'],
  openGraph: {
    title: 'Solun • Webmail',
    description: 'Send and receive emails with the fast and secure Solun Webmail.',
    siteName: 'Solun • Webmail',
    images: [
      {
        url: 'https://cdn.solun.pm/images/logo/solun-logo.png',
        width: 512,
        height: 512,
        alt: 'Solun Logo',
      },
    ],
  },
  locale: 'en_US',
  type: 'website',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}