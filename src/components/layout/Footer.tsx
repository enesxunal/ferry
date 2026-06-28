import { de } from '../../i18n/de'

export function Footer() {
  return (
    <footer className="bg-aml-blue text-white/85 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
          <div>
            <h4 className="font-semibold text-white mb-3">Unternehmen</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-aml-yellow transition-colors">
                  {de.footer.about}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-aml-yellow transition-colors">
                  {de.footer.contact}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Rechtliches</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-aml-yellow transition-colors">
                  {de.footer.terms}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-aml-yellow transition-colors">
                  {de.footer.privacy}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Infos</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-aml-yellow transition-colors">
                  {de.footer.faq}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs text-white/50 mt-4">
              © 2026 {de.siteName}. Prototyp mit Mock-Daten.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
