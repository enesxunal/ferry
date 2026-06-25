import { X } from 'lucide-react'
import type { ReactNode } from 'react'

interface FormPanelProps {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
  footer?: ReactNode
}

/** Overlay panel anchored on the booking form card (Mr Ferry style). */
export function FormPanel({ open, onClose, title, children, footer }: FormPanelProps) {
  if (!open) return null

  return (
    <div className="absolute inset-0 z-30 bg-white rounded-2xl flex flex-col shadow-lg border border-gray-200">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 shrink-0">
        <h3 className="text-sm font-semibold text-aml-blue">{title}</h3>
        <button
          type="button"
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 p-1"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-3">{children}</div>
      {footer && <div className="shrink-0 px-4 pb-4 pt-2 border-t border-gray-100">{footer}</div>}
    </div>
  )
}
