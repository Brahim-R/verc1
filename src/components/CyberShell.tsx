interface CyberShellProps {
  children: React.ReactNode
  className?: string
  contentClassName?: string
}

export const CyberShell = ({
  children,
  className = '',
  contentClassName = ''
}: CyberShellProps) => {
  return (
    <div
      className={`relative min-h-[calc(100vh-8rem)] overflow-hidden px-4 py-12 text-gray-600 dark:text-gray-100 ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/[0.03] to-purple-500/[0.06] dark:via-indigo-500/[0.03] dark:to-purple-500/[0.08]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(99,102,241,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.1) 1px, transparent 1px)',
            backgroundSize: '48px 48px'
          }}
        />
        <div className="absolute left-1/2 top-0 h-full w-px bg-gradient-to-b from-transparent via-indigo-500/30 to-transparent dark:via-indigo-500/20" />
      </div>

      <div className={`relative mx-auto max-w-5xl ${contentClassName}`}>
        {children}
      </div>
    </div>
  )
}

export default CyberShell
