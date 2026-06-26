import { Boat, CheckCircle, Download } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Stepper } from '../components/ui/Stepper'
import { useBooking } from '../context/BookingContext'
import { de } from '../i18n/de'

export function ConfirmationPage() {
  const { booking, resetBooking } = useBooking()

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 text-center">
      <Stepper currentStep={3} />

      <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
        <CheckCircle className="w-16 h-16 text-aml-green mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-aml-blue mb-2">{de.confirmation.title}</h1>
        <p className="text-gray-500 mb-6">{de.confirmation.subtitle}</p>

        <div className="bg-aml-grey/40 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-500">{de.confirmation.reference}</p>
          <p className="text-2xl font-bold text-aml-blue tracking-wider">
            {booking.bookingReference}
          </p>
        </div>

        {booking.selectedFerries.outbound && (
          <div className="text-left bg-gray-50 rounded-lg p-4 mb-4 text-sm">
            <div className="flex items-center gap-2 font-semibold text-aml-blue mb-2">
              <Boat className="w-4 h-4" />
              {de.payment.outbound}
            </div>
            <p>
              {booking.selectedFerries.outbound.operator} —{' '}
              {booking.selectedFerries.outbound.shipName}
            </p>
            <p className="text-gray-500">
              {booking.selectedFerries.outbound.departurePort} →{' '}
              {booking.selectedFerries.outbound.arrivalPort}
            </p>
            <p>
              {booking.outbound.date} | {booking.selectedFerries.outbound.departureTime}
            </p>
          </div>
        )}

        {booking.selectedFerries.return && (
          <div className="text-left bg-gray-50 rounded-lg p-4 mb-4 text-sm">
            <div className="flex items-center gap-2 font-semibold text-aml-blue mb-2">
              <Boat className="w-4 h-4" />
              {de.payment.return}
            </div>
            <p>
              {booking.selectedFerries.return.operator} —{' '}
              {booking.selectedFerries.return.shipName}
            </p>
            <p className="text-gray-500">
              {booking.selectedFerries.return.departurePort} →{' '}
              {booking.selectedFerries.return.arrivalPort}
            </p>
            <p>
              {booking.returnLeg.date} | {booking.selectedFerries.return.departureTime}
            </p>
          </div>
        )}

        <p className="text-sm text-gray-500 mb-6">{de.confirmation.emailSent}</p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="secondary">
            <Download className="w-4 h-4" />
            {de.confirmation.download}
          </Button>
          <Link to="/" onClick={resetBooking}>
            <Button variant="outline" className="w-full">
              {de.confirmation.newBooking}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
