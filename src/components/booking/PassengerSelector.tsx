import { Minus, PawPrint, Plus, User } from '@phosphor-icons/react'
import { de } from '../../i18n/de'
import type { PassengerCounts } from '../../types/booking'
import { Button } from '../ui/Button'

interface CounterRowProps {
  label: string
  value: number
  min?: number
  max?: number
  onChange: (v: number) => void
  icon?: React.ReactNode
}

function CounterRow({ label, value, min = 0, max = 9, onChange, icon }: CounterRowProps) {
  return (
    <div className="py-3 border-b border-gray-100 last:border-0">
      <div className="flex items-center gap-2 mb-2">
        {icon && <span className="text-aml-blue">{icon}</span>}
        <span className="text-sm font-medium text-aml-blue">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className="w-9 h-9 rounded border border-gray-300 text-aml-blue flex items-center justify-center disabled:opacity-30 hover:bg-aml-grey/50 transition-colors"
        >
          <Minus className="w-4 h-4" />
        </button>
        <span className="w-10 h-9 flex items-center justify-center border border-gray-300 rounded text-sm font-semibold bg-white">
          {value}
        </span>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          className="w-9 h-9 rounded border border-gray-300 text-aml-blue flex items-center justify-center disabled:opacity-30 hover:bg-aml-grey/50 transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

function clampNumber(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) return min
  return Math.min(max, Math.max(min, value))
}

interface PassengerSelectorProps {
  passengers: PassengerCounts
  childAges: number[]
  onChange: (passengers: PassengerCounts, childAges: number[]) => void
  onConfirm: () => void
  showReturnCheckbox?: boolean
  useSameForReturn?: boolean
  onUseSameForReturnChange?: (v: boolean) => void
}

export function PassengerSelector({
  passengers,
  childAges,
  onChange,
  onConfirm,
  showReturnCheckbox,
  useSameForReturn,
  onUseSameForReturnChange,
}: PassengerSelectorProps) {
  const update = (key: keyof PassengerCounts, value: number) => {
    onChange({ ...passengers, [key]: value }, childAges)
  }

  const updateChildAge = (index: number, age: number) => {
    const ages = [...childAges]
    ages[index] = clampNumber(age, 4, 11)
    onChange(passengers, ages)
  }

  const total =
    passengers.adults +
    passengers.youths +
    passengers.seniors +
    passengers.children +
    passengers.infants

  return (
    <div>
      <CounterRow
        label={de.passengers.adults}
        value={passengers.adults}
        min={1}
        onChange={(v) => update('adults', v)}
        icon={<User className="w-5 h-5" />}
      />
      <CounterRow
        label={de.passengers.youths}
        value={passengers.youths}
        onChange={(v) => update('youths', v)}
      />
      <CounterRow
        label={de.passengers.seniors}
        value={passengers.seniors}
        onChange={(v) => update('seniors', v)}
      />
      <CounterRow
        label={de.passengers.children}
        value={passengers.children}
        onChange={(v) => {
          const ages = Array.from({ length: v }, (_, i) => childAges[i] ?? 5)
          onChange({ ...passengers, children: v }, ages)
        }}
      />
      <CounterRow
        label={de.passengers.infants}
        value={passengers.infants}
        onChange={(v) => update('infants', v)}
      />

      {passengers.children > 0 && (
        <div className="py-3 border-b border-gray-100">
          <p className="text-sm font-medium text-aml-blue mb-2">{de.passengers.childAges}</p>
          {Array.from({ length: passengers.children }, (_, i) => (
            <div key={i} className="flex items-center gap-2 mb-2">
              <span className="text-sm text-gray-600 shrink-0">
                {de.passengers.childAge} {i + 1}:
              </span>
              <input
                type="number"
                min={4}
                max={11}
                step={1}
                value={childAges[i] ?? ''}
                onChange={(e) => updateChildAge(i, Number(e.target.value))}
                className="w-full max-w-[120px] rounded border border-gray-300 px-3 py-2 text-sm"
              />
            </div>
          ))}
        </div>
      )}

      <CounterRow
        label={de.passengers.pets}
        value={passengers.pets}
        onChange={(v) => update('pets', v)}
        icon={<PawPrint className="w-5 h-5" />}
      />

      {passengers.pets > 0 && (
        <p className="text-xs text-gray-500 mt-2">{de.passengers.petNote}</p>
      )}

      {total > 9 && (
        <p className="text-xs text-aml-red bg-red-50 p-2 rounded mt-2">{de.passengers.groupWarning}</p>
      )}

      {showReturnCheckbox && (
        <label className="flex items-start gap-2 text-xs text-gray-600 cursor-pointer mt-4">
          <input
            type="checkbox"
            checked={useSameForReturn}
            onChange={(e) => onUseSameForReturnChange?.(e.target.checked)}
            className="accent-aml-blue mt-0.5"
          />
          {de.passengers.useSameForReturn}
        </label>
      )}

      <Button onClick={onConfirm} size="lg" className="w-full mt-4 uppercase tracking-wide text-sm">
        {de.passengers.confirmData}
      </Button>
    </div>
  )
}
