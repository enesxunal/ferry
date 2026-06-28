import { Bank } from '@phosphor-icons/react'
import type { ReactNode } from 'react'
import klarnaLogo from '../../assets/checkout-klarna.svg'
import mastercardLogo from '../../assets/checkout-mastercard.svg'
import paypalLogo from '../../assets/checkout-paypal.svg'
import visaLogo from '../../assets/checkout-visa.svg'
import { CheckoutSection } from './CheckoutSection'

export type PaymentMethod = 'visa' | 'mastercard' | 'klarna' | 'bank' | 'paypal'

interface PaymentOptionsProps {
  value: PaymentMethod
  onChange: (value: PaymentMethod) => void
}

const paymentOptions: Array<{
  value: PaymentMethod
  title: string
  description: string
  icon: ReactNode
}> = [
  {
    value: 'visa',
    title: 'Visa',
    description: 'Kredit- oder Debitkarte',
    icon: <img src={visaLogo} alt="" aria-hidden="true" className="h-5 w-12 object-contain" />,
  },
  {
    value: 'mastercard',
    title: 'Mastercard',
    description: 'Kredit- oder Debitkarte',
    icon: <img src={mastercardLogo} alt="" aria-hidden="true" className="h-6 w-12 object-contain" />,
  },
  {
    value: 'klarna',
    title: 'Klarna',
    description: 'Rechnung oder Ratenzahlung',
    icon: <img src={klarnaLogo} alt="" aria-hidden="true" className="h-6 w-14 object-contain" />,
  },
  {
    value: 'bank',
    title: 'Bankueberweisung',
    description: 'Banktransfer vormerken',
    icon: <Bank className="h-5 w-5 text-aml-blue" />,
  },
  {
    value: 'paypal',
    title: 'PayPal',
    description: 'PayPal im Zahlungsbereich',
    icon: <img src={paypalLogo} alt="" aria-hidden="true" className="h-6 w-16 object-contain" />,
  },
]

export function PaymentOptions({ value, onChange }: PaymentOptionsProps) {
  return (
    <CheckoutSection title="Zahlungsmethoden" subtitle="Keine Zahlung wird in diesem Schritt ausgefuehrt">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {paymentOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`rounded-lg border p-3 text-left transition ${
              value === option.value
                ? 'border-aml-blue bg-sky-50 ring-2 ring-sky-100'
                : 'border-gray-200 bg-white hover:border-aml-blue/40'
            }`}
          >
            <div className="mb-2 flex items-center gap-2">
              {option.icon}
              <span className="text-sm font-bold">{option.title}</span>
            </div>
            <p className="text-xs text-gray-500">{option.description}</p>
          </button>
        ))}
      </div>
    </CheckoutSection>
  )
}
