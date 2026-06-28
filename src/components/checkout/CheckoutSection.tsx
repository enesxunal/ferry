import type { ReactNode } from 'react'

interface CheckoutSectionProps {
  title: string
  subtitle?: string
  children: ReactNode
}

export function CheckoutSection({ title, subtitle, children }: CheckoutSectionProps) {
  return (
    <section className="rounded-xl border border-sky-100 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-4">
        <h2 className="text-sm font-bold text-aml-blue">{title}</h2>
        {subtitle && <p className="mt-1 text-xs text-gray-500">{subtitle}</p>}
      </div>
      {children}
    </section>
  )
}

