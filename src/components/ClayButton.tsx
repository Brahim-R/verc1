import { ButtonHTMLAttributes } from 'react'

interface ClayButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean
}

export const ClayButton = ({
  children,
  className = '',
  active = false,
  ...props
}: ClayButtonProps) => {
  return (
    <button
      type="button"
      className={`
        relative inline-flex items-center justify-center gap-2 rounded-2xl border-2 px-4 py-2 text-sm font-bold transition-all duration-200
        ${
          active
            ? 'translate-y-0.5 border-indigo-400 bg-gray-100 text-indigo-700 shadow-[inset_0_4px_10px_rgba(0,0,0,0.08),0_0_18px_rgba(99,102,241,0.12)] dark:border-indigo-500/60 dark:bg-gray-900/80 dark:text-indigo-200 dark:shadow-[inset_0_4px_10px_rgba(0,0,0,0.5),0_0_18px_rgba(99,102,241,0.25)]'
            : 'border-gray-200 bg-white text-gray-700 shadow-[0_5px_0_0_rgba(229,231,235,1),0_6px_16px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 hover:border-indigo-300 hover:bg-gray-50 hover:text-gray-700 hover:shadow-[0_7px_0_0_rgba(229,231,235,1),0_10px_24px_rgba(99,102,241,0.1)] dark:border-gray-700/50 dark:bg-gray-800/70 dark:text-gray-300 dark:shadow-[0_6px_0_0_rgba(31,41,55,0.9),0_8px_20px_rgba(0,0,0,0.35)] dark:hover:border-indigo-500/40 dark:hover:bg-gray-800 dark:hover:text-white dark:hover:shadow-[0_8px_0_0_rgba(31,41,55,0.9),0_12px_28px_rgba(99,102,241,0.18)]'
        }
        ${
          active
            ? ''
            : 'active:translate-y-0.5 active:shadow-[inset_0_4px_10px_rgba(0,0,0,0.08)] dark:active:shadow-[inset_0_4px_10px_rgba(0,0,0,0.5)]'
        }
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
}

export default ClayButton
