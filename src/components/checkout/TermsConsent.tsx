import { CheckoutSection } from './CheckoutSection'

interface TermsConsentProps {
  acceptedTerms: boolean
  acceptedPrivacy: boolean
  onAcceptedTermsChange: (value: boolean) => void
  onAcceptedPrivacyChange: (value: boolean) => void
}

export function TermsConsent({
  acceptedTerms,
  acceptedPrivacy,
  onAcceptedTermsChange,
  onAcceptedPrivacyChange,
}: TermsConsentProps) {
  return (
    <CheckoutSection title="Bedingungen" subtitle="Bitte bestaetigen Sie die rechtlichen Hinweise">
      <div className="space-y-3 text-xs text-gray-600">
        <label className="flex items-start gap-2">
          <input
            type="checkbox"
            checked={acceptedTerms}
            onChange={(event) => onAcceptedTermsChange(event.target.checked)}
            className="mt-0.5 accent-aml-blue"
          />
          Ich akzeptiere die AGB und Transportbedingungen.
        </label>
        <label className="flex items-start gap-2">
          <input
            type="checkbox"
            checked={acceptedPrivacy}
            onChange={(event) => onAcceptedPrivacyChange(event.target.checked)}
            className="mt-0.5 accent-aml-blue"
          />
          Ich habe die Datenschutzinformationen gelesen und akzeptiere die Verarbeitung meiner Daten.
        </label>
      </div>
    </CheckoutSection>
  )
}

