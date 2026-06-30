import {useState, type BaseSyntheticEvent} from 'react'

type Status = 'idle' | 'submitting' | 'success' | 'error'

// Shared submit logic for the contact + apply forms: tracks status, reads the
// hidden honeypot off the form element, POSTs JSON, and surfaces errors.
// Returns true on success so the caller can reset() the form.
export function useFormSubmit(url: string) {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  async function submit(
    values: Record<string, unknown>,
    event?: BaseSyntheticEvent,
  ): Promise<boolean> {
    setStatus('submitting')
    setErrorMessage(null)
    const form = event?.target as HTMLFormElement | undefined
    const website = (form?.elements.namedItem('website') as HTMLInputElement | null)?.value ?? ''
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({...values, website}),
      })
      if (!res.ok) {
        const text = await res.text().catch(() => '')
        throw new Error(text || `Request failed (${res.status})`)
      }
      setStatus('success')
      return true
    } catch (err) {
      setStatus('error')
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong.')
      return false
    }
  }

  return {status, setStatus, errorMessage, submit}
}
