import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { defaultFullBooking } from '../data/defaults'
import type { BookingSearch, FerryOffer, FullBooking, PassengerInfo } from '../types/booking'

interface BookingContextValue {
  booking: FullBooking
  updateSearch: (search: Partial<BookingSearch>) => void
  updateOutbound: (data: Partial<BookingSearch['outbound']>) => void
  updateReturnLeg: (data: Partial<BookingSearch['returnLeg']>) => void
  selectFerry: (ferry: FerryOffer) => void
  setPassengers: (passengers: PassengerInfo[]) => void
  updateContact: (contact: Partial<FullBooking['contact']>) => void
  completeBooking: () => string
  resetBooking: () => void
  clearFerrySelection: (leg: 'outbound' | 'return' | 'all') => void
}

const BookingContext = createContext<BookingContextValue | null>(null)

export function BookingProvider({ children }: { children: ReactNode }) {
  const [booking, setBooking] = useState<FullBooking>(defaultFullBooking)

  const updateSearch = useCallback((search: Partial<BookingSearch>) => {
    setBooking((prev) => ({ ...prev, ...search }))
  }, [])

  const updateOutbound = useCallback((data: Partial<BookingSearch['outbound']>) => {
    setBooking((prev) => ({
      ...prev,
      outbound: { ...prev.outbound, ...data },
    }))
  }, [])

  const updateReturnLeg = useCallback((data: Partial<BookingSearch['returnLeg']>) => {
    setBooking((prev) => ({
      ...prev,
      returnLeg: { ...prev.returnLeg, ...data },
    }))
  }, [])

  const selectFerry = useCallback((ferry: FerryOffer) => {
    setBooking((prev) => ({
      ...prev,
      selectedFerries: {
        ...prev.selectedFerries,
        [ferry.leg === 'outbound' ? 'outbound' : 'return']: ferry,
      },
    }))
  }, [])

  const setPassengers = useCallback((passengers: PassengerInfo[]) => {
    setBooking((prev) => ({ ...prev, passengers }))
  }, [])

  const updateContact = useCallback((contact: Partial<FullBooking['contact']>) => {
    setBooking((prev) => ({
      ...prev,
      contact: { ...prev.contact, ...contact },
    }))
  }, [])

  const completeBooking = useCallback(() => {
    const ref = `FB-${Date.now().toString(36).toUpperCase()}`
    setBooking((prev) => ({ ...prev, bookingReference: ref }))
    return ref
  }, [])

  const resetBooking = useCallback(() => {
    setBooking(defaultFullBooking())
  }, [])

  const clearFerrySelection = useCallback((leg: 'outbound' | 'return' | 'all') => {
    setBooking((prev) => {
      if (leg === 'all') {
        return { ...prev, selectedFerries: { outbound: null, return: null } }
      }
      return {
        ...prev,
        selectedFerries: { ...prev.selectedFerries, [leg]: null },
      }
    })
  }, [])

  const value = useMemo(
    () => ({
      booking,
      updateSearch,
      updateOutbound,
      updateReturnLeg,
      selectFerry,
      setPassengers,
      updateContact,
      completeBooking,
      resetBooking,
      clearFerrySelection,
    }),
    [
      booking,
      updateSearch,
      updateOutbound,
      updateReturnLeg,
      selectFerry,
      setPassengers,
      updateContact,
      completeBooking,
      resetBooking,
      clearFerrySelection,
    ],
  )

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
}

export function useBooking() {
  const ctx = useContext(BookingContext)
  if (!ctx) throw new Error('useBooking must be used within BookingProvider')
  return ctx
}
