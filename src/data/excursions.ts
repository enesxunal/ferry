import {
  Boat,
  Bus,
  Camera,
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

export const excursionsSection = {
  title: 'Beliebte Ausflüge',
  subtitle: 'Entdecken Sie unsere schönsten Destinationen an der Mittelmeerküste',
}

export const excursions: Excursion[] = [
  {
    id: 'palma',
    image: '/ferry-images-4.png',
    category: 'BALEAREN',
    title: 'Palma de Mallorca',
    features: [
      { icon: Boat, text: 'Fähre ab Barcelona' },
      { icon: Camera, text: 'Kathedrale & Altstadt' },
      { icon: Bus, text: 'Hafen-Transfer inklusive' },
    ],
    priceFrom: 49,
    currency: 'EUR',
  },
  {
    id: 'nador',
    image: '/ferry-images-5.png',
    badge: 'Marokko entdecken',
    category: 'KÜSTENROUTEN',
    title: 'Nador & Mittelmeerküste',
    features: [
      { icon: Boat, text: 'Fähre ab Almería' },
      { icon: User, text: 'Geführte Küstentour' },
      { icon: ForkKnife, text: 'Lokale Küche' },
    ],
    priceFrom: 62,
    currency: 'EUR',
  },
  {
    id: 'ibiza',
    image: '/ferry-images-6.png',
    badge: 'Insel-Hopping',
    category: 'TAGESAUSFLÜGE',
    title: 'Ibiza Altstadt & Buchten',
    features: [
      { icon: Boat, text: 'Fähre ab Valencia' },
      { icon: Van, text: 'Shuttle zum Hafen' },
      { icon: Ticket, text: 'Dalt Vila Eintritt' },
      { icon: Check, text: 'Ganztägiger Ausflug' },
    ],
    priceFrom: 55,
    currency: 'EUR',
  },
]
