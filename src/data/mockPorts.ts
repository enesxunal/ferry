import type { Port } from '../types/booking'

export const ports: Port[] = [
  { id: 'algeciras', name: 'Algeciras', country: 'Spanien' },
  { id: 'ceuta', name: 'Ceuta', country: 'Spanien' },
  { id: 'tarifa', name: 'Tarifa', country: 'Spanien' },
  { id: 'tanger', name: 'Tanger', country: 'Marokko' },
  { id: 'nador', name: 'Nador', country: 'Marokko' },
  { id: 'alhoceima', name: 'Al Hoceima', country: 'Marokko' },
  { id: 'motril', name: 'Motril', country: 'Spanien' },
  { id: 'almeria', name: 'Almería', country: 'Spanien' },
  { id: 'barcelona', name: 'Barcelona', country: 'Spanien' },
  { id: 'palermo', name: 'Palermo', country: 'Italien' },
  { id: 'genoa', name: 'Genua', country: 'Italien' },
  { id: 'civitavecchia', name: 'Civitavecchia', country: 'Italien' },
  { id: 'naples', name: 'Neapel', country: 'Italien' },
  { id: 'marseille', name: 'Marseille', country: 'Frankreich' },
  { id: 'sete', name: 'Sète', country: 'Frankreich' },
  { id: 'tunis', name: 'Tunis', country: 'Tunesien' },
  { id: 'split', name: 'Split', country: 'Kroatien' },
  { id: 'bastia', name: 'Bastia', country: 'Frankreich' },
  { id: 'cagliari', name: 'Cagliari', country: 'Italien' },
  { id: 'olbia', name: 'Olbia', country: 'Italien' },
]

export interface RouteOption {
  id: string
  from: string
  to: string
  label: string
}

export const popularRoutes: RouteOption[] = [
  { id: 'alg-ceu', from: 'algeciras', to: 'ceuta', label: 'Algeciras - Ceuta' },
  { id: 'ceu-alg', from: 'ceuta', to: 'algeciras', label: 'Ceuta - Algeciras' },
  { id: 'alg-tan', from: 'algeciras', to: 'tanger', label: 'Algeciras - Tanger' },
  { id: 'tar-tan', from: 'tarifa', to: 'tanger', label: 'Tarifa - Tanger' },
  { id: 'aho-mot', from: 'alhoceima', to: 'motril', label: 'Al Hoceima - Motril' },
  { id: 'mot-aho', from: 'motril', to: 'alhoceima', label: 'Motril - Al Hoceima' },
  { id: 'nad-bar', from: 'nador', to: 'barcelona', label: 'Nador - Barcelona' },
  { id: 'bar-pal', from: 'barcelona', to: 'palermo', label: 'Barcelona - Palermo' },
  { id: 'gen-pal', from: 'genoa', to: 'palermo', label: 'Genua - Palermo' },
  { id: 'civ-olo', from: 'civitavecchia', to: 'olbia', label: 'Civitavecchia - Olbia' },
  { id: 'mar-tun', from: 'marseille', to: 'tunis', label: 'Marseille - Tunis' },
  { id: 'sete-bar', from: 'sete', to: 'barcelona', label: 'Sète - Barcelona' },
]

export const vehicleTypes = [
  { id: 'car', label: 'Auto' },
  { id: 'camper', label: 'Wohnmobil' },
  { id: 'minibus', label: 'Minibus' },
  { id: 'truck', label: 'LKW' },
  { id: 'motorcycle', label: 'Motorrad' },
  { id: 'bicycle', label: 'Fahrrad' },
  { id: 'bus', label: 'Bus' },
]

export const trailerTypes = [
  { id: '', label: 'Kein Anhänger' },
  { id: 'trailer', label: 'Anhänger' },
  { id: 'caravan', label: 'Wohnwagen' },
]

export const familyDiscounts = [
  { id: 'none', label: 'Nein' },
  { id: 'general', label: 'Familia numerosa general' },
  { id: 'special', label: 'Familia numerosa especial' },
]

export const operators = [
  'Baleària',
  'FRS',
  'Armas',
  'Grimaldi Lines',
  'GNV',
  'AML',
  'Corsica Ferries',
]

export function getPortLabel(portId: string): string {
  const port = ports.find((p) => p.id === portId)
  return port ? `${port.name}, ${port.country}` : portId
}

export function getRouteLabel(from: string, to: string): string {
  const route = popularRoutes.find((r) => r.from === from && r.to === to)
  if (route) return route.label
  const fromPort = ports.find((p) => p.id === from)
  const toPort = ports.find((p) => p.id === to)
  if (fromPort && toPort) return `${fromPort.name} - ${toPort.name}`
  return ''
}
