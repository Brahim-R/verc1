interface ClayCardProps {
  children: React.ReactNode
  className?: string
  active?: boolean
  hover?: boolean
}

export const ClayCard = ({
  children,
  className = '',
  active = false,
  hover = true
}: ClayCardProps) => {
  return (
    <div
      className={`
        group relative overflow-hidden rounded-3xl border-2 p-6 transition-all duration-300
        ${
          active
            ? 'translate-y-1 border-indigo-400 bg-gray-100 shadow-[inset_0_6px_16px_rgba(0,0,0,0.08),0_0_25px_rgba(99,102,241,0.15)] dark:border-indigo-500/60 dark:bg-gray-900/85 dark:shadow-[inset_0_6px_16px_rgba(0,0,0,0.55),0_0_25px_rgba(99,102,241,0.25)]'
            : 'border-gray-200 bg-white shadow-[0_8px_0_0_rgba(229,231,235,1),0_12px_32px_rgba(0,0,0,0.08)] dark:border-gray-700/50 dark:bg-gray-800/60 dark:shadow-[0_10px_0_0_rgba(31,41,55,0.85),0_16px_40px_rgba(0,0,0,0.45)]'
        }
        ${
          hover && !active
            ? 'hover:-translate-y-1 hover:border-indigo-300 hover:shadow-[0_12px_0_0_rgba(229,231,235,1),0_16px_40px_rgba(99,102,241,0.12)] dark:hover:border-indigo-500/40 dark:hover:shadow-[0_14px_0_0_rgba(31,41,55,0.85),0_20px_50px_rgba(99,102,241,0.2)]'
            : ''
        }
        ${className}
      `}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-3xl bg-gradient-to-b from-white to-transparent dark:from-white/[0.12]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 rounded-b-3xl bg-gradient-to-t from-black/[0.04] to-transparent dark:from-black/20" />
      <div className="relative">{children}</div>
    </div>
  )
}

export default ClayCard
