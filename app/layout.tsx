import './globals.css'
import { Inter } from 'next/font/google'

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

import Header from '@/components/header'
import Footer from '@/components/footer'
import Sidebar from "@/components/sidebar";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Solun • Privacy at its highest',
  description: 'Solun is a service that allows you to share files, text and sending emails with end-to-end encryption, without storing any user related data on our servers. Become anonymous and protect your privacy today.',
  tags: ['Solun', 'Privacy', 'Anonymous', 'Encryption', 'Files', 'Text', 'Emails', 'Share Files', 'Upload Files', 'Send Encrypted Texts'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
      <div className="bg-primary min-h-screen">
          <div className="flex min-h-screen">
              <Sidebar />
              <div className="flex-grow flex flex-col">
                <Header />
                {children}
                <Footer />
              </div>
            </div>
        </div>
      </body>
    </html>
  );
}