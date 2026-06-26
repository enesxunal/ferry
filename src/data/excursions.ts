import {
  Boat,
  Bus,
  Check,
  ForkKnife,
  Ticket,
  User,
  Van,
} from '@phosphor-icons/react'
import type { Icon } from '@phosphor-icons/react'

interface ExcursionFeature {
  icon: Icon
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
    features: [{ icon: Boat, text: 'Fähre ab Tarifa' }],
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
      { icon: Boat, text: 'Fähre ab Tarifa' },
      { icon: Bus, text: 'Transfers' },
      { icon: User, text: 'Geführte Tour' },
      { icon: ForkKnife, text: 'Mittagessen' },
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
      { icon: Boat, text: 'Fähre ab Tarifa' },
      { icon: Van, text: 'VIP Transfers' },
      { icon: Ticket, text: 'Exklusive Tour (bis 6 Personen)' },
      { icon: ForkKnife, text: 'Mittagessen' },
      { icon: Check, text: 'VIP Erlebnis' },
    ],
    priceFrom: 180,
    currency: 'EUR',
  },
]
