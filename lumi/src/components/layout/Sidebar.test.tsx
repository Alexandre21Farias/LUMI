import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Sidebar } from './Sidebar'

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: () => '/dashboard',
}))

describe('Sidebar Component', () => {
  it('renders brand name and all navigation links', () => {
    render(<Sidebar />)

    // Check brand name
    expect(screen.getByText('LUMI')).toBeInTheDocument()

    // Check routes
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Crianças')).toBeInTheDocument()
    expect(screen.getByText('Rastreamento')).toBeInTheDocument()
    expect(screen.getByText('Área Segura')).toBeInTheDocument()
    expect(screen.getByText('SOS')).toBeInTheDocument()
    expect(screen.getByText('Pulseiras')).toBeInTheDocument()
    expect(screen.getByText('Histórico')).toBeInTheDocument()
  })

  it('marks active path correctly', () => {
    render(<Sidebar />)

    const dashboardLink = screen.getByRole('link', { name: /dashboard/i })
    expect(dashboardLink).toHaveClass('text-white bg-white/10')
  })
})
