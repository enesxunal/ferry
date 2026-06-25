import type { BookingSearch } from '../types/booking'
import { de } from '../i18n/de'

export function formatPassengerSummary(
  p: BookingSearch['outbound']['passengers'],
): string {
  const parts: string[] = []
  const total = p.adults + p.youths + p.seniors + p.children + p.infants
  if (total === 1) parts.push('1 Passagier')
  else if (total > 0) parts.push(`${total} Passagiere`)
  if (p.pets === 1) parts.push('1 Tier')
  else if (p.pets > 1) parts.push(`${p.pets} Tiere`)
  return parts.join(', ') || de.passengers.add
}

export function formatPassengerSummaryDetailed(
  booking: Pick<BookingSearch, 'outbound'>,
): string {
  const p = booking.outbound.passengers
  const parts: string[] = []
  const total = p.adults + p.youths + p.seniors + p.children + p.infants
  if (total) parts.push(`${total} Passagier${total > 1 ? '' : ''}`)
  if (p.pets) parts.push(`${p.pets} Haustier${p.pets > 1 ? 'e' : ''}`)
  if (booking.outbound.vehicle.hasVehicle) parts.push('Auto')
  return parts.join(', ') || '1 Passagier'
}
