export type TripType = 'roundtrip' | 'oneway'

export interface Port {
  id: string
  name: string
  country: string
}

export interface PassengerCounts {
  adults: number
  youths: number
  seniors: number
  children: number
  infants: number
  pets: number
}

export interface VehicleData {
  hasVehicle: boolean
  type: string
  quantity: number
  make: string
  model: string
  brandModel: string
  licensePlate: string
  length: number | ''
  height: number | ''
  width: number | ''
  trailer: string
  trailerLength: number | ''
  trailerHeight: number | ''
  bicycles: number
}

export interface TravelDetails {
  familyDiscount: string
  residentTariff: boolean
}

export interface LegBooking {
  routeFrom: string
  routeTo: string
  date: string
  travelDetails: TravelDetails
  passengers: PassengerCounts
  childAges: number[]
  vehicle: VehicleData
}

export interface BookingSearch {
  tripType: TripType
  outbound: LegBooking
  returnLeg: LegBooking
  useSamePassengersForReturn: boolean
  useSameVehicleForReturn: boolean
  discountCode: string
}

export interface FerryOffer {
  id: string
  operator: string
  operatorLogo: string
  departurePort: string
  arrivalPort: string
  departureTime: string
  arrivalTime: string
  embarkationTime: string
  duration: string
  shipName: string
  price: number
  currency: string
  leg: 'outbound' | 'return'
  amenities: string[]
  available: boolean
  tariffLabel: string
}

export interface PassengerInfo {
  type: 'adult' | 'youth' | 'senior' | 'child' | 'infant'
  firstName: string
  lastName: string
  gender: string
  birthPlace: string
  birthDate: string
  nationality: string
  documentType: string
  documentNumber: string
  documentExpiry: string
}

export interface ContactInfo {
  email: string
  phone: string
  confirmEmail: string
}

export interface SelectedFerries {
  outbound: FerryOffer | null
  return: FerryOffer | null
}

export interface FullBooking extends BookingSearch {
  selectedFerries: SelectedFerries
  passengers: PassengerInfo[]
  contact: ContactInfo
  bookingReference?: string
}
