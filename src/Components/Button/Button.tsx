import { ComponentPropsWithoutRef } from 'react'

function Button({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<'button'>) {
  return (
    <button {...props} className={`btn m-0 p-0 ${className}`}>
      {children}
    </button>
  )
}

export default Button
