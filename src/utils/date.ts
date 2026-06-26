import { isValid, parseISO } from 'date-fns'

export function parseValidISODate(value: string): Date | null {
  if (!value) return null
  const parsed = parseISO(value)
  return isValid(parsed) ? parsed : null
}
