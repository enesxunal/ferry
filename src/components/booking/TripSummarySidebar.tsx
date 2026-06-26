import { format } from 'date-fns'
import { de as deLocale } from 'date-fns/locale'
import { Car, PawPrint, User } from '@phosphor-icons/react'
import { useBooking } from '../../context/BookingContext'
import { getRouteLabel } from '../../data/mockPorts'
import { de } from '../../i18n/de'
import { parseValidISODate } from '../../utils/date'

export function TripSummarySidebar() {
  const { booking } = useBooking()
  const p = booking.outbound.passengers
  const v = booking.outbound.vehicle

  const renderLeg = (
    label: string,
    ferry: typeof booking.selectedFerries.outbound,
    date: string,
    routeFrom: string,
    routeTo: string,
  ) => {
    if (!ferry) return null

    const parsedDate = parseValidISODate(date)
    const dayDep = parsedDate ? format(parsedDate, 'EEEE dd MMMM', { locale: deLocale }) : ''
    const dayArr = dayDep

    return (
      <div className="border-b border-gray-100 pb-4 mb-4 last:border-0 last:pb-0 last:mb-0">
        <h4 className="font-bold text-aml-blue text-sm mb-3">{label}</h4>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-16 h-8 bg-aml-grey rounded flex items-center justify-center text-xs font-bold text-aml-blue">
            {ferry.operatorLogo}
          </div>
          <span className="text-xs text-gray-500">{getRouteLabel(routeFrom, routeTo)}</span>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500 capitalize">{dayDep}</span>
            <span className="font-semibold">{ferry.departureTime} Uhr</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 capitalize">{dayArr}</span>
            <span className="font-semibold">{ferry.arrivalTime} Uhr</span>
          </div>
        </div>

        <div className="mt-3 space-y-1.5 text-xs text-gray-600">
          {p.adults > 0 && (
            <p className="flex items-center gap-2">
              <User className="w-3.5 h-3.5 text-aml-blue" />
              {p.adults} Erwachsene{p.adults > 1 ? 'r' : 'r'}
            </p>
          )}
          {p.pets > 0 && (
            <p className="flex items-center gap-2">
              <PawPrint className="w-3.5 h-3.5 text-aml-blue" />
              {p.pets} Haustier{p.pets > 1 ? 'e' : ''}
            </p>
          )}
          {v.hasVehicle && (
            <p className="flex items-center gap-2">
              <Car className="w-3.5 h-3.5 text-aml-blue" />
              Auto
              {v.length && v.height ? ` (l. ${v.length} cm h. ${v.height} cm)` : ''}
            </p>
          )}
        </div>

        <p className="mt-3 font-bold text-aml-blue">
          Gesamtsumme {label}: {ferry.price.toFixed(2).replace('.', ',')} €
        </p>
        <div className="flex gap-3 mt-1 text-xs">
          <span className="text-aml-red">✓ Nicht erstattbar</span>
          <span className="text-aml-green">✓ Änderbar</span>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 sticky top-4">
      <h3 className="font-bold text-aml-blue text-lg mb-4">Ihre Reise</h3>
      {renderLeg(
        de.outbound,
        booking.selectedFerries.outbound,
        booking.outbound.date,
        booking.outbound.routeFrom,
        booking.outbound.routeTo,
      )}
      {booking.tripType === 'roundtrip' &&
        renderLeg(
          de.return,
          booking.selectedFerries.return,
          booking.returnLeg.date,
          booking.returnLeg.routeFrom,
          booking.returnLeg.routeTo,
        )}
    </div>
  )
}
