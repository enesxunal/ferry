import { ArrowRight } from 'lucide-react'
import { excursions } from '../../data/excursions'

export function ExcursionsSection() {
  return (
    <section className="bg-[#f5f6f8] py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-10">
          Entdecken Sie Tanger
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {excursions.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                {item.badge && (
                  <span className="absolute top-3 left-3 bg-white/95 text-xs font-medium text-gray-800 px-3 py-1.5 rounded-full shadow-sm">
                    {item.badge}
                  </span>
                )}
              </div>

              <div className="p-5 flex flex-col flex-1">
                <p className="text-[10px] font-semibold tracking-wider text-gray-500 uppercase mb-1">
                  {item.category}
                </p>
                <h3 className="text-lg font-bold text-gray-900 mb-4">{item.title}</h3>

                <ul className="space-y-2 mb-6 flex-1">
                  {item.features.map((f) => (
                    <li key={f.text} className="flex items-center gap-2 text-sm text-gray-600">
                      <f.icon className="w-4 h-4 text-aml-blue shrink-0" />
                      {f.text}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between gap-3 pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-600">
                    Ab{' '}
                    <span className="text-xl font-bold text-aml-blue">
                      {item.priceFrom} €
                    </span>
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center gap-1 bg-[#e85d2c] hover:bg-[#d4521f] text-white text-sm font-semibold px-4 py-2.5 rounded-md transition-colors shrink-0"
                  >
                    Entdecken
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="text-center mt-8">
          <a
            href="#"
            className="text-aml-blue font-medium hover:underline inline-flex items-center gap-1"
          >
            Alle Ausflüge anzeigen
            <ArrowRight className="w-4 h-4" />
          </a>
        </p>
      </div>
    </section>
  )
}
