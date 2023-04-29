import clsx from 'clsx'

export function Prose({ children, className }) {
  return (
    <div className={clsx(className, 'prose dark:prose-invert')}>{children}</div>
  )
}
