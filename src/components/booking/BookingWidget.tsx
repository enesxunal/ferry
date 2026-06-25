import { Anchor, Calendar, Car, Search, Users } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBooking } from '../../context/BookingContext'
import { vehicleTypes, getRouteLabel } from '../../data/mockPorts'
import { formatGermanDate } from '../../data/mockFerries'
import { de } from '../../i18n/de'
import { Button } from '../ui/Button'
import { DatePickerDropdown } from './DatePickerModal'
import { PassengerSelector } from './PassengerSelector'
import { RouteFieldButton, RoutePickerDropdown } from './RoutePickerModal'
import { VehicleSelector } from './VehicleSelector'
import { Modal } from '../ui/Modal'

type ModalType = 'outboundRoute' | 'returnRoute' | 'outboundDate' | 'returnDate' | 'passengers' | 'vehicle' | null

function passengerSummary(p: ReturnType<typeof useBooking>['booking']['outbound']['passengers']) {
  const parts: string[] = []
  const total = p.adults + p.youths + p.seniors + p.children + p.infants
  if (total === 1) parts.push('1 Passagier')
  else if (total > 0) parts.push(`${total} Passagiere`)
  if (p.pets === 1) parts.push('1 Tier')
  else if (p.pets > 1) parts.push(`${p.pets} Tiere`)
  return parts.join(', ') || de.passengers.add
}

function vehicleSummary(v: ReturnType<typeof useBooking>['booking']['outbound']['vehicle']) {
  if (!v.hasVehicle) return de.no
  if (v.brandModel) return v.brandModel
  const type = vehicleTypes.find((t) => t.id === v.type)?.label ?? v.type
  return type
}

