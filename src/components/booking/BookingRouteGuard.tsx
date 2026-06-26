import { Navigate, useLocation } from 'react-router-dom'
import { useBooking } from '../../context/BookingContext'
import { parseValidISODate } from '../../utils/date'

type GuardRule = 'searchReady' | 'ferriesSelected' | 'passengersFilled'

const rules: Record<string, GuardRule> = {
  '/results': 'searchReady',
  '/booking': 'ferriesSelected',
  '/payment': 'passengersFilled',
}

function isFilled(value: string): boolean {
  return value.trim().length > 0
}

function hasValidLeg(leg: ReturnType<typeof useBooking>['booking']['outbound']): boolean {
  return isFilled(leg.routeFrom) && isFilled(leg.routeTo) && !!parseValidISODate(leg.date)
}

function hasValidSearch(booking: ReturnType<typeof useBooking>['booking']): boolean {
  return (
    hasValidLeg(booking.outbound) &&
    (booking.tripType === 'oneway' || hasValidLeg(booking.returnLeg))
  )
}

function hasValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function hasCompletePassenger(
  passenger: ReturnType<typeof useBooking>['booking']['passengers'][number],
): boolean {
  return [
    passenger.firstName,
    passenger.lastName,
    passenger.birthPlace,
    passenger.birthDate,
    passenger.nationality,
    passenger.documentType,
    passenger.documentNumber,
    passenger.documentExpiry,
  ].every(isFilled)
}

function canAccess(path: string, booking: ReturnType<typeof useBooking>['booking']): boolean {
  const rule = rules[path]
  if (!rule) return true

  if (rule === 'searchReady') {
    return hasValidSearch(booking)
  }

  if (rule === 'ferriesSelected') {
    const hasOutbound = !!booking.selectedFerries.outbound
    const hasReturn =
      booking.tripType === 'oneway' || !!booking.selectedFerries.return
    return hasOutbound && hasReturn
  }

  if (rule === 'passengersFilled') {
    const hasFerries =
      !!booking.selectedFerries.outbound &&
      (booking.tripType === 'oneway' || !!booking.selectedFerries.return)
    const hasPassengers =
      booking.passengers.length > 0 &&
      booking.passengers.every(hasCompletePassenger)
    const hasContact =
      hasValidEmail(booking.contact.email) &&
      booking.contact.email === booking.contact.confirmEmail
    return hasFerries && hasPassengers && hasContact
  }

  return true
}

function canAccessConfirmation(booking: ReturnType<typeof useBooking>['booking']): boolean {
  return !!booking.bookingReference
}

export function BookingRouteGuard({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation()
  const { booking } = useBooking()

  if (!canAccess(pathname, booking)) {
    if (pathname === '/results') return <Navigate to="/" replace />
    if (pathname === '/booking') return <Navigate to="/results" replace />
    if (pathname === '/payment') return <Navigate to="/booking" replace />
    if (pathname === '/confirmation') return <Navigate to="/" replace />
  }

  if (pathname === '/confirmation' && !canAccessConfirmation(booking)) {
    return <Navigate to="/" replace />
  }

  return children
}
