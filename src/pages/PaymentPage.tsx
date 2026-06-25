import { CreditCard, Lock, Shield } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Stepper } from '../components/ui/Stepper'
import { useBooking } from '../context/BookingContext'
import { de } from '../i18n/de'

function calculateTotal(booking: ReturnType<typeof useBooking>['booking']): number {
  let total = 0
  const pax =
    booking.outbound.passengers.adults +
    booking.outbound.passengers.youths +
    booking.outbound.passengers.seniors +
    booking.outbound.passengers.children

  if (booking.selectedFerries.outbound) {
    total += booking.selectedFerries.outbound.price * Math.max(pax, 1)
  }
  if (booking.selectedFerries.return) {
    total += booking.selectedFerries.return.price * Math.max(pax, 1)
  }
  if (booking.outbound.vehicle.hasVehicle) total += 35
  if (booking.discountCode) total *= 0.9

  return Math.round(total * 100) / 100
}

export function PaymentPage() {
  const navigate = useNavigate()
  const { booking, updatePayment, completeBooking } = useBooking()
  const [processing, setProcessing] = useState(false)

  const total = calculateTotal(booking)

  const handlePay = async () => {
    setProcessing(true)
    await new Promise((r) => setTimeout(r, 1500))
    completeBooking()
    setProcessing(false)
    navigate('/confirmation')
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Stepper currentStep={3} />

      <h1 className="text-2xl font-bold text-aml-blue mb-1">{de.payment.title}</h1>
      <p className="text-gray-500 text-sm mb-4">{de.payment.subtitle}</p>

      <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 mb-6 text-sm text-amber-900">
        Prototyp: Keine echte Zahlung. Kartendaten werden nicht verarbeitet oder gespeichert.
      </div>

      <div className="grid md:grid-cols-5 gap-6">
        <div className="md:col-span-3 space-y-4">
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <h3 className="font-semibold text-aml-blue mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Zahlungsdaten
            </h3>
            <div className="space-y-4">
              <Input
                label={de.payment.cardHolder}
                value={booking.payment.cardHolder}
                onChange={(e) => updatePayment({ cardHolder: e.target.value })}
                placeholder="Max Mustermann"
              />
              <Input
                label={de.payment.cardNumber}
                value={booking.payment.cardNumber}
                onChange={(e) => updatePayment({ cardNumber: e.target.value })}
                placeholder="1234 5678 9012 3456"
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label={de.payment.expiry}
                  value={booking.payment.expiry}
                  onChange={(e) => updatePayment({ expiry: e.target.value })}
                  placeholder="MM/JJ"
                />
                <Input
                  label={de.payment.cvv}
                  value={booking.payment.cvv}
                  onChange={(e) => updatePayment({ cvv: e.target.value })}
                  placeholder="123"
                  type="password"
                />
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-500 flex items-center gap-1">
            <Lock className="w-3.5 h-3.5" />
            {de.payment.secure}
          </p>
        </div>

        <div className="md:col-span-2">
          <div className="bg-white rounded-lg border border-gray-200 p-5 sticky top-4">
            <h3 className="font-semibold text-aml-blue mb-4">{de.payment.summary}</h3>

            {booking.selectedFerries.outbound && (
              <div className="text-sm mb-3 pb-3 border-b">
                <p className="font-medium">{de.payment.outbound}</p>
                <p className="text-gray-500">
                  {booking.selectedFerries.outbound.operator} —{' '}
                  {booking.selectedFerries.outbound.departureTime}
                </p>
                <p className="text-aml-blue font-semibold">
                  {booking.selectedFerries.outbound.price.toFixed(2)} EUR
                </p>
              </div>
            )}

            {booking.selectedFerries.return && (
              <div className="text-sm mb-3 pb-3 border-b">
                <p className="font-medium">{de.payment.return}</p>
                <p className="text-gray-500">
                  {booking.selectedFerries.return.operator} —{' '}
                  {booking.selectedFerries.return.departureTime}
                </p>
                <p className="text-aml-blue font-semibold">
                  {booking.selectedFerries.return.price.toFixed(2)} EUR
                </p>
              </div>
            )}

            {booking.outbound.vehicle.hasVehicle && (
              <div className="text-sm mb-3 pb-3 border-b">
                <p className="font-medium">{de.payment.vehicle}</p>
                <p className="text-aml-blue font-semibold">35.00 EUR</p>
              </div>
            )}

            {booking.discountCode && (
              <div className="text-sm mb-3 pb-3 border-b text-aml-green">
                {de.payment.discount}: -10%
              </div>
            )}

            <div className="flex justify-between items-center pt-2">
              <span className="font-bold text-lg">{de.payment.total}</span>
              <span className="font-bold text-2xl text-aml-blue">{total.toFixed(2)} EUR</span>
            </div>

            <Button
              size="lg"
              className="w-full mt-4"
              onClick={handlePay}
              disabled={processing}
            >
              <Shield className="w-5 h-5" />
              {processing ? 'Wird verarbeitet...' : de.payment.pay}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
