import { de } from '../../i18n/de'

const steps = [de.steps.search, de.steps.select, de.steps.details]

interface StepperProps {
  currentStep: number
}

export function Stepper({ currentStep }: StepperProps) {
  return (
    <div className="flex items-center justify-center gap-0 w-full max-w-xl mx-auto mb-8">
      {steps.map((step, i) => {
        const stepNum = i + 1
        const isActive = stepNum === currentStep
        const isDone = stepNum < currentStep

        return (
          <div key={step} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors ${
                  isDone
                    ? 'bg-aml-blue border-aml-blue text-white'
                    : isActive
                      ? 'bg-aml-blue border-aml-blue text-white'
                      : 'bg-white border-gray-300 text-gray-400'
                }`}
              >
                {isDone ? '✓' : stepNum}
              </div>
              <span
                className={`text-xs hidden sm:block whitespace-nowrap ${
                  isActive || isDone ? 'text-aml-blue font-semibold' : 'text-gray-400'
                }`}
              >
                {step}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-3 mt-[-16px] sm:mt-0 ${
                  isDone ? 'bg-aml-blue' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
