'use client'

import {Button} from '@/components/ui/button'
import {CheckCircle2} from 'lucide-react'

export function FormSuccess({
  title,
  message,
  resetLabel = 'Send another',
  onReset,
}: {
  title: string
  message: string
  resetLabel?: string
  onReset: () => void
}) {
  return (
    <div className="rounded-lg border border-border bg-muted/30 p-6 text-center">
      <CheckCircle2 className="mx-auto h-10 w-10 text-brand" />
      <h3 className="mt-3 text-lg font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{message}</p>
      <Button variant="ghost" size="sm" className="mt-4" onClick={onReset}>
        {resetLabel}
      </Button>
    </div>
  )
}
