import cruiseShipBackground from '../../assets/cruise-ship-background.jpeg'

export function MediterraneanMap() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-sky-100">
      <img
        src={cruiseShipBackground}
        alt=""
        aria-hidden="true"
        className="h-full w-full object-cover object-center"
      />
    </div>
  )
}
