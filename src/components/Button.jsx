import {Link} from "react-router-dom"
import clsx from 'clsx'

const baseStyles = {
  solid:
    'group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
  outline:
    'group inline-flex ring-1 items-center justify-center rounded-full py-2 px-4 text-sm focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed',
}

const variantStyles = {
  solid: {
    slate:
      'bg-slate-900 text-white hover:bg-slate-700 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900 disabled:bg-slate-900 disabled:text-slate-300 disabled:hover:bg-slate-900 disabled:hover:text-slate-300',
    blue: 'bg-sky-600 text-white hover:text-slate-100 hover:bg-sky-500 active:bg-sky-800 active:text-sky-100 focus-visible:outline-sky-600 disabled:bg-sky-600 disabled:text-sky-100 disabled:hover:bg-sky-600 disabled:hover:text-sky-100',
    white:
      'bg-white text-slate-900 hover:bg-blue-50 active:bg-blue-200 active:text-slate-600 focus-visible:outline-white disabled:bg-white disabled:text-slate-600 disabled:hover:bg-white disabled:hover:text-slate-600',
  },
  outline: {
    slate:
      'ring-slate-200 text-slate-700 hover:text-slate-900 hover:ring-slate-300 active:bg-slate-100 active:text-slate-600 focus-visible:outline-blue-600 focus-visible:ring-slate-300 disabled:ring-slate-200 disabled:text-slate-600 disabled:hover:text-slate-600',
    white:
      'ring-slate-700 text-white hover:ring-slate-500 active:ring-slate-700 active:text-slate-400 focus-visible:outline-white disabled:ring-slate-700 disabled:text-slate-400 disabled:hover:text-slate-400',
  },
}

export function Button({
  variant = 'solid',
  color = 'slate',
  className,
  href,
  ...props
}) {
  className = clsx(
    baseStyles[variant],
    variantStyles[variant][color],
    className
  )

  return href ? (
    <Link href={href} className={className} {...props} />
  ) : (
    <button className={className} {...props} />
  )
}
