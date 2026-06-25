import { Minus, Plus } from 'lucide-react'
import { de } from '../../i18n/de'
import type { PassengerCounts } from '../../types/booking'
import { Button } from '../ui/Button'

interface CounterRowProps {
  label: string
  value: number
  min?: number
  max?: number
  onChange: (v: number) => void
}

function CounterRow({ label, value, min = 0, max = 9, onChange }: CounterRowProps) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm text-gray-700">{label}</span>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className="w-8 h-8 rounded-full border border-aml-blue text-aml-blue flex items-center justify-center disabled:opacity-30 hover:bg-aml-grey transition-colors"
        >
          <Minus className="w-4 h-4" />
        </button>
        <span className="w-6 text-center font-semibold">{value}</span>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          className="w-8 h-8 rounded-full border border-aml-blue text-aml-blue flex items-center justify-center disabled:opacity-30 hover:bg-aml-grey transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

interface PassengerSelectorProps {
  passengers: PassengerCounts
  childAges: number[]
  onChange: (passengers: PassengerCounts, childAges: number[]) => void
  onConfirm: () => void
}

export function PassengerSelector({
  passengers,
  childAges,
  onChange,
  onConfirm,
}: PassengerSelectorProps) {
  const update = (key: keyof PassengerCounts, value: number) => {
    const updated = { ...passengers, [key]: value }
    onChange(updated, childAges)
  }

  const updateChildAge = (index: number, age: number) => {
    const ages = [...childAges]
    ages[index] = age
    onChange(passengers, ages)
  }

  const total =
    passengers.adults +
    passengers.youths +
    passengers.seniors +
    passengers.children +
    passengers.infants

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-aml-blue">{de.passengers.select}</p>

      <CounterRow
        label={de.passengers.adults}
        value={passengers.adults}
        min={1}
        onChange={(v) => update('adults', v)}
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
      <CounterRow
        label={de.passengers.pets}
        value={passengers.pets}
        onChange={(v) => update('pets', v)}
      />

      {passengers.pets > 0 && (
        <p className="text-xs text-gray-500 bg-aml-grey/50 p-2 rounded">{de.passengers.petNote}</p>
      )}

      {passengers.children > 0 && (
        <div className="space-y-2 pt-2 border-t">
          <p className="text-sm font-medium">{de.passengers.childAges}</p>
          {Array.from({ length: passengers.children }, (_, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-sm text-gray-600">
                {de.passengers.childAge} {i + 1}:
              </span>
              <input
                type="number"
                min={4}
                max={11}
                value={childAges[i] ?? ''}
                onChange={(e) => updateChildAge(i, Number(e.target.value))}
                className="w-20 rounded border border-gray-300 px-2 py-1 text-sm"
              />
            </div>
          ))}
        </div>
      )}

      {total > 9 && (
        <p className="text-xs text-aml-red bg-red-50 p-2 rounded">{de.passengers.groupWarning}</p>
      )}

      <Button onClick={onConfirm} size="sm" className="w-full mt-2">
        {de.passengers.confirmData}
      </Button>
    </div>
  )
}
