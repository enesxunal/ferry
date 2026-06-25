import { Anchor, ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { getPortLabel, popularRoutes } from '../../data/mockPorts'
import { de } from '../../i18n/de'

interface RoutePickerProps {
  open: boolean
  onClose: () => void
  from: string
  to: string
  onSelect: (from: string, to: string) => void
  isReturn?: boolean
}

export function RoutePickerModal({
  open,
  onClose,
  from,
  to,
  onSelect,
  isReturn,
}: RoutePickerProps) {
  const [query, setQuery] = useState('')

  if (!open) return null

  const filtered = popularRoutes.filter((r) => {
    const q = query.toLowerCase()
    return (
      r.label.toLowerCase().includes(q) ||
      getPortLabel(r.from).toLowerCase().includes(q) ||
      getPortLabel(r.to).toLowerCase().includes(q)
    )
  })

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 p-4">
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-md border border-gray-200">
        <div className="p-4 border-b">
          <div className="flex items-center gap-3 border rounded-lg px-3 py-2.5">
            <Anchor className="w-5 h-5 text-aml-blue shrink-0" />
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={
                isReturn
                  ? 'Geben Sie einen Hafen oder ein Ziel ein'
                  : 'Geben Sie einen Hafen oder ein Ziel ein'
              }
              className="flex-1 text-sm outline-none"
            />
          </div>
          {(from || to) && (
            <p className="text-xs text-gray-500 mt-2">
              {de.route.selectFrom}: {from ? getPortLabel(from) : '—'} →{' '}
              {to ? getPortLabel(to) : '—'}
            </p>
          )}
        </div>
        <ul className="max-h-72 overflow-y-auto">
          {filtered.map((route) => (
            <li key={route.id}>
              <button
                type="button"
                onClick={() => {
                  onSelect(route.from, route.to)
                  onClose()
                }}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-blue-50 text-sm border-b border-gray-50"
              >
                <span className="text-gray-700">{getPortLabel(route.from)}</span>
                <ArrowRight className="w-4 h-4 text-aml-blue mx-2 shrink-0" />
                <span className="text-gray-700">{getPortLabel(route.to)}</span>
              </button>
            </li>
          ))}
        </ul>
        {filtered.length === 0 && (
          <p className="p-4 text-sm text-gray-500 text-center">Keine Strecken gefunden</p>
        )}
      </div>
    </div>
  )
}

export function RouteFieldButton({
  label,
  sublabel,
  value,
  onClick,
  icon,
}: {
  label: string
  sublabel: string
  value: string
  onClick: () => void
  icon: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-start gap-3 border border-gray-200 rounded-lg px-4 py-3 text-left hover:border-aml-blue/50 transition-colors bg-white"
    >
      <span className="text-aml-blue mt-0.5 shrink-0">{icon}</span>
      <div className="min-w-0">
        <p className="text-xs text-aml-blue font-medium">{label}</p>
        <p className={`text-sm truncate ${value ? 'text-gray-900 font-medium' : 'text-gray-400'}`}>
          {value || sublabel}
        </p>
      </div>
    </button>
  )
}
