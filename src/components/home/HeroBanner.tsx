export function HeroBanner() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-white">
      <img
        src="/ferry-images-banner.png"
        alt=""
        aria-hidden="true"
        className="h-full w-full object-cover object-left"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none" />
    </div>
  )
}
