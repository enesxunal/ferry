import { getLowestPriceForDate, getDateRange, formatGermanDateShort } from '../../data/mockFerries'

interface DateRibbonProps {
  centerDate: string
  from: string
  to: string
  leg: 'outbound' | 'return'
  onDateChange: (date: string) => void
}

export function DateRibbon({ centerDate, from, to, leg, onDateChange }: DateRibbonProps) {
  const dates = getDateRange(centerDate, 3)

  return (
    <div className="flex items-stretch gap-1 overflow-x-auto pb-1">
      <button
        type="button"
        className="shrink-0 px-3 py-2 bg-aml-blue text-white text-xs font-semibold rounded-md hover:bg-aml-blue-dark transition-colors self-center"
      >
        Tag ändern
      </button>

      {dates.map((date) => {
        const isSelected = date === centerDate
        const lowestPrice = getLowestPriceForDate(from, to, date, leg)

        return (
          <button
            key={date}
            type="button"
            onClick={() => onDateChange(date)}
            className={`shrink-0 min-w-[90px] px-2 py-2 rounded-md border-2 text-center transition-colors ${
              isSelected
                ? 'bg-aml-blue border-aml-blue text-white'
                : 'bg-white border-gray-200 text-gray-700 hover:border-aml-blue/40'
            }`}
          >
            <p className={`text-xs font-semibold ${isSelected ? 'text-white' : 'text-gray-800'}`}>
              {formatGermanDateShort(date)}
            </p>
            <p
              className={`text-[10px] mt-0.5 ${isSelected ? 'text-aml-yellow' : 'text-aml-green font-medium'}`}
            >
              ab {lowestPrice.toFixed(0)} €
            </p>
          </button>
        )
      })}
    </div>
  )
}
