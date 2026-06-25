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
import { useState } from 'react'

interface DatePickerModalProps {
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
    <div className="flex-1 min-w-[240px]">
      <h4 className="text-center font-semibold text-gray-800 mb-3 capitalize">
        {format(month, 'MMMM yyyy', { locale: deLocale })}
      </h4>
      <div className="grid grid-cols-7 gap-0.5 mb-1">
        {weekDays.map((d) => (
          <div key={d} className="text-center text-xs font-semibold text-aml-blue py-1">
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
              className={`aspect-square text-sm rounded-full transition-colors ${
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

export function DatePickerModal({ open, onClose, value, onChange, label }: DatePickerModalProps) {
  const selected = value ? parseISO(value) : null
  const [viewMonth, setViewMonth] = useState(selected ?? new Date())
  const minDate = new Date()
  minDate.setHours(0, 0, 0, 0)

  const handleSelect = (d: Date) => {
    onChange(format(d, 'yyyy-MM-dd'))
    onClose()
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-2xl p-6 max-w-[560px] w-full">
        <p className="text-sm text-aml-blue font-medium mb-4">{label}</p>
        <div className="flex items-center justify-between mb-4">
          <button
            type="button"
            onClick={() => setViewMonth(subMonths(viewMonth, 1))}
            className="p-1 hover:bg-aml-grey rounded"
          >
            <ChevronLeft className="w-5 h-5 text-aml-blue" />
          </button>
          <button
            type="button"
            onClick={() => setViewMonth(addMonths(viewMonth, 1))}
            className="p-1 hover:bg-aml-grey rounded"
          >
            <ChevronRight className="w-5 h-5 text-aml-blue" />
          </button>
        </div>
        <div className="flex gap-6 flex-col sm:flex-row">
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
    </div>
  )
}
