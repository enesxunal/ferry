import { ShoppingCart } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { DateRibbon } from '../components/booking/DateRibbon'
import { FerryResultCard } from '../components/booking/FerryResultCard'
import { Button } from '../components/ui/Button'
import { Stepper } from '../components/ui/Stepper'
import { useBooking } from '../context/BookingContext'
import { getPortName, searchFerries } from '../data/mockFerries'
import { getRouteLabel, ports } from '../data/mockPorts'
import { formatPassengerSummaryDetailed } from '../utils/passengerSummary'
import { de } from '../i18n/de'

export function SearchResultsPage() {
  const navigate = useNavigate()
  const { booking, selectFerry, updateOutbound, updateReturnLeg, clearFerrySelection } =
    useBooking()
  const [outboundDate, setOutboundDate] = useState(booking.outbound.date)
  const [returnDate, setReturnDate] = useState(booking.returnLeg.date)

  const outboundFrom = getPortName(booking.outbound.routeFrom, ports)
  const outboundTo = getPortName(booking.outbound.routeTo, ports)
  const returnFrom = getPortName(booking.returnLeg.routeFrom, ports)
  const returnTo = getPortName(booking.returnLeg.routeTo, ports)

  const results = useMemo(
    () =>
      searchFerries(
        outboundFrom,
        outboundTo,
        outboundDate,
        returnFrom,
        returnTo,
        returnDate,
        booking.tripType,
      ),
    [booking.tripType, outboundFrom, outboundTo, outboundDate, returnFrom, returnTo, returnDate],
  )

  const sortedOutbound = [...results.outbound].sort((a, b) => a.price - b.price)
  const sortedReturn = [...results.return].sort((a, b) => a.price - b.price)

  const handleOutboundDateChange = (date: string) => {
    setOutboundDate(date)
    updateOutbound({ date })
    clearFerrySelection('outbound')
  }

  const handleReturnDateChange = (date: string) => {
    setReturnDate(date)
    updateReturnLeg({ date })
    clearFerrySelection('return')
  }

  const total =
    (booking.selectedFerries.outbound?.price ?? 0) +
    (booking.selectedFerries.return?.price ?? 0)
  const fees = total > 0 ? 12 : 0

  const canContinue =
    booking.selectedFerries.outbound &&
    (booking.tripType === 'oneway' || booking.selectedFerries.return)

  const passengerSummary = formatPassengerSummaryDetailed(booking)

  return (
    <div className="pb-28">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <Stepper currentStep={2} />

        {/* Outbound section */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">🚢</span>
          <div>
            <h1 className="text-xl font-bold text-aml-blue">
              {de.outbound}: {getRouteLabel(booking.outbound.routeFrom, booking.outbound.routeTo)}
            </h1>
            <Link to="/" className="text-xs text-aml-blue hover:underline">
              ✎ Bearbeiten
            </Link>
          </div>
        </div>

        <div className="mb-4">
          <DateRibbon
            centerDate={outboundDate}
            from={outboundFrom}
            to={outboundTo}
            leg="outbound"
            onDateChange={handleOutboundDateChange}
          />
        </div>

        <div className="space-y-3 mb-10">
          {sortedOutbound.map((offer) => (
            <FerryResultCard
              key={offer.id}
              offer={offer}
              date={outboundDate}
              selected={booking.selectedFerries.outbound?.id === offer.id}
              onSelect={() => selectFerry(offer)}
              passengerSummary={passengerSummary}
            />
          ))}
        </div>

        {/* Return section */}
        {booking.tripType === 'roundtrip' && (
          <>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🚢</span>
              <div>
                <h2 className="text-xl font-bold text-aml-blue">
                  {de.return}:{' '}
                  {getRouteLabel(booking.returnLeg.routeFrom, booking.returnLeg.routeTo)}
                </h2>
                <Link to="/" className="text-xs text-aml-blue hover:underline">
                  ✎ Bearbeiten
                </Link>
              </div>
            </div>

            <div className="mb-4">
              <DateRibbon
                centerDate={returnDate}
                from={returnFrom}
                to={returnTo}
                leg="return"
                onDateChange={handleReturnDateChange}
              />
            </div>

            <div className="space-y-3">
              {sortedReturn.map((offer) => (
                <FerryResultCard
                  key={offer.id}
                  offer={offer}
                  date={returnDate}
                  selected={booking.selectedFerries.return?.id === offer.id}
                  onSelect={() => selectFerry(offer)}
                  passengerSummary={passengerSummary}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Sticky bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-aml-blue text-white shadow-lg z-40">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="text-sm">
            <p>
              Gesamtreise:{' '}
              <span className="font-bold">
                {total > 0 ? `${(total + fees).toFixed(2).replace('.', ',')} €` : '— —'}
              </span>
            </p>
            <p className="text-white/70 text-xs">
              Ausstellungsgebühren: {fees > 0 ? `${fees.toFixed(2).replace('.', ',')} €` : '— —'}
            </p>
          </div>
          <Button
            size="lg"
            disabled={!canContinue}
            onClick={() => navigate('/booking')}
            className="uppercase tracking-wide shrink-0"
          >
            <ShoppingCart className="w-5 h-5" />
            Weiter &gt;
          </Button>
        </div>
      </div>
    </div>
  )
}
