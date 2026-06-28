import autoIcon from '../../assets/auto.svg'
import type { VehicleData } from '../../types/booking'
import { Input } from '../ui/Input'
import { CheckoutSection } from './CheckoutSection'

interface VehicleFormProps {
  vehicle: VehicleData
  onVehicleChange: (vehicle: Partial<VehicleData>) => void
  useSameForReturn: boolean
  onUseSameForReturnChange: (value: boolean) => void
}

function joinBrandModel(make: string, model: string) {
  return [make.trim(), model.trim()].filter(Boolean).join(' ')
}

export function VehicleForm({
  vehicle,
  onVehicleChange,
  useSameForReturn,
  onUseSameForReturnChange,
}: VehicleFormProps) {
  const updateMake = (make: string) => {
    onVehicleChange({
      make,
      brandModel: joinBrandModel(make, vehicle.model),
    })
  }
  const updateModel = (model: string) => {
    onVehicleChange({
      model,
      brandModel: joinBrandModel(vehicle.make, model),
    })
  }

  return (
    <CheckoutSection
      title="Fahrzeugdaten"
      subtitle="Marke, Modell und Kennzeichen werden fuer die Buchung uebernommen"
    >
      <div className="mb-4 flex items-center gap-3 rounded-lg bg-sky-50 p-3">
        <img src={autoIcon} alt="" aria-hidden="true" className="h-10 w-14 object-contain" />
        <div>
          <p className="text-sm font-semibold text-aml-blue">
            {vehicle.brandModel || 'Fahrzeug noch nicht ausgewaehlt'}
          </p>
          <p className="text-xs text-gray-500">
            {vehicle.length || '-'} cm L / {vehicle.width || '-'} cm B /{' '}
            {vehicle.height || '-'} cm H
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <Input
          label="Marke*"
          value={vehicle.make}
          onChange={(event) => updateMake(event.target.value)}
        />
        <Input
          label="Modell*"
          value={vehicle.model}
          onChange={(event) => updateModel(event.target.value)}
        />
        <Input
          label="Kennzeichen"
          value={vehicle.licensePlate}
          onChange={(event) => onVehicleChange({ licensePlate: event.target.value })}
          placeholder="z.B. B AB 1234"
        />
        <Input
          label="Laenge (cm)"
          type="number"
          min={0}
          value={vehicle.length}
          onChange={(event) => onVehicleChange({ length: Number(event.target.value) || '' })}
        />
        <Input
          label="Breite (cm)"
          type="number"
          min={0}
          value={vehicle.width}
          onChange={(event) => onVehicleChange({ width: Number(event.target.value) || '' })}
        />
        <Input
          label="Hoehe (cm)"
          type="number"
          min={0}
          value={vehicle.height}
          onChange={(event) => onVehicleChange({ height: Number(event.target.value) || '' })}
        />
      </div>

      <label className="mt-4 flex items-start gap-2 text-xs text-gray-600">
        <input
          type="checkbox"
          checked={useSameForReturn}
          onChange={(event) => onUseSameForReturnChange(event.target.checked)}
          className="mt-0.5 accent-aml-blue"
        />
        gleiche Daten fuer Rueckfahrt verwenden
      </label>
    </CheckoutSection>
  )
}
