import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useGeolocation } from './useGeolocation'

describe('useGeolocation Hook', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.useRealTimers()
  })

  it('should handle geolocation not supported in browser', async () => {
    // Mock navigator without geolocation
    const originalNavigator = global.navigator
    vi.stubGlobal('navigator', {})

    const { result } = renderHook(() => useGeolocation())

    expect(result.current.loading).toBe(true)

    // Fast-forward timer to trigger state update
    act(() => {
      vi.runAllTimers()
    })

    expect(result.current.loading).toBe(false)
    expect(result.current.error).toBe('Geolocalização não suportada no seu navegador')
    expect(result.current.latitude).toBeNull()
    expect(result.current.longitude).toBeNull()

    vi.stubGlobal('navigator', originalNavigator)
  })

  it('should success on getCurrentPosition', async () => {
    const mockGeolocation = {
      getCurrentPosition: vi.fn().mockImplementation((success) => {
        success({
          coords: {
            latitude: 10,
            longitude: 20,
          },
        })
      }),
      watchPosition: vi.fn(),
      clearWatch: vi.fn(),
    }

    vi.stubGlobal('navigator', {
      geolocation: mockGeolocation,
    })

    const { result } = renderHook(() => useGeolocation())

    expect(result.current.loading).toBe(false)
    expect(result.current.latitude).toBe(10)
    expect(result.current.longitude).toBe(20)
    expect(result.current.error).toBeNull()
  })
})
