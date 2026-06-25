import { Calendar, MapPin, Ship, Users, Car } from 'lucide-react'
import { useState } from 'react'
import { familyDiscounts, ports } from '../../data/mockPorts'
import { de } from '../../i18n/de'
import type { LegBooking } from '../../types/booking'
import { AccordionSection } from '../ui/AccordionSection'
import { Input } from '../ui/Input'
import { Select } from '../ui/Select'
import { PassengerSelector } from './PassengerSelector'
import { VehicleSelector } from './VehicleSelector'

interface LegSectionProps {
  title: string
  leg: LegBooking
  onChange: (data: Partial<LegBooking>) => void
  isReturn?: boolean
}

export function LegSection({ title, leg, onChange, isReturn = false }: LegSectionProps) {
  const [passengersConfirmed, setPassengersConfirmed] = useState(false)
  const [vehicleConfirmed, setVehicleConfirmed] = useState(false)

  const portOptions = ports.map((p) => ({
    value: p.id,
    label: `${p.name} (${p.country})`,
  }))

  const passengerSummary = () => {
    const p = leg.passengers
    const parts: string[] = []
    if (p.adults) parts.push(`${p.adults} Erw.`)
    if (p.youths) parts.push(`${p.youths} Jugendl.`)
    if (p.seniors) parts.push(`${p.seniors} Senior`)
    if (p.children) parts.push(`${p.children} Kind.`)
    if (p.infants) parts.push(`${p.infants} Kleink.`)
    if (p.pets) parts.push(`${p.pets} Haustiere`)
    return parts.join(', ') || de.passengers.add
  }

  const vehicleSummary = () => {
    if (!leg.vehicle.hasVehicle) return de.no
    const type = leg.vehicle.type
    const label = type.charAt(0).toUpperCase() + type
    return `${label}${leg.vehicle.brandModel ? ` - ${leg.vehicle.brandModel}` : ''}`
  }

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-bold text-aml-blue flex items-center gap-2">
        <Ship className="w-5 h-5" />
        {title}
      </h2>

      <AccordionSection
        title={isReturn ? de.route.selectReturnFrom : de.route.selectFrom}
        subtitle={
          leg.routeFrom && leg.routeTo
            ? `${ports.find((p) => p.id === leg.routeFrom)?.name} → ${ports.find((p) => p.id === leg.routeTo)?.name}`
            : undefined
        }
        icon={<MapPin className="w-5 h-5" />}
        defaultOpen
        completed={!!leg.routeFrom && !!leg.routeTo}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3">
          <Select
            label={de.route.from}
            placeholder={isReturn ? de.route.selectReturnFrom : de.route.selectFrom}
            value={leg.routeFrom}
            onChange={(e) => onChange({ routeFrom: e.target.value })}
            options={portOptions}
          />
          <Select
            label={de.route.to}
            placeholder={isReturn ? de.route.selectReturnTo : de.route.selectTo}
            value={leg.routeTo}
            onChange={(e) => onChange({ routeTo: e.target.value })}
            options={portOptions.filter((p) => p.value !== leg.routeFrom)}
          />
        </div>
      </AccordionSection>

      <AccordionSection
        title={isReturn ? de.date.return : de.date.outbound}
        subtitle={leg.date || de.date.select}
        icon={<Calendar className="w-5 h-5" />}
        completed={!!leg.date}
      >
        <div className="pt-3">
          <Input
            type="date"
            label={isReturn ? de.date.return : de.date.outbound}
            value={leg.date}
            min={new Date().toISOString().split('T')[0]}
            onChange={(e) => onChange({ date: e.target.value })}
          />
        </div>
      </AccordionSection>

      <AccordionSection
        title={`${de.travelDetails} ${title}`}
        subtitle={
          leg.travelDetails.residentTariff
            ? `${de.residentTariff}: ${de.yes}`
            : de.discounts
        }
        completed={leg.travelDetails.familyDiscount !== 'none' || leg.travelDetails.residentTariff}
      >
        <div className="space-y-4 pt-3">
          <Select
            label={de.familyDiscount}
            value={leg.travelDetails.familyDiscount}
            onChange={(e) =>
              onChange({
                travelDetails: { ...leg.travelDetails, familyDiscount: e.target.value },
              })
            }
            options={familyDiscounts.map((f) => ({ value: f.id, label: f.label }))}
          />
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">{de.residentTariff}</p>
            <div className="flex gap-3">
              {[true, false].map((val) => (
                <button
                  key={String(val)}
                  type="button"
                  onClick={() =>
                    onChange({
                      travelDetails: { ...leg.travelDetails, residentTariff: val },
                    })
                  }
                  className={`flex-1 py-2 rounded-md border-2 text-sm font-medium transition-colors ${
                    leg.travelDetails.residentTariff === val
                      ? 'border-aml-blue bg-aml-blue text-white'
                      : 'border-gray-300 text-gray-600'
                  }`}
                >
                  {val ? de.yes : de.no}
                </button>
              ))}
            </div>
          </div>
        </div>
      </AccordionSection>

      <AccordionSection
        title={`${de.passengers.title} ${title}`}
        subtitle={passengerSummary()}
        icon={<Users className="w-5 h-5" />}
        completed={passengersConfirmed}
      >
        <div className="pt-3">
          <PassengerSelector
            passengers={leg.passengers}
            childAges={leg.childAges}
            onChange={(passengers, childAges) => onChange({ passengers, childAges })}
            onConfirm={() => setPassengersConfirmed(true)}
          />
        </div>
      </AccordionSection>

      <AccordionSection
        title={`${de.vehicle.title} ${title}`}
        subtitle={vehicleSummary()}
        icon={<Car className="w-5 h-5" />}
        completed={vehicleConfirmed}
      >
        <div className="pt-3">
          <VehicleSelector
            vehicle={leg.vehicle}
            onChange={(vehicle) => onChange({ vehicle })}
            onConfirm={() => setVehicleConfirmed(true)}
          />
        </div>
      </AccordionSection>
    </div>
  )
}
