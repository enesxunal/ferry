import {
  Bus,
  Check,
  Ship,
  Ticket,
  Utensils,
  User,
  Van,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface ExcursionFeature {
  icon: LucideIcon
  text: string
}

export interface Excursion {
  id: string
  image: string
  badge?: string
  category: string
  title: string
  features: ExcursionFeature[]
  priceFrom: number
  currency: string
}

export const excursions: Excursion[] = [
  {
    id: 'free-day',
    image: '/excursions/excursion-1.jpg',
    category: 'HIN- UND RÜCKFAHRT NACH TANGER',
    title: 'Auf eigene Faust',
    features: [{ icon: Ship, text: 'Fähre ab Tarifa' }],
    priceFrom: 76,
    currency: 'EUR',
  },
  {
    id: 'wonders',
    image: '/excursions/excursion-2.jpg',
    badge: 'Reisen ohne Reisepass',
    category: 'TAGESAUSFLÜGE',
    title: 'Wunder von Tanger',
    features: [
      { icon: Ship, text: 'Fähre ab Tarifa' },
      { icon: Bus, text: 'Transfers' },
      { icon: User, text: 'Geführte Tour' },
      { icon: Utensils, text: 'Mittagessen' },
    ],
    priceFrom: 89,
    currency: 'EUR',
  },
  {
    id: 'vip',
    image: '/excursions/excursion-3.jpg',
    badge: 'VIP Erlebnis',
    category: 'TAGESAUSFLÜGE',
    title: 'VIP Tagesausflug',
    features: [
      { icon: Ship, text: 'Fähre ab Tarifa' },
      { icon: Van, text: 'VIP Transfers' },
      { icon: Ticket, text: 'Exklusive Tour (bis 6 Personen)' },
      { icon: Utensils, text: 'Mittagessen' },
      { icon: Check, text: 'VIP Erlebnis' },
    ],
    priceFrom: 180,
    currency: 'EUR',
  },
]
