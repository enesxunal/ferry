import { CheckCircle, EnvelopeSimple, ShieldCheck } from '@phosphor-icons/react'
import ticketIcon from '../../assets/checkout-ticket.svg'
import whatsappLogo from '../../assets/checkout-whatsapp.svg'
import { CheckoutSection } from './CheckoutSection'

export type GuaranteeOption = 'refund' | 'none'
export type TicketDelivery = 'whatsapp' | 'email'

interface CheckoutOptionsProps {
  guarantee: GuaranteeOption
  delivery: TicketDelivery
  onGuaranteeChange: (value: GuaranteeOption) => void
  onDeliveryChange: (value: TicketDelivery) => void
}

export function CheckoutOptions({
  guarantee,
  delivery,
  onGuaranteeChange,
  onDeliveryChange,
}: CheckoutOptionsProps) {
  return (
    <>
      <CheckoutSection
        title="Garantie / Versicherung"
        subtitle="Waehlen Sie optionalen Schutz fuer Ihre Buchung"
      >
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <button
            type="button"
            onClick={() => onGuaranteeChange('refund')}
            className={`rounded-lg border p-4 text-left transition ${
              guarantee === 'refund'
                ? 'border-emerald-300 bg-emerald-50 ring-2 ring-emerald-100'
                : 'border-gray-200 bg-white hover:border-aml-blue/40'
            }`}
          >
            <div className="flex items-center gap-2 text-sm font-bold text-gray-800">
              <ShieldCheck className="h-5 w-5 text-emerald-600" />
              Garantie Remboursement
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Schutz fuer Storno und unerwartete Aenderungen.
            </p>
          </button>
          <button
            type="button"
            onClick={() => onGuaranteeChange('none')}
            className={`rounded-lg border p-4 text-left transition ${
              guarantee === 'none'
                ? 'border-rose-200 bg-rose-50 ring-2 ring-rose-100'
                : 'border-gray-200 bg-white hover:border-aml-blue/40'
            }`}
          >
            <div className="flex items-center gap-2 text-sm font-bold text-gray-800">
              <CheckCircle className="h-5 w-5 text-rose-500" />
              Ohne Versicherung
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Ich moechte keinen zusaetzlichen Schutz buchen.
            </p>
          </button>
        </div>
      </CheckoutSection>

      <CheckoutSection title="Ticketversand" subtitle="Wohin sollen die Tickets gesendet werden?">
        <div className="mb-3 flex items-center gap-2 rounded-lg bg-sky-50 px-3 py-2 text-sm font-semibold text-aml-blue">
          <img src={ticketIcon} alt="" aria-hidden="true" className="h-8 w-10 object-contain" />
          Tickets digital erhalten
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 bg-white p-3 hover:border-aml-blue/40">
            <input
              type="radio"
              name="ticket-delivery"
              checked={delivery === 'whatsapp'}
              onChange={() => onDeliveryChange('whatsapp')}
              className="accent-aml-blue"
            />
            <img src={whatsappLogo} alt="" aria-hidden="true" className="h-6 w-6 object-contain" />
            <span className="text-sm font-medium">WhatsApp</span>
          </label>
          <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 bg-white p-3 hover:border-aml-blue/40">
            <input
              type="radio"
              name="ticket-delivery"
              checked={delivery === 'email'}
              onChange={() => onDeliveryChange('email')}
              className="accent-aml-blue"
            />
            <EnvelopeSimple className="h-5 w-5 text-aml-blue" />
            <span className="text-sm font-medium">E-Mail</span>
          </label>
        </div>
      </CheckoutSection>
    </>
  )
}
