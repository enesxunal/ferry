export interface TopDestination {
  id: string
  name: string
  image: string
  priceFrom?: number
  currency?: string
  featured?: boolean
}

export const topDestinations = {
  title: 'Top-Reiseziel des Monats',
  subtitle: 'Buchen Sie jetzt und besuchen Sie diese Reiseziele zur besten Jahreszeit',
  main: {
    id: 'barcelona',
    name: 'Barcelona',
    image: '/ferry-images-1.png',
    priceFrom: 94,
    currency: 'EUR',
  } satisfies TopDestination,
  featured: {
    id: 'tangier',
    name: 'Tanger',
    image: '/ferry-images-2.png',
    priceFrom: 70,
    currency: 'EUR',
  } satisfies TopDestination,
  secondary: {
    id: 'tunis',
    name: 'Tunis',
    image: '/ferry-images-3.png',
    priceFrom: 85,
    currency: 'EUR',
  } satisfies TopDestination,
}
