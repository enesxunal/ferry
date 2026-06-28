import { Check, Info, Truck } from '@phosphor-icons/react'
import { useEffect, useMemo, useState, type ReactNode } from 'react'
import autoIcon from '../../assets/auto.svg'
import type { VehicleModelSpec } from '../../data/vehicleModels'
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
          selected ? 'border-aml-blue bg-aml-blue' : 'border-gray-300 bg-white'
        }`}
      >
        {selected && <Check className="w-3 h-3 text-white stroke-[3]" />}
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
  icon: ReactNode
  children: ReactNode
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

interface VehicleAutocompleteOption {
  label: string
  value: string
  sublabel?: string
  spec?: VehicleModelSpec
}

function VehicleAutocompleteField({
  label,
  value,
  placeholder,
  options,
  onChange,
  onSelect,
  disabled,
}: {
  label: string
  value: string
  placeholder: string
  options: VehicleAutocompleteOption[]
  onChange: (value: string) => void
  onSelect: (option: VehicleAutocompleteOption) => void
  disabled?: boolean
}) {
  const [open, setOpen] = useState(false)
  const visibleOptions = options.slice(0, 8)

  return (
    <div className="relative">
      <label className="block text-xs font-medium text-aml-blue mb-1.5">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(event) => {
          onChange(event.target.value)
          setOpen(true)
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => window.setTimeout(() => setOpen(false), 120)}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-gray-400 focus:border-aml-blue focus:ring-2 focus:ring-aml-blue/15 disabled:bg-gray-50 disabled:text-gray-400"
      />

      {open && !disabled && visibleOptions.length > 0 && (
        <div className="absolute left-0 right-0 top-[calc(100%+4px)] z-40 max-h-56 overflow-y-auto rounded-lg border border-gray-100 bg-white py-1 shadow-xl">
          {visibleOptions.map((option) => (
            <button
              key={`${option.value}-${option.sublabel ?? ''}`}
              type="button"
              onMouseDown={(event) => {
                event.preventDefault()
                onSelect(option)
                setOpen(false)
              }}
              className="block w-full border-b border-gray-100 px-3 py-2 text-left text-sm last:border-b-0 hover:bg-aml-grey/60 focus:bg-aml-grey/60 focus:outline-none"
            >
              <span className="block font-semibold text-gray-700">{option.label}</span>
              {option.sublabel && (
                <span className="mt-0.5 block text-xs text-gray-500">{option.sublabel}</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function normalizeSearch(value: string) {
  return value.trim().toLocaleUpperCase('de-DE')
}

function matchesSearch(value: string, query: string) {
  const normalizedQuery = normalizeSearch(query)
  if (!normalizedQuery) return true
  return normalizeSearch(value).includes(normalizedQuery)
}

function dimensionSummary(vehicle: VehicleModelSpec) {
  return `${vehicle.lengthCm} x ${vehicle.widthCm} x ${vehicle.heightCm} cm`
}

function CarDimensionVisual({ type }: { type: 'length' | 'height' | 'width' }) {
  return (
    <div className="flex items-center justify-center py-2">
      <div className="relative h-16 w-24">
        <img
          src={autoIcon}
          alt=""
          aria-hidden="true"
          className="absolute left-1/2 top-2 h-11 w-20 -translate-x-1/2 object-contain"
        />
        {type === 'height' ? (
          <svg
            viewBox="0 0 18 64"
            className="absolute right-0 top-0 h-16 w-5 text-aml-blue"
            aria-hidden="true"
          >
            <line x1="9" y1="7" x2="9" y2="57" stroke="currentColor" strokeWidth="2" />
            <polygon points="9,7 5,14 13,14" fill="currentColor" />
            <polygon points="9,57 5,50 13,50" fill="currentColor" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 96 18"
            className="absolute bottom-0 left-0 h-5 w-full text-aml-blue"
            aria-hidden="true"
          >
            <line
              x1={type === 'width' ? '20' : '8'}
              y1="9"
              x2={type === 'width' ? '76' : '88'}
              y2="9"
              stroke="currentColor"
              strokeWidth="2"
            />
            <polygon
              points={type === 'width' ? '20,9 27,5 27,13' : '8,9 15,5 15,13'}
              fill="currentColor"
            />
            <polygon
              points={type === 'width' ? '76,9 69,5 69,13' : '88,9 81,5 81,13'}
              fill="currentColor"
            />
          </svg>
        )}
      </div>
    </div>
  )
}

function parseOptionalNonNegativeNumber(value: string): number | '' {
  if (!value) return ''
  const parsed = Number(value)
  if (!Number.isFinite(parsed)) return ''
  return Math.max(0, parsed)
}

function clampNumber(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) return min
  return Math.min(max, Math.max(min, value))
}

export function VehicleSelector({
  vehicle,
  onChange,
  onConfirm,
  showReturnCheckbox,
  useSameForReturn,
  onUseSameForReturnChange,
}: VehicleSelectorProps) {
  const [vehicleData, setVehicleData] = useState<{
    makes: string[]
    models: VehicleModelSpec[]
  }>({ makes: [], models: [] })

  const update = (partial: Partial<VehicleData>) => {
    onChange({ ...vehicle, ...partial })
  }

  useEffect(() => {
    let mounted = true

    void import('../../data/vehicleModels').then(({ vehicleMakes, vehicleModels }) => {
      if (mounted) {
        setVehicleData({ makes: vehicleMakes, models: vehicleModels })
      }
    })

    return () => {
      mounted = false
    }
  }, [])

  const makeValue = vehicle.make ?? ''
  const modelValue = vehicle.model ?? ''
  const selectedMake =
    vehicleData.makes.find((make) => normalizeSearch(make) === normalizeSearch(makeValue)) ?? ''

  const makeOptions = useMemo(() => {
    const query = makeValue
    return vehicleData.makes
      .filter((make) => matchesSearch(make, query))
      .sort((a, b) => {
        const normalizedQuery = normalizeSearch(query)
        const aStarts = normalizeSearch(a).startsWith(normalizedQuery)
        const bStarts = normalizeSearch(b).startsWith(normalizedQuery)
        if (aStarts !== bStarts) return aStarts ? -1 : 1
        return a.localeCompare(b)
      })
      .map((make) => ({ label: make, value: make }))
  }, [makeValue, vehicleData.makes])

  const modelOptions = useMemo(() => {
    if (!selectedMake) return []

    return vehicleData.models
      .filter((model) => model.make === selectedMake && matchesSearch(model.model, modelValue))
      .sort((a, b) => {
        const normalizedQuery = normalizeSearch(modelValue)
        const aStarts = normalizeSearch(a.model).startsWith(normalizedQuery)
        const bStarts = normalizeSearch(b.model).startsWith(normalizedQuery)
        if (aStarts !== bStarts) return aStarts ? -1 : 1
        return a.model.localeCompare(b.model)
      })
      .map((model) => ({
        label: model.model,
        value: model.model,
        sublabel: dimensionSummary(model),
        spec: model,
      }))
  }, [modelValue, selectedMake, vehicleData.models])

  const updateMake = (make: string) => {
    update({
      make,
      model: '',
      brandModel: make,
      length: '',
      height: '',
      width: '',
    })
  }

  const updateModel = (model: string) => {
    update({
      model,
      brandModel: [makeValue, model].filter(Boolean).join(' '),
      length: '',
      height: '',
      width: '',
    })
  }

  const selectVehicleModel = (model: VehicleModelSpec) => {
    update({
      make: model.make,
      model: model.model,
      brandModel: `${model.make} ${model.model}`,
      length: model.lengthCm,
      height: model.heightCm,
      width: model.widthCm,
    })
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

          <div>
            <div className="mb-2 flex items-center gap-2">
              <img
                src={autoIcon}
                alt=""
                aria-hidden="true"
                className="block h-8 w-12 object-contain"
              />
              <p className="text-xs font-medium text-aml-blue">{de.vehicle.brandModel}</p>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <VehicleAutocompleteField
                label={de.vehicle.make}
                value={makeValue}
                placeholder={de.vehicle.make}
                options={makeOptions}
                onChange={updateMake}
                onSelect={(option) => updateMake(option.value)}
              />
              <VehicleAutocompleteField
                label={de.vehicle.model}
                value={modelValue}
                placeholder={de.vehicle.model}
                options={modelOptions}
                disabled={!selectedMake}
                onChange={updateModel}
                onSelect={(option) => {
                  if (option.spec) selectVehicleModel(option.spec)
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div>
              <CarDimensionVisual type="length" />
              <p className="text-xs font-medium text-aml-blue text-center mb-1">{de.vehicle.length}</p>
              <input
                type="number"
                min={0}
                value={vehicle.length}
                onChange={(e) =>
                  update({ length: parseOptionalNonNegativeNumber(e.target.value) })
                }
                placeholder="cm"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-center outline-none focus:border-aml-blue"
              />
            </div>
            <div>
              <CarDimensionVisual type="width" />
              <p className="text-xs font-medium text-aml-blue text-center mb-1">{de.vehicle.width}</p>
              <input
                type="number"
                min={0}
                value={vehicle.width ?? ''}
                onChange={(e) =>
                  update({ width: parseOptionalNonNegativeNumber(e.target.value) })
                }
                placeholder="cm"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-center outline-none focus:border-aml-blue"
              />
            </div>
            <div>
              <CarDimensionVisual type="height" />
              <p className="text-xs font-medium text-aml-blue text-center mb-1">{de.vehicle.height}</p>
              <input
                type="number"
                min={0}
                value={vehicle.height}
                onChange={(e) =>
                  update({ height: parseOptionalNonNegativeNumber(e.target.value) })
                }
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
                min={0}
                value={vehicle.trailerLength}
                onChange={(e) =>
                  update({ trailerLength: parseOptionalNonNegativeNumber(e.target.value) })
                }
                placeholder={`${de.vehicle.trailer} Länge`}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-aml-blue"
              />
              <input
                type="number"
                min={0}
                value={vehicle.trailerHeight}
                onChange={(e) =>
                  update({ trailerHeight: parseOptionalNonNegativeNumber(e.target.value) })
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
          onChange={(e) => update({ bicycles: clampNumber(Number(e.target.value), 0, 10) })}
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
