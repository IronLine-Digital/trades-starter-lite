'use client'

import {cloneElement, isValidElement, useId, type ReactElement, type ReactNode} from 'react'
import {Label} from '@/components/ui/label'

// Associates a <Label> with its input via a generated id (a11y: htmlFor + id).
// Clones the child to inject the id so callers don't repeat it.
export function FormField({
  label,
  error,
  required,
  children,
}: {
  label: string
  error?: string
  required?: boolean
  children: ReactNode
}) {
  const id = useId()
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-sm font-semibold">
        {label}
        {required && (
          <span className="ml-0.5 text-destructive" aria-hidden>
            *
          </span>
        )}
      </Label>
      {isValidElement(children)
        ? cloneElement(children as ReactElement<{id?: string}>, {id})
        : children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}
