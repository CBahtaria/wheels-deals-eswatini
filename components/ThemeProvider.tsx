'use client'
import { createContext, useContext, useEffect, useState } from 'react'

export type Theme = 'auto' | 'light' | 'dark'

const ThemeCtx = createContext<{ theme: Theme; setTheme: (t: Theme) => void }>({
  theme: 'auto',
  setTheme: () => {},
})

function applyTheme(t: Theme) {
  if (t === 'auto') document.documentElement.removeAttribute('data-theme')
  else document.documentElement.setAttribute('data-theme', t)
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('auto')

  useEffect(() => {
    const saved = localStorage.getItem('wde-theme') as Theme | null
    if (saved === 'light' || saved === 'dark' || saved === 'auto') {
      setThemeState(saved)
      applyTheme(saved)
    }
  }, [])

  const setTheme = (t: Theme) => {
    setThemeState(t)
    applyTheme(t)
    localStorage.setItem('wde-theme', t)
  }

  return <ThemeCtx.Provider value={{ theme, setTheme }}>{children}</ThemeCtx.Provider>
}

export const useTheme = () => useContext(ThemeCtx)
