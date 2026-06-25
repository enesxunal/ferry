import { Car, Check, Info, Truck } from 'lucide-react'
import { de } from '../../i18n/de'
import { trailerTypes, vehicleTypes } from '../../data/mockPorts'
import type { VehicleData } from '../../types/booking'
import { Button } from '../ui/Button'
import { Select } from '../ui/Select'

interface VehicleSelectorProps {
  vehicle: VehicleData
  onChange: (vehicle: VehicleData) => void
  onConfirm: () => void
  showReturnCheckbox?: boolean
  useSameForReturn?: boolean
  onUseSameForReturnChange?: (v: boolean) => void
}

function YesNoOption({
  label,
  selected,
  onClick,
}: {
  label: string
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-2 text-sm text-gray-700"
    >
      <span
        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
          selected ? 'border-aml-yellow bg-aml-yellow' : 'border-gray-300 bg-white'
        }`}
      >
        {selected && <Check className="w-3 h-3 text-aml-blue stroke-[3]" />}
      </span>
      {label}
    </button>
  )
}

function FieldWithIcon({
  label,
  icon,
  children,
}: {
  label: string
  icon: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div>
      <p className="text-xs font-medium text-aml-blue mb-1.5">{label}</p>
      <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2.5 bg-white">
        <span className="text-aml-blue shrink-0">{icon}</span>
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </div>
  )
}

function CarDimensionVisual({ type }: { type: 'length' | 'height' }) {
  return (
    <div className="flex flex-col items-center justify-center py-2">
      <svg viewBox="0 0 80 48" className="w-16 h-10 text-aml-blue" aria-hidden>
        <rect x="8" y="18" width="52" height="18" rx="4" fill="currentColor" opacity="0.15" />
        <path
          d="M12 30 L18 22 L58 22 L66 30 L66 34 L12 34 Z"
          fill="currentColor"
          opacity="0.85"
        />
        <circle cx="22" cy="34" r="4" fill="currentColor" />
        <circle cx="56" cy="34" r="4" fill="currentColor" />
        {type === 'length' ? (
          <>
            <line x1="6" y1="42" x2="74" y2="42" stroke="currentColor" strokeWidth="1.5" />
            <polygon points="6,42 10,40 10,44" fill="currentColor" />
            <polygon points="74,42 70,40 70,44" fill="currentColor" />
          </>
        ) : (
          <>
            <line x1="72" y1="14" x2="72" y2="40" stroke="currentColor" strokeWidth="1.5" />
            <polygon points="72,14 70,18 74,18" fill="currentColor" />
            <polygon points="72,40 70,36 74,36" fill="currentColor" />
          </>
        )}
      </svg>
    </div>
  )
}

export function VehicleSelector({
  vehicle,
  onChange,
  onConfirm,
  showReturnCheckbox,
  useSameForReturn,
  onUseSameForReturnChange,
}: VehicleSelectorProps) {
  const update = (partial: Partial<VehicleData>) => {
    onChange({ ...vehicle, ...partial })
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-6">
        <YesNoOption label={de.yes} selected={vehicle.hasVehicle} onClick={() => update({ hasVehicle: true })} />
        <YesNoOption label={de.no} selected={!vehicle.hasVehicle} onClick={() => update({ hasVehicle: false })} />
      </div>

      {vehicle.hasVehicle && (
        <>
          <button type="button" className="flex items-center gap-1.5 text-xs text-aml-blue hover:underline">
            <Info className="w-3.5 h-3.5" />
            Verbotene Fahrzeuge und Motorräder
          </button>

          <Select
            label={de.vehicle.type}
            placeholder={de.vehicle.selectType}
            value={vehicle.type}
            onChange={(e) => update({ type: e.target.value })}
            options={vehicleTypes.map((v) => ({ value: v.id, label: v.label }))}
          />

          {vehicle.type === 'bus' && (
            <p className="text-xs text-aml-red bg-red-50 p-2 rounded">{de.vehicle.busNote}</p>
          )}

          <FieldWithIcon label={de.vehicle.brandModel} icon={<Car className="w-5 h-5" />}>
            <input
              type="text"
              value={vehicle.brandModel}
              onChange={(e) => update({ brandModel: e.target.value })}
              placeholder="z.B. Volkswagen Polo"
              className="w-full text-sm outline-none placeholder:text-gray-400"
            />
          </FieldWithIcon>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <CarDimensionVisual type="length" />
              <p className="text-xs font-medium text-aml-blue text-center mb-1">{de.vehicle.length}</p>
              <input
                type="number"
                value={vehicle.length}
                onChange={(e) => update({ length: e.target.value ? Number(e.target.value) : '' })}
                placeholder="cm"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-center outline-none focus:border-aml-blue"
              />
            </div>
            <div>
              <CarDimensionVisual type="height" />
              <p className="text-xs font-medium text-aml-blue text-center mb-1">{de.vehicle.height}</p>
              <input
                type="number"
                value={vehicle.height}
                onChange={(e) => update({ height: e.target.value ? Number(e.target.value) : '' })}
                placeholder="cm"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-center outline-none focus:border-aml-blue"
              />
            </div>
          </div>

          <FieldWithIcon label={de.vehicle.trailer} icon={<Truck className="w-5 h-5" />}>
            <select
              value={vehicle.trailer}
              onChange={(e) => update({ trailer: e.target.value })}
              className="w-full text-sm outline-none bg-transparent text-gray-700"
            >
              {trailerTypes.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>
          </FieldWithIcon>

          {vehicle.trailer && (
            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                value={vehicle.trailerLength}
                onChange={(e) =>
                  update({ trailerLength: e.target.value ? Number(e.target.value) : '' })
                }
                placeholder={`${de.vehicle.trailer} Länge`}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-aml-blue"
              />
              <input
                type="number"
                value={vehicle.trailerHeight}
                onChange={(e) =>
                  update({ trailerHeight: e.target.value ? Number(e.target.value) : '' })
                }
                placeholder={`${de.vehicle.trailer} Höhe`}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-aml-blue"
              />
            </div>
          )}

          <p className="text-xs text-gray-500">{de.vehicle.oneCarNote}</p>
        </>
      )}

      <div>
        <p className="text-xs font-medium text-aml-blue mb-1.5">{de.vehicle.bicycles}</p>
        <input
          type="number"
          min={0}
          max={10}
          value={vehicle.bicycles}
          onChange={(e) => update({ bicycles: Number(e.target.value) })}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-aml-blue"
        />
      </div>

      {showReturnCheckbox && (
        <label className="flex items-start gap-2 text-xs text-gray-600 cursor-pointer">
          <input
            type="checkbox"
            checked={useSameForReturn}
            onChange={(e) => onUseSameForReturnChange?.(e.target.checked)}
            className="accent-aml-blue mt-0.5"
          />
          {de.vehicle.useSameForReturn}
        </label>
      )}

      <Button onClick={onConfirm} size="lg" className="w-full uppercase tracking-wide text-sm">
        {de.vehicle.confirmData}
      </Button>
    </div>
  )
}
