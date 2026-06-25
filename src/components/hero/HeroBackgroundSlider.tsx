import { useEffect, useState } from 'react'

const slides = [
  { src: '/hero/slide-1.jpg', alt: 'Ferry at sea' },
  { src: '/hero/slide-2.jpg', alt: 'Mediterranean harbour' },
  { src: '/hero/slide-3.jpg', alt: 'Coastal ferry route' },
]

const INTERVAL_MS = 5000

export function HeroBackgroundSlider() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length)
    }, INTERVAL_MS)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {slides.map((slide, i) => (
        <div
          key={slide.src}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
            i === active ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url(${slide.src})` }}
          role="img"
          aria-label={slide.alt}
        />
      ))}

      {/* Overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-aml-blue/40" />
      <div className="absolute inset-0 bg-aml-blue/20" />

      {/* Dots */}
      <div className="absolute bottom-4 right-4 md:right-8 flex gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Slide ${i + 1}`}
            className={`h-2 rounded-full transition-all ${
              i === active ? 'w-6 bg-aml-yellow' : 'w-2 bg-white/70 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
