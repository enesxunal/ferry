const steps = ['Recherche', 'Départs', 'Données et paiement']

export function CheckoutProgress() {
  return (
    <div className="mx-auto mb-6 max-w-3xl">
      <div className="relative flex items-start justify-between">
        <div className="absolute left-8 right-8 top-4 h-0.5 bg-aml-blue" />
        {steps.map((step, index) => (
          <div key={step} className="relative z-10 flex flex-1 flex-col items-center text-center">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-aml-blue text-xs font-bold text-white shadow-sm">
              {index < 2 ? '✓' : index + 1}
            </span>
            <span className="mt-1 text-[11px] font-semibold text-aml-blue">{step}</span>
            <span className="hidden text-[9px] text-gray-500 sm:block">
              {index === 0
                ? 'Suche'
                : index === 1
                  ? 'Abfahrten'
                  : 'Abschluss der Buchung'}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

