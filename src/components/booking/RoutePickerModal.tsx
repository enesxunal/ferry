import { Anchor, ArrowRight } from '@phosphor-icons/react'
import { useEffect, useRef, useState } from 'react'
import { getPortLabel, popularRoutes } from '../../data/mockPorts'
import { de } from '../../i18n/de'

interface RoutePickerDropdownProps {
  open: boolean
  onClose: () => void
  from: string
  to: string
  onSelect: (from: string, to: string) => void
}

export function RoutePickerDropdown({
  open,
  onClose,
  from,
  to,
  onSelect,
}: RoutePickerDropdownProps) {
  const [query, setQuery] = useState('')
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose()
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open, onClose])

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
    <div
      ref={ref}
      className="absolute top-full left-0 right-0 mt-1 z-50 bg-white rounded-lg shadow-xl border border-gray-200"
    >
      <div className="p-3 border-b">
        <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
          <Anchor className="w-4 h-4 text-aml-blue shrink-0" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Geben Sie einen Hafen oder ein Ziel ein"
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
      <ul className="max-h-56 overflow-y-auto">
        {filtered.map((route) => (
          <li key={route.id}>
            <button
              type="button"
              onClick={() => {
                onSelect(route.from, route.to)
                onClose()
              }}
              className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-blue-50 text-sm border-b border-gray-50 text-left"
            >
              <span className="text-gray-700 text-xs sm:text-sm truncate">{getPortLabel(route.from)}</span>
              <ArrowRight className="w-3.5 h-3.5 text-aml-blue mx-1 shrink-0" />
              <span className="text-gray-700 text-xs sm:text-sm truncate">{getPortLabel(route.to)}</span>
            </button>
          </li>
        ))}
      </ul>
      {filtered.length === 0 && (
        <p className="p-3 text-sm text-gray-500 text-center">Keine Strecken gefunden</p>
      )}
    </div>
  )
}

export function RouteFieldButton({
  label,
  sublabel,
  value,
  onClick,
  icon,
  active,
}: {
  label: string
  sublabel: string
  value: string
  onClick: () => void
  icon: React.ReactNode
  active?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex items-start gap-3 border rounded-lg px-4 py-3 text-left transition-colors bg-white ${
        active
          ? 'border-aml-blue ring-2 ring-aml-blue/20'
          : 'border-gray-200 hover:border-aml-blue'
      }`}
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
