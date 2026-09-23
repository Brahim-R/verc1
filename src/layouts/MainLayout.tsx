import { Link, Outlet, useLocation } from 'react-router-dom'
import { Menu, X, Gamepad2, Home, FolderOpen, BookOpen } from 'lucide-react'
import { useState, useEffect } from 'react'
import { getRandomGradient } from '../utils/gradients'
import ThemeToggle from '../components/ThemeToggle'
import { useTheme } from '../hooks/useTheme'

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Projects', path: '/projects', icon: FolderOpen },
    { name: 'Mini Games', path: '/minigames', icon: Gamepad2 },
    { name: 'Tutorials', path: '/tutorials', icon: BookOpen }
  ]

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/80">
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
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 transition-colors duration-200 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                >
                  <item.icon className="mr-2 size-4" />
                  {item.name}
                </Link>
              ))}
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
          <div className="space-y-1 pb-3 pt-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className="block py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
              >
                <div className="flex items-center">
                  <item.icon className="mr-3 size-5" />
                  {item.name}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

const Footer = () => (
  <footer className="border-t border-gray-100 bg-white dark:border-gray-800 dark:bg-gray-900">
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-center text-base text-gray-400">
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
    <div className="flex min-h-screen flex-col font-sans text-gray-900 dark:text-gray-100">
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
