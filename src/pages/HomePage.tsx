import { BookingStepperGuide } from '../components/booking/BookingStepperGuide'
import { BookingWidget } from '../components/booking/BookingWidget'
import { ExcursionsSection } from '../components/home/ExcursionsSection'
import { HeroBanner } from '../components/home/HeroBanner'
import { TopDestinationsSection } from '../components/home/TopDestinationsSection'

export function HomePage() {
  return (
    <div>
      <section className="relative min-h-[580px] overflow-hidden bg-white md:min-h-[620px]">
        <HeroBanner />

        <div className="relative z-10 mx-auto max-w-6xl px-4 py-8 md:py-10">
          <BookingWidget />
        </div>
      </section>

      <TopDestinationsSection />

      <ExcursionsSection />

      <BookingStepperGuide />
    </div>
  )
}
