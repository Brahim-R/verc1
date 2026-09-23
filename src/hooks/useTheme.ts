import { useCallback, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'
const THEME_CHANGE_EVENT = 'theme-change'

const getStoredTheme = (): Theme | null => {
  if (typeof window === 'undefined') return null

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null
    if (stored === 'light' || stored === 'dark') return stored
  } catch {
    // localStorage may be unavailable in some environments (e.g. tests)
  }

  return null
}

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => getStoredTheme() ?? 'dark')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)

    try {
      window.localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      // localStorage may be unavailable in some environments (e.g. tests)
    }
  }, [theme])

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        const next = e.newValue as Theme | null
        if (next === 'light' || next === 'dark') {
          setTheme(next)
        }
      }
    }

    const handleCustom = (e: Event) => {
      const next = (e as CustomEvent<Theme>).detail
      if (next === 'light' || next === 'dark') {
        setTheme(next)
      }
    }

    window.addEventListener('storage', handleStorage)
    window.addEventListener(THEME_CHANGE_EVENT, handleCustom)
    return () => {
      window.removeEventListener('storage', handleStorage)
      window.removeEventListener(THEME_CHANGE_EVENT, handleCustom)
    }
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark'

      try {
        window.localStorage.setItem(STORAGE_KEY, next)
      } catch {
        // localStorage may be unavailable in some environments (e.g. tests)
      }

      window.dispatchEvent(
        new CustomEvent(THEME_CHANGE_EVENT, { detail: next })
      )
      return next
    })
  }, [])

  return { theme, toggleTheme, mounted }
}
