import { ChevronDown } from 'lucide-react'
import { useState, type ReactNode } from 'react'

interface AccordionSectionProps {
  title: string
  subtitle?: string
  icon?: ReactNode
  defaultOpen?: boolean
  completed?: boolean
  children: ReactNode
}

export function AccordionSection({
  title,
  subtitle,
  icon,
  defaultOpen = false,
  completed = false,
  children,
}: AccordionSectionProps) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          {icon && <span className="text-aml-blue">{icon}</span>}
          <div>
            <h3 className="font-semibold text-aml-blue text-base">{title}</h3>
            {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
          </div>
          {completed && (
            <span className="ml-2 text-xs bg-aml-green text-white px-2 py-0.5 rounded-full">
              ✓
            </span>
          )}
        </div>
        <ChevronDown
          className={`w-5 h-5 text-aml-blue transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && <div className="px-5 pb-5 border-t border-gray-100">{children}</div>}
    </div>
  )
}
