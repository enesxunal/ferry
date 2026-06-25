import { format, parseISO } from 'date-fns'
import { de as deLocale } from 'date-fns/locale'
import { Info } from 'lucide-react'
import type { FerryOffer } from '../../types/booking'

interface FerryResultCardProps {
  offer: FerryOffer
  date: string
  selected: boolean
  onSelect: () => void
  passengerSummary: string
}

export function FerryResultCard({
  offer,
  date,
  selected,
  onSelect,
  passengerSummary,
}: FerryResultCardProps) {
  const dayLabel = format(parseISO(date), 'EEEE', { locale: deLocale }).toUpperCase().slice(0, 2)
  const dateLabel = format(parseISO(date), 'dd MMMM', { locale: deLocale }).toUpperCase()

  return (
    <div
      className={`rounded-xl overflow-hidden border-2 transition-all ${
        selected ? 'border-aml-blue shadow-md' : 'border-transparent'
      }`}
    >
      <div className="bg-[#e8edf5] p-4 md:p-5">
        <div className="flex flex-col lg:flex-row items-stretch gap-4">
          {/* Departure */}
          <div className="lg:w-36 shrink-0">
            <p className="text-xs text-gray-500 font-medium">
              {dayLabel} {dateLabel}
            </p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{offer.departureTime}</p>
            <p className="text-sm font-semibold text-gray-800">{offer.departurePort}</p>
            <p className="text-xs text-gray-500 mt-1">
              Einschiffung um {offer.embarkationTime} Uhr
            </p>
          </div>

          {/* Operator + duration */}
          <div className="flex-1 flex flex-col items-center justify-center min-w-0 py-2">
            <div className="w-24 h-10 bg-white rounded flex items-center justify-center font-bold text-aml-blue text-sm mb-1">
              {offer.operatorLogo}
            </div>
            <p className="text-xs text-aml-blue">{offer.shipName}</p>
            <div className="flex items-center gap-2 w-full max-w-[200px] mt-2">
              <div className="flex-1 border-t border-dashed border-gray-400" />
              <span className="text-xs text-gray-500 shrink-0">{offer.duration}</span>
              <div className="flex-1 border-t border-dashed border-gray-400" />
            </div>
          </div>

          {/* Arrival */}
          <div className="lg:w-36 shrink-0 lg:text-right">
            <p className="text-xs text-gray-500 font-medium">
              {dayLabel} {dateLabel}
            </p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{offer.arrivalTime}</p>
            <p className="text-sm font-semibold text-gray-800">{offer.arrivalPort}</p>
          </div>

          {/* Price box */}
          <div className="lg:w-52 shrink-0">
            <button
              type="button"
              onClick={onSelect}
              className={`w-full bg-white rounded-lg p-4 text-left border-2 transition-colors ${
                selected ? 'border-aml-blue' : 'border-gray-200 hover:border-aml-blue/50'
              }`}
            >
              <div className="flex items-start gap-2">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                    selected ? 'border-aml-blue bg-aml-blue' : 'border-gray-300'
                  }`}
                >
                  {selected && <span className="text-white text-xs">✓</span>}
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {offer.price.toFixed(2).replace('.', ',')} €
                  </p>
                  <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                    {offer.tariffLabel}
                    <Info className="w-3 h-3" />
                  </p>
                </div>
              </div>
            </button>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Bester Preis für: {passengerSummary}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
