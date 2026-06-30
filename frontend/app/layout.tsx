import type {Metadata} from 'next'
import {Oswald, Montserrat} from 'next/font/google'

import './globals.css'
import {Header} from '@/components/site/header'
import {Footer} from '@/components/site/footer'
import {StickyCallButton} from '@/components/site/sticky-call-button'

// Oswald for headings (condensed, trade-jobsite feel), Montserrat for body.
// next/font self-hosts the files and exposes them as CSS variables consumed by
// globals.css (@theme + base layer).
const heading = Oswald({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-heading',
  display: 'swap',
})

const sans = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Trades Starter Lite',
    template: '%s | Trades Starter Lite',
  },
  description: 'A free Next.js + Sanity starter for trades and contractor businesses.',
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${heading.variable} ${sans.variable}`}>
      <body className="flex min-h-screen flex-col pb-16 md:pb-0">
        {/* Resource hint: LCP/content images come from Sanity's CDN. */}
        <link rel="preconnect" href="https://cdn.sanity.io" />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <StickyCallButton />
      </body>
    </html>
  )
}
