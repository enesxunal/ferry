import { IconContext } from '@phosphor-icons/react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { BookingProvider } from './context/BookingContext'
import { BookingRouteGuard } from './components/booking/BookingRouteGuard'
import { Layout } from './components/layout/Layout'
import { HomePage } from './pages/HomePage'
import { SearchResultsPage } from './pages/SearchResultsPage'
import { BookingDetailsPage } from './pages/BookingDetailsPage'
import { PaymentPage } from './pages/PaymentPage'
import { ConfirmationPage } from './pages/ConfirmationPage'

export default function App() {
  return (
    <BookingProvider>
      <IconContext.Provider value={{ weight: 'duotone' }}>
        <BrowserRouter>
          <BookingRouteGuard>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/results" element={<SearchResultsPage />} />
                <Route path="/booking" element={<BookingDetailsPage />} />
                <Route path="/payment" element={<PaymentPage />} />
                <Route path="/confirmation" element={<ConfirmationPage />} />
              </Route>
            </Routes>
          </BookingRouteGuard>
        </BrowserRouter>
      </IconContext.Provider>
    </BookingProvider>
  )
}
