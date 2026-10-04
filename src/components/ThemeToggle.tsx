import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'

const ThemeToggle = () => {
  const { theme, toggleTheme, mounted } = useTheme()

  // Avoid hydration mismatch by rendering a placeholder until mounted
  if (!mounted) {
    return (
      <div
        className="size-9 rounded-2xl border-2 border-gray-200 bg-white shadow-[0_5px_0_0_rgba(229,231,235,1),0_6px_16px_rgba(0,0,0,0.06)] dark:border-gray-700/50 dark:bg-gray-800/70 dark:shadow-[0_6px_0_0_rgba(31,41,55,0.9),0_8px_20px_rgba(0,0,0,0.35)]"
        aria-hidden="true"
      />
    )
  }

  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="inline-flex size-9 items-center justify-center rounded-2xl border-2 border-gray-200 bg-white text-gray-700 shadow-[0_5px_0_0_rgba(229,231,235,1),0_6px_16px_rgba(0,0,0,0.06)] transition-all hover:-translate-y-0.5 hover:border-indigo-300 hover:bg-gray-50 hover:text-gray-800 hover:shadow-[0_7px_0_0_rgba(229,231,235,1),0_10px_24px_rgba(99,102,241,0.1)] active:translate-y-0.5 active:shadow-[inset_0_4px_10px_rgba(0,0,0,0.08)] dark:border-gray-700/50 dark:bg-gray-800/70 dark:text-gray-300 dark:shadow-[0_6px_0_0_rgba(31,41,55,0.9),0_8px_20px_rgba(0,0,0,0.35)] dark:hover:border-indigo-500/40 dark:hover:bg-gray-800 dark:hover:text-white dark:hover:shadow-[0_8px_0_0_rgba(31,41,55,0.9),0_12px_28px_rgba(99,102,241,0.18)]"
    >
      {isDark ? (
        <Moon className="size-5" strokeWidth={2} />
      ) : (
        <Sun className="size-5" strokeWidth={2} />
      )}
    </button>
  )
}

export default ThemeToggle
