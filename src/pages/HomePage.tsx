import { Star } from '@phosphor-icons/react'
import { BookingWidget } from '../components/booking/BookingWidget'
import { ExcursionsSection } from '../components/home/ExcursionsSection'
import { HeroBanner } from '../components/home/HeroBanner'
import { TopDestinationsSection } from '../components/home/TopDestinationsSection'

const reviews = [
  { name: 'Oliver', text: 'Gute Menüführung' },
  { name: 'Holger', text: 'Alles schnell und einwandfrei funktioniert' },
  { name: 'Vincenzo', text: 'alles super' },
]

export function HomePage() {
  return (
    <div>
      <section className="relative min-h-[580px] md:min-h-[620px] overflow-hidden bg-white">
        <HeroBanner />

        <div className="relative z-10 max-w-6xl mx-auto px-4 py-8 md:py-10">
          <BookingWidget />
        </div>
      </section>

      <TopDestinationsSection />

      <ExcursionsSection />

      <section className="bg-white border-t border-gray-100 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-6">
            <div>
              <p className="text-2xl font-bold text-aml-blue">4,82/5</p>
              <div className="flex gap-0.5 my-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-aml-yellow text-aml-yellow" />
                ))}
              </div>
              <p className="text-sm text-gray-500">Basierend auf 53195 Bewertungen</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((r) => (
              <div key={r.name} className="text-center md:text-left">
                <p className="font-semibold text-gray-800">{r.name}</p>
                <div className="flex gap-0.5 justify-center md:justify-start my-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-aml-yellow text-aml-yellow" />
                  ))}
                </div>
                <p className="text-sm text-gray-600">{r.text}</p>
                <a href="#" className="text-sm text-aml-blue hover:underline mt-1 inline-block">
                  Alle Bewertungen anzeigen
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
