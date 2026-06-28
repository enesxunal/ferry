import { ArrowLeft } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TripSummarySidebar } from '../booking/TripSummarySidebar'
import { GradientCtaButton } from '../ui/GradientCtaButton'
import { Input } from '../ui/Input'
import { CheckoutOptions, type GuaranteeOption, type TicketDelivery } from './CheckoutOptions'
import { CheckoutProgress } from './CheckoutProgress'
import { CheckoutSection } from './CheckoutSection'
import { PassengerForm } from './PassengerForm'
import { PaymentOptions, type PaymentMethod } from './PaymentOptions'
import { TermsConsent } from './TermsConsent'
import { VehicleForm } from './VehicleForm'
import { useBooking } from '../../context/BookingContext'
import { de } from '../../i18n/de'
import type { PassengerCounts, PassengerInfo, VehicleData } from '../../types/booking'

function buildPassengerList(passengers: PassengerCounts): PassengerInfo[] {
  const list: PassengerInfo[] = []

  const add = (count: number, type: PassengerInfo['type']) => {
    for (let index = 0; index < count; index += 1) {
      list.push({
        type,
        firstName: '',
        lastName: '',
        gender: 'Maennlich',
        birthPlace: '',
        birthDate: '',
        nationality: '',
        documentType: 'Reisepass',
        documentNumber: '',
        documentExpiry: '',
      })
    }
  }

  add(passengers.adults, 'adult')
  add(passengers.youths, 'youth')
  add(passengers.seniors, 'senior')
  add(passengers.children, 'child')
  add(passengers.infants, 'infant')

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
  { value: 'Maennlich', label: 'Maennlich' },
  { value: 'Weiblich', label: 'Weiblich' },
]

const documentOptions = [
  { value: 'Reisepass', label: 'Reisepass' },
  { value: 'Personalausweis', label: 'Personalausweis' },
  { value: 'Fuehrerschein', label: 'Fuehrerschein' },
]

