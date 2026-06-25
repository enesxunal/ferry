import { ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TripSummarySidebar } from '../components/booking/TripSummarySidebar'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Select } from '../components/ui/Select'
import { Stepper } from '../components/ui/Stepper'
import { useBooking } from '../context/BookingContext'
import { de } from '../i18n/de'
import type { PassengerInfo } from '../types/booking'

function buildPassengerList(booking: ReturnType<typeof useBooking>['booking']): PassengerInfo[] {
  const list: PassengerInfo[] = []
  const p = booking.outbound.passengers

  const add = (count: number, type: PassengerInfo['type']) => {
    for (let i = 0; i < count; i++) {
      list.push({
        type,
        firstName: '',
        lastName: '',
        gender: 'Männlich',
        birthPlace: '',
        birthDate: '',
        nationality: '',
        documentType: 'Reisepass',
        documentNumber: '',
        documentExpiry: '',
      })
    }
  }

  add(p.adults, 'adult')
  add(p.youths, 'youth')
  add(p.seniors, 'senior')
  add(p.children, 'child')
  add(p.infants, 'infant')

  return list
}

const typeLabels: Record<PassengerInfo['type'], string> = {
  adult: de.booking.adult,
  youth: de.booking.youth,
  senior: de.booking.senior,
  child: de.booking.child,
  infant: de.booking.infant,
}

const genderOptions = [
  { value: 'Männlich', label: 'Männlich' },
  { value: 'Weiblich', label: 'Weiblich' },
]

const documentOptions = [
  { value: 'Reisepass', label: 'Reisepass' },
  { value: 'Personalausweis', label: 'Personalausweis' },
  { value: 'Führerschein', label: 'Führerschein' },
]

export function BookingDetailsPage() {
  const navigate = useNavigate()
  const { booking, setPassengers, updateContact } = useBooking()
  const [passengers, setLocalPassengers] = useState<PassengerInfo[]>([])
  const [errors, setErrors] = useState<string[]>([])

  useEffect(() => {
    if (booking.passengers.length > 0) {
      setLocalPassengers(booking.passengers)
    } else {
      setLocalPassengers(buildPassengerList(booking))
    }
  }, [booking])

  const updatePassenger = (index: number, field: keyof PassengerInfo, value: string) => {
    setLocalPassengers((prev) => {
      const updated = [...prev]
      updated[index] = { ...updated[index], [field]: value }
      return updated
    })
  }

  const handleContinue = () => {
    const errs: string[] = []
    passengers.forEach((p, i) => {
      if (!p.firstName || !p.lastName || !p.birthDate || !p.birthPlace) {
        errs.push(`${de.booking.passenger} ${i + 1}: ${de.validation.required}`)
      }
    })
    if (!booking.contact.email) errs.push(de.booking.email)
    if (booking.contact.email !== booking.contact.confirmEmail) {
      errs.push(de.validation.emailMismatch)
    }

    setErrors(errs)
    if (errs.length > 0) return

    setPassengers(passengers)
    navigate('/payment')
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Stepper currentStep={3} />

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h1 className="text-xl font-bold text-aml-blue">
              Passagierdaten für die {de.outbound}
            </h1>
            <p className="text-gray-500 text-sm">{de.booking.subtitle}</p>
          </div>

          {errors.length > 0 && (
            <div className="bg-red-50 border border-aml-red/30 rounded-lg p-3">
              {errors.map((e) => (
                <p key={e} className="text-sm text-aml-red">
                  {e}
                </p>
              ))}
            </div>
          )}

          {passengers.map((p, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-semibold text-aml-blue mb-1">
                {i + 1}° {de.booking.passenger}
                {i === 0 ? ' Ticketinhaber' : ''} — {typeLabels[p.type]}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <Input
                  label={`${de.booking.firstName}*`}
                  value={p.firstName}
                  onChange={(e) => updatePassenger(i, 'firstName', e.target.value)}
                />
                <Input
                  label={`${de.booking.lastName}*`}
                  value={p.lastName}
                  onChange={(e) => updatePassenger(i, 'lastName', e.target.value)}
                />
                <Select
                  label={`${de.booking.gender}*`}
                  value={p.gender}
                  onChange={(e) => updatePassenger(i, 'gender', e.target.value)}
                  options={genderOptions}
                />
                <Input
                  label={`${de.booking.birthPlace}*`}
                  value={p.birthPlace}
                  onChange={(e) => updatePassenger(i, 'birthPlace', e.target.value)}
                />
                <Input
                  label={`${de.booking.birthDate}*`}
                  type="date"
                  value={p.birthDate}
                  onChange={(e) => updatePassenger(i, 'birthDate', e.target.value)}
                />
                <Input
                  label={`${de.booking.nationality}*`}
                  value={p.nationality}
                  onChange={(e) => updatePassenger(i, 'nationality', e.target.value)}
                />
              </div>

              <h4 className="font-medium text-aml-blue mt-6 mb-3 text-sm">
                Ausweisdokument
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label={`${de.booking.documentType}*`}
                  value={p.documentType}
                  onChange={(e) => updatePassenger(i, 'documentType', e.target.value)}
                  options={documentOptions}
                />
                <Input
                  label={`${de.booking.documentNumber}*`}
                  value={p.documentNumber}
                  onChange={(e) => updatePassenger(i, 'documentNumber', e.target.value)}
                />
                <Input
                  label={`${de.booking.documentExpiry}*`}
                  type="date"
                  value={p.documentExpiry}
                  onChange={(e) => updatePassenger(i, 'documentExpiry', e.target.value)}
                />
              </div>
            </div>
          ))}

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-aml-blue mb-4">Kontaktinformationen</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label={`${de.booking.email}*`}
                type="email"
                value={booking.contact.email}
                onChange={(e) => updateContact({ email: e.target.value })}
              />
              <Input
                label={`${de.booking.confirmEmail}*`}
                type="email"
                value={booking.contact.confirmEmail}
                onChange={(e) => updateContact({ confirmEmail: e.target.value })}
              />
              <Input
                label={de.booking.phone}
                type="tel"
                value={booking.contact.phone}
                onChange={(e) => updateContact({ phone: e.target.value })}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button size="lg" onClick={handleContinue}>
              {de.booking.continue}
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="lg:col-span-1">
          <TripSummarySidebar />
        </div>
      </div>
    </div>
  )
}
