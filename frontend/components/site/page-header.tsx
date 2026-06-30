export function PageHeader({title, subtitle}: {title: string; subtitle?: string}) {
  return (
    <div className="max-w-2xl">
      <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
      {subtitle && <p className="mt-3 text-muted-foreground">{subtitle}</p>}
    </div>
  )
}
