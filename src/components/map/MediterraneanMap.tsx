export function MediterraneanMap() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-sky-100">
      <img
        src="/cruise-ship-background.jpg"
        alt=""
        aria-hidden="true"
        className="h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none" />
    </div>
  )
}
