import {PortableText, type PortableTextComponents, type PortableTextBlock} from '@portabletext/react'

const components: PortableTextComponents = {
  block: {
    normal: ({children}) => <p className="leading-relaxed text-foreground/90">{children}</p>,
    h2: ({children}) => (
      <h2 className="mt-10 mb-4 scroll-mt-24 text-2xl font-semibold tracking-tight">{children}</h2>
    ),
    h3: ({children}) => (
      <h3 className="mt-8 mb-3 scroll-mt-24 text-xl font-semibold tracking-tight">{children}</h3>
    ),
    h4: ({children}) => (
      <h4 className="mt-6 mb-2 scroll-mt-24 text-lg font-semibold tracking-tight">{children}</h4>
    ),
    blockquote: ({children}) => (
      <blockquote className="my-6 border-l-2 border-brand pl-4 italic text-muted-foreground">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({children}) => <ul className="my-4 ml-6 list-disc space-y-2">{children}</ul>,
    number: ({children}) => <ol className="my-4 ml-6 list-decimal space-y-2">{children}</ol>,
  },
  marks: {
    strong: ({children}) => <strong className="font-semibold">{children}</strong>,
    em: ({children}) => <em className="italic">{children}</em>,
    link: ({value, children}) => {
      const href: string | undefined = value?.href
      const external = href && !href.startsWith('/') && !href.startsWith('#')
      return (
        <a
          href={href}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
          className="underline underline-offset-4 hover:text-brand"
        >
          {children}
        </a>
      )
    },
  },
}

export function PortableTextRenderer({value}: {value: PortableTextBlock[] | undefined}) {
  if (!value || value.length === 0) return null
  return (
    <div className="space-y-4">
      <PortableText value={value} components={components} />
    </div>
  )
}
