import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isBefore,
  isSameDay,
  isSameMonth,
  parseISO,
  startOfMonth,
  startOfWeek,
  subMonths,
} from 'date-fns'
import { de as deLocale } from 'date-fns/locale'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

interface DatePickerDropdownProps {
  open: boolean
  onClose: () => void
  value: string
  onChange: (date: string) => void
  label: string
}

function MonthGrid({
  month,
  selected,
  onSelect,
  minDate,
}: {
  month: Date
  selected: Date | null
  onSelect: (d: Date) => void
  minDate: Date
}) {
  const start = startOfWeek(startOfMonth(month), { weekStartsOn: 1 })
  const end = endOfWeek(endOfMonth(month), { weekStartsOn: 1 })
  const days = eachDayOfInterval({ start, end })
  const weekDays = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']

  return (
    <div className="flex-1 min-w-[200px]">
      <h4 className="text-center font-semibold text-gray-800 mb-2 capitalize text-sm">
        {format(month, 'MMMM yyyy', { locale: deLocale })}
      </h4>
      <div className="grid grid-cols-7 gap-0.5 mb-1">
        {weekDays.map((d) => (
          <div key={d} className="text-center text-[10px] font-semibold text-aml-blue py-0.5">
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-0.5">
        {days.map((day) => {
          const disabled = isBefore(day, minDate) && !isSameDay(day, minDate)
          const isSelected = selected && isSameDay(day, selected)
          const inMonth = isSameMonth(day, month)

          return (
            <button
              key={day.toISOString()}
              type="button"
              disabled={disabled}
              onClick={() => onSelect(day)}
              className={`aspect-square text-xs rounded-full transition-colors ${
                isSelected
                  ? 'bg-aml-blue text-white font-bold'
                  : inMonth
                    ? disabled
                      ? 'text-gray-300'
                      : 'text-gray-800 hover:bg-aml-grey'
                    : 'text-gray-300'
              }`}
            >
              {format(day, 'd')}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function DatePickerDropdown({
  open,
  onClose,
  value,
  onChange,
  label,
}: DatePickerDropdownProps) {
  const selected = value ? parseISO(value) : null
  const [viewMonth, setViewMonth] = useState(selected ?? new Date())
  const ref = useRef<HTMLDivElement>(null)
  const minDate = new Date()
  minDate.setHours(0, 0, 0, 0)

  useEffect(() => {
    if (!open) return
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose()
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open, onClose])

  const handleSelect = (d: Date) => {
    onChange(format(d, 'yyyy-MM-dd'))
    onClose()
  }

  if (!open) return null

  return (
    <div
      ref={ref}
      className="absolute top-full left-0 mt-1 z-50 bg-white rounded-lg shadow-xl border border-gray-200 p-4 w-max min-w-full max-w-[min(calc(100vw-2rem),520px)]"
    >
      <p className="text-xs text-aml-blue font-medium mb-3">{label}</p>
      <div className="flex items-center justify-between mb-2">
        <button
          type="button"
          onClick={() => setViewMonth(subMonths(viewMonth, 1))}
          className="p-1 hover:bg-aml-grey rounded"
        >
          <ChevronLeft className="w-4 h-4 text-aml-blue" />
        </button>
        <button
          type="button"
          onClick={() => setViewMonth(addMonths(viewMonth, 1))}
          className="p-1 hover:bg-aml-grey rounded"
        >
          <ChevronRight className="w-4 h-4 text-aml-blue" />
        </button>
      </div>
      <div className="flex gap-4 flex-col sm:flex-row overflow-x-auto">
        <MonthGrid
          month={viewMonth}
          selected={selected}
          onSelect={handleSelect}
          minDate={minDate}
        />
        <MonthGrid
          month={addMonths(viewMonth, 1)}
          selected={selected}
          onSelect={handleSelect}
          minDate={minDate}
        />
      </div>
    </div>
  )
}
