import { Navigate, useLocation } from 'react-router-dom'
import { useBooking } from '../../context/BookingContext'

type GuardRule = 'ferriesSelected' | 'passengersFilled'

const rules: Record<string, GuardRule> = {
  '/booking': 'ferriesSelected',
  '/payment': 'passengersFilled',
}

function canAccess(path: string, booking: ReturnType<typeof useBooking>['booking']): boolean {
  const rule = rules[path]
  if (!rule) return true

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
      booking.passengers.every((p) => p.firstName && p.lastName && p.birthDate)
    const hasContact =
      !!booking.contact.email &&
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
    if (pathname === '/booking') return <Navigate to="/results" replace />
    if (pathname === '/payment') return <Navigate to="/booking" replace />
    if (pathname === '/confirmation') return <Navigate to="/" replace />
  }

  if (pathname === '/confirmation' && !canAccessConfirmation(booking)) {
    return <Navigate to="/" replace />
  }

  return children
}
