import { Anchor, List } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import { de } from '../../i18n/de'

export function Header() {
  return (
    <header className="bg-aml-blue text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Anchor className="w-7 h-7 text-aml-yellow" />
          <span className="text-xl font-bold tracking-tight">{de.siteName}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <a href="#" className="hover:text-aml-yellow transition-colors">
            {de.nav.destinations}
          </a>
          <a href="#" className="hover:text-aml-yellow transition-colors">
            {de.nav.freight}
          </a>
          <a href="#" className="hover:text-aml-yellow transition-colors">
            {de.nav.account}
          </a>
          <a href="#" className="hover:text-aml-yellow transition-colors">
            {de.nav.help}
          </a>
        </nav>

        <button type="button" className="md:hidden p-2">
          <List className="w-6 h-6" />
        </button>
      </div>
    </header>
  )
}