function isFilled(value: string): boolean {
  return value.trim().length > 0
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export function CheckoutForm() {
  const navigate = useNavigate()
  const { booking, setPassengers, updateContact, updateOutbound, updateReturnLeg, updateSearch } =
    useBooking()
  const [passengers, setLocalPassengers] = useState<PassengerInfo[]>([])
  const [errors, setErrors] = useState<string[]>([])
  const [guarantee, setGuarantee] = useState<GuaranteeOption>('refund')
  const [delivery, setDelivery] = useState<TicketDelivery>('whatsapp')
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('visa')
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false)

  useEffect(() => {
    if (booking.passengers.length > 0) {
      setLocalPassengers(booking.passengers)
    } else {
      setLocalPassengers(buildPassengerList(booking.outbound.passengers))
    }
  }, [
    booking.outbound.passengers,
    booking.passengers,
  ])

  const updatePassenger = (index: number, field: keyof PassengerInfo, value: string) => {
    setLocalPassengers((previous) => {
      const updated = [...previous]
      updated[index] = { ...updated[index], [field]: value }
      return updated
    })
  }

  const updateVehicle = (vehicle: Partial<VehicleData>) => {
    const updatedVehicle = { ...booking.outbound.vehicle, ...vehicle }
    updateOutbound({ vehicle: updatedVehicle })

    if (booking.useSameVehicleForReturn) {
      updateReturnLeg({ vehicle: updatedVehicle })
    }
  }

  const handleBackToResults = () => {
    navigate('/results')
  }

  const handleContinue = () => {
    const nextErrors: string[] = []

    passengers.forEach((passenger, index) => {
      const requiredFields = [
        passenger.firstName,
        passenger.lastName,
        passenger.birthDate,
        passenger.birthPlace,
        passenger.nationality,
        passenger.documentType,
        passenger.documentNumber,
        passenger.documentExpiry,
      ]

      if (!requiredFields.every(isFilled)) {
        nextErrors.push(`${de.booking.passenger} ${index + 1}: ${de.validation.required}`)
      }
    })

    const email = booking.contact.email.trim()
    const confirmEmail = booking.contact.confirmEmail.trim()

    if (!email) nextErrors.push(de.booking.email)
    else if (!isValidEmail(email)) nextErrors.push('E-Mail: Bitte geben Sie eine gueltige Adresse ein')

    if (email !== confirmEmail) {
      nextErrors.push(de.validation.emailMismatch)
    }

    if (!acceptedTerms) {
      nextErrors.push('Bitte akzeptieren Sie die AGB und Transportbedingungen.')
    }

    if (!acceptedPrivacy) {
      nextErrors.push('Bitte akzeptieren Sie die Datenschutzbedingungen.')
    }

    setErrors(nextErrors)
    if (nextErrors.length > 0) return

    setPassengers(
      passengers.map((passenger) => ({
        ...passenger,
        firstName: passenger.firstName.trim(),
        lastName: passenger.lastName.trim(),
        birthPlace: passenger.birthPlace.trim(),
        nationality: passenger.nationality.trim(),
        documentNumber: passenger.documentNumber.trim(),
      })),
    )
    updateContact({ email, confirmEmail })
    navigate('/payment')
  }

  return (
    <div className="min-h-screen bg-[#edf7fb]">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
        <div className="mb-4 flex justify-start">
          <GradientCtaButton
            type="button"
            text="Zurueck zur Auswahl"
            icon={<ArrowLeft weight="bold" />}
            rightIcon={<span aria-hidden="true" className="block h-full w-full" />}
            gradient={{ from: '#007B89', to: '#4DB8C4' }}
            size="sm"
            onClick={handleBackToResults}
            className="w-full sm:w-auto"
          />
        </div>
        <CheckoutProgress />

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="space-y-4">
            {errors.length > 0 && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-4 shadow-sm">
                {errors.map((error) => (
                  <p key={error} className="text-sm text-aml-red">
                    {error}
                  </p>
                ))}
              </div>
            )}

            <PassengerForm
              passengers={passengers}
              typeLabels={typeLabels}
              genderOptions={genderOptions}
              documentOptions={documentOptions}
              onPassengerChange={updatePassenger}
            />

            <CheckoutSection title="Kontaktdaten" subtitle="Wir senden Buchungsinfos an diese Adresse">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                <Input
                  label={`${de.booking.email}*`}
                  type="email"
                  value={booking.contact.email}
                  onChange={(event) => updateContact({ email: event.target.value })}
                />
                <Input
                  label={`${de.booking.confirmEmail}*`}
                  type="email"
                  value={booking.contact.confirmEmail}
                  onChange={(event) => updateContact({ confirmEmail: event.target.value })}
                />
                <Input
                  label={de.booking.phone}
                  type="tel"
                  value={booking.contact.phone}
                  onChange={(event) => updateContact({ phone: event.target.value })}
                />
              </div>
            </CheckoutSection>

            {booking.outbound.vehicle.hasVehicle ? (
              <VehicleForm
                vehicle={booking.outbound.vehicle}
                onVehicleChange={updateVehicle}
                useSameForReturn={booking.useSameVehicleForReturn}
                onUseSameForReturnChange={(value) =>
                  updateSearch({ useSameVehicleForReturn: value })
                }
              />
            ) : (
              <CheckoutSection title="Fahrzeugdaten">
                <p className="text-sm text-gray-500">Keine Fahrzeugdaten fuer diese Reise hinterlegt.</p>
              </CheckoutSection>
            )}

            <CheckoutOptions
              guarantee={guarantee}
              delivery={delivery}
              onGuaranteeChange={setGuarantee}
              onDeliveryChange={setDelivery}
            />

            <PaymentOptions value={paymentMethod} onChange={setPaymentMethod} />

            <TermsConsent
              acceptedTerms={acceptedTerms}
              acceptedPrivacy={acceptedPrivacy}
              onAcceptedTermsChange={setAcceptedTerms}
              onAcceptedPrivacyChange={setAcceptedPrivacy}
            />
          </div>

          <TripSummarySidebar onConfirm={handleContinue} confirmLabel="CONFIRMER" />
        </div>
      </div>
    </div>
  )
}
