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
  mainImage: '/destinations/main.jpg',
  featured: {
    id: 'tangier',
    name: 'Tanger',
    image: '/destinations/tangier.jpg',
    priceFrom: 70,
    currency: 'EUR',
  } satisfies TopDestination,
  secondary: {
    id: 'ceuta',
    name: 'Ceuta',
    image: '/destinations/ceuta.jpg',
  } satisfies TopDestination,
}
