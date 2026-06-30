import type {Hours} from './sanity-types'

export function formatPhoneHref(phone: string): string {
  const digits = phone.replace(/\D/g, '')
  if (digits.length === 10) return `tel:+1${digits}`
  if (digits.length === 11 && digits.startsWith('1')) return `tel:+${digits}`
  return `tel:${digits}`
}

export function formatPhoneDisplay(phone: string): string {
  const digits = phone.replace(/\D/g, '')
  const ten = digits.length === 11 && digits.startsWith('1') ? digits.slice(1) : digits
  if (ten.length !== 10) return phone
  return `(${ten.slice(0, 3)}) ${ten.slice(3, 6)}-${ten.slice(6)}`
}

export function formatDate(
  iso: string | undefined,
  opts: {month?: 'short' | 'long'; day?: boolean; year?: boolean} = {},
): string {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  return d.toLocaleDateString('en-US', {
    year: opts.year === false ? undefined : 'numeric',
    month: opts.month ?? 'short',
    day: opts.day ? 'numeric' : undefined,
  })
}

// "full_time" -> "Full-time", "new_install" -> "New install"
export function humanize(value: string | undefined): string {
  if (!value) return ''
  const spaced = value.replace(/_/g, ' ')
  return spaced.charAt(0).toUpperCase() + spaced.slice(1)
}

export const DAY_LABELS: Array<{key: keyof Hours; label: string}> = [
  {key: 'monday', label: 'Mon'},
  {key: 'tuesday', label: 'Tue'},
  {key: 'wednesday', label: 'Wed'},
  {key: 'thursday', label: 'Thu'},
  {key: 'friday', label: 'Fri'},
  {key: 'saturday', label: 'Sat'},
  {key: 'sunday', label: 'Sun'},
]

export function formatHourTime(time: string | undefined): string {
  if (!time) return ''
  const [hStr, mStr] = time.split(':')
  const h = parseInt(hStr, 10)
  const m = parseInt(mStr, 10)
  if (Number.isNaN(h) || Number.isNaN(m)) return time
  const period = h >= 12 ? 'pm' : 'am'
  const display = h % 12 === 0 ? 12 : h % 12
  return m === 0 ? `${display}${period}` : `${display}:${mStr.padStart(2, '0')}${period}`
}
