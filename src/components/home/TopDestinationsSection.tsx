import { ArrowRight } from '@phosphor-icons/react'
import { topDestinations } from '../../data/topDestinations'

export function TopDestinationsSection() {
  const { title, subtitle, main, featured, secondary } = topDestinations

  return (
    <section className="bg-white py-12 md:py-16 border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8 md:mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{title}</h2>
          <p className="text-gray-600 text-sm md:text-base max-w-2xl">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-4 md:gap-5 min-h-[420px]">
          {/* Large left — Barcelona */}
          <div className="md:row-span-2 relative rounded-2xl overflow-hidden min-h-[280px] md:min-h-0 group">
            <img
              src={main.image}
              alt={main.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between gap-3">
              <div className="text-white">
                <h3 className="text-3xl md:text-4xl font-bold">{main.name}</h3>
                {main.priceFrom && (
                  <p className="text-white/90 text-sm mt-1">
                    Ab{' '}
                    <span className="text-xl font-bold">{main.priceFrom} €</span>
                  </p>
                )}
              </div>
              <a
                href="#"
                className="inline-flex items-center gap-1.5 bg-aml-yellow hover:bg-aml-yellow-dark text-white text-sm font-semibold px-4 py-2.5 rounded-full transition-colors shrink-0"
              >
                Entdecken
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Tanger */}
          <div className="relative rounded-2xl overflow-hidden min-h-[200px]">
            <img
              src={featured.image}
              alt={featured.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between gap-3">
              <div className="text-white">
                <h3 className="text-2xl md:text-3xl font-bold">{featured.name}</h3>
                {featured.priceFrom && (
                  <p className="text-white/90 text-sm mt-1">
                    Ab{' '}
                    <span className="text-lg font-bold">{featured.priceFrom} €</span>
                  </p>
                )}
              </div>
              <a
                href="#"
                className="inline-flex items-center gap-1.5 bg-aml-yellow hover:bg-aml-yellow-dark text-white text-sm font-semibold px-4 py-2.5 rounded-full transition-colors shrink-0"
              >
                Entdecken
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Tunis */}
          <div className="relative rounded-2xl overflow-hidden min-h-[200px] group">
            <img
              src={secondary.image}
              alt={secondary.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between gap-3">
              <div className="text-white">
                <h3 className="text-xl md:text-2xl font-bold">{secondary.name}</h3>
                {secondary.priceFrom && (
                  <p className="text-white/90 text-sm mt-1">
                    Ab{' '}
                    <span className="text-lg font-bold">{secondary.priceFrom} €</span>
                  </p>
                )}
              </div>
              <a
                href="#"
                className="inline-flex items-center gap-1.5 bg-aml-yellow hover:bg-aml-yellow-dark text-white text-sm font-semibold px-4 py-2.5 rounded-full transition-colors shrink-0"
              >
                Entdecken
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
