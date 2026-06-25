import { de } from '../../i18n/de'
import { trailerTypes, vehicleTypes } from '../../data/mockPorts'
import type { VehicleData } from '../../types/booking'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { Select } from '../ui/Select'

interface VehicleSelectorProps {
  vehicle: VehicleData
  onChange: (vehicle: VehicleData) => void
  onConfirm: () => void
  showReturnCheckbox?: boolean
  useSameForReturn?: boolean
  onUseSameForReturnChange?: (v: boolean) => void
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
      <div>
        <p className="text-sm font-medium text-aml-blue mb-2">{de.vehicle.hasVehicle}</p>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => update({ hasVehicle: true })}
            className={`flex-1 py-2 rounded-md border-2 text-sm font-medium transition-colors ${
              vehicle.hasVehicle
                ? 'border-aml-blue bg-aml-blue text-white'
                : 'border-gray-300 text-gray-600 hover:border-aml-blue'
            }`}
          >
            {de.yes}
          </button>
          <button
            type="button"
            onClick={() => update({ hasVehicle: false })}
            className={`flex-1 py-2 rounded-md border-2 text-sm font-medium transition-colors ${
              !vehicle.hasVehicle
                ? 'border-aml-blue bg-aml-blue text-white'
                : 'border-gray-300 text-gray-600 hover:border-aml-blue'
            }`}
          >
            {de.no}
          </button>
        </div>
      </div>

      {vehicle.hasVehicle && (
        <>
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

          <Select
            label={de.vehicle.quantity}
            value={String(vehicle.quantity)}
            onChange={(e) => update({ quantity: Number(e.target.value) })}
            options={[1, 2, 3, 4, 5].map((n) => ({ value: String(n), label: String(n) }))}
          />

          <Input
            label={de.vehicle.brandModel}
            value={vehicle.brandModel}
            onChange={(e) => update({ brandModel: e.target.value })}
            placeholder="z.B. VW Golf"
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label={de.vehicle.length}
              type="number"
              value={vehicle.length}
              onChange={(e) =>
                update({ length: e.target.value ? Number(e.target.value) : '' })
              }
              placeholder="cm"
            />
            <Input
              label={de.vehicle.height}
              type="number"
              value={vehicle.height}
              onChange={(e) =>
                update({ height: e.target.value ? Number(e.target.value) : '' })
              }
              placeholder="cm"
            />
          </div>

          <Select
            label={de.vehicle.trailer}
            value={vehicle.trailer}
            onChange={(e) => update({ trailer: e.target.value })}
            options={trailerTypes.map((t) => ({ value: t.id, label: t.label }))}
          />

          {vehicle.trailer && (
            <div className="grid grid-cols-2 gap-3">
              <Input
                label={`${de.vehicle.trailer} ${de.vehicle.length}`}
                type="number"
                value={vehicle.trailerLength}
                onChange={(e) =>
                  update({ trailerLength: e.target.value ? Number(e.target.value) : '' })
                }
              />
              <Input
                label={`${de.vehicle.trailer} ${de.vehicle.height}`}
                type="number"
                value={vehicle.trailerHeight}
                onChange={(e) =>
                  update({ trailerHeight: e.target.value ? Number(e.target.value) : '' })
                }
              />
            </div>
          )}

          <p className="text-xs text-gray-500">{de.vehicle.oneCarNote}</p>
        </>
      )}

      <div>
        <Input
          label={de.vehicle.bicycles}
          type="number"
          min={0}
          max={10}
          value={vehicle.bicycles}
          onChange={(e) => update({ bicycles: Number(e.target.value) })}
        />
      </div>

      <Button onClick={onConfirm} size="lg" className="w-full uppercase tracking-wide text-sm">
        {de.vehicle.confirmData}
      </Button>

      {showReturnCheckbox && (
        <label className="flex items-start gap-2 text-xs text-gray-600 cursor-pointer mt-4">
          <input
            type="checkbox"
            checked={useSameForReturn}
            onChange={(e) => onUseSameForReturnChange?.(e.target.checked)}
            className="accent-aml-blue mt-0.5"
          />
          {de.vehicle.useSameForReturn}
        </label>
      )}
    </div>
  )
}
