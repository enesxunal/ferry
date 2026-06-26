import { addDays, format } from 'date-fns'
import { de as deLocale } from 'date-fns/locale'
import type { FerryOffer } from '../types/booking'
import { parseValidISODate } from '../utils/date'
import { operators } from './mockPorts'

const amenitiesPool = [
  'Restaurant',
  'Bar',
  'WLAN',
  'Klimaanlage',
  'Haustierfreundlich',
]

function hashDate(date: string): number {
  return date.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
}

function generateOffers(
  from: string,
  to: string,
  date: string,
  leg: 'outbound' | 'return',
): FerryOffer[] {
  const seed = hashDate(`${from}-${to}-${date}-${leg}`)
  const times = ['07:00', '09:00', '12:30', '16:00', '19:30', '22:00']
  const durations = ['1h 00m', '1h 30m', '5h 30m', '6h 15m', '9h 00m']

  return Array.from({ length: 4 }, (_, i) => {
    const depHour = times[(seed + i) % times.length]
    const [h, m] = depHour.split(':').map(Number)
    const durMins = [60, 90, 330, 375, 540][(seed + i) % 5]
    const arrTotal = h * 60 + m + durMins
    const arrH = Math.floor(arrTotal / 60) % 24
    const arrM = arrTotal % 60
    const operator = operators[(seed + i) % operators.length]
    const basePrice = 120 + ((seed + i * 17) % 80)

    const embH = h > 0 ? h - 1 : 23
    const embarkationTime = `${String(embH).padStart(2, '0')}:${String(m).padStart(2, '0')}`

    return {
      id: `${leg}-${i}-${date}`,
      operator,
      operatorLogo: operator.slice(0, 2).toUpperCase(),
      departurePort: from,
      arrivalPort: to,
      departureTime: depHour,
      arrivalTime: `${String(arrH).padStart(2, '0')}:${String(arrM).padStart(2, '0')}`,
      embarkationTime,
      duration: durations[(seed + i) % durations.length],
      shipName: `${operator} ${['Express', 'Star', 'Nova'][i % 3]}`,
      price: basePrice + i * 22,
      currency: 'EUR',
      leg,
      amenities: amenitiesPool.slice(0, 3 + (i % 2)),
      available: true,
      tariffLabel: 'Flexibel/Nicht erstattbar',
    }
  })
}

export function searchFerries(
  outboundFrom: string,
  outboundTo: string,
  outboundDate: string,
  returnFrom: string,
  returnTo: string,
  returnDate: string,
  tripType: 'roundtrip' | 'oneway',
): { outbound: FerryOffer[]; return: FerryOffer[] } {
  const hasOutbound = outboundFrom && outboundTo && parseValidISODate(outboundDate)
  const hasReturn =
    tripType === 'oneway' || (returnFrom && returnTo && parseValidISODate(returnDate))
  if (!hasOutbound || !hasReturn) return { outbound: [], return: [] }

  const outbound = generateOffers(outboundFrom, outboundTo, outboundDate, 'outbound')
  const returnOffers =
    tripType === 'roundtrip'
      ? generateOffers(returnFrom, returnTo, returnDate, 'return')
      : []

  return { outbound, return: returnOffers }
}

export function getLowestPriceForDate(
  from: string,
  to: string,
  date: string,
  leg: 'outbound' | 'return',
): number {
  const offers = generateOffers(from, to, date, leg)
  return Math.min(...offers.map((o) => o.price))
}

export function getPortName(portId: string, portList: { id: string; name: string }[]): string {
  return portList.find((p) => p.id === portId)?.name ?? portId
}

export function formatGermanDate(dateStr: string): string {
  const date = parseValidISODate(dateStr)
  return date ? format(date, 'dd/MM/yyyy') : ''
}

export function formatGermanDateShort(dateStr: string): string {
  const date = parseValidISODate(dateStr)
  return date ? format(date, 'dd.MM.yyyy') : ''
}

export function formatGermanDayDate(dateStr: string): string {
  const date = parseValidISODate(dateStr)
  return date ? format(date, 'EEEE dd MMMM', { locale: deLocale }) : ''
}

export function getDateRange(centerDate: string, range = 3): string[] {
  const center = parseValidISODate(centerDate)
  if (!center) return []
  return Array.from({ length: range * 2 + 1 }, (_, i) =>
    format(addDays(center, i - range), 'yyyy-MM-dd'),
  )
}
