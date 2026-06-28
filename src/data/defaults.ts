import type {
  BookingSearch,
  ContactInfo,
  FullBooking,
  LegBooking,
  PassengerInfo,
  SelectedFerries,
  VehicleData,
} from '../types/booking'

export const defaultVehicle = (): VehicleData => ({
  hasVehicle: false,
  type: 'car',
  quantity: 1,
  make: '',
  model: '',
  brandModel: '',
  licensePlate: '',
  length: '',
  height: '',
  width: '',
  trailer: '',
  trailerLength: '',
  trailerHeight: '',
  bicycles: 0,
})

export const defaultLeg = (): LegBooking => ({
  routeFrom: '',
  routeTo: '',
  date: '',
  travelDetails: { familyDiscount: 'none', residentTariff: false },
  passengers: { adults: 1, youths: 0, seniors: 0, children: 0, infants: 0, pets: 0 },
  childAges: [],
  vehicle: defaultVehicle(),
})

export const defaultSearch = (): BookingSearch => ({
  tripType: 'roundtrip',
  outbound: defaultLeg(),
  returnLeg: defaultLeg(),
  useSamePassengersForReturn: true,
  useSameVehicleForReturn: true,
  discountCode: '',
})

export const defaultContact = (): ContactInfo => ({
  email: '',
  phone: '',
  confirmEmail: '',
})

export const defaultSelectedFerries = (): SelectedFerries => ({
  outbound: null,
  return: null,
})

export const defaultPassengers = (): PassengerInfo[] => []

export const defaultFullBooking = (): FullBooking => ({
  ...defaultSearch(),
  selectedFerries: defaultSelectedFerries(),
  passengers: defaultPassengers(),
  contact: defaultContact(),
})
