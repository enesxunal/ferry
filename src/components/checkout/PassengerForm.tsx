import { CaretLeft, CaretRight } from '@phosphor-icons/react'
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isAfter,
  isBefore,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  subMonths,
} from 'date-fns'
import { de as deLocale } from 'date-fns/locale'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Input } from '../ui/Input'
import { Select } from '../ui/Select'
import { CheckoutSection } from './CheckoutSection'
import calendarIcon from '../../assets/checkout-calendar.svg'
import { de } from '../../i18n/de'
import type { PassengerInfo } from '../../types/booking'
import { parseValidISODate } from '../../utils/date'

interface PassengerFormProps {
  passengers: PassengerInfo[]
  typeLabels: Record<PassengerInfo['type'], string>
  genderOptions: { value: string; label: string }[]
  documentOptions: { value: string; label: string }[]
  onPassengerChange: (index: number, field: keyof PassengerInfo, value: string) => void
}

function DateInput({
  label,
  value,
  onChange,
  mode,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  mode: 'birth' | 'expiry'
}) {
  const [open, setOpen] = useState(false)
  const selected = parseValidISODate(value)
  const today = useMemo(() => {
    const date = new Date()
    date.setHours(0, 0, 0, 0)
    return date
  }, [])
  const fallbackMonth = useMemo(
    () =>
      mode === 'birth'
        ? new Date(today.getFullYear() - 30, today.getMonth(), 1)
        : new Date(today.getFullYear(), today.getMonth(), 1),
    [mode, today],
  )
  const [viewMonth, setViewMonth] = useState(selected ?? fallbackMonth)
  const ref = useRef<HTMLDivElement>(null)
  const weekDays = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']
  const monthOptions = useMemo(
    () =>
      Array.from({ length: 12 }, (_, month) => ({
        value: month,
        label: format(new Date(2024, month, 1), 'MMMM', { locale: deLocale }),
      })),
    [],
  )
  const yearOptions = useMemo(() => {
    const currentYear = today.getFullYear()
    if (mode === 'birth') {
      return Array.from({ length: 121 }, (_, index) => currentYear - index)
    }
    return Array.from({ length: 31 }, (_, index) => currentYear + index)
  }, [mode, today])
  const days = useMemo(() => {
    const start = startOfWeek(startOfMonth(viewMonth), { weekStartsOn: 1 })
    const end = endOfWeek(endOfMonth(viewMonth), { weekStartsOn: 1 })
    return eachDayOfInterval({ start, end })
  }, [viewMonth])

  useEffect(() => {
    if (!open) return

    setViewMonth(selected ?? fallbackMonth)
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [fallbackMonth, open, selected])

  const handleSelect = (date: Date) => {
    onChange(format(date, 'yyyy-MM-dd'))
    setOpen(false)
  }

  const setMonth = (month: number) => {
    setViewMonth(new Date(viewMonth.getFullYear(), month, 1))
  }

  const setYear = (year: number) => {
    setViewMonth(new Date(year, viewMonth.getMonth(), 1))
  }

  const displayValue = selected ? format(selected, 'dd.MM.yyyy') : ''

  return (
    <div ref={ref} className="relative flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className={`relative w-full rounded-md border bg-white py-2.5 pl-3 pr-10 text-left text-sm focus:border-aml-blue focus:outline-none focus:ring-2 focus:ring-aml-blue/20 ${
          open ? 'border-aml-blue ring-2 ring-aml-blue/20' : 'border-gray-300'
        } ${displayValue ? 'text-gray-900' : 'text-gray-400'}`}
      >
        {displayValue || 'TT.MM.JJJJ'}
        <img
          src={calendarIcon}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 object-contain"
        />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-1 w-[min(21rem,calc(100vw-2rem))] rounded-lg border border-sky-100 bg-white p-3 shadow-xl">
          <div className="mb-3 flex items-center gap-2">
            <button
              type="button"
              onClick={() => setViewMonth(subMonths(viewMonth, 1))}
              className="rounded-md p-2 text-aml-blue hover:bg-aml-grey"
              aria-label="Vorheriger Monat"
            >
              <CaretLeft className="h-4 w-4" />
            </button>
            <select
              value={viewMonth.getMonth()}
              onChange={(event) => setMonth(Number(event.target.value))}
              className="min-w-0 flex-1 rounded-md border border-gray-200 bg-white px-2 py-2 text-sm font-semibold capitalize text-gray-700 outline-none focus:border-aml-blue"
            >
              {monthOptions.map((month) => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </select>
            <select
              value={viewMonth.getFullYear()}
              onChange={(event) => setYear(Number(event.target.value))}
              className="w-24 rounded-md border border-gray-200 bg-white px-2 py-2 text-sm font-semibold text-gray-700 outline-none focus:border-aml-blue"
            >
              {yearOptions.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => setViewMonth(addMonths(viewMonth, 1))}
              className="rounded-md p-2 text-aml-blue hover:bg-aml-grey"
              aria-label="Naechster Monat"
            >
              <CaretRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1">
            {weekDays.map((day) => (
              <div key={day} className="py-1 text-center text-[11px] font-bold text-aml-blue">
                {day}
              </div>
            ))}
            {days.map((day) => {
              const disabled =
                mode === 'birth'
                  ? isAfter(day, today)
                  : isBefore(day, today) && !isSameDay(day, today)
              const active = selected ? isSameDay(day, selected) : false
              const inMonth = isSameMonth(day, viewMonth)

              return (
                <button
                  key={day.toISOString()}
                  type="button"
                  disabled={disabled}
                  onClick={() => handleSelect(day)}
                  className={`aspect-square rounded-full text-xs transition-colors ${
                    active
                      ? 'bg-aml-blue font-bold text-white'
                      : disabled
                        ? 'text-gray-300'
                        : inMonth
                          ? 'text-gray-700 hover:bg-aml-grey'
                          : 'text-gray-300 hover:bg-aml-grey/60'
                  }`}
                >
                  {format(day, 'd')}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export function PassengerForm({
  passengers,
  typeLabels,
  genderOptions,
  documentOptions,
  onPassengerChange,
}: PassengerFormProps) {
  return (
    <>
      <CheckoutSection
        title="Passagierdaten"
        subtitle="Daten des Ticketinhabers und aller Reisenden"
      >
        <div className="space-y-5">
          {passengers.map((passenger, index) => (
            <div key={index} className="rounded-lg border border-gray-100 bg-sky-50/35 p-3">
              <h3 className="mb-3 text-xs font-bold uppercase tracking-wide text-aml-blue">
                {index + 1}. {de.booking.passenger} · {typeLabels[passenger.type]}
              </h3>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <Input
                  label={`${de.booking.firstName}*`}
                  value={passenger.firstName}
                  onChange={(event) =>
                    onPassengerChange(index, 'firstName', event.target.value)
                  }
                />
                <Input
                  label={`${de.booking.lastName}*`}
                  value={passenger.lastName}
                  onChange={(event) =>
                    onPassengerChange(index, 'lastName', event.target.value)
                  }
                />
                <Select
                  label={`${de.booking.gender}*`}
                  value={passenger.gender}
                  onChange={(event) => onPassengerChange(index, 'gender', event.target.value)}
                  options={genderOptions}
                />
                <Input
                  label={`${de.booking.birthPlace}*`}
                  value={passenger.birthPlace}
                  onChange={(event) =>
                    onPassengerChange(index, 'birthPlace', event.target.value)
                  }
                />
                <DateInput
                  label={`${de.booking.birthDate}*`}
                  value={passenger.birthDate}
                  onChange={(value) => onPassengerChange(index, 'birthDate', value)}
                  mode="birth"
                />
                <Input
                  label={`${de.booking.nationality}*`}
                  value={passenger.nationality}
                  onChange={(event) =>
                    onPassengerChange(index, 'nationality', event.target.value)
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </CheckoutSection>

      <CheckoutSection title="Dokumentdaten" subtitle="Ausweisdokumente fuer die Reise">
        <div className="space-y-5">
          {passengers.map((passenger, index) => (
            <div key={index} className="rounded-lg border border-gray-100 bg-white">
              <div className="border-b border-gray-100 px-3 py-2 text-xs font-semibold text-aml-blue">
                {index + 1}. {typeLabels[passenger.type]}
              </div>
              <div className="grid grid-cols-1 gap-3 p-3 md:grid-cols-3">
                <Select
                  label={`${de.booking.documentType}*`}
                  value={passenger.documentType}
                  onChange={(event) =>
                    onPassengerChange(index, 'documentType', event.target.value)
                  }
                  options={documentOptions}
                />
                <Input
                  label={`${de.booking.documentNumber}*`}
                  value={passenger.documentNumber}
                  onChange={(event) =>
                    onPassengerChange(index, 'documentNumber', event.target.value)
                  }
                />
                <DateInput
                  label={`${de.booking.documentExpiry}*`}
                  value={passenger.documentExpiry}
                  onChange={(value) => onPassengerChange(index, 'documentExpiry', value)}
                  mode="expiry"
                />
              </div>
            </div>
          ))}
        </div>
      </CheckoutSection>
    </>
  )
}
