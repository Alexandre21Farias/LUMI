import { useState, useEffect } from 'react'

interface Location {
  latitude: number | null
  longitude: number | null
  error: string | null
  loading: boolean
}

export function useGeolocation() {
  const [location, setLocation] = useState<Location>({
    latitude: null,
    longitude: null,
    error: null,
    loading: true,
  })

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      setLocation((prev) => ({
        ...prev,
        error: 'Geolocalização não suportada no seu navegador',
        loading: false,
      }))
      return
    }

    const successHandler = (position: GeolocationPosition) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        error: null,
        loading: false,
      })
    }

    const errorHandler = (error: GeolocationPositionError) => {
      setLocation((prev) => ({
        ...prev,
        error: error.message,
        loading: false,
      }))
    }

    // Try to get high accuracy position
    navigator.geolocation.getCurrentPosition(successHandler, errorHandler, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    })

    // Subscribe to continuous updates
    const watcher = navigator.geolocation.watchPosition(successHandler, errorHandler, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    })

    return () => navigator.geolocation.clearWatch(watcher)
  }, [])

  return location
}
