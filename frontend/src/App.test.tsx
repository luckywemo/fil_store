import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders the landing page by default', () => {
    render(<App />)
    expect(screen.getByText(/Welcome to Dottie/i)).toBeInTheDocument()
  })
  
  it('renders sign-in and sign-up links', () => {
    render(<App />)
    expect(screen.getByText(/Get Started/i)).toBeInTheDocument()
    expect(screen.getByText(/Sign In/i)).toBeInTheDocument()
  })
  
  it('renders feature descriptions', () => {
    render(<App />)
    expect(screen.getByText(/Track Your Cycle/i)).toBeInTheDocument()
    expect(screen.getByText(/Get Insights/i)).toBeInTheDocument()
    expect(screen.getByText(/Stay Informed/i)).toBeInTheDocument()
  })
}) 