import type { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <input
        className={`w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm focus:border-aml-blue focus:outline-none focus:ring-2 focus:ring-aml-blue/20 ${error ? 'border-aml-red' : ''} ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-aml-red">{error}</span>}
    </div>
  )
}
