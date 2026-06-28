import { Check } from '@phosphor-icons/react'
import boatIcon from '../../assets/boat.svg'
import calendarIcon from '../../assets/calender.svg'
import passengerIcon from '../../assets/passenger.svg'
import arrowsIcon from '../../assets/pfeile.svg'
import searchIcon from '../../assets/loope.svg'
import ticketIcon from '../../assets/checkout-ticket.svg'

type StepStatus = 'done' | 'active' | 'pending'

interface BookingStepperStep {
  title: string
  icon: string
  status: StepStatus
}

const steps: BookingStepperStep[] = [
  { title: 'Fahrtart wählen', icon: boatIcon, status: 'done' },
  { title: 'Reisedatum wählen', icon: calendarIcon, status: 'done' },
  { title: 'Hin- & Rückfahrt prüfen', icon: arrowsIcon, status: 'done' },
  { title: 'Reisedetails prüfen', icon: passengerIcon, status: 'active' },
  { title: 'Preise vergleichen', icon: searchIcon, status: 'pending' },
  { title: 'Buchung abschließen', icon: ticketIcon, status: 'pending' },
]

const statusClasses: Record<StepStatus, { icon: string; title: string; marker: string }> = {
  done: {
    icon: 'border-aml-blue bg-aml-blue-muted shadow-sm',
    title: 'text-aml-blue',
    marker: 'bg-aml-blue text-white',
  },
  active: {
    icon: 'border-aml-blue bg-white shadow-md ring-4 ring-aml-blue-light/20',
    title: 'text-aml-blue-dark',
    marker: 'bg-aml-blue-light text-aml-blue-dark',
  },
  pending: {
    icon: 'border-sky-100 bg-white shadow-sm',
    title: 'text-gray-500',
    marker: 'bg-white text-gray-400 ring-1 ring-sky-100',
  },
}

export function BookingStepperGuide() {
  return (
    <section className="bg-white border-t border-gray-100 py-8 md:py-10">
      <div className="mx-auto max-w-6xl px-4">
        <div className="overflow-x-auto pb-2">
          <ol className="relative grid min-w-[820px] grid-cols-6 gap-4 px-2 py-2">
            <span
              aria-hidden="true"
              className="absolute left-[76px] right-[76px] top-[47px] h-0.5 bg-gradient-to-r from-aml-blue via-aml-blue-light to-sky-100"
            />

            {steps.map((step, index) => {
              const classes = statusClasses[step.status]

              return (
                <li key={step.title} className="relative z-10 flex flex-col items-center text-center">
                  <div
                    className={`relative flex h-20 w-20 items-center justify-center rounded-full border-2 ${classes.icon}`}
                  >
                    <img
                      src={step.icon}
                      alt=""
                      aria-hidden="true"
                      className="h-14 w-14 object-contain"
                    />

                    <span
                      className={`absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold ${classes.marker}`}
                    >
                      {step.status === 'done' ? <Check className="h-4 w-4" weight="bold" /> : index + 1}
                    </span>
                  </div>

                  <p className={`mt-3 max-w-[120px] text-sm font-bold leading-tight ${classes.title}`}>
                    {step.title}
                  </p>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
