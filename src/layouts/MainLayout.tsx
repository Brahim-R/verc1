import { Link, Outlet, useLocation } from 'react-router-dom'
import {
  Menu,
  X,
  Gamepad2,
  Home,
  FolderOpen,
  BookOpen,
  Map
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { getRandomGradient } from '../utils/gradients'
import ThemeToggle from '../components/ThemeToggle'
import { useTheme } from '../hooks/useTheme'

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Projects', path: '/projects', icon: FolderOpen },
    { name: 'Mini Games', path: '/minigames', icon: Gamepad2 },
    { name: 'Tutorials', path: '/tutorials', icon: BookOpen },
    { name: 'Sitemap', path: '/sitemap', icon: Map }
  ]

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-gray-100/80 backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <Link to="/" className="flex shrink-0 items-center">
              <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-2xl font-bold text-transparent">
                R Brahim
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            {/* Desktop Menu */}
            <div className="hidden items-center gap-3 sm:ml-6 sm:flex">
              {navItems.map((item) => {
                const isActive =
                  item.path === '/'
                    ? location.pathname === '/'
                    : location.pathname.startsWith(item.path)
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`
                      relative inline-flex items-center gap-2 rounded-2xl border-2 px-4 py-2 text-sm font-bold transition-all duration-200
                      ${
                        isActive
                          ? 'translate-y-0.5 border-indigo-400 bg-gray-200 text-indigo-700 shadow-[inset_0_4px_10px_rgba(0,0,0,0.08),0_0_18px_rgba(99,102,241,0.12)] dark:border-indigo-500/60 dark:bg-gray-900/80 dark:text-indigo-200 dark:shadow-[inset_0_4px_10px_rgba(0,0,0,0.5),0_0_18px_rgba(99,102,241,0.25)]'
                          : 'border-gray-200 bg-white text-gray-700 shadow-[0_5px_0_0_rgba(229,231,235,1),0_6px_16px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 hover:border-indigo-300 hover:bg-gray-50 hover:text-gray-700 hover:shadow-[0_7px_0_0_rgba(229,231,235,1),0_10px_24px_rgba(99,102,241,0.1)] dark:border-gray-700/50 dark:bg-gray-800/70 dark:text-gray-300 dark:shadow-[0_6px_0_0_rgba(31,41,55,0.9),0_8px_20px_rgba(0,0,0,0.35)] dark:hover:border-indigo-500/40 dark:hover:bg-gray-800 dark:hover:text-white dark:hover:shadow-[0_8px_0_0_rgba(31,41,55,0.9),0_12px_28px_rgba(99,102,241,0.18)]'
                      }
                    `}
                  >
                    <item.icon
                      className={`size-4 ${
                        isActive ? 'text-indigo-600 dark:text-indigo-300' : ''
                      }`}
                    />
                    <span className="relative z-10">{item.name}</span>
                  </Link>
                )
              })}
            </div>

            <ThemeToggle />

            {/* Mobile menu button */}
            <div className="flex items-center sm:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              >
                {isOpen ? (
                  <X className="block size-6" />
                ) : (
                  <Menu className="block size-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="sm:hidden">
          <div className="space-y-2 px-4 pb-3 pt-2">
            {navItems.map((item) => {
              const isActive =
                item.path === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(item.path)
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`
                    flex items-center gap-3 rounded-xl border-2 px-4 py-3 text-base font-bold transition-all
                    ${
                      isActive
                        ? 'border-indigo-400 bg-gray-200 text-indigo-700 shadow-[inset_0_4px_10px_rgba(0,0,0,0.08)] dark:border-indigo-500/60 dark:bg-gray-900/80 dark:text-indigo-200 dark:shadow-[inset_0_4px_10px_rgba(0,0,0,0.5)]'
                        : 'border-gray-200 bg-white text-gray-700 shadow-[0_4px_0_0_rgba(229,231,235,1)] hover:border-indigo-300 hover:bg-gray-50 hover:text-gray-700 dark:border-gray-700/50 dark:bg-gray-800/70 dark:text-gray-300 dark:shadow-[0_4px_0_0_rgba(31,41,55,0.9)] dark:hover:border-indigo-500/40 dark:hover:bg-gray-800 dark:hover:text-white'
                    }
                  `}
                >
                  <item.icon
                    className={`size-5 ${
                      isActive ? 'text-indigo-600 dark:text-indigo-300' : ''
                    }`}
                  />
                  {item.name}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </nav>
  )
}

const Footer = () => (
  <footer className="px-4 pb-6 pt-2">
    <div className="relative overflow-hidden rounded-3xl border-2 border-gray-200 bg-white p-8 shadow-[0_8px_0_0_rgba(229,231,235,1),0_12px_32px_rgba(0,0,0,0.08)] dark:border-gray-700/50 dark:bg-gray-800/60 dark:shadow-[0_10px_0_0_rgba(31,41,55,0.85),0_16px_40px_rgba(0,0,0,0.45)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-3xl bg-gradient-to-b from-white to-transparent dark:from-white/[0.12]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 rounded-b-3xl bg-gradient-to-t from-black/[0.04] to-transparent dark:from-black/20" />
      <p className="relative text-center text-base text-gray-500 dark:text-gray-400">
        &copy; {new Date().getFullYear()} My Portfolio. Built with React &
        PixiJS.
      </p>
    </div>
  </footer>
)

const MainLayout = () => {
  const location = useLocation()
  const { theme } = useTheme()
  const [background, setBackground] = useState(() => getRandomGradient('dark')) // Default to dark

  useEffect(() => {
    setBackground(getRandomGradient(theme))
  }, [location.pathname, theme])

  return (
    <div className="flex min-h-screen flex-col font-sans text-gray-600 dark:text-gray-100">
      <div
        className={`fixed inset-0 -z-10 transition-all duration-1000 ease-in-out ${background.className}`}
        style={background.style}
      />
      <Navigation />
      <main className="grow">
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout
