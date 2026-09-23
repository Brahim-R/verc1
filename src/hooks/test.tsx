import { renderHook, act } from '@testing-library/react'
import { useTheme } from './useTheme'

const setupMockStorage = () => {
  const store: Record<string, string> = {}
  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: (key: string) => store[key] ?? null,
      setItem: (key: string, value: string) => {
        store[key] = value
      },
      removeItem: (key: string) => {
        delete store[key]
      },
      clear: () => {
        Object.keys(store).forEach((key) => delete store[key])
      }
    },
    writable: true
  })
}

describe('useTheme', () => {
  beforeEach(() => {
    setupMockStorage()
    document.documentElement.classList.remove('light', 'dark')
    window.localStorage.clear()
  })

  afterEach(() => {
    document.documentElement.classList.remove('light', 'dark')
    window.localStorage.clear()
  })

  it('should default to dark mode when no preference is stored', () => {
    const { result } = renderHook(() => useTheme())

    expect(result.current.theme).toBe('dark')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(document.documentElement.classList.contains('light')).toBe(false)
  })

  it('should toggle to light mode', () => {
    const { result } = renderHook(() => useTheme())

    act(() => {
      result.current.toggleTheme()
    })

    expect(result.current.theme).toBe('light')
    expect(document.documentElement.classList.contains('light')).toBe(true)
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  it('should persist light mode to localStorage', () => {
    const { result } = renderHook(() => useTheme())

    act(() => {
      result.current.toggleTheme()
    })

    expect(window.localStorage.getItem('theme')).toBe('light')
  })

  it('should load stored light mode preference', () => {
    window.localStorage.setItem('theme', 'light')

    const { result } = renderHook(() => useTheme())

    expect(result.current.theme).toBe('light')
    expect(document.documentElement.classList.contains('light')).toBe(true)
  })
})
