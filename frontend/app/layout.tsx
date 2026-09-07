import type {Metadata} from 'next'
import {Oswald, Montserrat} from 'next/font/google'

import './globals.css'
import {Header} from '@/components/site/header'
import {Footer} from '@/components/site/footer'
import {StickyCallButton} from '@/components/site/sticky-call-button'
import {sanityFetch} from '@/sanity/lib/fetch'
import {businessInfoQuery} from '@/sanity/lib/queries'
import type {BusinessInfo} from '@/lib/sanity-types'

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

// Titles come from Sanity so the browser tab, OG cards and search results carry
// the business name — not this template's. The literals below are only what a
// brand-new, unseeded dataset falls back to; fill in Business Info in the Studio
// and every page picks it up. Nothing here needs editing by hand.
const FALLBACK_NAME = 'Trades Starter Lite'
const FALLBACK_DESCRIPTION =
  'A free Next.js + Sanity starter for trades and contractor businesses.'

export async function generateMetadata(): Promise<Metadata> {
  const info = await sanityFetch<BusinessInfo | null>(businessInfoQuery)

  const name = info?.businessName?.trim() || FALLBACK_NAME
  const description = info?.tagline?.trim() || FALLBACK_DESCRIPTION
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL

  return {
    ...(siteUrl ? {metadataBase: new URL(siteUrl)} : {}),
    title: {default: name, template: `%s | ${name}`},
    description,
    openGraph: {type: 'website', siteName: name, title: name, description},
  }
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
