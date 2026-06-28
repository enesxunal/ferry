import { CheckCircle, Car, PawPrint, Star, User } from '@phosphor-icons/react'
import { format } from 'date-fns'
import { de as deLocale } from 'date-fns/locale'
import { useState } from 'react'
import calendarIcon from '../../assets/checkout-calendar.svg'
import rabatIcon from '../../assets/checkout-rabat.svg'
import ticketIcon from '../../assets/checkout-ticket.svg'
import { useBooking } from '../../context/BookingContext'
import { getRouteLabel } from '../../data/mockPorts'
import { de } from '../../i18n/de'
import type { FerryOffer } from '../../types/booking'
import { parseValidISODate } from '../../utils/date'
import { GradientCtaButton } from '../ui/GradientCtaButton'

interface TripSummarySidebarProps {
  onConfirm?: () => void
  confirmLabel?: string
}

const currency = new Intl.NumberFormat('de-DE', {
  style: 'currency',
  currency: 'EUR',
})

function formatDate(date: string) {
  const parsedDate = parseValidISODate(date)
  return parsedDate ? format(parsedDate, 'dd. MMM yyyy', { locale: deLocale }) : '-'
}

function formatMoney(value: number) {
  return currency.format(value)
}

export function TripSummarySidebar({
  onConfirm,
  confirmLabel = 'CONFIRMER',
}: TripSummarySidebarProps) {
  const { booking } = useBooking()
  const [discountOpen, setDiscountOpen] = useState(false)
  const [discountCode, setDiscountCode] = useState(booking.discountCode)
  const passengers = booking.outbound.passengers
  const vehicle = booking.outbound.vehicle

  const passengerCount =
    passengers.adults +
    passengers.youths +
    passengers.seniors +
    passengers.children +
    passengers.infants
  const pricedPassengerCount = Math.max(
    1,
    passengers.adults + passengers.youths + passengers.seniors + passengers.children,
  )
  const outboundTotal = (booking.selectedFerries.outbound?.price ?? 0) * pricedPassengerCount
  const returnTotal = (booking.selectedFerries.return?.price ?? 0) * pricedPassengerCount
  const vehicleTotal = vehicle.hasVehicle ? 35 : 0
  const fees = outboundTotal + returnTotal > 0 ? 12 : 0
  const discount = discountCode.trim() ? Math.round((outboundTotal + returnTotal) * 0.05 * 100) / 100 : 0
  const total = Math.max(0, outboundTotal + returnTotal + vehicleTotal + fees - discount)

  const renderLeg = (
    label: string,
    ferry: FerryOffer | null,
    date: string,
    routeFrom: string,
    routeTo: string,
    subtotal: number,
  ) => {
    const route = getRouteLabel(routeFrom, routeTo)

    return (
      <div className="rounded-lg border border-sky-100 bg-white p-3">
        <div className="mb-2 flex items-start justify-between gap-3">
          <div>
            <h4 className="text-sm font-bold text-aml-blue">{label}</h4>
            <p className="text-xs text-gray-500">{route || 'Route noch nicht vollstaendig'}</p>
          </div>
          <img src={ticketIcon} alt="" aria-hidden="true" className="h-7 w-8 object-contain" />
        </div>

        {ferry ? (
          <div className="space-y-2 text-xs text-gray-600">
            <div className="flex items-center justify-between">
              <span>Anbieter</span>
              <span className="font-bold text-aml-blue">{ferry.operator}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <img src={calendarIcon} alt="" aria-hidden="true" className="h-4 w-4 object-contain" />
                Datum
              </span>
              <span className="font-semibold">{formatDate(date)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Uhrzeit</span>
              <span className="font-semibold">
                {ferry.departureTime} - {ferry.arrivalTime}
              </span>
            </div>
            <div className="flex items-center justify-between border-t border-gray-100 pt-2">
              <span>Einzelpreis</span>
              <span className="font-semibold">{formatMoney(ferry.price)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Zwischensumme</span>
              <span className="font-bold text-aml-blue">{formatMoney(subtotal)}</span>
            </div>
          </div>
        ) : (
          <p className="text-xs text-gray-500">Noch keine Abfahrt ausgewaehlt.</p>
        )}
      </div>
    )
  }

  return (
    <aside className="h-fit rounded-xl border border-sky-100 bg-white p-4 shadow-md lg:sticky lg:top-4">
      <h3 className="mb-4 text-lg font-bold text-aml-blue">Ihre Reise</h3>

      <div className="space-y-3">
        {renderLeg(
          de.outbound,
          booking.selectedFerries.outbound,
          booking.outbound.date,
          booking.outbound.routeFrom,
          booking.outbound.routeTo,
          outboundTotal,
        )}
        {booking.tripType === 'roundtrip' &&
          renderLeg(
            de.return,
            booking.selectedFerries.return,
            booking.returnLeg.date,
            booking.returnLeg.routeFrom,
            booking.returnLeg.routeTo,
            returnTotal,
          )}
      </div>

      <div className="mt-4 space-y-2 rounded-lg bg-sky-50 p-3 text-xs text-gray-700">
        <p className="flex items-center gap-2">
          <User className="h-4 w-4 text-aml-blue" />
          {passengerCount} Passagier{passengerCount === 1 ? '' : 'e'}
        </p>
        {passengers.pets > 0 && (
          <p className="flex items-center gap-2">
            <PawPrint className="h-4 w-4 text-aml-blue" />
            {passengers.pets} Haustier{passengers.pets === 1 ? '' : 'e'}
          </p>
        )}
        {vehicle.hasVehicle && (
          <p className="flex items-center gap-2">
            <Car className="h-4 w-4 text-aml-blue" />
            <span>
              {vehicle.brandModel || 'Fahrzeug'}
              {vehicle.licensePlate ? ` / ${vehicle.licensePlate}` : ''}
            </span>
          </p>
        )}
      </div>

      <div className="mt-4 space-y-2 border-t border-gray-100 pt-4 text-sm">
        <div className="flex justify-between">
          <span>Hinfahrt</span>
          <span>{formatMoney(outboundTotal)}</span>
        </div>
        {booking.tripType === 'roundtrip' && (
          <div className="flex justify-between">
            <span>Rueckfahrt</span>
            <span>{formatMoney(returnTotal)}</span>
          </div>
        )}
        {vehicle.hasVehicle && (
          <div className="flex justify-between">
            <span>Fahrzeug</span>
            <span>{formatMoney(vehicleTotal)}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span>Gebuehren</span>
          <span>{formatMoney(fees)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-emerald-700">
            <span>Rabatt</span>
            <span>-{formatMoney(discount)}</span>
          </div>
        )}
      </div>

      <div className="mt-4 rounded-lg border border-gray-100 bg-white p-3">
        <button
          type="button"
          onClick={() => setDiscountOpen((open) => !open)}
          className="flex w-full items-center justify-between text-xs font-semibold text-aml-blue"
        >
          <span className="flex min-w-0 items-center gap-2">
            <img src={rabatIcon} alt="" aria-hidden="true" className="h-6 w-6 shrink-0 object-contain" />
            <span>Rabattcode</span>
          </span>
          <span>{discountOpen ? 'Ausblenden' : 'Hinzufuegen'}</span>
        </button>
        {discountOpen && (
          <input
            value={discountCode}
            onChange={(event) => setDiscountCode(event.target.value)}
            placeholder="Code eingeben"
            className="mt-3 w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-aml-blue"
          />
        )}
      </div>

      <div className="mt-4 flex items-end justify-between border-t border-gray-100 pt-4">
        <span className="text-sm font-bold text-gray-700">Total</span>
        <span className="text-2xl font-bold text-aml-blue">{formatMoney(total)}</span>
      </div>

      {onConfirm && (
        <GradientCtaButton
          onClick={onConfirm}
          text={confirmLabel}
          icon={<CheckCircle weight="bold" />}
          size="lg"
          className="mt-4 w-full"
        />
      )}

      <div className="mt-4 rounded-lg bg-[#e8f4f5] p-3 text-center">
        <div className="flex items-center justify-center gap-0.5 text-[#f9a852]">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star key={index} className="h-4 w-4 fill-current" />
          ))}
        </div>
        <p className="mt-1 text-sm font-bold text-aml-blue">4,82/5</p>
        <p className="text-[11px] text-gray-500">Basierend auf Kundenbewertungen</p>
      </div>
    </aside>
  )
}