export function BookingWidget() {
  const navigate = useNavigate()
  const { booking, updateSearch, updateOutbound, updateReturnLeg } = useBooking()
  const [activeModal, setActiveModal] = useState<ModalType>(null)
  const [errors, setErrors] = useState<string[]>([])

  const toggle = (key: ModalType) => {
    setActiveModal((prev) => (prev === key ? null : key))
  }

  const handleSearch = () => {
    const errs: string[] = []
    const { outbound, returnLeg, tripType } = booking

    if (!outbound.routeFrom || !outbound.routeTo) errs.push(de.validation.selectRoute)
    if (!outbound.date) errs.push(`${de.outbound}: ${de.validation.selectDate}`)
    if (tripType === 'roundtrip') {
      if (!returnLeg.routeFrom || !returnLeg.routeTo) errs.push(de.validation.selectRoute)
      if (!returnLeg.date) errs.push(`${de.return}: ${de.validation.selectDate}`)
    }

    setErrors(errs)
    if (errs.length > 0) return

    if (tripType === 'roundtrip' && booking.useSamePassengersForReturn) {
      updateReturnLeg({ passengers: outbound.passengers, childAges: outbound.childAges })
    }
    if (tripType === 'roundtrip' && booking.useSameVehicleForReturn) {
      updateReturnLeg({ vehicle: { ...outbound.vehicle } })
    }

    navigate('/results')
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 w-full max-w-[400px] relative z-20">
      <div className="flex gap-2 p-4 pb-0">
        {(['roundtrip', 'oneway'] as const).map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => updateSearch({ tripType: type })}
            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold border-2 transition-colors ${
              booking.tripType === type
                ? 'bg-aml-blue text-white border-aml-blue'
                : 'bg-white text-gray-600 border-gray-200 hover:border-aml-blue/40'
            }`}
          >
            {de.tripType[type]}
          </button>
        ))}
      </div>

      <div className="p-4 space-y-4">
        {errors.length > 0 && (
          <div className="bg-red-50 border border-aml-red/20 rounded-lg p-2">
            {errors.map((e) => (
              <p key={e} className="text-xs text-aml-red">
                {e}
              </p>
            ))}
          </div>
        )}

        <div>
          <p className="text-sm font-semibold text-aml-blue mb-2">{de.outbound}</p>
          <div className="space-y-2">
            <div className="relative">
              <RouteFieldButton
                label="Hinfahrtstrecke"
                sublabel="Geben Sie einen Hafen oder ein Ziel ein"
                value={getRouteLabel(booking.outbound.routeFrom, booking.outbound.routeTo)}
                onClick={() => toggle('outboundRoute')}
                active={activeModal === 'outboundRoute'}
                icon={<Anchor className="w-5 h-5" />}
              />
              <RoutePickerDropdown
                open={activeModal === 'outboundRoute'}
                onClose={() => setActiveModal(null)}
                from={booking.outbound.routeFrom}
                to={booking.outbound.routeTo}
                onSelect={(from, to) => updateOutbound({ routeFrom: from, routeTo: to })}
              />
            </div>
            <div className="relative">
              <RouteFieldButton
                label="Hinfahrtsdatum"
                sublabel="Wählen Sie ein Datum"
                value={booking.outbound.date ? formatGermanDate(booking.outbound.date) : ''}
                onClick={() => toggle('outboundDate')}
                active={activeModal === 'outboundDate'}
                icon={<Calendar className="w-5 h-5" />}
              />
              <DatePickerDropdown
                open={activeModal === 'outboundDate'}
                onClose={() => setActiveModal(null)}
                value={booking.outbound.date}
                onChange={(date) => updateOutbound({ date })}
                label={de.date.outbound}
              />
            </div>
          </div>
        </div>

        {booking.tripType === 'roundtrip' && (
          <div>
            <p className="text-sm font-semibold text-aml-blue mb-2">{de.return}</p>
            <div className="space-y-2">
              <div className="relative">
                <RouteFieldButton
                  label="Rückfahrtstrecke"
                  sublabel="Wählen Sie die Rückfahrt"
                  value={getRouteLabel(booking.returnLeg.routeFrom, booking.returnLeg.routeTo)}
                  onClick={() => toggle('returnRoute')}
                  active={activeModal === 'returnRoute'}
                  icon={<Anchor className="w-5 h-5" />}
                />
                <RoutePickerDropdown
                  open={activeModal === 'returnRoute'}
                  onClose={() => setActiveModal(null)}
                  from={booking.returnLeg.routeFrom}
                  to={booking.returnLeg.routeTo}
                  onSelect={(from, to) => updateReturnLeg({ routeFrom: from, routeTo: to })}
                />
              </div>
              <div className="relative">
                <RouteFieldButton
                  label="Rückfahrtsdatum"
                  sublabel="Wählen Sie ein Datum"
                  value={booking.returnLeg.date ? formatGermanDate(booking.returnLeg.date) : ''}
                  onClick={() => toggle('returnDate')}
                  active={activeModal === 'returnDate'}
                  icon={<Calendar className="w-5 h-5" />}
                />
                <DatePickerDropdown
                  open={activeModal === 'returnDate'}
                  onClose={() => setActiveModal(null)}
                  value={booking.returnLeg.date}
                  onChange={(date) => updateReturnLeg({ date })}
                  label={de.date.return}
                />
              </div>
            </div>
          </div>
        )}

        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-aml-blue">{de.travelDetails}</p>
            <label className="flex items-center gap-1.5 text-xs text-gray-600 cursor-pointer">
              <input
                type="checkbox"
                checked={booking.outbound.travelDetails.residentTariff}
                onChange={(e) =>
                  updateOutbound({
                    travelDetails: {
                      ...booking.outbound.travelDetails,
                      residentTariff: e.target.checked,
                    },
                  })
                }
                className="accent-aml-blue"
              />
              Residententarif
            </label>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <RouteFieldButton
              label={de.passengers.title}
              sublabel={de.passengers.add}
              value={passengerSummary(booking.outbound.passengers)}
              onClick={() => toggle('passengers')}
              active={activeModal === 'passengers'}
              icon={<Users className="w-5 h-5" />}
            />
            <RouteFieldButton
              label={de.vehicle.title}
              sublabel="Haben Sie ein Fahrzeug?"
              value={vehicleSummary(booking.outbound.vehicle)}
              onClick={() => toggle('vehicle')}
              active={activeModal === 'vehicle'}
              icon={<Car className="w-5 h-5" />}
            />
          </div>
        </div>

        <Button onClick={handleSearch} size="lg" className="w-full uppercase tracking-wide">
          <Search className="w-5 h-5" />
          {de.search}
        </Button>
      </div>

      <Modal
        open={activeModal === 'passengers'}
        onClose={() => setActiveModal(null)}
        title={de.passengers.select}
      >
        <PassengerSelector
          passengers={booking.outbound.passengers}
          childAges={booking.outbound.childAges}
          onChange={(passengers, childAges) => updateOutbound({ passengers, childAges })}
          onConfirm={() => setActiveModal(null)}
        />
        {booking.tripType === 'roundtrip' && (
          <label className="flex items-center gap-2 text-sm mt-4 cursor-pointer">
            <input
              type="checkbox"
              checked={booking.useSamePassengersForReturn}
              onChange={(e) => updateSearch({ useSamePassengersForReturn: e.target.checked })}
              className="accent-aml-blue"
            />
            {de.passengers.useSameForReturn}
          </label>
        )}
      </Modal>
      <Modal
        open={activeModal === 'vehicle'}
        onClose={() => setActiveModal(null)}
        title={de.vehicle.hasVehicle}
      >
        <VehicleSelector
          vehicle={booking.outbound.vehicle}
          onChange={(vehicle) => updateOutbound({ vehicle })}
          onConfirm={() => setActiveModal(null)}
        />
        {booking.tripType === 'roundtrip' && (
          <label className="flex items-center gap-2 text-sm mt-4 cursor-pointer">
            <input
              type="checkbox"
              checked={booking.useSameVehicleForReturn}
              onChange={(e) => updateSearch({ useSameVehicleForReturn: e.target.checked })}
              className="accent-aml-blue"
            />
            {de.vehicle.useSameForReturn}
          </label>
        )}
      </Modal>
    </div>
  )
}
